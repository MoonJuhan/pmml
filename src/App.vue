<template>
  <div id="app">
    <Header></Header>
    <Contents></Contents>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header"
import Contents from "./components/Contents"
import Footer from "./components/Footer"

export default {
  name: 'app',
  components: {
    "Header": Header,
    "Contents": Contents,
    "Footer": Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(to right, #868f96 0%, #596164 100%);

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

/* Autocomplete Menu CSS */
.v-autocomplete__content {
  top: 33px!important;
  left: 0px!important;
}

/* Contents Card CSS */
@media screen and (min-width:1904px) {
  .contentsDiv{
    width: 90%;
  }
}

.contentsCard {
  margin-left : 1rem;
  margin-right : 1rem;
  margin-bottom: 1rem;
  height: 9.8rem;
  text-align: left;
  color: white!important;
  background-color: rgba(0, 0, 0, 0.23)!important;
}

.cardTitle {
  padding-top: 10px;
  padding-left: 10px;
  font-size: 1.5em;
  font-weight: bold;
}

.cardContents {
  font-size: 1.25rem;
  padding: 3px 10px;
}

/* Mobile Tab Bar Color */
.theme--light .v-tabs__bar {
  background-color: #ffffff00!important;
}

</style>
