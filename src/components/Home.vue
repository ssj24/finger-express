<template>
  <v-container class="landing-container d-flex align-center">
    <v-row class="text-center">
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

        <p class="subheading font-weight-regular">
          음성인식 기반 속기사 서비스
          <br>공증까지 완벽하게
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
  </v-container>
</template>

<script>
  export default {
    name: 'LandingHome',
    props: {
      applicationForm: Boolean,
    },
    data: () => ({
      
    }),
    methods: {
      clicked() {
        this.$emit('clicked', true);
      }
    }
  }
</script>
