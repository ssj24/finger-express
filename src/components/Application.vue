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
			<br>
			<p style="font-weight: 900; font-size: 17px;">기본(5분 이내) 30,000 추가 분당 5,000</p>
		</div>
	</v-row>
	<v-row class="form-contents py-16 mx-0 flex-grow-1">
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
								value="email"
							></v-radio>
							<v-radio
								label="등기배송 (+10,000원)"
								value="regist"
							></v-radio>
							<v-radio
								label="등기배송 + CD (+17,000원)"
								value="regist_cd"
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
							하나당 최대 100MB의 파일을 10개까지 첨부하실 수 있습니다.
						</v-card-subtitle>
						<v-form
							ref="form"
							lazy-validation
						>
							<!-- 파일 업로드 -->
							<v-row class="px-5">
								<v-col cols="6" md="4" class="pb-0"
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
										:clearable=false
									>
									</v-file-input>
								</v-col>
								<v-col cols="4" offset-md="6" md="2" class="d-flex justify-center align-center mb-4">
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
										width="50%"
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
										<v-row v-if="!files.length" class="emptyFileName pa-5 no-gutters">
											<img src="../assets/file_upload.png" alt="file" width="30">
											<p class="mt-5">파일을 마우스로 끌어서 업로드 가능합니다.</p>
											<p>여러개를 업로드하면 하나의 문서로 묶어 드립니다.</p>
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
														<span class="deleteFile">x</span>
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
					<Loading v-if="isComplete"/>
					<Sentences v-else :previewText="previewText" :showPreview="preview" @validateClicked="validate"/>

				</v-col>
			</v-row>
		</v-col>
	</v-row>
</div>
<Payment v-else-if="mode === 3" :formData="formData" :files="files" class="d-flex align-center justify-center my-12" />
</template>

<script>
import Loading from './Loading.vue';
import Payment from './Payment.vue';
import Sentences from './Sentences.vue';

