const EB = {}

EB.install = Vue => {
  Vue.prototype.$bus = new Vue()
}

export default EB
