<template>
<div class="d-flex flex-column justify-center">
	<v-row class="form-header flex-column align-center justify-center">
    <img src="../assets/firework.svg" alt="firework">
		<h1 class="my-5">
			주문 성공하였습니다!
		</h1>
	</v-row>
	<v-row class="form-contents mx-0 py-16 flex-grow-1">
		<v-col cols="11" md="6" class="d-flex flex-column align-center">
      <v-card class="pa-5" max-width="580">
        <v-card-title class="text-h5">향후 절차 안내</v-card-title>
        <v-stepper
          v-model="status"
          vertical
          elevation=0
        >
          <span
            v-for="(statusStep, idx) in statusList"
            :key="statusStep">
            <v-stepper-step
              :step="idx"
              :complete="idx <=status"
              color="blue"
            >
              {{statusStep}}
            </v-stepper-step>
          </span>
        </v-stepper>
        <hr class="mx-5">
        <v-card-subtitle>
          <p>* 등기발송/수령 절차는 등기 옵션을 선택하신 고객님만 해당됩니다.</p>
          <p>* 궁금하신 내용은 언제든 ‘채널톡’으로 문의 주세요.</p>
        </v-card-subtitle>
      </v-card>
		</v-col>

	</v-row>
</div>
</template>

<script>
export default {
name: 'OrderSuccessComponent',
data: ()=>({
  status: 0,
  statusList: ['결제 완료', '초안 작업중', '초안 검토 요청', '최종본 작업중', '발송완료', '수령'],
}),
methods: {

}
}
</script>

<style lang="scss" scoped>
.form-header{
	padding: 70px 50px;
	p {
		margin: 0;
		display: inline-block;
	}
}
.form-contents {
	width: 100%;
	background-color: #f3f7ff;
	display: flex;
	justify-content: center;

}
</style>