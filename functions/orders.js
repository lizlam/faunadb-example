const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: 'fnADuk94M0AGDH2jMwUywRTfJ7LaHkp8lbzxnzPG'
})

exports.handler = (event, context, callback) => {
  return client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('orders'))),
      q.Lambda('x',
        [
          q.Get(q.Var('x')),
          // Get Customer Information
          q.Get(q.Ref(q.Collection('customers'),
            (q.Select(['data', 'customer', 'id'],
              q.Get(q.Var('x')))
            ))),
          // Get Product information
          q.Map(
            q.Select(['data', 'line'], q.Get(q.Var('x'))),
            q.Lambda('y',
              (
                q.Get(q.Ref(q.Collection('products'),
                  (q.Select(['product', 'id'],
                    q.Var('y')))
                ))
              )
            )
          ),
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
