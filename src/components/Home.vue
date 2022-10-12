<template>
  <v-container class="d-flex flex-column align-center pt-15">
    <v-row class="text-center" style="background-color: #eee;">
      <v-col cols="12" class="d-flex justify-center">
        <v-img
          src="../assets/thunderBig.png"
          class="shrink my-3"
          contain
          width="200px"
          height="200px"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3 text-uppercase">
          Finger Express
        </h1>

        <h2 class="subheading font-weight-regular">
          원하는 부분만 콕~ 골라서 빨리 완성하는 <br/>
          온라인 속기 서비스 finger.exp
        </h2>
        <p>
          녹취록, 의사록, 인터뷰, 회의록, 녹취공증까지 쉽고 빠르게~
        </p>
        <p>
          4중보안장치에, 국가공인 1급속기사의 정확도로 온라인 최저가격으로 제공합니다.
        </p>
      </v-col>

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
    <v-row>
      <Process />
    </v-row>
    <v-row>
      <Review />
    </v-row>
    <section class="my-5">
      <h1>고객사 배너</h1>
      <v-row>
        <v-col v-for="(firm, i) in firms" :key="i">
          <v-card
            class="mx-auto"
            max-width="150"
          >
            <v-img
              contain
              :src=firm.img
              height="100px"
            ></v-img>
            <v-card-title>
              {{firm.title}}
            </v-card-title>
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
        title: "대한태건도협회",
      },
      {
        img: require("../assets/logos/korail.jpg"),
        title: "코레일",
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
        title: "lg",
      },
      {
        img: require("../assets/logos/samsung.jpg"),
        title: "삼성",
      },
      {
        img: require("../assets/logos/KT.jpg"),
        title: "kt",
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
