const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNA_SECRET })
exports.handler = (event, context, callback) => {
  return client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('orders'))),
      q.Lambda("x",  // 1st arg of Lambda
        // This whole Merge block is the 2nd argument of the Lambda
        [
          q.Get(q.Var('x')),
          q.Get(q.Ref(q.Collection('customers'),  // Get Customer information
            (q.Select(['data', 'customer', 'id'],
              q.Get(q.Var('x')))
            ))),
          q.Get(q.Ref(q.Collection('products'),   // Get Product information
            (q.Select(['data', 'line', 1, 'product', 'id'],
              q.Get(q.Var('x')))
            ))),
        ]
      )
    )
  )
    .then((res) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch((err) => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(err)
      })
    })
}
