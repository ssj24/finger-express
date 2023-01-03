<template>
<div v-if="mode === 3" class="d-flex flex-column justify-center">
	<v-row class="form-header flex-column align-center justify-center">
		<h1 class="mb-5">
			장바구니
		</h1>
	</v-row>
	<v-row class="form-contents py-16 flex-grow-1">
		<v-col cols="11" md="9" class="d-flex flex-column">
      <v-card class="pa-5"  v-for="(text, i) in tempList" :key="i">
        <v-card-title>
          {{text.files[0].file_date}}
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-title @click="changeMode(2)">
          <v-icon>
            mdi-plus
          </v-icon>
          추가 신청하기
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span>총 주문금액</span>
          <span>{{totalPrice}}</span>
        </v-card-title>
      </v-card>
			<v-card>
				<v-col cols="12">
          FORM
				</v-col>
			</v-card>
		</v-col>
	</v-row>
	
</div>
</template>

<script>
export default {
name: 'BasketComponent',
props: {
  mode: Number,
},
data: () => {
  return {
    tempList: [],
    name: '',
    phone: '',
    mail: '',
    post_code: 0,
    address: '',
    totalPrice: 0,
  }
},
created() {
  this.tempList = [
    {
      order_id: 1,
      delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
      notarial: false,    // 공증 여부 true, false,
      price: 37000,
      files : [
        {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
        }
      ]
    },
    {
      order_id: 2,
      delivery: 'regist_cd',   // email, regist(등기), regist_cd(등기+CD)
      notarial: true,    // 공증 여부 true, false,
      price: 57000,
      files : [
        {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 23498,    // seconds
          slice_duration: 3511,    // seconds
        }
      ]
    }
  ];
  this.name = 'sample';
  this.phone = '010-1111-1111';
  this.mail = 'test@sample.com';
  this.post_code = 10204;
  this.address = '대전시 유성구 대덕대로 512번길 20';
  this.totalPrice = this.tempList.reduce((total, val) => total + val.price, 0);
},
methods: {
  changeMode(val) {
    this.$emit('changeMode', val)
  }
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