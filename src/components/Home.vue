<template>
  <v-card class="d-flex flex-column align-center">
    <v-row class="mb-4 main-row white--text">
      <v-col cols="12" class="text-center">
        <h2 class="subheading font-weight-regular mb-5">
          <!-- 온라인 속기 서비스 <br/>
          증거제출 <br/>
          녹취록 작성 <br/> -->
          온라인 속기 서비스 <br />
          증거제출 
          녹취록 작성 <br/>
        </h2>
        <!-- <p>
          <span>녹취록 의사록 인터뷰 회의록 녹취 공증</span>까지
          <br />
          쉽고 빠르게!!!
          <br />
          4중 보안장치에
          <br />다수의 작성 경험과 정확도를 가지고
          <br />
          온라인 최저가격으로 제공합니다.
        </p> -->
      <h1 class="display-2 font-weight-bold mb-7 py-5 text-center text-uppercase title-banner">
        Finger Express
      </h1>
      <v-row>
        <v-col
          class="mb-5 d-flex justify-center"
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
      </v-col>
      <!-- <v-col cols="12" md="5" class="d-flex flex-column justify-center align-center" data-aos="zoom-out" data-aos-duration="3000">
        <v-img
          src="../assets/thunderBig.png"
          class="shrink"
          contain
          width="200px"
          height="200px"
        />
      </v-col> -->

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
  }
}
</script>
<style lang="scss">
.main-row {
  padding: 30px 0;
  width: 100%;
  background-color: navy;
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
