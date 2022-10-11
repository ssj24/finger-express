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
    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        color="secondary"
        class="black--text text-center"
        style="width: 100%;"
      >
        <v-card-text class="black--text">
          COPYRIGHT © TEBAH SOFT. 2021. ALL RIGHTS RESERVED. <br />
          사업자등록번호: 440-87-02207, 상호명:테바소프트(주), 대표자명:오정섭, 사업장주소:대전 유성구 대덕대로512번길 20 <br />
          통신판매신고: 제2022-대전유성-0475호 E-mail: tebahsoft@gmail.com 고객센터: 070-7565-8698 개인정보책임: 오정섭(070-7565-8698) <br />
          [개인정보보호규정] [이용약관]
        </v-card-text>
      </v-card>
    </v-footer>
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
