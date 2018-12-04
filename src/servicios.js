// Promise based HTTP client for the browser and node.js
import Axios from 'axios'

const config = {
  urlData: 'http://www.omdbapi.com/',
  apiKey: 'b0ea0504'
}

const omdbData = Axios.create({
  baseURL: config.urlData
})

const api = {}

api.getFilmData = parameters => omdbData.get('/', {
  params: {
    apikey: config.apiKey,
    s: parameters.title || '',
    type: parameters.type || '',
    y: parameters.year || '',
    r: parameters.dataType || 'json',
    page: parameters.page || 1
  }
}).then(res => res.data).catch(err => console.log(`Error getFilmData() in services.js: ${err}`))

api.getDetailFilmData = parameters => omdbData.get('/', {
  params: {
    apikey: config.apiKey,
    i: parameters.id || '',
    t: parameters.title || '',
    type: parameters.type || '',
    y: parameters.year || '',
    plot: parameters.plot || 'full',
    r: parameters.dataType || 'json'
  }
}).then(res => res.data).catch(err => console.log(`Error getFilmData() in services.js: ${err}`))

export default api
