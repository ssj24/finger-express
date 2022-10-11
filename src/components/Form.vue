<template>
<div class="d-flex flex-column align-center justify-center">
	<v-col cols="11" md="8" lg="6">
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
			class="my-10"

		>
			<v-text-field
				v-model="name"
				:counter="10"
				:rules="nameRules"
				label="이름"
				required
			></v-text-field>

			<v-text-field
				v-model="email"
				:rules="emailRules"
				label="이메일"
				required
			></v-text-field>
			<!-- 주소 -->
			<v-row>
				<v-col cols="9" md="10">
					<v-row>
						<v-col cols="4" md="3">
							<v-text-field
								v-model="postcode"
								label="우편번호"
								required
							></v-text-field>
						</v-col>
						<v-col>
							<v-text-field
								v-model="address"
								:rules="addressRules"
								label="주소"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-text-field
						v-model="extraAddress"
						label="상세주소"
						required
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

			<v-select
				v-model="select"
				:items="delivery"
				:rules="[v => !!v || '하나를 선택해주세요']"
				label="배송 방식"
				required
			></v-select>
			<!-- 파일 업로드 -->
			<v-row class="pa-0">
				<v-col cols="9" md="10"
				>
				<v-file-input
					v-model="file"
					color="orange accent-4"
					class="pa-0"
					counter
					label="파일 업로드"
					accept="audio/*, video/*"
					@change="uploadHandler"
					placeholder="음성 파일을 선택해주세요"
					:rules="fileRules"
					id="fileInput"
				>
				</v-file-input>
				</v-col>
				<v-col cols="3" md="2" class="d-flex justify-center align-center mb-4">
					<v-btn
						width="100%"
						color="accent"
						outlined
						@click="showPreview"
						:disabled="file == null ? true : false"
					>
						미리보기
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
					<v-card @drop="dragFile" class="pa-5 d-flex justify-center align-center dragContainer">
						<span v-if="!file">
							<v-icon left>
								mdi-music-note-plus
							</v-icon>파일을 드래그해서 추가해주세요
						</span>
						<span v-else>
						<v-chip
							color="accent"
							class="col-11 chip-overflow"
							style="line-height: 100%;"
							label
						>
							{{ file.name }}
						</v-chip>
						<p>{{file.sizeInMB}}MB</p>
						</span>
					</v-card>
				</v-col>
			</v-row>
			<!-- 녹취록 -->
			<v-row v-if="preview">
				<v-card
					class="mx-auto my-5 previewContainer"
					max-width="800"
					max-height="500"
				>
					<v-card-text>
						<h2 class="text--primary font-class my-8">
							녹취록 미리보기
						</h2>
						<v-row>
							<v-col class="d-flex justify-end">
								<v-btn :class="{primary : selectWhole}" @click="selectWhole = true">전체 선택하기</v-btn>
								<v-btn :class="{primary : !selectWhole}" @click="selectWhole = false">구간 선택하기</v-btn>
							</v-col>
						</v-row>
						<div class="text--primary" id="previewCheckboxes" v-for="(text, i) in previewText" :key="i" max-height="600px">
							<input
								type="checkbox"
								v-model="selected"
								:value=i
								class="previewCheckbox"
								:id="'previewCheck-'+i"
								@change="checkboxClicked"
								disabled
							/>
							<label :for="'previewCheck-'+i" class="previewLabel">
								<span v-if="selectWhole && i==0"></span>
								<v-card v-else-if="!selectWhole && i==0" class="disabledLabel mt-5">
									<v-card-subtitle>원하시는 구간을 클릭해주세요</v-card-subtitle>
								</v-card>
								<v-card v-else class="px-5 previewLabelCard my-5" shaped>
										<v-card-subtitle>
											<v-row>
												<v-chip
													:ripple="false"
													class="ma-2"
													color="primary"
													label
													outlined
												>
													<v-icon left>
														mdi-clock
													</v-icon>
													{{text.start}}
												</v-chip>
												<v-chip
													class="my-2 plainChip"
													color="grey--darken-4"
													label
												>
													<v-icon left>
														mdi-account-circle-outline
													</v-icon>
													{{text.name}}
												</v-chip>
											</v-row>
										</v-card-subtitle>
										<v-row>
											<v-col>
												<p class="">{{text.sentence}}</p>
											</v-col>
										</v-row>
								</v-card>
								<!-- <v-icon>
									mdi-arrow-down-drop-circle-outline
								</v-icon> -->
							</label>
						</div>
					</v-card-text>
				</v-card>
			</v-row>
			<v-checkbox
				v-model="checkbox"
				:rules="[v => !!v || '동의하지 않으시면 다음 단계로 넘어갈 수 없습니다']"
				label="이용약관"
				required
			></v-checkbox>
			<!-- 하단 버튼 -->
			<v-row class="d-flex justify-end">
				<v-col class="d-flex justify-end pr-0">
					<v-btn
						plain
						class="pa-0"
						@click="reset"
					>
						<v-img
							alt="reset"
							class="shrink mr-2"
							contain
							src="../assets/undo-arrow.png"
							transition="scale-transition"
							width="20"
						/>
					</v-btn>
				</v-col>
				<v-col cols="4" md="2">
					<v-btn
						width="100%"
						:disabled="!valid"
						color="accent"
						class="mr-4"
						@click="validate"
					>
						등록
					</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-col>
