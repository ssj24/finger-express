<template>
  <v-app class="appContainer">

    <v-app-bar
      app
      elevation="0"
      color="dark"
      class="backDark"
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
          src="./assets/logo.png"
          transition="scale-transition"
          width="30"
        />
        <v-img
          alt="Finger Express Logo Text"
          id="logoText"
          class="hidden-sm-and-down shrink mr-2 py-3"
          contain
          src="./assets/titleW.svg"
          transition="scale-transition"
          width="100"
        />
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn class="white--text font-weight mr-2" outlined @click="toAdminComponent">관리자</v-btn>
      <v-btn class="white--text font-weight mr-2" outlined @click="modeChanged(2)">신청하기</v-btn>
      <!-- <v-btn class="white--text font-weight mr-2" outlined >장바구니</v-btn> -->
      <v-btn class="white--text font-weight mr-2" outlined v-if="this.$store.state.isLogin">마이페이지</v-btn>
      <v-btn class="white--text font-weight mr-2" outlined @click="modeChanged(3)">장바구니</v-btn>
      <v-btn class="white--text font-weight mr-2" outlined @click="signIn">로그인</v-btn>
      <v-btn class="white--text font-weight mr-2" outlined @click="logout" v-if="this.$store.state.isLogin">로그아웃</v-btn>
    </v-app-bar>

    <v-main class="d-flex justify-center align-center" v-if="toAdmin">
      <Admin :toAdmin="toAdmin" />
    </v-main>
    <v-main class="d-flex justify-center align-center" v-else-if="!toSignIn">
      <Home
        v-if="mode === 1"
        :mode="mode"
        @clicked="modeChanged"
      />
      <Application
        v-if="mode === 2"
        :mode="mode"
        @changeMode="modeChanged"
      />
      <Basket
        v-if="mode === 3"
        :mode="mode"
        @changeMode="modeChanged"
      />
      <order-success
        v-if="mode === 4"
        :mode="mode"
        @changeMode="modeChanged"
      />
    </v-main>
    <v-main class="d-flex justify-center align-center" v-else-if="toSignIn">
      <Sign-up />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Admin from './components/Admin.vue';
import Home from './components/Home.vue';
import Application from './components/Application.vue';
import Basket from './components/Basket.vue';
import OrderSuccess from './components/OrderSuccess.vue';
import SignUp from './components/Signup.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    Admin,
    Home,
    Application,
    Basket,
    OrderSuccess,
    SignUp,
    Footer,
  },
  data: () => ({
    applicationForm: false,
    toAdmin: false,
    toSignIn: false,
    mode: 1,
  }),
  methods: {
    changeAppBarColor(val) {
      const present = val ? 'black' : 'white';
      // const btnColor = val ? 'white' : 'black';
      document.querySelector('header').classList.toggle('backDark');
      document.getElementById('logoText').querySelector('.v-image__image.v-image__image--contain').style.border='red';
      document.querySelector('.v-image__image.v-image__image--contain').style.backgroundImage='/src/assets/titleB.svg';
      const navBtns = document.querySelector('.v-toolbar__content').querySelectorAll('button.white--text');
      navBtns.forEach(btn => {
        btn.classList.remove(`${present}--text`);
        // btn.classList.add(`${btnColor}--text`);
      })

    },
    reloadPage() {
      window.location.reload();
    },
    modeChanged(val) {
      this.mode = val;
      this.toAdmin = false;
      if (val === 2 ) {
        this.toSignIn = false;
        this.applicationForm = false;
        if (val) this.checkHistory = false;
        // this.changeAppBarColor(false);
      }
    },
    toAdminComponent() {
      // this.changeAppBarColor(false);
      this.toAdmin = true;

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
.v-toolbar__content {
  // border-bottom: 1px solid #E7E7E7;
}
.appContainer {
  font-family: 'S-CoreDream-3Light',  sans-serif;
}
#no-background-hover::before {
   background-color: transparent !important;
}
main {
  width: 100%;
  height: auto;
  overflow: hidden;
}
// .theme--light.v-app-bar.v-toolbar.v-sheet.backDark {
//   background-color: #152035;
// }
</style>
