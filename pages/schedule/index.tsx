import React, { useState } from 'react'
import { getLeague } from '../../services/stats'
import style from './schedule.module.scss'

export async function getServerSideProps(context: any) {
  const headers = context.req[Object.getOwnPropertySymbols(context.req).find((s) => { return String(s) === "Symbol(kHeaders)"}) ?? ""]
  const auth = headers["Authorization"] ?? ""

  const league = context.query.league ?? "5ec9359b8c0dd900074686d3"

  return {
    props: {
      league: await getLeague(league)
    }
  }
}

export function Week(props: any) {
  return (
    <div className={style.week}>
      <div className={style.weekHeader}>
        <div>8/14</div>
        <div>Week #{props.week}</div>
        <div></div>
      </div>
      <div className={style.weekMatches}>
        {props.league.current_season.matches.filter((x: any) => x.week === props.week)
          .map((value: any, index: number) => {
            return (
              <p key={`week-${props.week}-match-${value._id}`}>Match Date: {value.scheduled_datetime}</p>
            )
          })}
      </div>
    </div>
  )
}

export default function Schedule(props: any) {
  console.log(props.league)
  const tempWeeks = props.league.current_season.matches.map((match: any) => {
    return match.week
  })
  const weeks: any[] = []
  tempWeeks.forEach((val: any) => {
    if(!weeks.includes(val))
      weeks.push(val)
  })
  return (
    <div className={style.schedule}>
      <div className={style.allWeeks}>
        {
          weeks.map((value: any, index: number) => {
            return (
              <p key={`sideweek-${value}`}>Week #{value}</p>
            )
          })
        }
      </div>
      <div className={style.weeks}>
        {weeks.map((value: any, index: number) => {
          return (
            <Week key={`week-${index}`} week={value} league={props.league} />
          );
        })}
      </div>
    </div>
  )
}