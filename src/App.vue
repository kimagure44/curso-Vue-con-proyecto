<template>
  <div id="app" v-cloak>
    <header>
      <div v-text="header.title" class="title"></div>
      <div v-text="header.subtitle" class="subtitle"></div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="contact">Contacto</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      header: {
        title: 'OMDb API',
        subtitle: 'The Open Movie & TV Show Database'
      }
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
  [v-cloak] {
    display: none;
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
  iframe {
    width: 100%;
    height: 500px;
    box-shadow: 0px 0px 3px;
    margin-top: 20px;
  }
  header nav a {
    margin: 10px;
    text-decoration: none;
    color: #000000;
    transition: 300ms;
    padding: 11px;
  }
  header nav {
    margin: 10px;
    padding: 10px;
    box-shadow: 0 0px 10px rgba(0,0,0,0.3);
  }
  header nav a:hover {
    background: #50baec;
    transition: 300ms;
  }
</style>
