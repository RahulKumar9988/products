import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

function Cart() {
  const products = useSelector(state => state.cart); // Make sure this points to your product array
  console.log(products);

  const cards = products.map(product => (
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
            {/* Check if description exists before calling slice */}
            {product.description ? product.description.slice(0, product.description.length - 50) + "..." : "No description available."}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', gap: '70px' }}>
          <Typography>INR {product.price}</Typography>
          <Button style={{ border: '2px solid', borderRadius: '15px' }} size="small" onClick={() => addToCart(products)}>Add to cart</Button>
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {cards}
    </Grid>
  );
}

export default Cart;
