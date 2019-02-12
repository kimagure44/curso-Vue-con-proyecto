<template>
  <div class="lds-ripple" v-show="showLoading">
    <div></div>
    <div></div>
  </div>
</template>
<script>
  export default {
    props: ['showLoading']
  }
</script>
<style scoped>
  .lds-ripple {
    display: inline-block;
    position: absolute;
    width: 64px;
    height: 64px;
    top: calc(50% - 32px);
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid rgb(20, 59, 235);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
  }
</style>

