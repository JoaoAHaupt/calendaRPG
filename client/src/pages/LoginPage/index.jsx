import { useState, useEffect } from 'react'

import './App.css'
import axios from "axios"

function LoginPage() {


  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/users")
    setArray(response.data.users)
  }

  return (
    <>
      
        
    </>
  )
}

export default LoginPage
