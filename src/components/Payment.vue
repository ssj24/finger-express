<template>
<v-row>
  <v-col cols="11" sm="6" md="4">
    <v-card class="px-5 py-8">
      <v-row>
        <v-card-title class="py-0" style="width: 100%;">
          <v-col cols="4" class="mr-0 pr-0 text-subtitle-1">
            기본 요금
          </v-col>

          <v-col cols="8" class="text-sm-left font-weight-black">{{Intl.NumberFormat('ko-KR').format(basicPrice)}}원 / 5분</v-col>
        </v-card-title>
      </v-row>
      <v-row class="px-4">
        <v-col cols="4" class="text-subtitle-1">추가 요금</v-col>
        <v-col cols="8" class="text-subtitle-1 text-sm-left">{{Intl.NumberFormat('ko-KR').format(extraPrice)}}원 / 1분</v-col>
      </v-row>
      <v-row class="px-4">
        <v-col cols="4" class="text-subtitle-1">공증 비용</v-col>
        <v-col cols="8" class="text-subtitle-1 text-sm-left">{{Intl.NumberFormat('ko-KR').format(billPrice)}}원</v-col>
      </v-row>
      <v-row class="px-4">
        <v-col cols="4" class="text-subtitle-1">등기 비용</v-col>
        <v-col cols="8" class="text-subtitle-1 text-sm-left">무료</v-col>
      </v-row>
    </v-card>
  </v-col>
  <v-col cols="11" sm="6" md="4">
    <v-card class="py-3 px-5">
      <v-card-title class="pb-0" style="width: 100%;">
        <p class="text-sm-left font-weight-black text-truncate ">
          {{fileName}}
          <!-- {{files[0].name}} {{files.length > 1 ? ' 외 ' + (files.length - 1) + '건' : ''}} -->
        </p>
      </v-card-title>
      <p class="text-subtitle-1 text-sm-left">
        <v-chip class="mr-3" outlined>
          파일 길이
        </v-chip>
        {{totalDuration}}분
      </p>
      <p class="text-subtitle-1 text-sm-left d-flex flex-wrap">
        <v-chip class="mr-3" outlined>
          추가 요금
        </v-chip>
        {{Intl.NumberFormat('ko-KR').format(extraDuration * extraPrice)}}원
        <span>
          ({{extraDuration}}분 * {{Intl.NumberFormat('ko-KR').format(extraPrice)}}원)
        </span>
      </p>
      <p class="text-subtitle-1 text-sm-left">
        <v-chip class="mr-3" outlined>
          공증 여부
        </v-chip>
        <v-checkbox
          class="d-inline-block mt-0 pt-0"
          style="vertical-align: text-top;"
          v-model="bill"
          @change="getBill"
          :label="bill ? '공증을 받겠습니다' : '공증을 받지 않겠습니다'"
        ></v-checkbox>
      </p>
    </v-card>
  </v-col>
  <v-col cols="11" md="8">
    <v-form lazy-validation class="boxShadowStyle pa-3 pb-5" style="border: 3px solid #ff6f00; border-left: none; border-right: none; border-radius: 5px;">
      <v-container>
        <v-row class="text-center">
          <v-col v-if="!isPaid" cols="12">
            <v-card-text>

              {{Intl.NumberFormat('ko-KR').format(basicPrice)}}원 + {{Intl.NumberFormat('ko-KR').format(extraDuration * extraPrice)}}원
              <span v-if="bill">
                + {{Intl.NumberFormat('ko-KR').format(billPrice)}}원
              </span>
            </v-card-text>
            총 {{Intl.NumberFormat('ko-KR').format(total)}}원
            <v-btn class="d-block mt-5 mx-auto" color="accent" @click="tosspay">결제하기</v-btn>
          </v-col>

          <v-col v-else cols="12">
            <v-card-text class="pb-0">
              주문이 접수되셨습니다
            </v-card-text>
            <v-card-text>
              주문번호: {{orderNum}}
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-col>
</v-row>
</template>

<script>
// import axios from 'axios';

const clientKey = 'test_ck_Z0RnYX2w532oybBdKqlVNeyqApQE'
const tossPayments = window.TossPayments(clientKey) // 클라이언트 키로 초기화하기


export default {
  name: 'formPayment',
  props: [
    'formData',
    'files',
  ],
  data: () => ({
    totalDuration: 0,
    basicPrice: 25000,
    extraPrice: 4000,
    extraDuration: 0,
    billPrice: 5000,
    total: 0,
    bill: false,
    isPaid: false,
    IMP: window.IMP,
    orderNum: Math.floor(Math.random()* 10000000000),
    fileName: '',
  }),
  mounted() {
    console.log(this.files);
    for (const f of this.files) {
      this.totalDuration += Math.ceil(f.duration / 60);
    }
    this.extraDuration += this.totalDuration > 5 ? this.totalDuration-5 : 0;
    this.total += this.basicPrice + this.extraDuration * this.extraPrice;
    this.fileName = this.files[0].name;
    if (this.files.length > 1) {
      this.fileName = this.fileName.concat(' 외 ' + (this.files.length-1) + '건');
    }
  },
  methods: {
    getBill: function() {
      if (this.bill) this.total += this.billPrice;
      else this.total -= this.billPrice;
    },
    tosspay() {
      tossPayments.requestPayment('카드', { // 결제 수단 파라미터
      // 결제 정보 파라미터
      amount: this.total,
      orderId: 'kaY-LJVfOxm1RDrbVZcqR',
      orderName: this.fileName,
      customerName: '박토스',
      successUrl: 'http://localhost:8080/success',
      failUrl: 'http://localhost:8080/fail',
    })
    .then(res => alert(res))
    .catch(function (error) {
      if (error.code === 'USER_CANCEL') {
        // 결제 고객이 결제창을 닫았을 때 에러 처리
        alert('user', error);
      } else if (error.code === 'INVALID_CARD_COMPANY') {
        // 유효하지 않은 카드 코드에 대한 에러 처리
        alert('card', error);
      }
    })

    }
  }
}
</script>

<style>

</style>