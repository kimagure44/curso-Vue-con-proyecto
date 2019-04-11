const withoutImage = {}

const image = (el, binding, newNode, oldNode) => {
  el.src = binding.value === 'N/A' ? 'noImage' : binding.value
}

withoutImage.install = Vue => {
  Vue.directive('without-image', {
    bind (el, binding) {
      image(el, binding)
    }
  })
}

export default withoutImage
