<template>
  <div class="amap-page-container" style="height:100%;width: 100%;">
    <el-amap
      vid="amapDemo"
    >
    </el-amap>
  </div>
</template>

<style>
  .amap-demo {
  }
</style>

<script>
  import {lazyAMapApiLoaderInstance} from 'vue-amap'


  export default {
    data() {
      return {
        map: ''
      }
    },
    mounted() {
      lazyAMapApiLoaderInstance.load().then(() => {
        this.map = new AMap.Map('amapDemo', {
          center: new AMap.LngLat(106.502565, 29.370022),
          zoom: 18
        });
      });
    }
  }
</script>