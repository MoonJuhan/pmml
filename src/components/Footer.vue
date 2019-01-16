<template lang="html">
  <v-footer class="pa-3 footer pageFooter">
    <h1 class="hidden-sm-and-down">PMML</h1>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <div class="footerCopyright">Copyright 2019. MoonJuhan. <br class="hidden-sm-and-up">All rights reserved.</div>
  </v-footer>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
/* Footer */
.pageFooter {
  background-color: rgba(90, 98, 101, 0.8) !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  height: auto !important;
  color: white;
}
@media screen and (max-width:960px) {
  .footerCopyright{
    width: 100%;
  }
}

</style>
