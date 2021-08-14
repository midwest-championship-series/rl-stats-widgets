import React from 'react'
import Image from 'next/image'

import { getLeaderboard } from '../../services/stats'
import style from './standings.module.scss'

export async function getServerSideProps(context: any) {
  const headers = context.req[Object.getOwnPropertySymbols(context.req).find((s) => { return String(s) === "Symbol(kHeaders)"}) ?? ""]
  const auth = headers["Authorization"] ?? ""
  // Before making api calls, check auth here so we don't make any unnecessary requests

  const league = context.query.league ?? "mncs"

  return {
    props: {
      Authorization: auth,
      leaderboard: getLeaderboard()
    }
  }
}

// match record, game diff, goal diff
// gray-ish every other
export default function Standings(props: any) {
  return (
    <div className={style.standings}>
      <p>STANDINGS</p>
      <div>
        <div className={style.teamheader}>
          <div className={style.flexCol} style={{ width: "85px" }}>
            <p>RANK</p>
          </div>
          <div className={style.flexCol} style={{ width: "85px" }}>
            <p>LOGO</p>
          </div>
          <div className={style.flexCol} style={{ width: "80px" }}>
            <p>NAME</p>
          </div>
          <div>
            <p>W</p>
            <p>L</p>
            <p>GOAL DIFF</p>
            <p>GAME DIFF</p>
          </div>
        </div>
        {props.leaderboard.map((val: any, index: number) => {
          return (
            <div key={index} className={style.team}>
              <p>#{index+1}</p>
              <Image className={style.logo} src={val.avatar} alt="" width={90} height={90} objectFit="cover" />
              <div className={style.flexCol} style={{ width: "300px" }}>
                <p className={style.teamName}>{val.city}</p>
                <p className={style.teamName}>{val.name}</p>
              </div>
              <div className={style.stats}>
                <p>0</p>
                <p>0</p>
                <p>+0</p>
                <p>+0</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}