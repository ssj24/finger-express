<template>
  <v-row class="d-flex flex-column align-center justify-center">
    <v-col cols="6">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="이메일"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="pw"
          :rules="passwordRules"
          label="비밀번호"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="pwChk"
          :rules="pwChkCheck(pw, pwChk)"
          label="비밀번호 재확인"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="이름"
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="phoneRules"
          label="휴대폰 번호"
          required
        ></v-text-field>
        <v-row>
				<v-col cols="9" md="10">
					<v-row>
						<v-col cols="4" md="3">
							<v-text-field
								v-model="postcode"
								label="우편번호"
							></v-text-field>
						</v-col>
						<v-col>
							<v-text-field
								v-model="address"
								label="주소"
							></v-text-field>
						</v-col>
					</v-row>
					<v-text-field
						v-model="extraAddress"
						label="상세주소"
					></v-text-field>
				</v-col>
				<v-col cols="3" md="2" class="d-flex justify-center align-center">
					<v-btn
						width="100%"
						color="accent"
						outlined
						@click="execDaumPostcode"
					>찾기</v-btn>
				</v-col>
			</v-row>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
        <v-btn
          color="info"
          @click="send"
        >
          send
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'SignUp',
  data: () => {
    let email = '';
    let pw = '';
    let pwChk = '';
    let phone = '';
    let postcode = '';
    let detailAddress = '';
    return {
      email,
      emailRules: [
        v => !!v || '필수 입력 값입니다.',
        v => /.+@.+\..+/.test(v) || '유효한 이메일이 아닙니다.',
      ],
      pw,
      passwordRules: [
        v => !!v || '필수 입력 값입니다',
        v => (v && v.length > 7) || '8자 이상 입력해주세요',
        v => (v && /\d/.test(v)) || `특수문자, 영문자, 숫자를 포함해주세요`,
        v => (v && /[A-Za-z]/.test(v)) || `특수문자, 영문자, 숫자를 포함해주세요`,
        v => (v && /[^A-Za-z0-9]/.test(v)) || `특수문자, 영문자, 숫자를 포함해주세요`,
      ],
      pwChk,
      passwordChkRules: [
        v => !!v || '필수 입력 값입니다',
        v => (v === pw) || '입력해주신 비밀번호와 다릅니다',
      ],
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
      postcode,
      address: postcode ? postcode + ')' + detailAddress : '',
      extraAddress: '',
      valid: true,
    }
  },

  methods: {
    passwordCheck(str) {
      const v = str.trim();
      if (!v) {
        return '필수 입력 값입니다'
      } else if (v.length <= 7) {
        return '8자 이상 입력해주세요'
      } else if (!/\d/.test(v) || !/[A-Za-z]/.test(v) || !/[^A-Za-z0-9]/.test(v)) {
        return `특수문자, 영문자, 숫자를 포함해주세요`
      }
    },
    pwChkCheck(pw, pw2) {
      pw = pw.trim();
      pw2 = pw2.trim();
      return [
        v => !!v || '필수 입력 값입니다',
        v => !(v && pw !== pw2) || '입력해주신 비밀번호와 다릅니다',
      ]
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
    reset () {
      this.$refs.form.reset()
    },
    send () {
      console.log(this.name, this.email, this.select);
      const data = {
        id: this.email,
        password: this.pw,
        name: this.name,
        phone: this.phone,
        addr: this.address + ' ' + this.extraAddress,
      };
      console.log(data);
      // axios({					// axios 통신 시작
      //   url: "/",	// back 서버 주소
      //   method: "POST",
      //   data: data,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // .then(res => {				// back 서버로부터 응답받으면
      //   alert(res);		// back 서버에서 보낸 message 출력
      // })
      // .catch(err => alert(err));
    }
  },
}
</script>

<style>

</style>