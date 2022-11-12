import React from 'react'
import Image from 'next/image'
import style from './momentum-tracker-graphic.module.scss'
import { getMomentum } from '../../services/stripe'

export async function getServerSideProps(context: any) {
  const momentum = await getMomentum()
  return {
    props: {
      momentum,
    },
  }
}

function navigateToPayment() {
  window.location.href = 'https://imphasis.thrivecart.com/mncs/'
}

type Goal = {
  requirement: number
  title: string
  description: string
}

export default function Tracker(props: any) {
  const currentMomentum = props.momentum + 830
  const goals: Goal[] = [
    {
      requirement: 8000,
      title: 'Sub Roles',
      description: 'When Shift gets to 8,000 Momentum, we will make special roles for Shift subs',
    },
    {
      requirement: 4500,
      title: 'LAN',
      description: 'When Shift gets to 15,000 Momentum, we lock in a December LAN event.',
    },
    {
      requirement: 25000,
      title: 'Content',
      description:
        "When Shift gets to 25,000 Momentum, we will get a consistent Newsletter, Clips of the Week for EVERY league, a post-LAN montage, and will lock in the Summer '23 LAN venue.",
    },
  ]
  const maxMomentum = 30000
  const getBarPosition = (momentum: number) => {
    return (momentum / maxMomentum) * 100
  }
  const toPercent = (num: number) => `${num}%`
  const progressStatus = {
    width: toPercent(getBarPosition(currentMomentum)),
  }
  return (
    <div className={style.trackerBody}>
      <h3>MNCS Shift Progress</h3>
      <div className={style.progressWrap}>
        <div className={style.progressBar}>
          {/* <div className={`${style['four-point-star']} ${style.grow}`} style={marker1} title={goals[0].title}></div>
          <div className={`${style['four-point-star']} ${style.grow}`} style={marker2} title={goals[1].title}></div> */}
          {/* {goals.map((goal) => {
            return (
              <div
                key={`${goal.title}`}
                className={`${style['four-point-star']} ${style.grow}`}
                style={{
                  left: toPercent(getBarPosition(goal.requirement) - 3.2),
                }}
                title={goal.title}
              ></div>
            )
          })} */}
        </div>
        <div
          className={`${style.progressBar} ${style.progressBarProgress}`}
          style={{ width: toPercent(getBarPosition(currentMomentum)) }}
        ></div>
        <div
          className={`${style.progressBar} ${style.progressTicker} ${style.liveProgressTicker}`}
          style={{ width: toPercent(getBarPosition(currentMomentum)) }}
        >
          <div className={`${style.progressTickerText} ${style.liveProgressTickerText}`}>
            {currentMomentum} Momentum
          </div>
        </div>
        {goals.map((goal) => {
          return (
            <div
              key={goal.title}
              className={`${style.progressBar} ${style.progressTicker}`}
              style={{ width: toPercent(getBarPosition(goal.requirement)) }}
            >
              <div className={`${style.progressTickerText}`}>
                {goal.requirement} {goal.title}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
