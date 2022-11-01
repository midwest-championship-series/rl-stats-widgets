import Stripe from 'stripe'

const API_KEY = process.env.STRIPE_API_KEY || ''

const stripe = new Stripe(API_KEY, {
  apiVersion: '2022-08-01',
})

export const getCharges = async () => {
  const charges = await stripe.charges.list()
  console.log(charges)
  return charges
}

const getLastMonthSuccessfulCharges = async () => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const createdOneMonthAgo = Math.round(oneMonthAgo.getTime() / 1000)
  const events = []
  let moreEvents = false
  let lastEvent = null
  do {
    const props: any = { type: 'charge.succeeded', created: { gt: createdOneMonthAgo } }
    const { data, has_more } = await stripe.events.list(props)
    moreEvents = has_more
    lastEvent = data.slice(-1)[0]
    events.push(...data)
  } while (moreEvents)
  return events
}

export const getMomentum = async () => {
  const events = await getLastMonthSuccessfulCharges()

  const momentum = events.reduce((result, event) => {
    const obj: any = event.data.object
    const amount = obj.amount
    if (amount > 2500) {
      result += amount * 18
    } else if (amount > 1500) {
      result += amount * 16
    } else {
      result += amount * 15
    }
    return result
  }, 0)
  return Math.round(momentum / 100)
}

export const getProducts = () => {
  return stripe.products.list({ active: true })
}
