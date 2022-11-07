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
      <v-btn class="white--text font-weight" plain @click="viewHistory(true)">{{ this.$store.state.isLogin ? '주문 내역' : '로그인' }}</v-btn>
      <v-btn class="white--text font-weight" plain @click="logout" v-if="this.$store.state.isLogin">로그아웃</v-btn>
    </v-app-bar>

    <v-main class="d-flex justify-center align-center">
      <Home
        v-if="!applicationForm && !checkHistory"
        :application-form="applicationForm"
        @clicked="compChanged"
      />
      <Form
        v-else-if="applicationForm && !checkHistory"
        :mode="mode"
        @changeMode="modeChanged"
        />
      <History v-else-if="checkHistory"/>
    </v-main>
    <v-footer
      padless
      color="white"
    >
      <v-row class="d-flex justify-center" style="border-top: 1px solid #E5E5E5;">
        <v-col cols="11" md="8" class="pa-0">
          <v-card
            flat
            tile
            style="width: 100%; "
          >
            <v-card-text class="grey--text text-caption">
              <v-row class="ma-0 footer-row">
                <p>사업자등록번호: 440-87-02207</p>
                <p>상호명: 테바소프트(주)</p>
                <p>대표자명: 오정섭</p>
                <p>사업장주소: 대전 유성구 대덕대로512번길 20</p>
                <p>통신판매신고: 제2022-대전유성-0475호</p>
                <p>이메일: tebahsoft@gmail.com</p>
                <p>고객센터: 042-864-5566</p>
                <p>개인정보책임: 오정섭(070-4456-7100)</p>
              </v-row>
              <v-row class="ma-0 pa-0 footer-row align-center" style="font-size: 10px;">
                <p>COPYRIGHT © TEBAH SOFT. 2021. ALL RIGHTS RESERVED.</p>
                <v-col class="d-flex justify-end">
                  <v-btn @click="readFile('open')" plain class="pa-0">
                    오픈소스
                  </v-btn>
                  <v-btn @click="readFile('personal')" plain class="pa-0">
                    개인정보보호규정
                  </v-btn>
                  <v-btn @click="readFile(false)" plain class="pa-0">
                    이용약관
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Form from './components/Form';
import History from './components/History';
// import axios from 'axios';

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
    viewHistory(val) {
      this.checkHistory = val;
    },
    readFile(val) {
      if (val === 'open'){
        window.open('/finger-express/Attribution.pdf', '_blank')
      } else if (val === 'personal') {
        window.open('/finger-express/private_guard.pdf', '_blank')
      } else {
        window.open('/finger-express/usage_rule.pdf', '_blank')
      }
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
.font-weight {
  font-weight: 900;
}
.footer-row > div {
  padding: 0;
}
.footer-row > p {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 0;
}
@media only screen and (max-width: 767px) {
  .footer-row > p {
    width: 90%;
    display: block;
  }
}
</style>
