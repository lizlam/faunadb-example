const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADuk94M0AGDH2jMwUywRTfJ7LaHkp8lbzxnzPG' })

exports.handler = (event, context, callback) => {
    return client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('products'))),
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
