<template>
  <div :class="typeError" v-show="showModal" v-text="msnModal"></div>
</template>
<script>
  export default {
    props: ['typeError','msnModal','showModal'],
    data () {
      return {
        type: null
      }
    },
    computed: {
      typeModal () {
        return this.type
      }
    },
  // Inicio Ciclo de vida
  beforeCreate () {
    console.log('1 - beforeCreate')
  },
  created () {
    console.log('2 - created')
  },
  beforeMount () {
    console.log('3 - beforeMount')
  },
  mounted () {
    console.log('4 - mounted')
  },
  beforeUpdate () {
    console.log('5 - beforeUpdate')
  },
  updated () {
    console.log('6 - updated')
  },
  beforeDestroy () {
    console.log('7 - beforeDestroy')
  },
  destroyed () {
    console.log('8 - destroyed')
  }
  // Fin Ciclo de vida
  }
</script>
<style scoped>
  .error {
    background: #ef8c8c;
    padding: 20px;
    color: #ffffff;
  }
</style>
