import Link from 'next/link'
import style from "./standings.module.scss"
import StandingsClass from './index'
import React from "react"

export interface StandingsProps {
  leaderboard: any[]
}

export interface StandingsState {
  leaderboard: any[]
}

export default function Standings(this: StandingsClass) {
  return (
    <div className={style.standings}>
      <Link href="/schedule">Leaderboard</Link>
      {this.state.leaderboard.map((val, index) => {
        return (
          <p key={index}>Value: {val.team_name}</p>
        )
      })}
      <embed src="http://localhost:3000/schedule"></embed>
    </div>
  )
}