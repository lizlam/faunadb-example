const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNA_SECRET })

exports.handler = (event, context, callback) => {
  return client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('orders'))),
      q.Lambda("x", q.Get(q.Var("x")))
    ))
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
