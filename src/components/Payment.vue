<template>
<v-row>
  <v-col cols="11" md="8" lg="5">
    <v-form lazy-validation class="boxShadowStyle pa-3 pb-5" style="border: 3px solid #ff6f00; border-left: none; border-right: none;border-radius: 5px 5px 0 0;">
      <v-container>
        <v-row class="text-center">
          <v-col v-if="!isPaid" cols="12">
            <v-card-text>
              주문금액: {{price}}원
            </v-card-text>
            <v-btn color="accent" @click="requestPay">결제하기</v-btn>
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
import $ from 'jquery';


export default {
  name: 'formPayment',
  data: () => ({
    price: 1000000,
    isPaid: false,
    IMP: window.IMP,
    orderNum: Math.floor(Math.random()* 10000000000),

  }),
  methods: {
    requestPay: function () {
      this.IMP.init('imp88827277');
      // IMP.request_pay(param, callback) 결제창 호출
      this.IMP.request_pay({ // param
        pg : 'kcp',
        pay_method : 'card',
        merchant_uid: "order_no_0001", //상점에서 생성한 고유 주문번호
        name : '주문명:결제테스트',
        amount : 10,
        buyer_email : 'iamport@siot.do',
        buyer_name : '구매자이름',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456',
        m_redirect_url : '{모바일에서 결제 완료 후 리디렉션 될 URL}' // 예: https://www.my-service.com/payments/complete/mobile
      }, rsp => { // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          console.log(rsp);
          this.isPaid = true;
        } else {
          // 결제 실패 시 로직,
          console.log(rsp);
        }
      }, function (rsp) { // callback
      if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
        // jQuery로 HTTP 요청
        $.ajax({
            url: "{서버의 결제 정보를 받는 endpoint}", // 예: https://www.myservice.com/payments/complete
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
                imp_uid: rsp.imp_uid,
                merchant_uid: rsp.merchant_uid
            }
        }).done(function (data) {
          // 가맹점 서버 결제 API 성공시 로직
          console.log(data)
        })
      } else {
        alert("결제에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
      }
    });
    }
  }
}
</script>

<style>

</style>