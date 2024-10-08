import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../redux/productSlcie';
import Youtube from './Youtube';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

function Api() {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector((state) => state.products);

  const [selectCategory, setSelectCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Set how many products per page

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectCategory(selectedCategory);
    dispatch(fetchProductsByCategory(selectedCategory));
    setCurrentPage(1); // Reset to first page on category change
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search query change
  };

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between '>
        <div className="mb-4">
          <select
            id="category"
            value={selectCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name || category}>
                {category.name || category}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-primary">
          <div className="flex justify-center ">
            <div className='grid grid-cols-1 md:grid-cols-4'>
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
              <Youtube />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Grid container spacing={2}>
            {currentProducts.map(product => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card sx={{ maxWidth: 300, height: '450px', display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'space-around', borderRadius: "20px" }}>
                  <CardMedia style={{ height: '220px', width: '200px' }}
                    component="img"
                    alt={product.title}
                    image={product.thumbnail}
                    loading='lazy'
                  />
                  <CardContent>
                    <Typography gutterBottom component="div" style={{ fontSize: '20px' }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body5" sx={{ color: 'text.secondary' }}>
                      {product.description.slice(0, product.description.length - 50) + "..."}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ display: 'flex', gap: '70px' }}>
                    <Typography>INR {product.price}</Typography>
                    <Button style={{ border: '2px solid', borderRadius: '15px' }} size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
