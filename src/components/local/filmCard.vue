<template>
  <div>
    <h1 class="busqueda">
      <slot name="busqueda">
        No se ha realizado ninguna búsqueda
      </slot>
    </h1>
    <ul>
      <li v-for="(film, index) in dataFilm" :key="index">
        <div :class="coverBorders(film.Poster)">
          <img v-without-image="film.Poster" alt="">
        </div>
        <div class="image-data">
          <table>
            <tr>
              <th>ID<font-awesome-icon icon="info-circle" @click="searchDetailFilm(film.imdbID, 'id')" class="icon-right"/></th>
              <td v-text="film.imdbID"></td>
            </tr>
            <tr><th v-color-text="'red'">Title</th><td v-text="film.Title"></td></tr>
            <tr><th v-color-text="'green'">Year</th><td v-text="film.Year"></td></tr>
            <tr><th v-color-text="'blue'">Type</th><td v-text="film.Type"></td></tr>
            <tr>
              <th>Poster</th>
              <td>
                <div class="container-btn">
                  <a class="btn-download" :href="film.Poster" target="_blank">
                    <font-awesome-icon icon="download" /> Poster
                  </a>
                </div>
                <div class="container-btn">
                  <a class="btn-download" @click="searchInfoWikipedia(film.Title)">
                    <font-awesome-icon icon="wifi" /> Wikipedia
                  </a>
                </div>
                <div class="container-btn">
                  <a class="btn-download" @click="seePoster(film.imdbID)">
                    <font-awesome-icon icon="eye"/> Poster
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </li>
    </ul>
  </div>
</template>
<!-- -->
<script>
  import API from '@/servicios.js'
  import mixinBorde from '@/mixins/title'

  export default {
    props: ['dataFilm','noImage'],
    mixins: [mixinBorde],
    data () {
      return {

      }
    },
    directives: {
      colorText: {
        bind (el, binding) {
          el.style.color = binding.value
        }
      }
    },
    methods: {
      searchInfoWikipedia(title) {
        this.$emit('search-in-wikipedia', title);
      },
      seePoster(id) {
        this.$router.push({
          name: 'poster', params: { idPelicula: id }
        })
      },
      imagePreview() {
        /*
         * this = instancia de Vue, y en nuestro plugin en el prototype definimos $bus
         * $bus = tenemos una instancia de Vue diferente y la aprovechamos para los eventos
         */
        this.$bus.$emit('image-preview')
      },
      searchDetailFilm (value, type) {
        this.$bus.$emit('show-loading', true)
        const params = {
          [type]: value
        }
        API.getDetailFilmData(params)
          .then(data => {
            this.$bus.$emit('show-loading', false)
            this.$bus.$emit('set-data-film', '')
            this.$bus.$emit('show-pagination', false)
            if (data.Response === 'True') {
              this.$bus.$emit('show-error', false)
              this.$bus.$emit('msn-error', '')
              this.$bus.$emit('data-detail-film', data)
            } else {
              this.$bus.$emit('data-detail-film', '')
              this.$bus.$emit('show-error', true)
              this.$bus.$emit('msn-error', data.Error)
            }
          })
          .catch(err => {
            this.$bus.$emit('show-loading', false)
            console.log(`Error App.vue ${err}`)
          })
      }
    }
  }
</script>
<!-- -->
<style scoped lang="scss">
  h1.busqueda {
  text-align: left;
}
ul {
  li {
    text-align: left;
    img {
      box-shadow: 0px 0px 30px rgba(0,0,0,1);
      height: 450px;
      width: 300px;
    }
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.image-data {
  border: 1px solid #cccccc;
  float: left;
  width: calc(100% - 332px);
  height: 448px;
  overflow-y: scroll;
}
table {
  width: 100%;
  tr {
    td, th {
      border: 1px solid #cccccc;
      padding: 5px;
      margin: 0;
      text-align: left;
    }
  }
}
.border {
  border: 1px solid #cccccc;
  background-image: url('../../assets/no-image.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 298px !important;
}
.image-film {
  width: 300px;
  float: left;
  margin: 0 20px 20px 0;
  height: 450px;

}
a {
  cursor: pointer;
  text-decoration: none;
}
.icon-right {
  float: right;
  cursor: pointer;
}
.btn-download {
  background: #0095ff;
  padding: 5px 20px 4px 20px;
  font-size: 11px;
  text-align: center;
  color: #ffffff;
  border-radius: 3px;
}
.container-btn {
    margin: 5px 0;
}
</style>
