import Stripe from 'stripe'

const API_KEY = process.env.STRIPE_API_KEY || ''
const OLD_API_KEY = process.env.OLD_STRIPE_API_KEY || ''

const oldStripe = new Stripe(OLD_API_KEY, {
  apiVersion: '2022-08-01',
})

const stripe = new Stripe(API_KEY, {
  apiVersion: '2022-08-01',
})

export const getCharges = async () => {
  const charges = await stripe.charges.list()
  return charges
}

const getSuccessfulCharges = async (stripe: Stripe, startingAt: Date) => {
  const startingAtSeconds = Math.round(startingAt.getTime() / 1000)
  const events = []
  let moreEvents = false
  let lastEvent = null
  do {
    const props: any = { type: 'charge.succeeded', created: { gt: startingAtSeconds } }
    if (lastEvent) {
      props.starting_after = lastEvent.id
    }
    const { data, has_more } = await stripe.events.list(props)
    moreEvents = has_more
    lastEvent = data.slice(-1)[0]
    events.push(...data)
  } while (moreEvents)
  return events
}

export const getMomentum = async () => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const events = await getSuccessfulCharges(stripe, new Date(1668272970127))
  const oldEvents = await getSuccessfulCharges(oldStripe, oneMonthAgo)

  const momentum = events.concat(oldEvents).reduce((result, event) => {
    const obj: any = event.data.object
    if (!obj.description.toLowerCase().includes('mncs')) return result
    const amount = obj.amount
    if (amount > 2500) {
      result += amount * 18
    } else if (amount > 1500) {
      result += amount * 16
    } else {
      result += amount * 15
    }
    return result
  }, 1500)
  return Math.round(momentum / 100)
}

export const getProducts = () => {
  return stripe.products.list({ active: true })
}
