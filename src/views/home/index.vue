<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您的到来</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    height: 100%;
  }
  &-text {
    position: absolute;
    font-size: 50px;
    line-height: 46px;
    width: 300px;
    height: 50px;
   margin-top: 100px;
    left: 50%;
    margin-left: -150px;
  }
}
</style>
