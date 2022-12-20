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
          class="shrink mr-2 py-3"
          contain
          src="./assets/thunderBig.png"
          transition="scale-transition"
          width="40"
        />

        <v-app-bar-title
          class="mt-1 hidden-sm-and-down font-weight"
          color="primary"
          contain
          width="230"
        > Finger Express </v-app-bar-title>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn class="white--text font-weight" plain @click="compChanged(true)">신청하기</v-btn>
      <!-- <v-btn class="white--text font-weight" plain >장바구니</v-btn> -->
      <v-btn class="white--text font-weight" plain v-if="this.$store.state.isLogin">마이페이지</v-btn>
      <v-btn class="white--text font-weight" plain @click="signIn">로그인</v-btn>
      <v-btn class="white--text font-weight" plain @click="logout" v-if="this.$store.state.isLogin">로그아웃</v-btn>
    </v-app-bar>

    <v-main class="d-flex justify-center align-center" v-if="!toSignIn">
      <Home
        v-if="!applicationForm"
        :application-form="applicationForm"
        @clicked="compChanged"
      />
      <Application
        v-else-if="applicationForm"
        :mode="mode"
        @changeMode="modeChanged"
        />
    </v-main>
    <v-main class="d-flex justify-center align-center" v-else>
      <Sign-up />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Home from './components/Home.vue';
import Application from './components/Application.vue';
import SignUp from './components/Signup.vue';
import Footer from './components/Footer.vue';
// import axios from 'axios';

export default {
  name: 'App',

  components: {
    Home,
    Application,
    SignUp,
    Footer,
  },
  data: () => ({
    applicationForm: false,
    toSignIn: false,
    mode: false,
  }),
  methods: {
    // callAxios() {
    //   axios({					// axios 통신 시작
    //       url: "/test/",	// back 서버 주소
    //       method: "GET",			
    //     }).
    //     then(res => {				// back 서버로부터 응답받으면
    //         console.log(res);		// back 서버에서 보낸 message 출력
    //     }).catch(err => console.log(err));
    // },
    reloadPage() {
      window.location.reload();
    },
    compChanged(val) {
      this.mode = false;
      this.applicationForm = val;
      if (val) this.checkHistory = false;
    },
    modeChanged() {
      this.mode = true;
    },
    signIn() {
      this.toSignIn = true;
    },
    
    logout() {
      window.location.reload();
      this.$store.commit('LOGGED_OUT');
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
main {
  width: 100%;
  height: auto;
}

</style>
