const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADuk94M0AGDH2jMwUywRTfJ7LaHkp8lbzxnzPG' })

exports.handler = (event, context, callback) => {
  return client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('orders'))),
      q.Lambda("x", q.Get(q.Var("x")))
    ))
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
