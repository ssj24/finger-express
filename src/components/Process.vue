<template>
<div style="width: 100%;">
	<section class="my-10">
		<v-row class="mx-auto mt-10">
			<v-col cols="12" class="mb-5 text-lg-center">
				<h2>제품 특징</h2>
			</v-col>
			<v-col class="mx-auto" cols="12" md="6" v-for="(service, i) in services" :key="i">
				<v-card
					:class="{'ml-auto': i==0 || i==2}"
					class="pa-0"
					height="348px"
					max-width="445px"
					elevation="0"
					:data-aos="i === 0 || i === 2 ? 'fade-right' : 'fade-left'"
					data-aos-duration="2000"
					data-aos-anchor-placement="top-bottom"
				>
					<v-img
						:src=service.img
						height="180px"
						contain
					></v-img>
					<v-card-title style="margin-top: 5px; font-weight: 900;">
						{{service.title}}
					</v-card-title>
					<v-card-subtitle class="pb-0" >
						{{service.desc}}
					</v-card-subtitle>
					<v-card-subtitle class="pt-0" >
						{{service.desc2}}
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</section>
	<section class="my-16"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
		<v-row class="mx-auto">
			<v-col cols="12" class="mb-5 text-lg-center">
				<h2>녹취록 작성 프로세스</h2>
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
				img: require("../assets/service/feat_01.svg"),
				title: "원하는 부분만 골라서 신청",
				desc: "불필요한 부분은 제외하고 신청하실 수 있도록,",
				desc2: "음성인식을 통하여 원하는 부분만 쉽게 골라서 신청할 수 있습니다."
			},
			{
				img: require("../assets/service/feat_02.svg"),
				title: "완벽한 4중 보안",
				desc: "가장 높은 수준의 보안을 4중 잠금장치로 제공합니다.",
				desc2: "KTL Privacy 인증을 획득한 finger.ai 엔진을 활용합니다.",
			},
			{
				img: require("../assets/service/feat_03.svg"),
				title: "증거자료 제출 가능한 녹취록",
				desc: "초안 작업부터 최종본까지, 자격증을 가지고 다수의 경험을 통한",
				desc2: "베테랑 분들이 작성 후 공증까지 해드리는 서비스를 제공해드립니다.",
			},
			{
				img: require("../assets/service/feat_04.svg"),
				title: "최고의 음성인식 엔진",
				desc: "다양한 음성파일이 사용가능한 최고의 음성인식 엔진을 사용합니다.",
				desc2: "(동영상으로도 녹취록 작성이 가능합니다.)",
			},
		],
		processes: [
			{
				img: require("../assets/process/process_01.svg"),
				title: "파일 업로드",
			},
			{
				img: require("../assets/process/process_02.svg"),
				title: "AI 음성인식(lite)",
			},
			{
				img: require("../assets/process/process_03.svg"),
				title: "작업구간 선택",
			},
			{
				img: require("../assets/process/process_04.svg"),
				title: "온라인 결제",
			},
			{
				img: require("../assets/process/process_05.svg"),
				title: "AI 음성인식",
			},
			{
				img: require("../assets/process/process_06.svg"),
				title: "타이핑",
			},
			{
				img: require("../assets/process/process_07.svg"),
				title: "고객 검수",
			},
			{
				img: require("../assets/process/process_08.svg"),
				title: "최종 수정",
			},
			{
				img: require("../assets/process/process_09.svg"),
				title: "검수 & 공증",
			},
			{
				img: require("../assets/process/process_10.svg"),
				title: "고객 수령",
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