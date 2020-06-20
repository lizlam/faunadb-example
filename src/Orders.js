import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: 2px solid white;
  border-radius: 4px;
  margin: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
`
const LinesArea = styled.div`
  text-align: right;
  margin: 10px;
  color: ed;
`
const StyledSpan = styled.span`
  color: gold;
  font-weight: 700;
`
const Orders = () => {
  const base = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API
    : process.env.REACT_APP_PROD_API

  const url = base + 'orders'
  const [info, setInfo] = useState()

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setInfo(data)
      return data
    }
    fetchOrders()
  }, [url])

  return (
    <div>
      {info && info.data.map((v, i) => {
        const { shipAddress, status } = v[0].data
        const { firstName, lastName } = v[1].data
        const products = v[2]
        var subtotals = []
        return (
          <StyledDiv key={i}>
            <h2>Order {i + 1}</h2>
            <div>
              Status: <StyledSpan>{status}</StyledSpan>
            </div>
            <LinesArea>
              {products.map((k, i) => {
                let quantity = parseFloat(v[0].data.line[i].quantity)
                let price = parseFloat(k.data.price).toFixed(2)
                let subtotal = parseFloat(quantity * price).toFixed(2)
                subtotals.push(subtotal)
                return (
                  <div key={i}>
                    {`${k.data.name} 
                    (${k.data.description}):
                    $${price} each x ${quantity} 
                    = $${subtotal}`}
                  </div>
                )
              })}
              <StyledSpan>
                Total: ${subtotals.reduce((acc, current) => (parseFloat(acc) + parseFloat(current)).toFixed(2), 0)}
              </StyledSpan>
            </LinesArea>
            <div>{`${firstName} ${lastName}`}</div>
            <div>{shipAddress.street}</div>
            <div>{shipAddress.city}, {shipAddress.state} {shipAddress.zip}</div>
          </StyledDiv>
        )
      })}
    </div >
  )
}

export default Orders