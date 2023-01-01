<template>
<div v-if="mode === 2" class="d-flex flex-column justify-center">
	<v-row class="form-header flex-column align-center justify-center">
		<h1 class="mb-5">
			녹취록 신청하기
		</h1>
		<div class="description d-flex flex-column justify-center">
			<p>녹취록은 현재 화면에 업로드하신 모든 파일들을 하나의 녹취록 문서로 묶어서 드립니다.</p>
			<p>서로 다른 문서로 작업이 필요하신 경우, 신청을 별도로 해 주세요.</p>
			<p>장바구니를 통하여 한번에 결재가 가능합니다.</p>
		</div>
	</v-row>
	<v-row class="form-contents py-16 flex-grow-1">
		<v-col cols="11" md="9" class="d-flex flex-column">
			<v-row>
				<v-col cols="12" lg="4">
					<v-card class="pa-5">
						<v-card-title>
							전달 방식
						</v-card-title>
						<v-card-subtitle>
							묶음배송 가능할 경우, 등기비용, CD비용은 한 번만 청구됩니다.
						</v-card-subtitle>
						<v-radio-group v-model="delivery" class="pl-5 mb-5">
							<v-radio
								label="이메일 배송 (PDF로 제공됩니다)"
								value="1"
							></v-radio>
							<v-radio
								label="등기배송 (+10,000원)"
								value="2"
							></v-radio>
							<v-radio
								label="등기배송 + CD (+17,000원)"
								value="3"
							></v-radio>
						</v-radio-group>
						<hr>
						<v-checkbox
							v-model="authentication"
							label="공증 필요 (+5,000원)"
							class="pl-5 mt-8"
						></v-checkbox>
					</v-card>
				</v-col>
				<v-col cols="12" lg="8">
					<v-card class="pa-5">
						<v-card-title>
							파일 첨부
						</v-card-title>
						<v-card-subtitle>
							하나당 최대 ??MB의 파일을 10개까지 첨부하실 수 있습니다.
						</v-card-subtitle>
						<v-form
							ref="form"
							lazy-validation
						>
							<!-- 파일 업로드 -->
							<v-row class="px-5">
								<v-col cols="8" md="6" class="pb-0"
								>
									<v-file-input
										v-model="uploadFiles"
										class="pa-0"
										multiple
										label="파일 첨부"
										accept="audio/*, video/*"
										@change="uploadHandler"
										:rules="fileRules"
										id="fileInput"
									>
									</v-file-input>
								</v-col>
								<v-col cols="4" offset-md="4" md="2" class="d-flex justify-center align-center mb-4">
									<v-btn
										width="100%"
										color="accent"
										outlined
										@click="showPreview"
									>
										<!-- :disabled="files.length ? true : false" -->
										미리보기
									</v-btn>
									<v-btn
										width="100%"
										color="accent"
										outlined
										@click="tempPreview"
									>
										TEMP
									</v-btn>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12"
									@dragover.prevent
									@drop.prevent
									class="pt-0"
								>
									<!-- <audio id="audio-preview" controls v-show="file != ''"/> -->
									<div @click="onFileContainerClicked" @drop="dragFile" class="dragContainer">
										<v-row v-if="!files.length" class="emptyFileName pa-5  no-gutters">
											<v-icon left>
												mdi-music-note-plus
											</v-icon>
											파일을 드래그해서 추가해주세요
										</v-row>
										<v-row v-else class="pa-5">
											<v-col cols="12" sm="6" md="4" class="fileName" v-for="(f, i) in files" :key="i" >
												<div class="fileItem" @click="deleteF(i, $event)" >
													<v-icon left>
														mdi-music
													</v-icon>
													<span class="ml-3 d-inline-block text-truncate">
														<p class="text-subtitle-1 text--primary mb-0 ">
															{{ f.name }}
														</p>
														<p class="text-subtitle-2 mb-0">{{f.sizeInMB}}MB</p>
													</span>
												</div>
											</v-col>
											<!-- <v-col @click="deleteF(i)">X</v-col> -->
										</v-row>
									</div>
								</v-col>
							</v-row>

						</v-form>
					</v-card>
				</v-col>
			</v-row>
			<v-row class="flex-grow-1">
				<v-col cols="12">
					<Sentences :serverFileNameList="serverFileNameList" :previewText="previewText" :showPreview="preview" @resetClicked="reset" @validateClicked="validate"/>

				</v-col>
			</v-row>
		</v-col>
	</v-row>
	
</div>
<Payment v-else-if="mode === 3" :formData="formData" :files="files" class="d-flex align-center justify-center my-12" />
</template>

<script>
import Payment from './Payment.vue';
import Sentences from './Sentences.vue';
import axios from 'axios';

