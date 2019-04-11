<template>
  <ul v-show="show">
    <div :class="coverBorders(dataDetailFilm.Poster)">
      <img :src="dataDetailFilm.Poster" alt="">
    </div>
    <div class="image-data">
      <table>
        <tr><th>Title</th><td>{{dataDetailFilm.Title | capitals-decorate-all-words}}</td></tr>
        <tr><th>Year</th><td v-text="dataDetailFilm.Year"></td></tr>
        <tr><th>Rated</th><td v-text="dataDetailFilm.Rated"></td></tr>
        <tr><th>Released</th><td>{{dataDetailFilm.Released | dateFormat}}</td></tr>
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
</template>
<script>
  import mixinBorde from '@/mixins/title'
  export default {
    props: ['dataDetailFilm','showDetailFilm'],
    mixins: [mixinBorde],
    data () {
      return {
        showDetail: false
      }
    },
    computed: {
      show () {
        return this.showDetail ? true : false;
      }
    },
    watch: {
      showDetailFilm(newVal) {
        this.showDetail = newVal
      }
    },
    filters: {
      dateFormat(value) {
        return value && value.length > 0 ? value.split(' ').join('-') : ''
      }
    },
    created() {
      this.$bus.$on('image-preview', () => {
        if (typeof this.showDetail === 'undefined') {
          this.showDetail = false;
        }
         this.showDetail = !this.showDetail;
      })
    }
  }
</script>
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

</style>

