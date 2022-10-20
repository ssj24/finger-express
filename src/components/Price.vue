<template>
  <v-row class="justify-center mx-0" style="width: 100%;">
    <v-col cols="12" class="mb-7 text-lg-center subtitle-col">
      <h2>요금 안내</h2>
    </v-col>
    <v-col cols="12" sm="7">

      <v-card>
        <v-row>

          <v-col class="my-5 my-sm-10 pa-7 pr-0 d-flex flex-column justify-center">
            <v-row>
              <v-card-title class="pb-0" style="width: 100%;">
                <v-col cols="4" class="mr-0 pr-0 text-subtitle-1">
                  기본 요금
                </v-col>

                <v-col cols="8" class="text-sm-left font-weight-black">25,000원 / 5분</v-col>
              </v-card-title>
            </v-row>
            <v-row class="px-4">
              <v-col cols="4" class="text-subtitle-1">추가 요금</v-col>
              <v-col cols="8" class="text-subtitle-1 text-sm-left">4,000원 / 1분</v-col>
            </v-row>
            <v-row class="px-4">
              <v-col cols="4" class="text-subtitle-1">공증 비용</v-col>
              <v-col cols="8" class="text-subtitle-1 text-sm-left">5,000원</v-col>
            </v-row>
            <v-row class="px-4">
              <v-col cols="4" class="text-subtitle-1">등기 비용</v-col>
              <v-col cols="8" class="text-subtitle-1 text-sm-left">무료</v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="5" class="py-0 d-flex justify-center align-center">
            <v-img
              class="white--text align-end"
              src="../assets/talking-unsplash.jpg"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'priceComponent',
  data: () => ({
  })
}
</script>

<style>

</style>