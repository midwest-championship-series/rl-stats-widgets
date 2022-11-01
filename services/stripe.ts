import request from './request'

const API_KEY = process.env.STRIPE_API_KEY || ''

// const stripe = new Stripe(API_KEY, {
//   apiVersion: '2022-08-01',
// })

// export const getCharges = async () => {
//   const charges = await stripe.charges.list()
//   console.log(charges)
// }

const BASE_URL = 'https://api.stripe.com/v1'

export const getCharges = async () => {
  return request({
    method: 'GET',
    url: `${BASE_URL}/charges`,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
}
