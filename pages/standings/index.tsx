import React from 'react'
import Image from 'next/image'

import { getLeaderboard } from '../../services/stats'
import style from './standings.module.scss'

export async function getServerSideProps(context: any) {
  const headers = context.req[Object.getOwnPropertySymbols(context.req).find((s) => { return String(s) === "Symbol(kHeaders)"}) ?? ""]
  const auth = headers["Authorization"] ?? ""
  // Before making api calls, check auth here so we don't make any unnecessary requests

  // Make api calls here using query params
  //console.log(context.query)
  return {
    props: {
      Authorization: auth,
      leaderboard: getLeaderboard()
    }
  }
}

export default function Standings(props: any) {
  return (
    <div className={style.standings}>
      <p>STANDINGS</p>
      <div>
        {props.leaderboard.map((val: any, index: number) => {
          return (
            <div key={index} className={style.team} style={{ backgroundColor: val.color, color: val.secondary }}>
              <Image className={style.logo} src={val.avatar} alt="" width={150} height={150} objectFit="cover" />
              <div className={style.flexCol + " " + style.teamname}>
                <p>{val.city}</p>
                <p>{val.name}</p>
              </div>
              <div className={style.record}>
                <p>{val.wins + " - " + val.losses}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}