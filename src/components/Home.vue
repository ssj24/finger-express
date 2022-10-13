<template>
  <v-container class="d-flex flex-column align-center pt-15">
    <v-row class="mb-4 main-row">
      <v-col cols="12" md="7" class="text-center text-md-start">
        <h2 class="subheading font-weight-regular mb-5">
          원하는 부분만 콕~ 골라서 <br/>
          빨리 완성하는 <br/>
          온라인 속기 서비스 <br/>
          finger.exp
        </h2>
        <p>
          <span class="text-dot">녹취록 의사록 인터뷰 회의록 녹취 공증</span>까지
          <br />
          쉽고 빠르게~
          <br />
          4중 보안장치에
          <br />국가공인 1급 속기사의 정확도를
          <br />
          온라인 최저가격으로 제공합니다.
        </p>
        
      </v-col>
      <v-col cols="12" md="5" class="d-flex flex-column justify-center align-center">
        <v-img
          src="../assets/thunderBig.png"
          class="shrink"
          contain
          width="200px"
          height="200px"
        />
      </v-col>
    </v-row>
    <h1 class="display-2 font-weight-bold mb-7 py-5 text-center text-uppercase title-banner">
      Finger Express
    </h1>
    <v-row>
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-btn
          x-large
          width="200px"
          color="accent"
          @click="clicked"
        >신청하기</v-btn>
      </v-col>
    </v-row>
    <!-- components -->
    <Process />
    <Review />

    <!-- banners -->
    <section class="my-5">
      <v-row class="mx-auto mt-10">
        <v-col cols="12" class="mb-5 text-lg-center subtitle-col">
          <h1>고객사</h1>
        </v-col>
        <v-col cols="12" md="6" lg="3" v-for="(firm, i) in firms" :key="i">
          <v-card
            class="mx-auto pt-3"
            max-width="334"
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
  </v-container>
</template>

<script>
import Process from './Process.vue';
import Review from './Review.vue';

export default {
  name: 'LandingHome',
  props: {
    applicationForm: Boolean,
  },
  components: {
    Process,
    Review
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
    ]
  }),
  methods: {
    clicked() {
      this.$emit('clicked', true);
    }
  }
}
</script>
<style lang="scss">
.main-row {
  min-width: 60%;
}
.text-dot {
  text-emphasis: dot;
  text-emphasis-position: over;
}
.title-banner {
  // background-color: bisque;
  width: 100%;
  font-size:6rem !important;
  line-height: 5.125rem;
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
</style>
