<template>
  <v-footer
  padless
  >
  <v-row class="d-flex justify-center inner-row">
    <v-col cols="11" md="8" class="pa-0">
      <v-card
        flat
        tile
        style="width: 100%; "
      >
        <v-card-text class="grey--text text-caption card-row">
          <v-row class="d-flex justify-space-between align-center">
            <v-col>
              logo
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn @click="readFile('open')" text color="white" class="py-0 px-2">
                오픈소스
              </v-btn>
              <v-btn @click="readFile('personal')" text color="white" class="py-0 px-2">
                개인정보보호규정
              </v-btn>
              <v-btn @click="readFile(false)" text color="white" class="py-0 px-2">
                이용약관
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="ma-0 footer-row">
            <p>상호명: 테바소프트(주)</p>
            <p>대표자명: 오정섭</p>
            <p>주소: 대전 유성구 대덕대로512번길 20</p>
            <p>통신판매신고: 제2022-대전유성-0475호</p>
            <p>이메일: tebahsoft@gmail.com</p>
            <p>고객센터: 042-864-5566</p>
            <p>사업자등록번호: 440-87-02207</p>
            <p>개인정보책임: 오정섭(070-4456-7100)</p>
          </v-row>
          <v-row class="ma-0 pa-0 footer-row align-center" style="font-size: 10px;">
            <p>COPYRIGHT © TEBAH SOFT. 2021. ALL RIGHTS RESERVED.</p>
          </v-row>
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  methods: {
    readFile(val) {
      if (val === 'open'){
        window.open('/finger-express/Attribution.pdf', '_blank')
      } else if (val === 'personal') {
        window.open('/finger-express/private_guard.pdf', '_blank')
      } else {
        window.open('/finger-express/usage_rule.pdf', '_blank')
      }
    },
  }
}
</script>

<style>
.inner-row {
  background-color: #000033;
  color: white;
}
button {
  color: white;
}
.card-row {
  background-color: #000033;
}
.font-weight {
  font-weight: 900;
}
.footer-row {
  width: 55%;
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
  .footer-row {
    width: 100%;
  }
  .footer-row > p {
    width: 90%;
    display: block;
  }
}
</style>