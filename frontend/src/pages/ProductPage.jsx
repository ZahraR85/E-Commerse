import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-64 h-64 object-cover mx-auto"
      />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600">${product.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;
