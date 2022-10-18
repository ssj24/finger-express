<template>
<v-row>
  <v-col cols="11" md="8" lg="5">
      <v-toolbar class="pb-5" style="border: 3px solid #ff6f00; border-left: none; border-right: none;border-radius: 5px 5px 0 0; box-shadow: none;">
        <h1 class="text-h5">Finger Express 로그인</h1>
      </v-toolbar>
    <v-form v-model="valid" ref="loginForm" lazy-validation class="boxShadowStyle pa-3 pb-5">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="10"
              label="이름"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              name="비밀번호"
              label="비밀번호"
              hint="비밀번호는 8자 이상입니다"
              counter
              required
              @click:append="show = !show"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            plain
            class="mr-0"
            @click="reset"
          >
            <v-img
              alt="reset"
              class="shrink"
              contain
              src="../assets/undo-arrow.png"
              transition="scale-transition"
              width="20"
            />
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="accent"
            class="mr-4"
            @click="validate"
          >
            로그인
          </v-btn>
        </v-row>

      </v-container>
    </v-form>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: 'LoginComponent',
  data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || '이름을 입력해주세요',
        v => v.length <= 10 || '이름을 정확하게 입력해주세요',
      ],
      show: false,
      password: '',
      passwordRules: [
        v => !!v || '비밀번호를 입력해주세요',
        v => v.length >= 8 || '비밀번호는 8자 이상입니다',
      ],
    }),
  methods: {
    validate () {
      if (this.$refs.loginForm.validate()) {
        this.$store.commit('LOGGED_IN', this.name);
      }
    },
    reset () {
      this.$refs.loginForm.reset();
    },
  }
}
</script>

<style>
.boxShadowStyle {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
</style>