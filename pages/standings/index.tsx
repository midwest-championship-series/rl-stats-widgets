import React from 'react'
import Image from 'next/image'

import { findLeague, get } from '../../services/stats'
import style from './standings.module.scss'

export async function getServerSideProps(context: any) {
  const headers =
    context.req[
      Object.getOwnPropertySymbols(context.req).find((s) => {
        return String(s) === 'Symbol(kHeaders)'
      }) ?? ''
    ]
  //const auth = headers["Authorization"] ?? ""
  // check auth?

  const league = context.query.league ?? 'mncs'
  const stats =
    context.query.type === 'full'
      ? ['MW', 'ML', 'MP', 'GW', 'GL', 'GP', 'GaD', 'GF', 'GA', 'GoD']
      : ['MW', 'ML', 'GaD', 'GoD']

  try {
    const apiLeague = await findLeague(league)
    if (apiLeague) {
      const seasonId = apiLeague.current_season_id
      const standings = await get('stats/modules/standings', {
        season_id: seasonId,
      })
      return {
        props: {
          standings: standings,
          stats,
        },
      }
    }
  } catch (err) {}

  return {
    props: {
      standings: [],
      stats,
    },
  }
}

// BASIC: Match Wins, Match Losses, Game Differential
// FULL: All stats
export default function Standings(props: any) {
  return (
    <div className={style.standings}>
      <div>
        <div className={style.teamheader}>
          <div className={style.flexCol} style={{ width: '85px' }}>
            <p>RANK</p>
          </div>
          <div className={style.flexCol} style={{ width: '85px' }}></div>
          <div className={style.flexCol} style={{ width: '80px' }}>
            <p>NAME</p>
          </div>
          <div>
            {props.stats.map((val: any) => {
              return <p key={`standingsheader-${val}`}>{val}</p>
            })}
          </div>
        </div>
        {props.standings.map((val: any, index: number) => {
          return (
            <div key={val.team._id} className={style.team}>
              <p>#{index + 1}</p>
              <Image className={style.logo} src={val.team.avatar} alt="" width={90} height={90} objectFit="cover" />
              <div className={style.flexCol} style={{ width: '300px' }}>
                <p className={style.teamName}>
                  {
                    // city
                    val.team.name.replace(val.team.vars.find((x: any) => x.key === 'display_name').value, '')
                  }
                </p>
                <p className={style.teamName}>{val.team.vars.find((x: any) => x.key === 'display_name').value}</p>
              </div>
              <div className={style.stats}>
                {props.stats.map((stat: any) => {
                  return (
                    <p key={`${val.team._id}-${stat}`}>{val.stats.find((x: any) => x.abbreviation === stat).value}</p>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
