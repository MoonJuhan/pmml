<template>
  <section class="contents">
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
    padding-top: 6rem;
  }
}


.contents {
  min-height: calc(100vh - 54px);
}

</style>
