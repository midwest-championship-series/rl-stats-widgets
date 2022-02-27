require('dotenv').config()
import request from './request'

const get = (resource: string, query: any = {}) => {
  let url = [process.env.RL_STATS_URL, 'v2', resource].join('/')
  if (typeof query === 'string') {
    url += `?${query}`
  }
  return request({
    method: 'GET',
    url,
    qs: typeof query === 'object' ? query : undefined,
    headers: {
      'x-api-key': process.env.RL_STATS_KEY,
    },
    retries: 3,
  })
}

const put = (resource: string, body: any) => {
  return request({
    method: 'PUT',
    url: [process.env.RL_STATS_URL, 'v2', resource].join('/'),
    body,
    headers: {
      'x-api-key': process.env.RL_STATS_KEY,
    },
  })
}

const post = (resource: string, body: any) => {
  return request({
    method: 'POST',
    url: [process.env.RL_STATS_URL, 'v2', resource].join('/'),
    body,
    headers: {
      'x-api-key': process.env.RL_STATS_KEY,
    },
  })
}

const del = (resource: string) => {
  return request({
    method: 'DELETE',
    url: [process.env.RL_STATS_URL, 'v2', resource].join('/'),
    headers: {
      'x-api-key': process.env.RL_STATS_KEY,
    },
  })
}

export { get, put, post, del }

export const findLeague = async (name: string, query?: any) => {
  const leagues = await get('leagues', query)
  const league = leagues.find((x: any) => x.name === name)
  return league
}

export const getLeague = (league_id: string) => {
  return get(`leagues/${league_id}`, {
    populate: ['current_season.matches', 'current_season.matches.teams', 'current_season.matches.games'],
  })
}
