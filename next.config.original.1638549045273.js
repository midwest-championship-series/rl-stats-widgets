const path = require('path');
require('dotenv').config();
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['media.discordapp.net', 'cdn.discordapp.com']
  },
  target: 'serverless',
  env: {
    RL_STATS_URL: process.env.RL_STATS_URL,
    RL_STATS_KEY: process.env.RL_STATS_KEY,
  }
}
