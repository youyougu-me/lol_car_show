<template>
  <div style="width: 100%;height:100%;">
    <Car></Car>
    <MyMap></MyMap>
  </div>
</template>

<style>

</style>

<script>

  import MyMap from "@/views/map/MyMap";
  import Car from "@/views/car/Car";


  export default {
    components: {
      MyMap,
      Car

    },
    data() {
      return {}
    },
    mounted() {

    }
  }
</script>