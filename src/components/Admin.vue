<template>
<div class="d-flex flex-column justify-center">
	<v-row class="form-header flex-column align-center justify-center">
		<h1 class="mb-5">
			고객 주문 현황
		</h1>
    <v-radio-group v-model="period" row>
      <v-radio
        v-for="n in periodList"
        :key="n"
        :label="`${n}개월`"
        :value="n"
        :disabled="n!=1"
      ></v-radio>
    </v-radio-group>
	</v-row>
	<v-row class="form-contents mx-0 flex-column align-center py-16 flex-grow-1">
		<v-col cols="11" md="6" class="d-flex flex-column justify-center align-center" v-for="(x, i) in orderList" :key="x.order_id">
			<v-card class="pa-5"
        max-width="600px"
      >
        <div class="cardHeader">
          <v-row class="align-center">
            <v-col>
              <v-card-subtitle class="d-flex flex-wrap pa-0">
                <p class="mr-5 mb-0">
                  주문일: {{new Date(x.order_at).toLocaleString('ko-KR')}}
                </p>
                <p class="mb-0">
                  주문자: {{x.client_name}}({{x.phone}})
                </p>
              </v-card-subtitle>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-end" order="first" order-md="last">
              <v-btn outlined class="downloadBtn" @click="download(x.order_id)">
                다운로드
                <span class="mdi mdi-download"></span>
              </v-btn>
            </v-col>
          </v-row>
          <v-card-title class="pl-0">
            <span class="text-h5">
              {{x.files[0].slice(0, -4)}} {{x.files.length>1 ? `외 ${x.files.length-1}건` : ''}} 
            </span>
            <span class="timeTotal">
              <img src="../assets/clock.png" alt="시계" width="15" />
              <p class="mb-0 ml-1">{{x.total_duration}}</p>
            </span>
          </v-card-title>
        </div>
        <table class="cardContents mb-5">
          <tr>
            <td>요청길이</td>
            <td>{{x.slice_duration}}</td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>{{x.deliveryOption.concat(x.notarial === 'False' ? '' : ', 공증')}}</td>
          </tr>
        </table>
        <hr>
        <div class="d-flex justify-space-between align-center openStatus" @click="openStatus(i)">
          <p class="mb-0 mt-5">주문상황</p>
          <p class="mb-0 mt-5">
            {{statusList[x.status]}}
            <span class="mdi mdi-chevron-down"></span>
          </p>
        </div>
        <div class="hidden hiddenStatus my-5" :id='"hiddenStatus"+i'>
          <v-stepper
            v-model="x.status"
            vertical
          >
          
            <span
              v-for="(statusStep, idx) in statusList"
              :key="statusStep">
              <v-stepper-step
                :step="idx"
                :complete="idx - 1<=x.status"
                color="blue"
              >
                {{statusStep}}
              </v-stepper-step>

              <v-stepper-content :step="idx -1">
                <v-btn
                  color="blue"
                  @click="changeStatus(idx, x.order_id)"
                  outlined
                >
                  완료
                </v-btn>
                <v-btn text @click="changeStatus(idx-2, x.order_id)">
                  취소
                </v-btn>
              </v-stepper-content>
            </span>
          </v-stepper>
        </div>
      </v-card>
		</v-col>
    <v-col v-if="!orderList.length" cols="11" md="6" class="d-flex flex-column">
      <v-card class="pa-5">
        <v-card-title class="d-flex justify-center">
          <span class="text-h6">
            아직 접수된 주문이 없습니다.
          </span>
        </v-card-title>
      </v-card>
    </v-col>
	</v-row>
	
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminComponent',
  data: () => ({
    period: 1,
    periodList: [1, 3, 6],
    start: '',
    end: '',
    orderList: [
      {
        client_name: '홍길동',
        phone: '010-0000-0000',
        mail_id: 'sample@sample.com',
        order_at: '2022-08-24',
        order_id: 0,
        delivery: 'email',   // email, regist(등기), regist_cd(등기+CD)
        deliveryOption: '이메일',   // email, regist(등기), regist_cd(등기+CD)
        notarial: 'False',    // 공증 여부 true, false
        stage: 'draft',    // paid, draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
        status: 0,
        total_duration: 324,    // seconds
        slice_duration: 272,    // seconds
        files : [ 'sample_20221226154030.mp3','sample_20221226154031.mp3','sample_20221226154032.mp3',]
      },
      {
        client_name: '홍길동2',
        phone: '010-0000-0000',
        mail_id: 'sample@sample.com',
        order_at: '2022-08-24',
        order_id: 1,
        delivery: 'regist',   // email, regist(등기), regist_cd(등기+CD)
        deliveryOption: '등기',   // email, regist(등기), regist_cd(등기+CD)
        notarial: 'False',    // 공증 여부 true, false
        stage: 'review',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
        status: 1,
        total_duration: 3234,    // seconds
        slice_duration: 272,    // seconds
        files : [ 'sample_20221226154030.mp3']
      },
      {
        client_name: '홍길동3',
        phone: '010-0000-0000',
        mail_id: 'sample@sample.com',
        order_at: '2022-08-24',
        order_id: 2,
        delivery: 'regist_cd',   // email, regist(등기), regist_cd(등기+CD)
        deliveryOption: '등기+CD',   // email, regist(등기), regist_cd(등기+CD)
        notarial: 'True',    // 공증 여부 true, false
        stage: 'receive',    // draft(초안), review(검토), final(최종본),  send(발송, receive(수령)
        status: 5,
        total_duration: 1324,    // seconds
        slice_duration: 1272,    // seconds
        files : [ 'sample_20221226154030.mp3','sample_20221226154031.mp3','sample_20221226154032.mp3',]
      },
    ],
    statusList: ['결제 완료', '초안 작업중', '초안 검토 요청', '최종본 작업중', '발송완료', '수령'],
    stageList: ['paid', 'draft', 'review', 'final', 'send', 'receive'],
  }),
  created() {
    const d=new Date();
    const priorD = new Date(new Date().setDate(d.getDate() - 30));
		this.end = `${d.getFullYear()}-${d.getMonth()+1 <10 ? "0"+(d.getMonth()+1) : d.getMonth()+1}-${d.getDate() <10 ? "0"+(d.getDate()+1) : d.getDate()+1}`;
		this.start = `${priorD.getFullYear()}-${priorD.getMonth()+1 <10 ? "0"+(priorD.getMonth()+1) : priorD.getMonth()+1}-${priorD.getDate() <10 ? "0"+(priorD.getDate()) : priorD.getDate()}`;
    const formData = {
      message: 'admin_order_list',
      start_date: this.start,
      end_date: this.end
    }
    console.log('formData', formData);
    axios({					// axios 통신 시작
      url: "https://exp.finger.solutions/api/OrderList/",	// back 서버 주소
      method: "POST",
      data: formData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {				// back 서버로부터 응답받으면
        console.log(res);
        this.orderList = res.data.order_list;
        // for (const order of this.orderList) {
          // console.log(JSON.parse(order.files))
          // order.files = JSON.parse(order.files);
        // }
        this.orderList.map(x => {
          const statusNum = x.stage === 'paid' ? 0 : x.stage === 'draft' ? 1 : x.stage === 'review' ? 2 : x.stage === 'final' ? 3 : x.stage === 'send' ? 4 : 5;
          this.$set(x, 'status', statusNum);
          x.deliveryOption = x.delivery === 'email' ? '이메일' : x.delivery === "regist" ? '등기' : '등기 + CD';
        })
    }).catch(err => console.log(err));
    
    console.log(this.orderList)
  },
  methods: {
    openStatus(i) {
      const hiddenStatusDiv = document.getElementById(`hiddenStatus${i}`);
      hiddenStatusDiv.classList.toggle('hidden');
    },
    changeStatus(i, orderId) {
      const formData = {
        message: 'stage_change_req',
        order_id: orderId,
        stage: this.stageList[i]
      }
      console.log('formData', formData);
      axios({					// axios 통신 시작
        url: "https://exp.finger.solutions/api/StageChange/",	// back 서버 주소
        method: "POST",
        data: formData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {				// back 서버로부터 응답받으면
          console.log(res);
          if (res.data.message === 'success') {
            const targetOrder = this.orderList.filter(x => x.order_id === orderId);
            targetOrder[0].status = i;
          }
      }).catch(err => console.log(err));
    },
    download(orderId) {
      const formData = {
        message: 'work_down_req',
        order_id: orderId,
      }
      console.log('formData', formData);
      axios({					// axios 통신 시작
        url: "https://exp.finger.solutions/api/WorksDown/",	// back 서버 주소
        method: "POST",
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          'Response-Type': 'application/zip'
        }
      }).then(res => {				// back 서버로부터 응답받으면
          console.log(res);
          // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
          const blob = new Blob([res.data.file]);
          // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 할 수 있습니다.
          // const blob = new Blob([this.content], {type: 'text/plain'})

          // blob을 사용해 객체 URL을 생성합니다.
          const fileObjectUrl = window.URL.createObjectURL(blob);

          // blob 객체 URL을 설정할 링크를 만듭니다.
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.style.display = "none";

          // 다운로드 파일 이름을 지정 할 수 있습니다.
          // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.
          link.download = res.data.file;

          // 다운로드 파일 이름을 추출하는 함수
          // const extractDownloadFilename = (response) => {
          //     const disposition = response.headers["content-disposition"];
          //     const fileName = decodeURI(
          //     disposition
          //         .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
          //         .replace(/['"]/g, "")
          //     );
          //     return fileName;
          // };

          // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
          // link.download = "sample-file.xlsx";

          // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
          document.body.appendChild(link);
          link.click();
          link.remove();

          // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
          window.URL.revokeObjectURL(fileObjectUrl);
      }).catch(err => console.log(err));
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
.openStatus {
  color: black;
}
.openStatus:hover {
  cursor: pointer;
}
.hiddenStatus {
  transition: all 2s ease;
}
.hiddenStatus.hidden {
  height: 0;
  display: none;
}

</style>