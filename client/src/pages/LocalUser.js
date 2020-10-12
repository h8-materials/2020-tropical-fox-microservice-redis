import React from 'react'
import Card from './../components/Card'
import {useQuery, gql} from '@apollo/client'
import client, { counterFn} from '../config/client'
import {FETCH_USER, GET_LOCAL_USER} from './../schema/query'

// const FETCH_USER = gql`
//   query FetchUser {
//     getUsers {
//       _id
//       name
//       age
//       gender
//     }
//   }
// `


const COUNTER_LOCAL_STATE = gql`
  query {
   counter @client
  }
`

export default function LocalUser() {
  // const {loading, error, data} = useQuery(GET_LOCAL_USER)
  const { loading, error, data} = useQuery(COUNTER_LOCAL_STATE)
  console.log(loading, error, data)

  function addNewUser() {
    const { localUsers } = client.readQuery({ query: GET_LOCAL_USER})

    client.writeQuery({
      query: GET_LOCAL_USER,
      data: {
        localUsers: [
          ...localUsers,
          {
            name: 'Bagus',
            age: 20,
            gender: 100
          }
        ]
      }
    })
  }

  function decrementCounter() {
    counterFn(data.counter - 1)
  }

  function incrementCounter() {
    counterFn(data.counter + 1)
  }

  return (
    <div className="w-full shadow bg-white p-5">
      <div className="flex justify-between">
        <h1 className="text-gray-900 text-2xl font-semibold">Ini Halaman Home</h1>
        <button className="text-blue-900" onClick={addNewUser}>Add new User</button>
      </div>

      <div className="flex justify-between">
        <button className="text-blue-900" onClick={decrementCounter}>Kurangin aku mas</button>
        <h2 className="font-semibold text-xl text-gray-900 leading-7 tracking-wide">{ data.counter}</h2>
        <button className="text-blue-900" onClick={incrementCounter}>Tambahkan aku mas</button>
      </div>

      {/* {loading && <h1 className="text-gray-900 text-2xl font-semibold">Sedang Loading</h1>}
      {error && <h1 className="text-gray-900 text-2xl font-semibold">Ada error mang {error.message}</h1>}
      {!loading && !error && data.localUsers.map((user) => <Card key={user._id} user={user} />)} */}
    </div>
  )
}
