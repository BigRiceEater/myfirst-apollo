const { ApolloServer, gql } = require("apollo-server");

// Our own internal data source for now
const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    id: 2,
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  # Define all your queries here.
  type Query {
    books: [Book]
    booksByAuthor(author: String!): [Book]
    book(id: Int!): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    booksByAuthor: (parent, args, context, info) =>
      books.filter(b => b.author === args.author),
    book: (parent, args, context, info) => books.find(b => b.id === args.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
