<template>
  <section class="contents">
    <v-toolbar-items class="hidden-lg-and-up">
      <v-tabs
      class="navTabVar"
      centered
      slider-color="white"
      >
        <v-tab to="/" append ripple class="tabBtn">
          Finder
        </v-tab>

        <v-tab to="/about" append ripple class="tabBtn tabBtnAbout">
          About
        </v-tab>

        <v-tab href="https://docs.google.com/spreadsheets/d/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/edit?usp=sharing" ripple class="tabBtn">
          Edit
        </v-tab>
      </v-tabs>
    </v-toolbar-items>

    <router-view></router-view>
    </section>
</template>

<script>
export default {
}
</script>

<style scoped>
@media screen and (min-width:1263px) {
  .contents {
    padding-top: 2.5rem;
  }
}

@media only screen and (max-width: 1263px){
  .contents {
    padding-top: 4.1rem;
  }
}


.contents {
  min-height: calc(100vh - 46px);
}

/* Tab Bar */

.navTabVar {
  width: 100%;
}

.tabBtn {
  width: 7rem;
}

@media only screen and (max-width: 1263px) and (min-width:601px){
  .tabBtn {
    width: 10rem;
  }
}

.tabBtnAbout {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
