import axios from 'axios';

import React, { useEffect, useState } from 'react';

function  Api() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Set how many products per page

  useEffect(() => {
    // Fetch all products
    axios.get("https://dummyjson.com/products/")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        console.log("Error");
      });

    // Fetch all categories
    axios.get("https://dummyjson.com/products/categories")
      .then((response) => {
        setCategories(response.data); 
        setLoading(false);
      })
      .catch(() => {
        console.log("Category Error");
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value; 
    setSelectCategory(selectedCategory);

    if (selectedCategory === '') {
      // Fetch all products if 'All Categories' is selected
      axios.get("https://dummyjson.com/products/")
        .then(response => {
          setProducts(response.data.products);
        })
        .catch(error => {
          console.error("Error fetching all products!", error);
        });
    } else {
      // Fetch products by category
      axios.get(`https://dummyjson.com/products/category/${selectedCategory}`)
        .then(response => {
          setProducts(response.data.products);
        })
        .catch(error => {
          console.error("There was an error fetching the products for the category!", error);
        });
    }
    // Reset to first page on category change
    setCurrentPage(1);
  };

  // Get the current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <label htmlFor="category">Filter by category</label>
        <select id="category" value={selectCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name || category}>
              {category.name || category}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <ul>
            {currentProducts.map(product => (
              <li key={product.id}>
                {product.title}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading='lazy'
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div>
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
              <button 
                key={index + 1} 
                onClick={() => paginate(index + 1)} 
                style={{ margin: '0 5px', padding: '5px', backgroundColor: currentPage === index + 1 ? 'lightblue' : 'white' }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Api;
