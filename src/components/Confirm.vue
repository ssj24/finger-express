<template>
<v-row>
  <v-col cols="11" md="8" lg="5">
    <v-form v-model="valid" ref="loginForm" lazy-validation class="boxShadowStyle pa-3 pb-5" style="border: 3px solid #ff6f00; border-left: none; border-right: none;border-radius: 5px 5px 0 0;">
      <v-container>
        <v-row class="text-center">
          <v-col cols="12" class="pb-0">
            <v-card-text class="pb-0">
              주문이 접수되셨습니다
            </v-card-text>
          </v-col>

          <v-col cols="12">
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
export default {
  name: 'formConfirm',
  data: () => ({
    orderNum: Math.floor(Math.random()* 10000000000),
  }),
  mounted() {
    this.orderNum = Math.floor(Math.random()* 10000000000);
  }
}
</script>

<style>

</style>