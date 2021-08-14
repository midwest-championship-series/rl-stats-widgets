require('dotenv').config();
import request from './request';

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

export const getLeaderboard = () => {
  return [
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660356130930829/mncs_minneapolismiracles.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660356130930829/mncs_minneapolismiracles.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660356130930829/mncs_minneapolismiracles.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660356130930829/mncs_minneapolismiracles.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660356130930829/mncs_minneapolismiracles.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660360946122802/mncs_minnetonkabarons.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660329195241522/mncs_burnsvilleinferno.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660367682043974/mncs_rochesterrhythm.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660376507121794/mncs_stpaulsenators.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
    { 
      city: "Minneapolis", 
      avatar: "https://cdn.discordapp.com/attachments/692994579305332806/744660336010985492/mncs_duluthsuperiors.png", 
      name: "Miracles" ,
      wins: 3,
      losses: 1,
      color: "#8015E8",
      secondary: "#fff"
    },
  ]
}

export const getLeague = (league_id: string) => {
  return get(`leagues/${league_id}`, {
    populate: [
      "current_season.matches",
      "current_season.matches.teams",
      "current_season.matches.games"  
    ]
  })
}