</div>
</template>

<script>
export default {
    name: 'applicationForm',
    props: {
      
    },

    data: () => {
			let previewText = [
				// {
				// 	"speaker": speaker, 
				// 	"name": chr(ord(speaker) + 17), 
				// 	"sentence": cur_text, 
				// 	"first_sentence": "false",
				// 	"quiet_time": 0, 
				// 	"start": start_time, 
				// 	"end": end_time, 
				// 	"senti": "None", 
				// 	"sent_no": 0,
				// 	"sent_sub": 0, 
				// 	"confidence": sent_confidence
				// },
				{},
				{
					"start": "0001",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "abc1",
					"sent_no": 0
				},
				{
					"start": "0005",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "abc1",
					"sent_no": 1
				},
				{
					"start": "0007",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "zzz2",
					"sent_no": 2
				},
				{
					"start": "0009",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "abc1",
					"sent_no": 3
				},
				{
					"start": "0012",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "zzz2",
					"sent_no": 4
				},
				{
					"start": "0014",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "abc1",
					"sent_no": 5
				},
				{
					"start": "0017",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "abc1",
					"sent_no": 6
				},
				{
					"start": "0019",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "zzz2",
					"sent_no": 7
				},
				{
					"start": "0021",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "abc1",
					"sent_no": 8
				},
				{
					"start": "0022",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "zzz2",
					"sent_no": 9
				},
				{
					"start": "0023",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "333",
					"sent_no": 10
				},
				{
					"start": "0025",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "zzz2",
					"sent_no": 11
				},
				{
					"start": "0026",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "abc1",
					"sent_no": 12
				},
				{
					"start": "0030",
					"sentence": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",
					"name": "333",
					"sent_no": 13
				},
			];
			let postcode = '';
			let detailAddress = '';
			return {
				valid: true,
				name: '',
				nameRules: [
					v => !!v || '이름을 입력해주세요',
					v => (v && v.length <= 10) || '10자 이내로 입력해주세요',
				],
				email: '',
				emailRules: [
					v => !!v || '이메일을 입력해주세요',
					v => /.+@.+\..+/.test(v) || '유효한 이메일 주소가 아닙니다',
				],
				postcode,
				address: postcode ? postcode + ')' + detailAddress : '',
				addressRules: [
					v => !!v || '주소를 입력해주세요'
				],
				extraAddress: '',
				select: null,
				delivery: ['이메일', '등기'],
				file: null,
				fileRules: [
					v => !!v || '파일을 등록해주세요'
				],
				preview: false,
				selectWhole: true,
				selected: [],
				previewText,
				checkbox: false,
			}
    },
		watch: {
      selectWhole(newVal) {
				const checkboxes = document.querySelectorAll('.previewCheckbox');
				const labels = document.querySelector('.previewContainer').querySelectorAll('label');
				if (newVal) {
					for (let i=1; i<labels.length; i++) {
						labels[i].children[0].classList.remove("blue-grey");
						labels[i].children[0].classList.remove("lighten-4");
					}
					this.selected = [];
				}
				for (const box of checkboxes) {
					box.disabled = newVal;
				}
      },
			selected(newVal) {
				console.log(newVal);
			}
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
					let formData = {
						name: this.name,
						email: this.email,
						postcode: this.postcode,
						address: this.address + this.extraAddress,
						delivery: this.select==='이메일' ? 'd1' : 'd2',
						file: this.file
					}
					console.log(formData);
				}
      },
      reset () {
        this.$refs.form.reset();
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
			showFile() {
				this.file.sizeInMB = (this.file.size / (1024*1024)).toFixed(2);
			},
			uploadHandler(e) {
				this.file = e;
				this.showFile();
				// let file = {
				// 	name: '뱃살 빨리 빠지게 만드는 운동 2 weeks challenge.mp4', 
				// 	lastModified: 1609675231000, 
				// 	webkitRelativePath: '', 
				// 	size: 44927661
				// }
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
			dragFile(e) {
        this.file = e.dataTransfer.files[0];
				this.showFile();
      },
			showPreview() {
				this.preview = true;
			},
			changeLabel(start, end, arr, empty=null) {
				// let startLabelChip = document.querySelector(`label[for="previewCheck-${start}"]`).children[1];
				// startLabelChip.classList.toggle('mdi-arrow-down-drop-circle-outline');
				// startLabelChip.classList.toggle('mdi-arrow-right-drop-circle');
				// startLabelChip.classList.toggle('primary--text');
				// let endLabelChip = document.querySelector(`label[for="previewCheck-${end-1}"]`).children[1];
				// endLabelChip.classList.toggle('mdi-arrow-down-drop-circle-outline');
				// endLabelChip.classList.toggle('mdi-arrow-left-drop-circle');
				// endLabelChip.classList.toggle('primary--text');

				for (let i=1; i<arr.length; i++) {
					let selectedLabelCard = document.querySelector(`label[for="previewCheck-${arr[i].value}"]`).children[0];
					if (empty) {
						selectedLabelCard.classList.remove("blue-grey");
						selectedLabelCard.classList.remove("lighten-4");
					} else if (start <= arr[i].value && arr[i].value < end) {
						selectedLabelCard.classList.add("blue-grey");
						selectedLabelCard.classList.add("lighten-4");
					} else if (start <= arr[i].value && arr[i].value >= end) {
						selectedLabelCard.classList.remove("blue-grey");
						selectedLabelCard.classList.remove("lighten-4");
					}
				}
			},
			checkboxClicked() {
				// let targetId = e.target.id;
				// let targetVal = e.target.value;
				// let targetLabel = document.getElementById(targetId).parentElement.querySelector(".previewLabel");
				let previewCheckboxes = document.querySelectorAll('.previewCheckbox');
				let previewCheckboxesArray = Array.from(previewCheckboxes);
				if (!this.selected.length) {
					this.changeLabel(0, previewCheckboxesArray.length, previewCheckboxesArray, true);
				}
				let sortedSelect = this.selected.sort(function(a, b){return a-b});
				sortedSelect.forEach((x, i) => {
					if(i % 2 == 1) {
						this.changeLabel(sortedSelect[i-1], x, previewCheckboxesArray);
					} else if (i == sortedSelect.length -1) {
						console.log('last');
						this.changeLabel(x, previewCheckboxesArray.length, previewCheckboxesArray);
					}
				});
      },
    },

}
</script>

<style lang="scss" scoped>
.dragContainer {
	height: 150px;
}
.plainChip {
	background: transparent !important;
}
.chip-overflow{
	max-width: 95%;
	padding: 2px 5px;
}
::v-deep .v-chip__content {
	display: inline-block !important;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
::v-deep .v-chip__close {
position: absolute;
top: 5px;
right: 0;
width: 24px;
}

.previewContainer {
	max-width: 800px;
	max-height: 500px;
	overflow: auto;
}
.font-class {
	font-family: 'S-CoreDream-3Light',  sans-serif;
	font-weight: 500;
	text-align: center;
}
.previewCheckbox {
	display: none;
}

.previewCheckbox:checked + label {
	backdrop-filter: grayscale(10%);
}
.previewCheckbox:disabled + label {
	pointer-events: none;
}
label:hover {
	cursor: pointer;
}
.disabledLabel {
	pointer-events: none;
}
</style>