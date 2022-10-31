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
          {{formData.file.name}}
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
            <v-btn class="d-block mt-5 mx-auto" color="accent" @click="requestPay">결제하기</v-btn>
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

export default {
  name: 'formPayment',
  props: [
    'formData',
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
  }),
  mounted() {
    console.log(this.formData.file);
    this.totalDuration = Math.ceil(this.formData.file.duration / 60);
    this.extraDuration = this.totalDuration > 5 ? Math.ceil((this.formData.file.duration - 300) / 60) : 0;
    this.total = this.basicPrice + this.extraDuration * this.extraPrice;
  },
  methods: {
    getBill: function() {
      if (this.bill) this.total += this.billPrice;
      else this.total -= this.billPrice;
    },
    requestPay: function () {
      this.IMP.init('imp88827277');
      // IMP.request_pay(param, callback) 결제창 호출
      this.IMP.request_pay({ // param
        pg : 'kcp',
        pay_method : 'card',
        merchant_uid: this.orderNum, // 상점에서 생성한 고유 주문번호. IMP.request_pay를 호출하기 전에 서버에서 데이터베이스에 주문 레코드를 생성하여 해당 레코드의 주문번호를 param.merchant_uid 에 지정하기를 권장합니다. 결제 프로세스 완료 후 해당 주문번호를 서버에서 조회하여 결제 위변조 여부를 검증하는데 필요합니다.
        name : '주문명:결제테스트',
        amount : this.total,
        buyer_email : 'iamport@siot.do',
        buyer_name : '구매자이름',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456',
        m_redirect_url : '{모바일에서 결제 완료 후 리디렉션 될 URL}' // 예: https://www.my-service.com/payments/complete/mobile
      }, rsp => { // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          console.log('success');
          console.log(rsp);
          // {
          //   apply_num: "56305348"
          //   bank_name: null
          //   buyer_addr: "서울특별시 강남구 삼성동"
          //   buyer_email: "iamport@siot.do"
          //   buyer_name: "구매자이름"
          //   buyer_postcode: "123-456"
          //   buyer_tel: "010-1234-5678"
          //   card_name: "BC카드"
          //   card_number: "9200200000006162"
          //   card_quota: 0
          //   currency: "KRW"
          //   custom_data: null
          //   imp_uid: "imp_914874266838"
          //   merchant_uid: "order_no_0002"
          //   name: "주문명:결제테스트"
          //   paid_amount: 1000
          //   paid_at: 1666135925
          //   pay_method: "card"
          //   pg_provider: "kcp"
          //   pg_tid: "22542979463636"
          //   pg_type: "payment"
          //   receipt_url: "https://admin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=22542979463636&order_no=imp_914874266838&trade_mony=1000"
          //   status: "paid"
          //   success: true
          // }
          this.isPaid = true;
        } else {
          // 결제 실패 시 로직,
          console.log(rsp);
          // "F0004:PG사 결제요청에 실패하여 중단합니다.(imp_542319383034) 8105, 포맷에러(지불|신용카드|금액)"
        }
      }, function (rsp) { // callback
      if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
        // axios로 HTTP 요청
        // axios({
        //   url: "http://localhost:8080/", // 예: https://www.myservice.com/payments/complete
        //   method: "post",
        //   headers: { "Content-Type": "application/json" },
        //   data: {
        //     imp_uid: rsp.imp_uid,
        //     merchant_uid: rsp.merchant_uid
        //   }
        // }).then((data) => {
        //   // 서버 결제 API 성공시 로직
        //   console.log('axios.success');
        //   console.log(data);
        // })
        console.log('callback');
      } else {
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
    });
    }
  }
}
</script>

<style>

</style>