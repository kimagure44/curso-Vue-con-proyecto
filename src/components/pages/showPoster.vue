<template>
  <div v-show="img" class="container-poster">
    <img :src="img" alt="">
  </div>
</template>
<script>
import API from '@/servicios.js'
  export default {
    data() {
      return {
        img: {
          type: String,
          default: null
        }
      }
    },
    created() {
      const params = {
        id: this.$route.params.idPelicula
      }
      API.getDetailFilmData(params).then(data => {
        this.img = data.Poster;
      });
    }
  }
</script>
<style lang="scss" scoped>
  .container-poster {
    box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
    margin: 10px 20px 0 20px;
    padding: 10px;
  }
  img {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
  }
</style>
