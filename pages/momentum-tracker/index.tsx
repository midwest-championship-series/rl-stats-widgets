import React from 'react'
import Image from 'next/image'
import style from './momentum-tracker.module.scss'

export default function MomentumTracker(props: any) {
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
        <h1>MNCS Momentum Tracker</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard
          dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        {Tracker()}
      </div>
    </div>
  )
}

function Tracker() {
  const currentMomentum = 30000
  const marker1Goal = 15000
  const marker2Goal = 25000
  const maxMomentum = 30000
  const progressStatus = {
    width: `${Math.round((currentMomentum / maxMomentum) * 100)}%`,
  }
  const marker1 = {
    left: `${35}%`,
  }
  const marker2 = {
    left: `${75}%`,
  }
  return (
    <div className={style.trackerBody}>
      <h3>MNCS Shift Progress</h3>
      <div className={style.progressWrap}>
        <div className={style.progressBar}>
          <div className={`${style['four-point-star']} ${style.grow}`} style={marker1} title="Gear 1"></div>
          <div className={`${style['four-point-star']} ${style.grow}`} style={marker2} title="Gear 2"></div>
        </div>
        <div className={`${style.progressBar} ${style.progressBarProgress}`} style={progressStatus}></div>
        <div className={`${style.progressBar} ${style.progressTicker}`} style={progressStatus}>
          <div className={`${style.progressTickerText}`}>{currentMomentum} Momentum</div>
        </div>
        <div className={`${style.progressBar} ${style.progressTicker}`}></div>
      </div>
    </div>
  )
}
