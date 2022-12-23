<template>
<div class="d-flex flex-column justify-center">
	<v-row class="form-header flex-column align-center justify-center">
		<h1 class="mb-5">
			고객 주문 현황
		</h1>
    <div>날짜 필터</div>
	</v-row>
	<v-row class="form-contents py-16 flex-grow-1">
		<v-col cols="11" md="9" class="d-flex flex-column" v-for="(x, i) in orderList" :key="x.file.name">
			<v-card>
        <div class="cardHeader d-flex justify-space-between">
          <v-card-title>
            {{x.file.name}}
          </v-card-title>
          <v-btn class="downloadBtn" @click="download(x.file.name)">다운로드</v-btn>
        </div>
        <table class="cardContents">
          <tr>
            <td>요청길이</td>
            <td>{{x.file.duration}}</td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>{{x.options.join(', ')}}</td>
          </tr>
        </table>
        <hr>
        <div class="d-flex justify-space-between">
          <p>주문상황</p>
          <button class="openStatus" @click="openStatus(i)">
            {{x.status}}
            <span class="mdi mdi-chevron-down"></span>
          </button>
        </div>
        <div class="hidden hiddenStatus" :id='"hiddenStatus"+i'>
          <v-stepper
            v-model="x.status"
            vertical
          >
            <span
              v-for="(statusStep, idx) in statusList"
              :key="statusStep">
              <v-stepper-step
                :step="idx+1"
                :complete="idx+1<=x.status"
                color="blue"
              >
                {{statusStep}}
              </v-stepper-step>

              <v-stepper-content :step="idx+1">
                <v-btn
                  color="blue"
                  @click="x.status++"
                  outlined
                >
                  완료
                </v-btn>
                <v-btn text @click="x.status--">
                  취소
                </v-btn>
              </v-stepper-content>
            </span>
          </v-stepper>
        </div>
      </v-card>
		</v-col>
	</v-row>
	
</div>
</template>

<script>
export default {
  name: 'AdminComponent',
  data: () => ({
    orderList: [
      {
        date: '2022-12-23',
        file: {
          name: 'sample1',
          duration: '1230',
        },
        options: ['등기+CD', '공증'],
        status: 3,
      },
      {
        date: '2022-12-23',
        file: {
          name: 'sample2',
          duration: '12301234',
        },
        options: ['등기+CD', '공증'],
        status: 3,
      },
      {
        date: '2022-12-23',
        file: {
          name: 'sample3',
          duration: '1230',
        },
        options: ['공증'],
        status: 2,
      },
      {
        date: '2022-12-23',
        file: {
          name: 'sample4',
          duration: '1230',
        },
        options: ['등기+CD'],
        status: 1,
      },
      {
        date: '2022-12-23',
        file: {
          name: 'sample5',
          duration: '12302',
        },
        options: ['등기+CD', '공증'],
        status: 2,
      },
    ],
    statusList: ['초안 작업중', '초안 검토 요청', '최종본 작업중', '발송완료']
  }),
  methods: {
    openStatus(i) {
      const hiddenStatusDiv = document.getElementById(`hiddenStatus${i}`);
      hiddenStatusDiv.classList.toggle('hidden');
    }
  }
}
</script>

<style lang="scss" scoped>
.form-header{
	padding: 70px 50px;
}
.form-contents {
	width: 100%;
	background-color: #f3f7ff;
	display: flex;
	justify-content: center;
}
.openStatus {
  color: black;
}
.hiddenStatus.hidden {
  height: 0;
  display: none;
}
.hiddenStatus {
  transition: all 2s ease;
}

</style>