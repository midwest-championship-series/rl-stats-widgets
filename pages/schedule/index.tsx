import React from 'react'

export async function getServerSideProps(context: any) {
  const headers = context.req[Object.getOwnPropertySymbols(context.req).find((s) => { return String(s) === "Symbol(kHeaders)"}) ?? ""]
  const auth = headers["Authorization"] ?? ""

  // Before making api calls, check auth here so we don't make any unnecessary requests

  // Make api calls here using query params
  //console.log(context.query)
  return {
    props: {
      Authorization: auth
    }
  }
}

export default function Schedule(props: any) {
  return (
    <p>Schedule</p>
  )
}