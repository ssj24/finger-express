<template>
  <v-card class="d-flex flex-column align-center">
    <v-row class="mb-4 main-row white--text">
      <v-col cols="12" class="text-center">
        <h2 class="subheading font-weight-regular mb-5 px-5">
          <div class="mr-2"  @click="tempLogin">
            원하는 구간만 무료로
          </div>
          <br class="d-none">
          <div>
            손쉽게 선택해
          </div>
          <br>
          <div class="titleAccent mr-2">
            합리적인 가격으로
          </div>
          <br class="d-none">
          <div class="titleAccent">
            승소를 위한 녹취록
          </div>
        </h2>
      <h1 class="display-2 font-weight-bold mb-7 py-5 d-inline-block title-banner">
        finger.exp
      </h1>
      <v-row>
        <v-col
          class="mb-5 d-flex justify-center"
          cols="12"
        >
          <span v-if="!this.$store.state.isLogin">
            <button class="toApplicationBtn" @click="signIn">로그인</button>
            <!-- <v-btn class="white--text font-weight mr-2" outlined @click="signUp">회원가입</v-btn> -->
          </span>
          <span v-else>
            <button class="toApplicationBtn" @click="clicked">
              신청하기
            </button>
          </span>
        </v-col>
      </v-row>
      </v-col>
    </v-row>

    <!-- components -->
    <Process data-aos="fade-up" data-aos-anchor-placement="top-bottom" />
    <Price data-aos="fade-up" data-aos-anchor-placement="center-bottom" />
    <Review data-aos="fade-up" data-aos-anchor-placement="top-bottom" />

    <!-- banners -->
    <section class="my-5" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
      <v-row class="mx-auto mt-10">
        <v-col cols="12" class="mb-5 text-lg-center subtitle-col">
          <h2>고객사</h2>
        </v-col>
        <v-col cols="12" md="6" lg="3" v-for="(firm, i) in firms" :key="i">
          <v-card
            class="mx-auto pt-3"
            max-width="334"
            data-aos="zoom-out"
            data-aos-anchor-placement="center-bottom"
          >
            <v-img
              class="mx-auto"
              contain
              :src=firm.img
              height="100px"
              max-width="200px"
            ></v-img>
            <v-card-subtitle class="text-center">
              {{firm.title}}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-card>
</template>

<script>
import Process from './Process';
import Review from './Review';
import Price from './Price';

export default {
  name: 'LandingHome',
  props: {
    mode: Number,
  },
  components: {
    Process,
    Review,
    Price,
  },
  data: () => ({
    firms: [
      {
        img: require("../assets/logos/saemaeul.png"),
        title: "새마을금고",
      },
      {
        img: require("../assets/logos/tae.png"),
        title: "대한태권도협회",
      },
      {
        img: require("../assets/logos/korail.jpg"),
        title: "한국철도공사",
      },
      {
        img: require("../assets/logos/gas-gonsa.png"),
        title: "한국가스공사",
      },
      {
        img: require("../assets/logos/sinhyup.jpg"),
        title: "신협",
      },
      {
        img: require("../assets/logos/lg.jpg"),
        title: "LG",
      },
      {
        img: require("../assets/logos/samsung.jpg"),
        title: "삼성",
      },
      {
        img: require("../assets/logos/KT.jpg"),
        title: "KT",
      },
      {
        img: require("../assets/logos/hanbat.jpg"),
        title: "한밭대학교",
      },
      {
        img: require("../assets/logos/safety.png"),
        title: "원자력안전위원회",
      },
      {
        img: require("../assets/logos/kaist.jpg"),
        title: "한국과학기술원",
      },
      {
        img: require("../assets/logos/bogun.png"),
        title: "한국보건사회연구원",
      },
      {
        img: require("../assets/logos/jeongbo.png"),
        title: "정보통신산업진흥원",
      },
      {
        img: require("../assets/logos/gas-safety.png"),
        title: "가스안전공사",
      },
      {
        img: require("../assets/logos/jungbu.jpg"),
        title: "한국중부발전",
      },
      {
        img: require("../assets/logos/edu.png"),
        title: "한국교육개발원",
      },
      {
        img: require("../assets/logos/daejeon.jpg"),
        title: "대전시청",
      },
      {
        img: require("../assets/logos/bando.png"),
        title: "반도건설",
      },
      {
        img: require("../assets/logos/enterprise.png"),
        title: "그 외 다수",
      },
    ]
  }),
  methods: {
    clicked() {
      this.$emit('clicked', 2);
    },
    signIn() {
      this.$emit('signIn');
    },
    signUp() {
      this.$emit('signUp');
    },
    tempLogin() {
      if (this.$store.state.isLogin) {
        this.$store.commit('LOGGED_OUT');
      } else {
        this.$store.commit('LOGGED_IN');
      }
    }
  }
}
</script>
<style lang="scss">
.main-row {
  padding: 80px 0;
  width: 100%;
  background-size: contain;
  background: #152035 url('/src/assets/home_back.svg') no-repeat center center;
}
@media only screen and (max-aspect-ratio: 1/1) {
  .main-row {
    background-size: cover;
    background-image: url('/src/assets/home_back_mobile.svg');
  }
}
.subheading {
  div {
    width: auto;
  }
  div:nth-child(1) {
    display: inline-block;
  }
  div:nth-child(3) {
    display: inline-block;
  }
  div:nth-child(5) {
    display: inline-block;
    font-weight: 900;
  }
  div:nth-child(7) {
    display: inline-block;
    font-weight: 900;
  }
}
.title-banner {
  // background-color: bisque;
  font-size:6rem !important;
  line-height: 5.125rem;
  background: -webkit-linear-gradient(135deg, #0065F7 0%, #00A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle-col {
	border-top: 3px double #ff6f00;
	border-bottom: 3px double #ff6f00;
}
@media only screen and (max-width: 767px) {
  .title-banner {
    font-size: 3rem !important;
    line-height: 3.125rem;
  }
}
.toApplicationBtn {
  font-weight: 900;
  text-shadow: 0 0 1px white;
  width: 184px;
  height: 60px;

  background: linear-gradient(135deg, #00A5FF 0%, #0065F7 100%);
  border-radius: 28px;
}
</style>
