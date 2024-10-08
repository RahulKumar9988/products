import React, { useEffect, useState } from 'react';
import { Grid, Typography, Select, MenuItem, CircularProgress, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory, getCategories } from '../redux/productSlcie';
import DevtoCard from './Youtube';

function Products() {
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const dispatch = useDispatch();
    
    const { data: products, categories, loading } = useSelector((state) => state.products);

    // Fetch categories on component mount
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    // Fetch products based on the selected category
    useEffect(() => {
        dispatch(getProductsByCategory(selectedCategory)); // Pass category name (string)
    }, [dispatch, selectedCategory]);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        console.log("Selected Category:", category); // Debugging
        setSelectedCategory(category); // Update the selected category
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Array.isArray(products) || products.length === 0) {
        return <Typography>No products available.</Typography>;
    }

    const cards = products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ maxWidth: 300, height:'450px',display:'flex', flexFlow:'column', alignItems:'center', justifyContent:'space-around', borderRadius:"20px"}}>
                <CardMedia style={{height:'220px', width:'200px'}}
                    component="img"
                    alt={product.title}
                    image={product.thumbnail}
                    loading='lazy'
                />
                <CardContent>
                    <Typography gutterBottom  component="div" style={{fontSize:'20px'}}> 
                        {product.title}
                    </Typography>
                    <Typography variant="body5" sx={{ color: 'text.secondary' }}>
                        {product.description.slice(0,product.description.length - 50) + "..."}
                    </Typography>
                </CardContent>
                <CardActions style={{display:'flex', gap:'70px' }}>
                    <Typography>INR {product.price}</Typography>
                    <Button style={{border:'2px solid',borderRadius:'15px'}} size="small" >Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    ));

    return (
        <div className="ml-10 mt-4">
            <h1 className="text-5xl text-center mb-2">Product Dashboard</h1>
            
            {/* Category Dropdown */}
            <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                sx={{ mb: 4, minWidth: 200 }}
            >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category, i) => (
                    <MenuItem key={i} value={category}>{category.name}</MenuItem> // Pass category name
                ))}
            </Select>
            
            {/* Product Cards */}
            <Grid container spacing={2}>
                {cards}
            </Grid>
        </div>
    );
}

export default Products;
