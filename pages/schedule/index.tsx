import React from 'react'
import Image from 'next/image'
import { findLeague } from '../../services/stats'
import style from './schedule.module.scss'
import day from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
day.extend(utc)
day.extend(timezone)

export async function getServerSideProps(context: any) {
  //const headers = context.req[Object.getOwnPropertySymbols(context.req).find((s) => { return String(s) === "Symbol(kHeaders)"}) ?? ""]
  //const auth = headers["Authorization"] ?? ""

  const league = context.query.league

  return {
    props: {
      league: await findLeague(league, {
        populate: ['current_season.matches', 'current_season.matches.teams', 'current_season.matches.games'],
      }),
      controls: context.query.controls ?? 'false',
    },
  }
}

// [0]: left series
// [1]: right series
export function getSeriesScore(match: any): number[] {
  if (match.games.length === 0) {
    return [0, 0]
  }

  const winner = match.winning_team_id
  const series = [
    match.games.filter((x: any) => x.winning_team_id === winner).length,
    match.games.filter((x: any) => x.winning_team_id !== winner).length,
  ]

  if (match.teams[0]._id !== winner) {
    return series.reverse()
  }
  return series
}

export function Week(props: any) {
  return (
    <div id={`week-${props.week}`} className={style.week}>
      <div className={style.weekHeader}>
        <div></div>
        <div>Week #{props.week}</div>
        <div></div>
      </div>
      <div className={style.weekMatches}>
        {props.league.current_season.matches
          .filter((x: any) => x.week === props.week)
          .map((value: any, index: number) => {
            const series = getSeriesScore(value)
            const leagueTz = props.league.default_timezone || 'America/New_York'
            const datetime = day(value.scheduled_datetime).tz(leagueTz)
            return (
              <div className={style.match} key={`week-${props.week}-match-${value._id}`}>
                <p data-status={series[0] > series[1] ? 'win' : series[0] < series[1] ? 'loss' : 'unplayed'}>
                  {series[0]}
                </p>
                <div>
                  <p>{datetime.format('MMM D')}</p>
                  <Image
                    className={style.logo}
                    src={value.teams[0].avatar}
                    alt=""
                    width={60}
                    height={60}
                    objectFit="cover"
                  />
                  <p
                    style={{ width: '350px', textAlign: 'center' }}
                  >{`${value.teams[0].name} @ ${value.teams[1].name}`}</p>
                  <Image
                    className={style.logo}
                    src={value.teams[1].avatar}
                    alt=""
                    width={60}
                    height={60}
                    objectFit="cover"
                  />
                  <p>{datetime.format('hh:mm A')}</p>
                </div>
                <p data-status={series[1] > series[0] ? 'win' : series[1] < series[0] ? 'loss' : 'unplayed'}>
                  {series[1]}
                </p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default function Schedule(props: any) {
  const tempWeeks = props.league.current_season.matches.map((match: any) => {
    return match.week
  })
  const weeks: any[] = []
  tempWeeks.forEach((val: any) => {
    if (!weeks.includes(val)) weeks.push(val)
  })
  return (
    <div className={style.schedule}>
      {props.controls === 'true' ? (
        <div className={style.allWeeks}>
          {weeks.map((value: any, index: number) => {
            return (
              <p
                onClick={() => document.getElementById(`week-${value}`)?.scrollIntoView({ behavior: 'smooth' })}
                key={`sideweek-${value}`}
              >
                Week #{value}
              </p>
            )
          })}
        </div>
      ) : null}
      <div data-controls={props.controls} className={style.weeks}>
        {weeks.map((value: any, index: number) => {
          return <Week key={`week-${index}`} week={value} league={props.league} />
        })}
      </div>
    </div>
  )
}
