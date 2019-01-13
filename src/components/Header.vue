<template >
  <v-toolbar class="headNav">
    <v-layout row wrap class="layout">
      <v-flex xs1 lg1 xl2></v-flex>



      <div class="logoDiv">
        <v-btn class="logoBtn" href="/" flat>
          <img src="../assets/logo_pmml.png">
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <!--xs phone, sm pad, md pad & low pc, lg mid pc, xl high pc-->

      <v-toolbar-items class="hidden-xs-and-down navMenuVar">
        <v-btn class="navMenu" @click="go1();" flat>Finder</v-btn>
        <v-btn class="navMenu" @click="go2();" flat>About</v-btn>
        <v-btn class="navMenu" @click="go3();" flat>Edit</v-btn>
      </v-toolbar-items>

      <v-flex xs1 lg1 xl2></v-flex>
    </v-layout>
  </v-toolbar>

</template>

<script>
export default {
  methods: {
    go1: function() {
      this.$router.push({path:'/'});
    },
    go2: function() {
      this.$router.push({path:'about'});
    },
    go3: function() {
      this.$router.push({path:'about'});
    }
  }
}
</script>

<style lang="css" scoped>
.headNav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(89, 97, 100, 0.8);
}

.container {
  padding-top: 0;
  height: inherit;
}

.layout {
  height: inherit;
}

.logoDiv {
  height: 100%;
}

.logoBtn {
  padding: 0;
  margin: 0px;
  height: 100%;
}

.navMenuVar {
  height: 100%;
}

.navMenu {
  border-style: none;
  margin: 1rem 8px;
  color: white;
  font-size: 1.5rem;
}

</style>
