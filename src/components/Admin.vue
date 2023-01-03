<template>
<div class="d-flex flex-column justify-center">
	<v-row class="form-header flex-column align-center justify-center">
		<h1 class="mb-5">
			고객 주문 현황
		</h1>
    <div>날짜 필터</div>
	</v-row>
	<v-row class="form-contents flex-column align-center py-16 flex-grow-1">
		<v-col cols="11" md="4" class="d-flex flex-column" v-for="(x, i) in orderList" :key="x.files[0].file_date">
			<v-card>
        <div class="cardHeader d-flex justify-space-between">
          <div class="cardHeaderLef">
            <v-card-subtitle class="d-flex">
              <p class="mr-5">
                주문일: {{x.order_at}}
              </p>
              <p>
                주문자: {{x.client_name}}({{x.phone}})
              </p>
            </v-card-subtitle>
            <v-card-title>
              {{x.files[0].file_date}}{{x.files.length>1 ? `외 ${x.files.length-1}건` : ''}}({{x.files[0].total_duration}})
            </v-card-title>
          </div>
          <v-btn class="downloadBtn" @click="download(x.files[0].file_date)">다운로드</v-btn>
        </div>
        <table class="cardContents">
          <tr>
            <td>요청길이</td>
            <td>{{x.files[0].slice_duration}}</td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>{{x.files[0].delivery.concat(x.files[0].notarial ? ', 공증' : '')}}</td>
          </tr>
        </table>
        <hr>
        <div class="d-flex justify-space-between">
          <p>주문상황</p>
          <button class="openStatus" @click="openStatus(i)">
            {{x.files[0].stage}}
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
        client_name: '홍길동',
        phone: '010-0000-0000',
        order_at: '2022-08-24',
        files : [
          {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
          delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
          notarial: false,    // 공증 여부 true, false
          stage: 'draft',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
          },
          {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
          delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
          notarial: false,    // 공증 여부 true, false
          stage: 'draft',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
          },
          {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
          delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
          notarial: false,    // 공증 여부 true, false
          stage: 'draft',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
          },
          {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
          delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
          notarial: false,    // 공증 여부 true, false
          stage: 'final',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
          }
        ]
      },
      {
        client_name: '홍길동',
        phone: '010-0000-0000',
        order_at: '2022-08-24',
        files : [
          {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
          delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
          notarial: false,    // 공증 여부 true, false
          stage: 'final',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
          }
        ]
      },{
        client_name: '홍길동',
        phone: '010-0000-0000',
        order_at: '2022-08-24',
        files : [
          {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
          delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
          notarial: false,    // 공증 여부 true, false
          stage: 'draft',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
          }
        ]
      },{
        client_name: '홍길동',
        phone: '010-0000-0000',
        order_at: '2022-08-24',
        files : [
          {
          file_date: 'sample_20221226154030.mp3',
          total_duration: 324,    // seconds
          slice_duration: 272,    // seconds
          delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
          notarial: false,    // 공증 여부 true, false
          stage: 'draft',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
          }
        ]
      },
    ],
    statusList: ['초안 작업중', '초안 검토 요청', '최종본 작업중', '발송완료', '수령']
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