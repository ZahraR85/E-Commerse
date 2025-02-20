import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    category: "",
    subcategory: "",
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    if (!user || role !== "admin") {
      navigate("/");
    } else {
      fetchCategories();
    }
  }, [user, role, navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryName,
          subcategories: subcategories.split(",").map((s) => s.trim()),
        }),
      });

      if (response.ok) {
        fetchCategories();
        setCategoryName("");
        setSubcategories("");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const uploadImagesToCloudinary = async () => {
    const uploadedImages = [];
    for (let file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset"); // Replace with Cloudinary upload preset

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          { method: "POST", body: formData }
        );
        const data = await response.json();
        uploadedImages.push(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return uploadedImages;
  };

  const handleAddProduct = async () => {
    const uploadedImages = await uploadImagesToCloudinary();

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...productData, images: uploadedImages }),
      });

      if (response.ok) {
        setProductData({
          name: "",
          description: "",
          price: "",
          images: [],
          category: "",
          subcategory: "",
        });
        setImageFiles([]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="relative min-h-screen p-10 bg-gray-100 ">
      <div className="relative mx-auto w-full max-w-[100%] bg-white shadow-md rounded-lg p-2 lg:p-8 space-y-5">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p>Welcome, Admin! Manage your products and categories here.</p>
        <div className="flex">
          {/* Add Category */}
          <div className="flex-2 border-4 border-rounded p-4">
            <h2 className="text-xl font-semibold">Add Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Subcategories (comma separated)"
              value={subcategories}
              onChange={(e) => setSubcategories(e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              Add Category
            </button>
          </div>

          {/* Add Product */}
          <div className="flex-3 ml-4 border-4 p-4 border-rounded">
            <h2 className="text-xl font-semibold">Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={productData.image}
              onChange={(e) =>
                setProductData({ ...productData, image: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="file"
              multiple
              onChange={(e) =>
                setProductData({ ...productData, image: e.target.value })
              }
              className="border mx-2 p-2 text-sm lg:text-lg rounded w-full text-BgFont border-BgPinkDark focus:outline-none focus:ring focus:ring-BgPinkDark"
            />
            <div className="flex flex-wrap gap-2 lg:mt-2 mt-1">
              {newImageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded "
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-0 right-0 text-sm lg:text-lg text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <select
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={productData.subcategory}
              onChange={(e) =>
                setProductData({ ...productData, subcategory: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
              disabled={!productData.category} // Disable if no category selected
            >
              <option value="">Select Subcategory</option>
              {categories
                .find((cat) => cat._id === productData.category)
                ?.subcategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>

            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
