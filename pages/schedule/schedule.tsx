import style from "./schedule.module.scss"
import ScheduleClass from './index'
import React from "react"
import Link from "next/link"

export interface ScheduleProps {
  
}

export interface ScheduleState {

}

export default function Schedule(this: ScheduleClass) {
  return (
    <div className={style.schedule}>
      <Link href="/standings">Standings</Link>
    </div>
  )
}