export default {
    name: 'applicationComponent',
    components: {
			Loading,
      Payment,
			Sentences,
    },
		props: {
		},
    data: () => {
			let previewText = {};
			let clientMail = 'client@test.com';
			let currentFile = '';
			return {
				mode: 2,
				clientMail,
				delivery: 'email',
				authentication: false,
				uploadFiles: [],
				files: [],
				fileRules: [
					v => !!v || '파일을 등록해주세요'
				],
				preview: false,
				previewText,
				currentFile,
				isLoading: false,
				isComplete: false,
				formData: {},
			}
    },
    methods: {
			getTimeFormat() {
				function pad(n) { return n<10 ? "0"+n : n }
				const d=new Date()
				return `${d.getFullYear()}`.concat(pad(d.getMonth()+1), pad(d.getDate()), pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()));
			},
      validate (val) {
				console.log(val);
				this.isComplete = true;
        if (this.files.length) {
					// modifiedVal = val.map(x => x.total_duration = this.previewText[0])
					this.formData = {
						message: 'order_regist',
						client_mail: this.clientMail,
						delivery: this.delivery,
						notarial: this.authentication,
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

					this.$http({					// axios 통신 시작
          url: "https://exp.finger.solutions/api/OrderRegist/ ",	// back 서버 주소
          method: "POST",
					data: this.formData,
					headers: {
						'Content-Type': 'application/json'
					}
        }).then(res => {				// back 서버로부터 응답받으면
            console.log(res);		// back 서버에서 보낸 message 출력
						if (res.statusText === 'OK') {
							this.isComplete = false;
							this.$emit('changeMode', 3);

						}
        }).catch(err => console.log(err));
				}
      },
      reset () {
        this.$refs.form.reset();
      },
			showFile(newFiles) {
				// if (this.files.length) {
				// 	newFiles = newFiles.filter(x => {
				// 		this.files.every(({name}) => {
				// 			console.log(name, x.name)
				// 			x.name !== name
				// 			} )
				// 	});
				// 	console.log(newFiles)
				// }
				if (newFiles.length) {
					window.URL = window.URL || window.webkitURL;
					let video = document.createElement('video');
					for (const f of newFiles) {
						video.addEventListener('loadedmetadata', () => {
							window.URL.revokeObjectURL(video.src);
							f.duration = video.duration;
						});
						video.preload = 'metadata';
						video.src = URL.createObjectURL(f);
						f.sizeInMB = (f.size / (1024*1024)).toFixed(2);
						this.files.push(f);
					}
					this.showPreview();
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
				this.isComplete = true;

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
				this.$http({					// axios 통신 시작
					url: "https://exp.finger.solutions/sttapi/ReviewStt/",	// back 서버 주소
					method: "POST",
					data: this.formData,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(res => {				// back 서버로부터 응답받으면
				console.log(res)
						if (res.statusText === 'OK') { //client_id와 비교 필요
							for (const filedata of res.data) {
								this.previewText[filedata.file_name] = filedata.sentence;
								for (let s of this.previewText[filedata.file_name]) {
									s.minStart = this.msToMin(s.start);
									s.minEnd = this.msToMin(s.end);
								}
							}
							// this.serverFileNameList.push(res.data[0].file_name);
							const previewKeys = Object.keys(this.previewText);
							this.currentFile = previewKeys[previewKeys.length -1];
							console.log('current', this.previewText[this.currentFile]);
							this.preview = true;
							this.isComplete = false;

						}
				}).catch(err => console.log(err));
				}

			},
			tempPreview() {
				
				this.previewText = {
					"temp_file_name": [
							{
									"speaker": "0",
									"name": "A",
									"sentence": "temp_file_name주민 키면 뭐하러 여기서 내가",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 334,
									"end": 2194,
									"senti": "None",
									"sent_no": 1,
									"confidence": 0,
									"minStart": "0:00",
									"minEnd": "0:02"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "헤어페이퍼라서",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 2224,
									"end": 3184,
									"senti": "None",
									"sent_no": 1,
									"confidence": 0,
									"minStart": "0:02",
									"minEnd": "0:03"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "마스킹 유해은",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 6395,
									"end": 7355,
									"senti": "None",
									"sent_no": 2,
									"confidence": 0,
									"minStart": "0:06",
									"minEnd": "0:07"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "누구야 월급 괴롭히기는 해요",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 7385,
									"end": 8705,
									"senti": "None",
									"sent_no": 2,
									"confidence": 0,
									"minStart": "0:07",
									"minEnd": "0:09"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "좋아요 뱅헤어",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 11967,
									"end": 12687,
									"senti": "None",
									"sent_no": 3,
									"confidence": 0,
									"minStart": "0:12",
									"minEnd": "0:13"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "비탄 마저",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 12747,
									"end": 13377,
									"senti": "None",
									"sent_no": 3,
									"confidence": 0,
									"minStart": "0:13",
									"minEnd": "0:13"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "이수 예단 에쓰 파 취합 오행산 스피커 한번만 이수 열변엔느 파업 어디 나와 지인계약을 오잉타스틱 하먼과",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 13407,
									"end": 27108,
									"senti": "None",
									"sent_no": 4,
									"confidence": 0,
									"minStart": "0:13",
									"minEnd": "0:27"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "이수요",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 27138,
									"end": 27678,
									"senti": "None",
									"sent_no": 4,
									"confidence": 0,
									"minStart": "0:27",
									"minEnd": "0:28"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "네",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 27738,
									"end": 28158,
									"senti": "None",
									"sent_no": 5,
									"confidence": 0,
									"minStart": "0:28",
									"minEnd": "0:28"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "다",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 28188,
									"end": 28518,
									"senti": "None",
									"sent_no": 5,
									"confidence": 0,
									"minStart": "0:28",
									"minEnd": "0:29"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "우리은행에서 매우 이오에스 바운스 봐",
									"first_sentence": "true",
									"quiet_time": 4,
									"start": 32062,
									"end": 34132,
									"senti": "None",
									"sent_no": 6,
									"confidence": 0,
									"minStart": "0:32",
									"minEnd": "0:34"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "이화학 TV 하우스에 입",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 37496,
									"end": 38936,
									"senti": "None",
									"sent_no": 6,
									"confidence": 0,
									"minStart": "0:37",
									"minEnd": "0:39"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "에 한도가격을웨이 일요닐에는 이와여야지",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 38966,
									"end": 44769,
									"senti": "None",
									"sent_no": 7,
									"confidence": 0,
									"minStart": "0:39",
									"minEnd": "0:45"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "네 야 브이 와이프 아이 하여튼 마우스 그 앞에 이 샵 근데 형 그 엑세스요 일이 네 암 그렇고 가을 인근에 한 그 리플 아이스",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 47992,
									"end": 61866,
									"senti": "None",
									"sent_no": 7,
									"confidence": 0,
									"minStart": "0:48",
									"minEnd": "1:02"
							}
					],
					"AL-14_20230106132305.mp3": [
							{
									"speaker": "0",
									"name": "A",
									"sentence": "주민 키면 뭐하러 여기서 내가",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 334,
									"end": 2194,
									"senti": "None",
									"sent_no": 1,
									"confidence": 0,
									"minStart": "0:00",
									"minEnd": "0:02"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "헤어페이퍼라서",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 2224,
									"end": 3184,
									"senti": "None",
									"sent_no": 1,
									"confidence": 0,
									"minStart": "0:02",
									"minEnd": "0:03"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "마스킹 유해은",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 6395,
									"end": 7355,
									"senti": "None",
									"sent_no": 2,
									"confidence": 0,
									"minStart": "0:06",
									"minEnd": "0:07"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "누구야 월급 괴롭히기는 해요",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 7385,
									"end": 8705,
									"senti": "None",
									"sent_no": 2,
									"confidence": 0,
									"minStart": "0:07",
									"minEnd": "0:09"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "저 알 뱅헤어",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 11967,
									"end": 12687,
									"senti": "None",
									"sent_no": 3,
									"confidence": 0,
									"minStart": "0:12",
									"minEnd": "0:13"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "비탄 마저",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 12747,
									"end": 13377,
									"senti": "None",
									"sent_no": 3,
									"confidence": 0,
									"minStart": "0:13",
									"minEnd": "0:13"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "이수 예단 에쓰 파 취합 오행산 스피커 한번만 이수 열변엔느 파업 어디 나와 지인계약을 오잉타스틱 하먼과",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 13407,
									"end": 27108,
									"senti": "None",
									"sent_no": 4,
									"confidence": 0,
									"minStart": "0:13",
									"minEnd": "0:27"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "이수요",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 27138,
									"end": 27678,
									"senti": "None",
									"sent_no": 4,
									"confidence": 0,
									"minStart": "0:27",
									"minEnd": "0:28"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "네",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 27738,
									"end": 28158,
									"senti": "None",
									"sent_no": 5,
									"confidence": 0,
									"minStart": "0:28",
									"minEnd": "0:28"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "다",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 28188,
									"end": 28518,
									"senti": "None",
									"sent_no": 5,
									"confidence": 0,
									"minStart": "0:28",
									"minEnd": "0:29"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "우리은행에서 매우 이오에스 바운스 봐",
									"first_sentence": "true",
									"quiet_time": 4,
									"start": 32062,
									"end": 34132,
									"senti": "None",
									"sent_no": 6,
									"confidence": 0,
									"minStart": "0:32",
									"minEnd": "0:34"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "이화학 TV 하우스에 입",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 37496,
									"end": 38936,
									"senti": "None",
									"sent_no": 6,
									"confidence": 0,
									"minStart": "0:37",
									"minEnd": "0:39"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "에 한도가격을웨이 일요닐에는 이와여야지",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 38966,
									"end": 44769,
									"senti": "None",
									"sent_no": 7,
									"confidence": 0,
									"minStart": "0:39",
									"minEnd": "0:45"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "네 야 브이 와이프 아이 하여튼 마우스 그 앞에 이 샵 근데 형 그 엑세스요 일이 네 암 그렇고 가을 인근에 한 그 리플 아이스",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 47992,
									"end": 61866,
									"senti": "None",
									"sent_no": 7,
									"confidence": 0,
									"minStart": "0:48",
									"minEnd": "1:02"
							}
					],
					"AL-12_20230106132305.mp3": [
							{
									"speaker": "0",
									"name": "A",
									"sentence": "근데",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 340,
									"end": 580,
									"senti": "None",
									"sent_no": 1,
									"confidence": 0,
									"minStart": "0:00",
									"minEnd": "0:01"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "다음주에 오세요 다른거 알 수 대비얌 근데 왜 전화 하면서 너 왜 이렇게 일이",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 610,
									"end": 7464,
									"senti": "None",
									"sent_no": 1,
									"confidence": 0,
									"minStart": "0:01",
									"minEnd": "0:07"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "인태 형 체험써 선배님",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 7494,
									"end": 12296,
									"senti": "None",
									"sent_no": 2,
									"confidence": 0,
									"minStart": "0:07",
									"minEnd": "0:12"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "읍 이달시아 때 웨이디 시안 무비자 웨이트 폴디 300개요 무비자 시원한 마을 주세요 고객님",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 12326,
									"end": 25314,
									"senti": "None",
									"sent_no": 2,
									"confidence": 0,
									"minStart": "0:12",
									"minEnd": "0:25"
							},
							{
									"speaker": "0",
									"name": "A",
									"sentence": "선배님",
									"first_sentence": "true",
									"quiet_time": 3,
									"start": 28579,
									"end": 28999,
									"senti": "None",
									"sent_no": 3,
									"confidence": 0,
									"minStart": "0:29",
									"minEnd": "0:29"
							},
							{
									"speaker": "1",
									"name": "B",
									"sentence": "그의 무비자빔은 있어요 버릇이",
									"first_sentence": "true",
									"quiet_time": 0,
									"start": 29029,
									"end": 31579,
									"senti": "None",
									"sent_no": 3,
									"confidence": 0,
									"minStart": "0:29",
									"minEnd": "0:32"
							}
					]
			};


				// this.previewText['temp_file_name']=previewList;
				for (let fileData of Object.keys(this.previewText)) {
						for (let i of fileData) {
							i.minStart = this.msToMin(i.start);
							i.minEnd = this.msToMin(i.end);
						}
						this.currentFile = fileData;
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	p {
		margin: 0;
		font-size: 15px;
	}
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
	background-color: #f8faffb0;
	position: relative;
}
.fileItem:hover {
	background-color: #2195f341;
	cursor: pointer;
	.deleteFile {
		display: block;
	}
}

.deleteFile {
	display: none;
	position: absolute;
	right: 20px;
	top: 10px;
	font-weight: 900;
	font-size: 18px;
	color: #FF605C;
	text-shadow: 0 0 1px red;
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