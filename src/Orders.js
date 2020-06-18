import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: 2px solid white;
  border-radius: 4px;
  margin: 20px;
  padding: 4px;
`
const Orders = () => {
  //const url = 'https://lizlam-faunadb-example.netlify.app/.netlify/functions/orders'
  const url = 'http://localhost:8888/.netlify/functions/orders'
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
        return (
          <StyledDiv key={v.data.creditCard.number}>
            <h4>Order {i + 1}</h4>
            {v.data.shipAddress.street}
            {v.data.shipAddress.street}
            {v.data.shipAddress.street}
          </StyledDiv>
        )
      })}
    </div >
  )
}

export default Orders
