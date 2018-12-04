<template>
  <div id="app" v-cloak>
    <header>
      <div v-text="header.title" class="title"></div>
      <div v-text="header.subtitle" class="subtitle"></div>
    </header>
    <section class="container">
      <div class="box-search">
        <input type="search" v-model="search">
        <a v-show="checkSearch" @click="searchFilm()"><font-awesome-icon icon="search" /></a>
        <div class="pagination" v-show="showPagination">
          <span class="reg-prev" @click="previous()">
            <font-awesome-icon icon="angle-left" />
          </span>
          <span class="total-pages" v-text="printPages"></span>
          <span class="reg-next" @click="next()">
            <font-awesome-icon icon="angle-right" />
          </span>
        </div>
      </div>
      <div class="box-result">
        <ul v-show="showFilm">
          <li v-for="(film, index) in dataFilm" :key="index">
            <div :class="film.Poster !== 'N/A' ? 'image-film' : 'image-film border'"><img :src="film.Poster" alt=""></div>
            <div class="image-data">
              <table>
                <tr>
                  <th>ID<font-awesome-icon icon="info-circle" @click="searchDetailFilm(film.imdbID, 'id')" class="icon-right"/></th>
                  <td v-text="film.imdbID"></td>
                </tr>
                <tr><th>Title</th><td v-text="film.Title"></td></tr>
                <tr><th>Year</th><td v-text="film.Year"></td></tr>
                <tr><th>Type</th><td v-text="film.Type"></td></tr>
                <tr><th>Poster</th><td><a :href="film.Poster" target="_blank" class="btn-download"><font-awesome-icon icon="download" /> Poster</a></td></tr>
              </table>
            </div>
          </li>
        </ul>
        <ul v-show="showDetailFilm">
          <div :class="dataDetailFilm.Poster !== 'N/A' ? 'image-film' : 'image-film border'">
            <img :src="dataDetailFilm.Poster" alt="">
          </div>
          <div class="image-data">
            <table>
              <tr><th>Title</th><td v-text="dataDetailFilm.Title"></td></tr>
              <tr><th>Year</th><td v-text="dataDetailFilm.Year"></td></tr>
              <tr><th>Rated</th><td v-text="dataDetailFilm.Rated"></td></tr>
              <tr><th>Released</th><td v-text="dataDetailFilm.Released"></td></tr>
              <tr><th>Runtime</th><td v-text="dataDetailFilm.Runtime"></td></tr>
              <tr><th>Genre</th><td v-text="dataDetailFilm.Genre"></td></tr>
              <tr><th>Director</th><td v-text="dataDetailFilm.Director"></td></tr>
              <tr><th>Writer</th><td v-text="dataDetailFilm.Writer"></td></tr>
              <tr><th>Actors</th><td v-text="dataDetailFilm.Actors"></td></tr>
              <tr><th>Plot</th><td v-text="dataDetailFilm.Plot"></td></tr>
              <tr><th>Language</th><td v-text="dataDetailFilm.Language"></td></tr>
              <tr><th>Country</th><td v-text="dataDetailFilm.Country"></td></tr>
              <tr><th>Awards</th><td v-text="dataDetailFilm.Awards"></td></tr>
              <tr>
                <th>Ratings</th>
                <td>
                  <tr>
                    <td v-for="(rating, index) in dataDetailFilm.Ratings" :key="index">
                      <b>Source:</b>&nbsp;{{rating.Source}}<br>
                      <b>Value:</b>&nbsp;{{rating.Value}}<br>
                    </td>
                  </tr>
                </td>
              </tr>
              <tr><th>Metascore</th><td v-text="dataDetailFilm.Metascore"></td></tr>
              <tr><th>imdbRating</th><td v-text="dataDetailFilm.imdbRating"></td></tr>
              <tr><th>imdbVotes</th><td v-text="dataDetailFilm.imdbVotes"></td></tr>
              <tr><th>imdbID</th><td v-text="dataDetailFilm.imdbID"></td></tr>
              <tr><th>Type</th><td v-text="dataDetailFilm.Type"></td></tr>
              <tr><th>DVD</th><td v-text="dataDetailFilm.DVD"></td></tr>
              <tr><th>BoxOffice</th><td v-text="dataDetailFilm.BoxOffice"></td></tr>
              <tr><th>Production</th><td v-text="dataDetailFilm.Production"></td></tr>
              <tr><th>Website</th><td><a :href="dataDetailFilm.Website" target="_blank">{{dataDetailFilm.Website}}</a></td></tr>
            </table>
          </div>
        </ul>
      </div>
      <div class="error" v-show="showError">
        {{this.msnError}}
      </div>
      <div class="lds-ripple" v-show="showloading">
        <div></div>
        <div></div>
      </div>
    </section>
  </div>
