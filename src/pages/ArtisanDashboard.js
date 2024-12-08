import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ArtisanDashboard.css";

const ArtisanDashboard = () => {
  const [artisanDetails, setArtisanDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]); // State for rejected products

  // Fetch artisan details and rejected products
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    axios
      .get(`http://localhost:8081/api/auth/artisan/${email}`)
      .then((response) => {
        setArtisanDetails(response.data);

        // Fetch rejected products
        axios
          .get(`http://localhost:8081/api/products/rejected?artisanEmail=${response.data.email}`)
          .then((res) => setRejectedProducts(res.data)) // Update rejected products
          .catch((err) => console.error("Error fetching rejected products:", err));
      })
      .catch((error) => console.error("Error fetching artisan details:", error));
  }, []);

  // Fetch products uploaded by the artisan
  useEffect(() => {
    if (artisanDetails.email) {
      axios
        .get(`http://localhost:8081/api/products/artisan?email=${artisanDetails.email}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [artisanDetails.email]);

  return (
    <div className="artisan-dashboard">
      <h2>Artisan Dashboard</h2>

      {/* Approved and Pending Products */}
      <h3>Your Products</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.isApproved ? "Approved" : "Pending"}</td>
              <td>
                <img
                  src={`http://localhost:8081/api/products/image/${product.id}`}
                  alt={product.name}
                  style={{ width: "100px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rejected Products */}
      <h3>Rejected Products</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {rejectedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <img
                  src={`http://localhost:8081/api/products/image/${product.id}`}
                  alt={product.name}
                  style={{ width: "100px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtisanDashboard;