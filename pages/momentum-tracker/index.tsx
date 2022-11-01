import React from 'react'
import Image from 'next/image'
import style from './momentum-tracker.module.scss'
import { get } from '../../services/stats'
// import { getCharges } from '../../services/stripe'

// export async function getServerSideProper(context: any) {
//   await get('leagues')
//   return {
//     props: {},
//   }
// }

export default function MomentumTracker(props: any) {
  const currentMomentum = 830
  const goals = [
    {
      requirement: 15000,
      title: 'LAN',
      description: 'When Shift gets to 15,000 Momentum, we lock in a December LAN event.',
    },
    {
      requirement: 25000,
      title: 'Content',
      description:
        "When Shift gets to 25,000 Momentum, we will get a consistent Newsletter, Clips of the Week for EVERY league, a post-LAN montage, and will announce the Summer'23 LAN venue.",
    },
  ]
  return (
    <div className={`${style.container} ${style.backgroundDark} ${style.lightText}`}>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
      <div className={`${style.container} ${style.wrap}`}>
        <h1>MNCS Shift Tracker</h1>
        <p>
          {
            'MNCS Shift tracks the Momentum that we build as a community through MNCS Shift subscriptions. When we have more momentum, we bring new benfits back to the community. Each subscription brings in more momentum.'
          }
        </p>
        <button>Subscribe now to add momentum</button>
        {Tracker(currentMomentum, goals)}
        <div className={style.row}>
          <h2>MNCS Momentum</h2>
          <p>We currently have {3000} of the 15,000 momentum needed for LAN.</p>
        </div>
        {goals.map((goal) => {
          return (
            <div className={style.row} key={`${goal.title} ${goal.requirement}`}>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Tracker(currentMomentum: number, goals: any) {
  const maxMomentum = 30000
  const getBarPosition = (momentum: number) => {
    return (momentum / maxMomentum) * 100
  }
  const toPercent = (num: number) => `${num}%`
  const marker1Goal = 15000
  const marker2Goal = 25000
  const progressStatus = {
    width: toPercent(getBarPosition(currentMomentum)),
  }
  const marker1 = {
    left: toPercent(getBarPosition(marker1Goal) - 3.2),
  }
  const marker2 = {
    left: toPercent(getBarPosition(marker2Goal) - 3.2),
  }
  return (
    <div className={style.trackerBody}>
      <h3>MNCS Shift Progress</h3>
      <div className={style.progressWrap}>
        <div className={style.progressBar}>
          <div className={`${style['four-point-star']} ${style.grow}`} style={marker1} title={goals[0].title}></div>
          <div className={`${style['four-point-star']} ${style.grow}`} style={marker2} title={goals[1].title}></div>
        </div>
        <div className={`${style.progressBar} ${style.progressBarProgress}`} style={progressStatus}></div>
        <div className={`${style.progressBar} ${style.progressTicker}`} style={progressStatus}>
          <div className={`${style.progressTickerText}`}>{currentMomentum} Momentum</div>
        </div>
        <div
          className={`${style.progressBar} ${style.progressTicker}`}
          style={{ width: toPercent(getBarPosition(marker1Goal)) }}
        >
          <div className={`${style.progressTickerText}`}>
            {marker1Goal} ({goals[0].title})
          </div>
        </div>
        <div
          className={`${style.progressBar} ${style.progressTicker}`}
          style={{ width: toPercent(getBarPosition(marker2Goal)) }}
        >
          <div className={`${style.progressTickerText}`}>
            {marker2Goal} ({goals[1].title})
          </div>
        </div>
      </div>
    </div>
  )
}
