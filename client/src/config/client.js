import {ApolloClient, InMemoryCache, gql, makeVar} from '@apollo/client'
import { GET_LOCAL_USER, FETCH_USER} from '../schema/query'

export const counterFn = makeVar(100)

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          counter: {
            read() {
              return counterFn()
            }
          }
        }
      }
    }
  })
})


client.writeQuery({
  query: GET_LOCAL_USER,
  data: {
    localUsers: [
      {
        name: 'Kosasih',
        age: 17,
        gender: 'Female'
      },
      {
        name: 'Semmi',
        age: 18,
        gender: 'Male'
      }
    ]
  }
})

export default client
