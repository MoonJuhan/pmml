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

.v-autocomplete__content {
  top: 33px!important;
  left: 0px!important;
}
</style>
