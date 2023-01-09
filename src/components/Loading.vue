<template>
  <div class="loadingWrapper">
    <img src="../assets/pulse.svg" alt="now loading" width="30%">
  </div>
</template>

<script>
export default {
name: 'LoadingComponent',
data: () => ({
}),
methods: {

}
}
</script>

<style>
.loadingWrapper {
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>