</template>

<script>
import API from './servicios.js'
export default {
  name: 'app',
  data () {
    return {
      header: {
        title: 'OMDb API',
        subtitle: 'The Open Movie & TV Show Database'
      },
      showButton: false,
      search: '',
      dataFilm: '',
      showError: false,
      msnError: '',
      dataDetailFilm: '',
      showPagination: false,
      pagination: {
        pagActual: 1,
        totalRecords: 0,
        totalPages: 0
      },
      showloading: false
    }
  },
  methods: {
    searchFilm () {
      this.showloading = true
      const params = {
        title: this.search,
        page: this.pagination.pagActual
      }
      API.getFilmData(params)
        .then(data => {
          this.showloading = false
          this.dataDetailFilm = ''
          if (data.Response === 'True') {
            this.showError = false
            this.msnError = ''
            this.dataFilm = data.Search
            this.pagination.totalRecords = data.totalResults
            this.pagination.totalPages = (data.totalResults / 10) % 1 === 0 ? parseInt((data.totalResults / 10)) : parseInt((data.totalResults / 10)) + 1
            this.showPagination = true
          } else {
            this.dataFilm = ''
            this.showError = true
            this.msnError = data.Error
            this.showPagination = false
          }
        })
        .catch(err => {
          this.showloading = false
          console.log(`Error App.vue ${err}`)
        })
    },
    searchDetailFilm (value, type) {
      this.showloading = true
      const params = {
        [type]: value
      }
      API.getDetailFilmData(params)
        .then(data => {
          this.showloading = false
          this.dataFilm = ''
          this.showPagination = false
          if (data.Response === 'True') {
            this.showError = false
            this.msnError = ''
            this.dataDetailFilm = data
          } else {
            debugger
            this.dataDetailFilm = ''
            this.showError = true
            this.msnError = data.Error
          }
        })
        .catch(err => {
          this.showloading = false
          console.log(`Error App.vue ${err}`)
        })
    },
    previous () {
      debugger
      this.pagination.pagActual = --this.pagination.pagActual < 1 ? 1 : this.pagination.pagActual--
      this.searchFilm()
    },
    next () {
      debugger
      this.pagination.pagActual = ++this.pagination.pagActual > this.pagination.totalPages ? this.pagination.totalPages : this.pagination.pagActual++
      this.searchFilm()
    }
  },
  computed: {
    checkSearch () {
      return this.search.length === 0 ? false : true
    },
    showFilm () {
      return this.dataFilm === '' ? false : true
    },
    showDetailFilm () {
      return this.dataDetailFilm === '' ? false : true
    },
    printPages () {
      debugger
      return `${this.pagination.pagActual} de ${this.pagination.totalPages}`
    }
  }
}
</script>

<style lang="scss">
@import url('../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css');
@media (min-width: 1200px) {
  ul {
    li {
      width: 48%;
    }
  }
}
@media (max-width: 1199px) {
  ul {
    li {
      width: 100%;
    }
  }
}

.lds-ripple {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: calc(50% - 32px);
}
.lds-ripple div {
  position: absolute;
  border: 4px solid rgb(20, 59, 235);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
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
.pagination {
  float: right;
  width: 100px;
  text-align: center;
  padding: 3px;
  span {
    cursor: pointer;
  }
}
.btn-download {
  background: #0095ff;
  padding: 5px 20px 4px 20px;
  font-size: 11px;
  text-align: center;
  color: #ffffff;
  border-radius: 3px;
}
a {
  cursor: pointer;
  text-decoration: none;
}
.icon-right {
  float: right;
  cursor: pointer;
}
.error {
  background: #ef8c8c;
  padding: 20px;
  color: #ffffff;
}
.border {
  border: 1px solid #cccccc;
  background-image: url('./assets/no-image.png');
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
.image-data {
  border: 1px solid #cccccc;
  float: left;
  width: calc(100% - 332px);
  height: 448px;
  overflow-y: scroll;
}
.box-search {
  border: 1px solid #cccccc;
  padding: 10px;
  text-align: left;
  input[type='search'] {
    width: 60%;
  }
  .box-search button {
    float: right;
  }
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
[v-cloak] {
  display: none;
}
header {
  box-shadow: 0px 0px 30px rgba(0,0,0,0.15);
  padding: 10px;
}
.container {
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  padding: 30px;
  min-height: 500px;
}
.title {
  font-size: 3em;
}
.subtitle {
  font-size: 1em;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 850px;
}

h1, h2 {
  font-weight: normal;
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
</style>
