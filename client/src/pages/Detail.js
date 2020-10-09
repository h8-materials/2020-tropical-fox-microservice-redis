import React from 'react'
import {useParams} from 'react-router-dom'
import {useQuery, gql} from '@apollo/client'

const FETCH_DETAIL = gql`
  query FetchUser($id: ID) {
    getUser(id: $id) {
      _id
      name
      age
      gender
    }
  }
`

export default function Detail() {
  const {id} = useParams()
  const {loading, error, data} = useQuery(FETCH_DETAIL, {
    variables: {
      id
    }
  })
  console.log(loading, error, data)
  return (
    <div className="w-full shadow bg-white p-5">
      <>
        <h1 className="text-gray-900 text-3xl font-semibold">Detail user</h1>
        {loading && <h1 className="text-gray-900 text-2xl font-semibold">Sedang Loading</h1>}
        {error && <h1 className="text-gray-900 text-2xl font-semibold">Ada error mang {error.message}</h1>}
        {!loading && !error && (
          <div>
            <h4 className="text-gray-900 text-lg">{data.getUser.name}</h4>
            <div className="flex space-x-4">
              <h4 className="text-gray-500 text-base">Age: {data.getUser.age}</h4>
              <h4 className="text-gray-500 text-base">Gender: {data.getUser.gender}</h4>
            </div>
          </div>
        )}
      </>
    </div>
  )
}
