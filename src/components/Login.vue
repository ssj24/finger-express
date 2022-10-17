<template>
  <div>
    Login
    <button @click="loggedIn"> Loggedin</button>
  </div>

</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    isLogin: Boolean,
  },
  methods: {
    loggedIn() {
      console.log(!this.isLogin)
      this.$emit('loggedIn', !this.isLogin);
    }
  }
}
</script>

<style>

</style>