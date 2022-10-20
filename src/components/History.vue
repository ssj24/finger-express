<template>
	<div v-if = this.$store.state.isLogin class="d-flex flex-column align-center justify-center my-12" style="width: 100%;">
		<v-row class="main-row mb-3" >
			<v-col cols="12">
				<h1 class="text-h4 text-md-h3 text-start">{{ this.$store.state.name ? this.$store.state.name : username }}<span class="text-h5 text-md-h4">님의 주문 내역</span></h1>
			</v-col>
		</v-row>
			<v-col cols="11" md="8">
				<v-card class="historyContainer" v-for="(history, i) in histories" :key="i">
					<!-- 현재 진행 중인 주문 -->
					<section>
						<v-card-subtitle class="pb-0 pt-7 pl-3 pl-md-12">
							<v-row>
								<v-col cols="12" md="4" lg="3">
									주문 일자: {{history.date}}
								</v-col>
								<v-col cols="12" md="6" lg="3" v-if="history.complete">
									종료 일자: {{history.complete}}
								</v-col>
							</v-row>
						</v-card-subtitle>
						<v-card-title class="py-0 px-12 font-weight-black text-truncate d-block">
							{{history.file.fileName}}
						</v-card-title>
						<v-stepper  alt-labels v-model="history.step" class="px-5 pb-5" style="box-shadow: none;">
							<v-stepper-header style="box-shadow: none;">
								<span
									v-for="(aStep, j) in steps" :key="j"
								>
									<v-stepper-step
										:complete="history.step > j-1"
										:step=j+1
										class="px-0 text-body-1"
									>
										<v-icon>
											{{steps[j].icon}}
										</v-icon>
										{{steps[j].title}}
									</v-stepper-step>
								</span>
							</v-stepper-header>
						</v-stepper>
					</section>
				</v-card>
			</v-col>
	</div>
	<Login v-else class="d-flex flex-column align-center justify-center my-12"></Login>
</template>

<script>
import Login from './Login.vue';
export default {
    name: 'checkHistory',
		components: {
			Login
		},
		data: () => ({
			userName: 'tebah',
			histories: [
				{
					name: 'tebah',
					date: '2022/10/13',
					file: {
						fileName: 'recent.mp4',
						fileSize: '24MB'
					},
					step: 1,
					complete: null
				},
				{
					name: 'tebah',
					date: '2022/10/07',
					file: {
						fileName: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nam molestias id, quaerat sint minima, fugit mollitia doloribus, ut totam libero nisi possimus? Illum eaque quaerat, tempora numquam impedit optio.mp4',
						fileSize: '14MB'
					},
					step: 3,
					complete: '2022/10/17'
				},
				{
					name: 'tebah',
					date: '2022/10/07',
					file: {
						fileName: 'test.mp4',
						fileSize: '14MB'
					},
					step: 4,
					complete: '2022/10/17'
				},
				{
					name: 'tebah',
					date: '2022/10/07',
					file: {
						fileName: 'test.mp4',
						fileSize: '14MB'
					},
					step: 4,
					complete: '2022/10/17'
				},
				{
					name: 'tebah',
					date: '2022/10/07',
					file: {
						fileName: 'test.mp4',
						fileSize: '14MB'
					},
					step: 4,
					complete: '2022/10/17'
				},
				{
					name: 'tebah',
					date: '2022/10/07',
					file: {
						fileName: 'test.mp4',
						fileSize: '14MB'
					},
					step: 4,
					complete: '2022/10/17'
				},
			],
			steps: [
				{
					title: '결제 완료',
					icon: 'mdi-credit-card-multiple',
				},
				{
					title: '속기사 작업 중',
					icon: 'mdi-keyboard',
				},
				{
					title: '고객 검수 중',
					icon: 'mdi-human-male',
				},
				{
					title: '속기사 마무리 작업 중',
					icon: 'mdi-keyboard',
				},
				{
					title: '완료',
					icon: 'mdi-certificate',
				},
			]
		}),
}
</script>

<style lang="scss" scoped>
.v-stepper__step__step.primary + .v-stepper__label i {
	color: #ff985d;
}
</style>