export default {
    name: 'applicationComponent',
    components: {
      Payment,
			Sentences,
    },
		props: {
			mode: Number,
		},
    data: () => {
			let previewText = [
				{},
			];
			let clientMail = 'client@test.com';
			return {
				clientMail,
				delivery: 1,
				authentication: false,
				uploadFiles: [],
				files: [],
				fileRules: [
					v => !!v || '파일을 등록해주세요'
				],
				serverFileNameList: [],
				preview: false,
				previewText,
				isComplete: false,
				formData: {},
			}
    },
    methods: {
			getTimeFormat() {
				function pad(n) { return n<10 ? "0"+n : n }
					const d=new Date()
					return `${d.getFullYear()}`.concat(pad(d.getMonth()+1), pad(d.getDate()), pad(d.getDate()), pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()));
			},
      validate (val) {
				console.log(val);
        if (this.files.length) {
					this.formData = {
						message: 'stt_scope',
						client_mail: this.clientMail,
						scope_files: val,
					}
					console.log(this.formData);
					// const getFormData = object => Object.entries(object).reduce((fd, [ key, val ]) => {
					// 	if (Array.isArray(val)) {
					// 		val.forEach(v => fd.append(key, v))
					// 	} else {
					// 		fd.append(key, val)
					// 	}
					// 	return fd
					// }, new FormData());
					// console.log(getFormData(this.formData));

					axios({					// axios 통신 시작
          url: "https://rest.finger.solutions/api/SttScope/",	// back 서버 주소
          method: "POST",
					data: this.formData,
					headers: {
						'Content-Type': 'application/json'
					}
        }).then(res => {				// back 서버로부터 응답받으면
            console.log(res);		// back 서버에서 보낸 message 출력
						if (res.statusText === 'OK') {
							this.isComplete = true;
							this.$emit('changeMode', true);
						}
        }).catch(err => console.log(err));
				}
      },
      reset () {
        this.$refs.form.reset();
      },
			showFile(files) {
				window.URL = window.URL || window.webkitURL;
				let video = document.createElement('video');
				for (const f of files) {
					video.addEventListener('loadedmetadata', () => {
						window.URL.revokeObjectURL(video.src);
						f.duration = video.duration;
					});
					video.preload = 'metadata';
					video.src = URL.createObjectURL(f);
					f.sizeInMB = (f.size / (1024*1024)).toFixed(2);
					this.files.push(f);
				}
			},
			uploadHandler() {
				this.showFile(this.uploadFiles);
				// this.previewAudio();
			},
			// previewAudio(){
			//   업로드한 파일 재생
      //   let audio = document.getElementById('audio-preview');
      //   let reader = new FileReader();

      //   reader.readAsDataURL( this.file );
      //   reader.addEventListener('load', function(){
      //       audio.src = reader.result;
      //   });
			// },
			onFileContainerClicked(e) {
				if (!e.target.closest('.fileName')) {
					document.getElementById('fileInput').click();
				}
			},
			dragFile(e) {
				// for (const f of e.dataTransfer.files) {
				// 	this.files.push(f);
				// }
				this.showFile(e.dataTransfer.files);
      },
			deleteF(index, e) {
				e.preventDefault();
				this.files.splice(index, 1);
			},
			msToMin(ms) {
				const minutes = Math.floor(ms / 60000);
				const seconds = ((ms % 60000) / 1000).toFixed(0);
				return (
					seconds == 60 ?
					(minutes+1) + ":00" :
					minutes + ":" + (seconds < 10 ? "0" : "") + seconds
				);
			},
			showPreview() {
				if (this.files.length) {
				const timeFormat = this.getTimeFormat();
				this.formData = {
					message: 'stt_analysis',
					client_mail: this.clientMail,
					stt_engine:'review',
					time_info: timeFormat,
					files: this.files
				}
				// console.log(this.formData);
				// const getFormData = object => Object.entries(object).reduce((fd, [ key, val ]) => {
				// 	if (Array.isArray(val)) {
				// 		val.forEach(v => fd.append(key, v))
				// 	} else {
				// 		fd.append(key, val)
				// 	}
				// 	return fd
				// }, new FormData());
				// console.log(getFormData(this.formData));
				axios({					// axios 통신 시작
				url: "https://rest.finger.solutions/api/ReviewStt/",	// back 서버 주소
				method: "POST",
				data: this.formData,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(res => {				// back 서버로부터 응답받으면
					console.log(res);		// back 서버에서 보낸 message 출력
					this.previewText.push(...res.data[0].sentence);
					this.serverFileNameList.push(res.data[0].file_name);
					console.log(this.previewText);
					for (let t of this.previewText) {
						t.minStart = this.msToMin(t.start);
						t.minEnd = this.msToMin(t.end);
					}
					this.preview = true;
			}).catch(err => console.log(err));
			}

			},
			tempPreview() {
				
				const previewList = [
					{
							"speaker": "1",
							"name": "B",
							"sentence": "근데 아직도 이 한 달도 쎄지 웨이신 이음매 협사사번 이용을 안 애초에 장학금마을에 프라범 이화",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 243,
							"end": 9093,
							"senti": "None",
							"sent_no": 1,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "뭐야",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 9213,
							"end": 9543,
							"senti": "None",
							"sent_no": 1,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "2월 아는 추후에 뭐하러 웨스트 파업은",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 9573,
							"end": 12903,
							"senti": "None",
							"sent_no": 2,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "좌우지",
							"first_sentence": "true",
							"quiet_time": 1,
							"start": 13443,
							"end": 13863,
							"senti": "None",
							"sent_no": 2,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "니 오디오 웹됐어요지 웨이신 아이 위멤버 월차임 뭐야 입선 땡방 주행에 최부 투잡으로 이어서 내가",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 13893,
							"end": 25892,
							"senti": "None",
							"sent_no": 3,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "얘",
							"first_sentence": "true",
							"quiet_time": 1,
							"start": 26762,
							"end": 27152,
							"senti": "None",
							"sent_no": 3,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "기숙사",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 27182,
							"end": 27902,
							"senti": "None",
							"sent_no": 4,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "아이",
							"first_sentence": "true",
							"quiet_time": 1,
							"start": 28712,
							"end": 28922,
							"senti": "None",
							"sent_no": 4,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "에이팀 임마",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 28952,
							"end": 29792,
							"senti": "None",
							"sent_no": 5,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "아",
							"first_sentence": "true",
							"quiet_time": 1,
							"start": 30722,
							"end": 30962,
							"senti": "None",
							"sent_no": 5,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "백야 아웃백 회사 알고있으라 맹",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 30992,
							"end": 32972,
							"senti": "None",
							"sent_no": 6,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "아예",
							"first_sentence": "true",
							"quiet_time": 1,
							"start": 33872,
							"end": 34292,
							"senti": "None",
							"sent_no": 6,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "섬 스위스 스테이유 은미 왜 와 있어 왜 9시에 OS 제일",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 34322,
							"end": 42408,
							"senti": "None",
							"sent_no": 7,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "근데",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 42888,
							"end": 43098,
							"senti": "None",
							"sent_no": 7,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "브랜드 빠 에스제이 심야 없",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 43158,
							"end": 46908,
							"senti": "None",
							"sent_no": 8,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "으므로",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 47148,
							"end": 47538,
							"senti": "None",
							"sent_no": 8,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "초에 임신 라인 유 에스",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 47688,
							"end": 49368,
							"senti": "None",
							"sent_no": 9,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "에이래 예",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 49398,
							"end": 51547,
							"senti": "None",
							"sent_no": 9,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "삼땡 드라이브 섬멸젝트에요",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 51577,
							"end": 53437,
							"senti": "None",
							"sent_no": 10,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "아예",
							"first_sentence": "true",
							"quiet_time": 1,
							"start": 54217,
							"end": 54607,
							"senti": "None",
							"sent_no": 10,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "내 우선 결코 아이 에이치 음어디 스파이 스위스 안전하게 하라 했든 아예 하루 수렴할게",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 54637,
							"end": 62921,
							"senti": "None",
							"sent_no": 11,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "아니다했어",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 63191,
							"end": 63731,
							"senti": "None",
							"sent_no": 11,
							"confidence": 0
					},
					{
							"speaker": "1",
							"name": "B",
							"sentence": "웩스너이냐 헬스 미열 스타 매커얌 엔와이씨 아트 비유탕 아이메스 마이너스다 맥주만 사 프사 마이호우 말이 뭐지",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 63761,
							"end": 73901,
							"senti": "None",
							"sent_no": 12,
							"confidence": 0
					},
					{
							"speaker": "0",
							"name": "A",
							"sentence": "집",
							"first_sentence": "true",
							"quiet_time": 0,
							"start": 73931,
							"end": 74321,
							"senti": "None",
							"sent_no": 12,
							"confidence": 0
					},
				];
				this.previewText.push(...previewList);
				this.serverFileNameList.push('temp_file_name');
				for (let t of this.previewText) {
					t.minStart = this.msToMin(t.start);
					t.minEnd = this.msToMin(t.end);
				}
				console.log(this.previewText);
				this.preview = true;
			}
    },
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
.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child) {
	margin-bottom: 15px;
}
.dragContainer {
	border: 1px solid #dfdfdf;
	margin: 10px;
	height: 202px;
	overflow-x: hidden;
	border-radius: 10px;
}

.emptyFileName {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
}
.emptyFileName:hover {
	border: 5px solid #2195f3;
	// background-color: #2195f36c;
}
.fileItem {
	padding: 10px 20px;
	display: flex;
	align-items: center;
	flex-basis: 1;
	border: 1px solid #dfdfdf;
	border-radius: 10px;
	background-color: #f8faffb0
}
.fileItem:hover {
	background-color: #2195f36c;
	cursor: url('../assets/delete.png'), auto;
}
.plainChip {
	background: transparent !important;
}
.chip-overflow{
	max-width: 95%;
	padding: 2px 5px;
}
:v-deep(.v-chip__content) {
	display: inline-block !important;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
:v-deep(.v-chip__close) {
position: absolute;
top: 5px;
right: 0;
width: 24px;
}


@media screen and (min-width: 768px) {
.form-header{
	p {
		display: block;
		text-align: center;
	}
}
}
</style>