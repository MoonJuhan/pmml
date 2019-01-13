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
@media screen and (min-width:960px) {
  .contents {
    padding-top: 2.5rem;
  }
}

@media screen and (max-width:959px) {
  .contents {
    padding-top: 2.5rem;
  }
}

</style>
