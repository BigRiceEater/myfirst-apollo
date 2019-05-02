const { typeDefs: Book, queries : BookQuery } = require('./books.js')

exports.typeDefs = [Book]

exports.resolvers = {
    Query : {
        ...BookQuery
    }
}