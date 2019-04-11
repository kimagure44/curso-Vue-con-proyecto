const filters = {}

filters.install = Vue => {
  Vue.filter('capitals-decorate-all-words', value => {
    let result = ''
    if (value && value.length > 0) {
      const sp = value.split(' ')
      result = `...:: ${sp.map(data => `${data[0].toUpperCase()}${data.slice(1)}`).join(' ')} ::...`
    }
    return result
  })
}

export default filters
