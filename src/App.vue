<template>
  <v-app class="appContainer">
    <v-app-bar
      app
      color="accent"
      dark
    >
      <v-btn
        text
        class="d-flex align-center"
        id="no-background-hover"
        @click="reloadPage"
        :ripple="false"
      >
        <v-img
          alt="Finger Express Logo"
          class="shrink mr-2"
          contain
          src="./assets/thunderBig.png"
          transition="scale-transition"
          width="40"
        />

        <v-app-bar-title
          class="shrink mt-1 hidden-sm-and-down font-weight"
          color="primary"
          contain
          min-width="150"
          width="150"
        > Finger Express </v-app-bar-title>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn class="white--text font-weight" plain @click="compChanged(true)">신청하기</v-btn>
      <v-btn class="white--text font-weight" plain @click="viewHistory(true)">마이페이지</v-btn>
    </v-app-bar>

    <v-main class="d-flex justify-center align-center">
      <Home
        v-if="!applicationForm && !checkHistory"
        :application-form="applicationForm"
        @clicked="compChanged"
      />
      <Form v-else-if="applicationForm && !checkHistory" />
      <History v-else-if="checkHistory" />
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Form from './components/Form';
import History from './components/History';

export default {
  name: 'App',

  components: {
    Home,
    Form,
    History,
  },

  data: () => ({
    applicationForm: false,
    checkHistory: false,
  }),
  methods: {
    reloadPage() {
      window.location.reload();
    },
    compChanged(val) {
      this.applicationForm = val;
      if (val) this.checkHistory = false;
    },
    viewHistory(val) {
      this.checkHistory = val;
    }
  }
};
</script>

<style lang="scss">
.appContainer {
  font-family: 'S-CoreDream-3Light',  sans-serif;
}
#no-background-hover::before {
   background-color: transparent !important;
}
.font-weight {
  font-weight: 900;
}
</style>
