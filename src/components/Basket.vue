<template>
<div v-if="mode === 3" class="d-flex flex-column justify-center">
	<v-row class="form-header flex-column align-center justify-center">
		<h1 class="mb-5">
			장바구니
		</h1>
	</v-row>
	<v-row class="form-contents py-16 flex-grow-1">
		<v-col cols="11" md="6" class="d-flex flex-column">
      <v-card class="pa-5"  v-for="(text, i) in tempList" :key="i">
        <v-card-title class="pl-0">
          <span class="text-h5">
            {{text.files[0].file_date.slice(0, -4)}} {{text.files.length>1 ? `외 ${text.files.length-1}건` : ''}} 
          </span>
          <span class="timeTotal">
            <img src="../assets/clock.png" alt="시계" width="15" />
            <p class="mb-0 ml-1">05:24</p>
          </span>
        </v-card-title>
        <table class="cardContents">
          <tr>
            <td>요청길이</td>
            <td>04:32</td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>등기+CD, 공증</td>
            <!-- <td>{{x.files[0].delivery.concat(x.files[0].notarial ? ', 공증' : '')}}</td> -->
          </tr>
        </table>
        <p class="filePrice">
          {{Intl.NumberFormat('ko-KR').format(text.price)}}원
        </p>
      </v-card>
      <v-card @click="changeMode(2)" class="addOrder">
        <v-card-title class="d-flex justify-center">
          <v-icon color="primary">
            mdi-plus
          </v-icon>
          추가 신청하기
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-subtitle class="d-flex justify-space-between totalPriceDiv">
          <span>총 주문금액</span>
          <span>{{Intl.NumberFormat('ko-KR').format(totalPrice)}}원</span>
        </v-card-subtitle>
      </v-card>
			<v-card>
        <v-card-title class="text-h5">주문자 정보</v-card-title>
				<v-col cols="12">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <!-- <input type="text" :value="name"> -->
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="이름"
              required
              background-color="lightgray"
            ></v-text-field>

            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="휴대폰 번호"
              required
              background-color="lightgray"
            ></v-text-field>
            <span class="d-flex">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="이메일"
                type="email"
                required
                background-color="lightgray"
              ></v-text-field>
            </span>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="4" md="3">
                    <v-text-field
                      v-model="postcode"
                      label="우편번호"
                      background-color="lightgray"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="address"
                      label="주소"
                      background-color="lightgray"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" class="d-flex justify-center align-center">
                    <v-btn
                      width="100%"
                      outlined
                      @click="execDaumPostcode"
                    >찾기</v-btn>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="extraAddress"
                  label="상세주소"
                  background-color="lightgray"
                ></v-text-field>
              </v-col>
              
            </v-row>
            <v-col cols="12">
              <v-btn
                style="width: 100%;"
                @click="confirm"
              >
                결제하기
              </v-btn>
            </v-col>
          </v-form>
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
  let email = '';
  let phone = '';
  let postcode = '';
  let detailAddress = '';
  return {
    tempList: [],
    totalPrice: 0,
    name: '',
    nameRules: [
      v => !!v || '필수 입력 값입니다',
      v => (v && v.length <= 10) || '10자 이내로 입력해주세요',
    ],
    phone,
    phoneRules: [
      v => !!v || '필수 입력 값입니다',
      v => (v && /^[0-9]*$/.test(v)) || `숫자만 입력해주세요`,
    ],
    email,
    emailRules: [
      v => !!v || '필수 입력 값입니다.',
      v => /.+@.+\..+/.test(v) || '유효한 이메일이 아닙니다.',
    ],
    postcode,
    address: postcode ? postcode + ')' + detailAddress : '',
    extraAddress: '',
    valid: true,
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
        },
        {
          file_date: 'sample_20221226154031.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
        },
        {
          file_date: 'sample_20221226154032.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
        },
        {
          file_date: 'sample_20221226154033.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
        },
        {
          file_date: 'sample_20221226154034.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
        },
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
  this.phone = '01011111111';
  this.email = 'test@sample.com';
  this.postcode = 10204;
  this.address = '대전시 유성구 대덕대로 512번길 20';
  this.totalPrice = this.tempList.reduce((total, val) => total + val.price, 0);
},
methods: {
  changeMode(val) {
    this.$emit('changeMode', val)
  },
  execDaumPostcode() {
    new window.daum.Postcode({
      oncomplete: (data) => {
        if (this.extraAddress !== "") {
          this.extraAddress = "";
        }
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          this.address = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          this.address = data.jibunAddress;
        }
        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            this.extraAddress += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            this.extraAddress +=
              this.extraAddress !== ""
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (this.extraAddress !== "") {
            this.extraAddress = `(${this.extraAddress})`;
          }
        } else {
          this.extraAddress = "";
        }
        // 우편번호를 입력한다.
        this.postcode = data.zonecode;
      },
    }).open();
  },
  confirm() {
    const data = {
      id: this.email,
      password: this.pw,
      name: this.name,
      phone: this.phone,
      addr: this.address + ' ' + this.extraAddress,
    };
    console.log(data);
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
.v-card {
  margin-bottom: 20px;
}
.timeTotal {
  margin-left: 10px;
  color: #00A3FF;
  font-size: 15px;
  display: flex;
  align-items: center;
}
.cardContents tr td:nth-child(1) {
  width: 100px;
  color: #828E9C;
}
.filePrice {
  text-align: end;
  font-size: 18px;
}
.addOrder .v-card__title {
  color: #00A3FF;
  font-size: 17px;

}
.addOrder:hover {
  cursor: pointer;
}
.totalPriceDiv {
  font-size: 1.1rem;
}

</style>