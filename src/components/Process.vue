<template>
<div style="width: 100%;">
	<section class="my-10">
		<v-row class="mx-auto mt-10">
			<v-col cols="12" class="mb-5 text-lg-center subtitle-col">
				<h2>Finger express는...</h2>
				<p class="text-subtitle-1 mb-0">녹음된 파일을 정확한 텍스트로 만들어 드립니다</p>
			</v-col>
			<v-col class="mx-auto" cols="12" md="6" v-for="(service, i) in services" :key="i">
				<v-card
					:class="{'ml-auto': i==0 || i==2}"
					class="pa-3"
					height="348px"
					max-width="445px"
					:data-aos="i === 0 || i === 2 ? 'fade-right' : 'fade-left'"
					data-aos-duration="2000"
					data-aos-anchor-placement="top-bottom"
				>
					<v-img
						:src=service.img
						height="180px"
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
	<section class="my-16"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
		<v-row class="mx-auto">
			<v-col cols="12" class="mb-5 text-lg-center subtitle-col">
				<h2>Finger express의 프로세스</h2>
				<p class="text-subtitle-1 mb-0">작업은 다음의 순서로 진행됩니다</p>
			</v-col>
			<v-col v-for="(process, i) in processes" :key="i">
				<v-card
					class="mx-auto"
					max-width="344"
					data-aos="zoom-in"
					data-aos-duration="2000"
					data-aos-anchor-placement="top-bottom"
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
				title: "증거자료 제출가능한 녹취록",
				desc: "초안 작업부터 최종본까지, 자격증을 가지고 다수의 경험을 통한 베테랑 분들이 작성 후 공증까지 해드리는 서비스를 제공해드립니다."
			},
			{
				img: require("../assets/service/text-to-speech.png"),
				title: "최고의 한글음성인식 엔진",
				desc: "다수의 다양한 음성파일 인식 및 AI 분야 전문가들이 만든, 빠르고 저렴한 가격으로 속기록 작업을 진행해 드립니다."
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
				img: require("../assets/process/ai.png"),
				title: "AI 음성인식",
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