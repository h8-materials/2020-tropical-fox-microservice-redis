const {ApolloServer, gql} = require('apollo-server')
const axios = require('axios')

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    age: Int
    gender: String
    adress: Adress
  }

  type Adress {
    id: ID
    street: String
    city: String
  }

  type Query {
    getUser(id: ID): User
    getUsers: [User]
  }

  type Mutation {
    addUser(name: String!, age: Int, gender: String): User
  }
`

const resolvers = {
  Query: {
    async getUser(_, args) {
      const {data} = await axios(`http://localhost:3001/users/${args.id}`)
      return data
    },

    async getUsers() {
      try {
        // if ada data di cache maka tampilkan data cachenya, jika tidak hit api nya
        const {data} = await axios.get('http://localhost:3001/users')
        return data
      } catch (err) {
        console.log(err)
      }
    }
  },

  Mutation: {
    async addUser(_, args) {
      try {
        const {data} = await axios.post('http://localhost:3001/users', args)
        return data
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log('Graphql siap dijalankan di url', url)
})
