<template>
<div style="width: 100%;">
	<section class="my-10">
		<v-row class="mx-auto mt-10">
			<v-col cols="12" class="mb-5 text-lg-center subtitle-col">
				<h1>Finger express는...</h1>
				<p class="text-subtitle-1 mb-0">녹음된 파일을 정확한 텍스트로 만들어 드립니다</p>
			</v-col>
			<v-col class="mx-auto" cols="12" md="6" v-for="(service, i) in services" :key="i">
				<v-card
					:class="{'ml-auto': i==0 || i==2}"
					class="pa-3"
					height="348px"
					max-width="445px"
				>
					<v-img
						:src=service.img
						height="200px"
						contain
					></v-img>
					<v-card-title style="margin-top: 5px; border-top: 1px solid grey;">
						{{service.title}}
					</v-card-title>
					<v-card-subtitle>
						{{service.desc}}
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</section>
	<section class="my-16">
		<v-row class="mx-auto">
			<v-col cols="12" class="mb-5 text-lg-center subtitle-col">
				<h1>Finger express의 프로세스</h1>
				<p class="text-subtitle-1 mb-0">작업은 다음의 순서로 진행됩니다</p>
			</v-col>
			<v-col v-for="(process, i) in processes" :key="i">
				<v-card
					class="mx-auto"
					max-width="344"
				>
					<v-img
						contain
						:src=process.img
						height="200px"
					></v-img>
					<v-card-title class="process-title">
						{{process.title}}
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</section>
</div>
</template>

<script>
export default {
	name: 'HomeProcess',
		data: () => ({
			services: [
				{
					img: require("../assets/service/choice.png"),
					title: "원하는 부분만 골라서 작업",
					desc: "불필요한 부분을 덜어내고, 원하는 부분만을 정확하게 텍스트로 만들어드립니다."
				},
				{
					img: require("../assets/service/shield.png"),
					title: "완벽한 4중 보안",
					desc: "가장 높은 수준의 보안을 4중 잠금장치로 제공합니다."
				},
				{
					img: require("../assets/service/certificate.png"),
					title: "국가공인 속기사 작업",
					desc: "초안 작업부터 최종본까지, 국가공인 속기사가 작업하여 제공합니다."
				},
				{
					img: require("../assets/service/clova.png"),
					title: "최고의 한글음성인식 엔진",
					desc: "네이버 클로바 음성인식을 사용하여, 빠르게 속기록 작업을 진행합니다."
				},
			],
			processes: [
				{
					img: require("../assets/process/cloud-computing.png"),
					title: "파일 업로드",
				},
				{
					img: require("../assets/process/chip.png"),
					title: "AI 음성인식(lite)",
				},
				{
					img: require("../assets/process/select.png"),
					title: "작업구간 선택",
				},
				{
					img: require("../assets/process/cashless-payment.png"),
					title: "온라인 결제",
				},
				{
					img: require("../assets/process/clova_B.png"),
					title: "AI 음성인식 (CLOVA)",
				},
				{
					img: require("../assets/process/typing.png"),
					title: "타이핑",
				},
				{
					img: require("../assets/process/clerk-with-tie.png"),
					title: "고객 검수",
				},
				{
					img: require("../assets/process/revision.png"),
					title: "최종 수정",
				},
				{
					img: require("../assets/process/diploma.png"),
					title: "검수 & 공증",
				},
			]
		}),
		methods: {
			clicked() {
				this.$emit('clicked', true);
			}
		}
}
</script>

<style lang="scss" scoped>

.v-card__title.process-title {
	margin-top: 10px;
	color: white;
	background-color: #ff6f00;
	justify-content: center;
}
</style>