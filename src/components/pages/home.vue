<template>
  <main v-cloak>
    <section class="container">
      <div class="box-search">
        <input type="search" v-model="search" @keyup.enter="searchFilm()">
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
        <button @click="showHideExamplesVuex">{{!showGetters ? 'Show' : 'Hide'}} examples Vuex</button>
      </div>
      <div class="search-internet" v-show="showSearchInternet">
        <iframe :src="queryComplete" frameborder="0"></iframe>
      </div>
      <div class="box-result">
        <film-card v-show="showFilm" :data-film="dataFilm" :no-image="noImage" @search-in-wikipedia="searchInfoWikipedia">
          <!-- slot con nombre -->
          <h1 slot="busqueda">
            Buscando.... {{search}}
          </h1>
        </film-card>
        <film-card-detail :data-detail-film="dataDetailFilm" :show-detail-film="showDetailFilm"></film-card-detail>
        <div v-show="showGetters">
          <h1>Getters</h1>
          <h4>Acceso a state sin usar getters</h4>
          <hr>
          <ul>
            <li>totalSearches:{{this.$store.state.totalSearches}}</li>
            <li>exampleProp:{{this.$store.state.exampleProp}}</li>
            <li>filterScore:{{this.$store.state.filterScore}}</li>
          </ul>
          <h4>Acceso a state usando getters</h4>
          <hr>
          <ul>
            <li>totalSearches:{{this.getTotalSearches}}</li>
            <li>exampleProp:{{this.getExampleProp}}</li>
            <li>filterScore:{{this.getFilterScore}}</li>
          </ul>
          <hr>
          <h4>Acceso a state usando getters personalizados</h4>
          <hr>
          <ul>
            <li>Score<input type="range" min="0" max="10" value="0" @change="newFilterScore">{{this.getFilterScore}}</li>
            <li>totalSearches:{{this.getTotalSearches}}</li>
            <li>exampleProp:{{this.getFilterMovies}}</li>
            <li>filterScore:{{this.getFilterScore}}</li>
          </ul>
          <hr>
          <h4>Actions</h4>
          <hr>
          <button @click="actionAsync">Actions (Async) Increase the value of the search variable with a random value</button>
          <hr>
        </div>
      </div>
      <film-modal type-error="error" :msn-modal="msnError" :show-modal="showError"></film-modal>
      <film-loading :show-loading="showloading"></film-loading>
    </section>
  </main>
</template>

<script>
import API from '@/servicios.js'
import { mapMutations, mapGetters, mapActions } from 'vuex'
/*
 * Importando un componente de forma local.
 * Solo lo usamos donde se importa
 */
import FilmCard from '@/components/local/filmCard.vue'
import FilmCardDetail from '@/components/local/filmCardDetail.vue'

export default {
  components: {
    FilmCard,
    FilmCardDetail
  },
  name: 'app',
  data () {
    return {
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
      showloading: false,
      noImage: './dist/no-image.png',
      searchInternet: 'https://es.wikipedia.org/wiki/',
      showSearchInternet: false,
      query: '',
      showGetters: true
    }
  },
  created() {
    this.$bus.$on('show-loading', value => this.showloading = value)
    this.$bus.$on('set-data-film', value => this.dataFilm = value)
    this.$bus.$on('show-error', value => this.showError = value)
    this.$bus.$on('msn-error', value => this.msnError = value)
    this.$bus.$on('data-detail-film', value => this.dataDetailFilm = value)
    this.$bus.$on('show-pagination', value => this.showPagination = value)
  },
  methods: {
    showHideExamplesVuex() {
      this.showGetters = !this.showGetters
    },
    ...mapMutations(['addSearch','changeFilterScore']),
    ...mapActions(['addSearchAsync']),
    actionAsync() {
      this.addSearchAsync({
        value: 30
      }).then(res => {
        this.addSearch({value: res.value});
      }).catch(err => {
        console.log(err)
      })
    },
    newFilterScore (e) {
      const value = parseInt(e.currentTarget.value)
      this.changeFilterScore({ value })
    },
    searchInfoWikipedia (title) {
      this.query = `${this.searchInternet}${title}`
      this.showSearchInternet = true
    },
    searchFilm () {
      if (this.search.length > 0) {
        // Mutations
        this.addSearch({value: 5});
        this.showSearchInternet = false
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
      } else {
        this.dataFilm = ''
        this.showError = true
        this.msnError = 'It is necessary to indicate a title'
        this.showPagination = false
      }
    },
    previous () {
      this.pagination.pagActual = --this.pagination.pagActual < 1 ? 1 : this.pagination.pagActual--
      this.searchFilm()
    },
    next () {
      this.pagination.pagActual = ++this.pagination.pagActual > this.pagination.totalPages ? this.pagination.totalPages : this.pagination.pagActual++
      this.searchFilm()
    }
  },
  computed: {
    ...mapGetters(['getTotalSearches', 'getExampleProp', 'getFilterScore', 'getFilterMovies']),
    queryComplete () {
      return this.query
    },
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
      return `${this.pagination.pagActual} de ${this.pagination.totalPages}`
    }
  }
}
</script>

<style scoped>
  ul {
      margin: 0;
      padding: 0;
      text-align: left;
  }
  ul li {
    padding: 5px 0;
  }
</style>
