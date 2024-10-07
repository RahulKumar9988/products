import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Category() {
  const[loading , setLoading] = useState(true)
  const[categorys , setCategory] = useState([])

  useEffect(()=>{
    axios.get("https://dummyjson.com/products/categories")
    .then(response => {
      setCategory(response.data.categories)
      setLoading(false)
      console.log(response);
      
      
    })
    .catch(error =>{
      console.log(error);
    })
  },[])


  return (
    <div className='flex justify-end mr-40'>
      <h1>category </h1>
    </div>
  )
}

export default Category