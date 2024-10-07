import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid, Pagination} from '@mui/material';
import DevtoCard from './Youtube';
import Category from './Category';
import { useDispatch } from 'react-redux';
import { add } from '../redux/cartSlice';

function Products({category }) {
    const[products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get('https://dummyjson.com/products')
        .then(response =>{
            setProducts(response.data.products)
            setLoading(false)

        })
    },[])

    const addToCart = (product) =>{
        dispatch(add(product))
    }

    if (loading) {
        return <div className="bg-primary">
            <div  className="flex justify-center ">
                <div className='grid grid-cols-4'>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>
                    <DevtoCard/>                    
                </div>
            </div>
        </div>
    }

    
    const cards = products.map(product => (
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
                    <Button style={{border:'2px solid',borderRadius:'15px'}} size="small" onClick={() =>addToCart(products)}>Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    ));


    
    return (
        <div className='ml-10 mt-4'>
            <h1 className='text-5xl text-center mb-2'>Product Dashboard</h1>
            <Category/>
            <Grid container spacing={2}>
                {cards}
            </Grid>
        </div>
    )
}

export default Products