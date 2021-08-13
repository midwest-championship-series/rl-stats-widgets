import React from "react";

import StandingsPage, { StandingsProps, StandingsState } from './standings'

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
      Authorization: auth,
      leaderboard: []
    }
  }
}

export default class Standings extends React.Component<StandingsProps, StandingsState> {
  
  constructor(props: StandingsProps) {
    super(props)
    console.log(props)
    this.state = {
      leaderboard: props.leaderboard
    }
  }

  // Slap the component onto window so we can access it without the need for socketio
  componentDidMount() {
    // @ts-ignore
    window.standingsWidget = this
  }

  nextPage() {
    console.log('next page')
  }

  render = StandingsPage
}