import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: 2px solid white;
  border-radius: 4px;
  margin: 20px;
  padding: 4px;
`
const Orders = () => {
  const url = 'https://lizlam-faunadb-example.netlify.app/.netlify/functions/orders'
  //const url = 'http://localhost:8888/.netlify/functions/orders'
  const [info, setInfo] = useState()

  const fetchOrders = async () => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setInfo(data)
    return data
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      {info && info.data.map((v, i) => {
        const { shipAddress, status } = v.data;
        return (
          <StyledDiv key={i}>
            <h2>Order {i + 1}</h2>
            <div>Status: {status}</div>
            <div>Customer Id: {v.data.customer["@ref"].id}</div>
            <div>{shipAddress.street}</div>
            <div>{shipAddress.city}, {shipAddress.state} {shipAddress.zip}</div>
          </StyledDiv>
        )
      })}
    </div >
  )
}

export default Orders
