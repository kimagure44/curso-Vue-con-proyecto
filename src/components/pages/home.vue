<template>
  <main v-cloak>
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
      </div>
      <film-modal type-error="error" :msn-modal="msnError" :show-modal="showError"></film-modal>
      <film-loading :show-loading="showloading"></film-loading>
    </section>
  </main>
</template>

<script>
import API from '@/servicios.js'
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
      query: ''
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
    searchInfoWikipedia (title) {
      this.query = `${this.searchInternet}${title}`
      this.showSearchInternet = true
    },
    searchFilm () {
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
