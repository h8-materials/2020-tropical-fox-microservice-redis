import React from 'react'
import Card from './../components/Card'
import {useQuery, gql} from '@apollo/client'
import {FETCH_USER} from './../schema/query'

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

export default function Home() {
  const {loading, error, data} = useQuery(FETCH_USER)
  console.log(loading, error, data)
  return (
    <div className="w-full shadow bg-white p-5">
      <h1 className="text-gray-900 text-2xl font-semibold">Ini Halaman Home</h1>

      {loading && <h1 className="text-gray-900 text-2xl font-semibold">Sedang Loading</h1>}
      {error && <h1 className="text-gray-900 text-2xl font-semibold">Ada error mang {error.message}</h1>}
      {!loading && !error && data.getUsers.map((user) => <Card key={user._id} user={user} />)}
    </div>
  )
}
