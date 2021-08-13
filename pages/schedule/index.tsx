import React from "react";

import SchedulePage, { ScheduleProps, ScheduleState } from './schedule'

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

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

export default class Schedule extends React.Component<ScheduleProps, ScheduleState> {
  
  constructor(props: ScheduleProps) {
    super(props)
  }

  render = SchedulePage
}