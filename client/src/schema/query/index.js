import {gql} from '@apollo/client'

export const FETCH_USER = gql`
  query FetchUser {
    getUsers {
      _id
      name
      age
      gender
    }
  }
`

export const GET_LOCAL_USER = gql`
  query {
    localUsers {
      name
      age
      gender
    }
  }
`
