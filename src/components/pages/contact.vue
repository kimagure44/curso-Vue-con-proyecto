<template>
  <div class="mapouter">
    <h1>Donde estamos</h1>
    <div class="gmap_canvas">
      <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=madrid&t=k&z=19&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no"></iframe>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
  iframe {
    width: 100%;
    height: 500px;
  }
  .mapouter {
    text-align: right;
    height: 500px;
    width: 100%;
  }
  .gmap_canvas {
    overflow: hidden;
    background: none;
    height: 500px;
    width: 100%;
  }
</style>
