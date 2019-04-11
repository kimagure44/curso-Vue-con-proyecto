const mixin = {
  methods: {
    coverBorders (value) {
      return value !== 'N/A' ? 'image-film' : 'image-film border'
    }
  }
}

export default mixin
