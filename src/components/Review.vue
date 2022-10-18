<template>
	<section class="my-10">
		<v-row class="mx-auto mt-10">
			<v-col cols="12" class="mb-5 text-lg-center subtitle-col">
				<h1>녹취록 작성을 통한 승소 경험</h1>
				<p class="text-subtitle-1 mb-0">
					부당해고, 성희롱, 성추행, 금전 문제, 채권 문제, 법정 재판 녹취록, 이혼 관련, 위자료 관련, 양육권 관련, 상속 관련, 각종 분쟁 관련, <br />
					모욕죄 관련, 종중 관련, 사기 사건 관련, 공갈 및 협박 관련, 욕설 관련 사건 등 녹취록 작성 경험을 통한 다양한 승소 경험 </p>
			</v-col>
			<v-col
				cols="12" md="6"
				class="mx-auto"
				v-for="(review, i) in reviews" :key="i">
				<v-card>
					<v-card-subtitle>
						{{review.content}}
					</v-card-subtitle>
					<v-card-text class="text-end">
						{{review.name}}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</section>
</template>

<script>
export default {
	name: 'HomeReview',
		
		data: () => {
			const firstName = ['김', '박', '이', '조', '최', '김', '부', '정', '강', '유', '한'];
			const lastName = ['솔', '이', '지', '희', '영', '시', '홍', '수', '재', '희', '주', '우', '훈', '리', '송', '경', '민', '리', '백', '현', '나']
			return {
			reviews: [
				{
					content: '경찰서 갔더니 녹취록 해오라고 해서 연락드렸는데 처음이라서 어떻게 하는지 친절한 설명이랑 작성도 잘 해주셔서 만족스러웠습니다 덕분에 모욕죄 관련 사건 잘 해결되었습니다 혼자서 너무 힘들었는데 도움주셔서 감사합니다 ',
					name: firstName[Math.floor(Math.random() * 10)] + '*' + lastName[Math.floor(Math.random() * 20)],
				},
				{
					content: '흑과 백이 있습니다 저는 백처럼 살아 왔다고 생각했는데 사회는 흑도 많더라고요 여기서 증거자료 제출을 의뢰하고 결국 정의가 승리 했습니다 감사합니다 정말 신경 많이 써주시고 소개도 해드릴게요',
					name: firstName[Math.floor(Math.random() * 10)] + '*' + lastName[Math.floor(Math.random() * 20)],
				},
				{
					content: '인테리어와 관련해서 분쟁을 하던 중에 편하게 일 처리를 할 수 있었던 의뢰인입니다방문하고 이런 게 번거롭고 시간도 없었는데 따로 방문 하지 않고 인터넷으로 바로 접수하고 초안 받아보고 최종본 까지 빨리 받아보아서 급했는데 잘 제출 했습니다 친구가 소개해주어서 의뢰했는데 이제는 제가 다른 분들에게 추천을 해주려고요! 혹시나 증거자료로 녹취록이 필요하신 분은 맡겨보세요! 만족 하실 거예요!',
					name: firstName[Math.floor(Math.random() * 10)] + '*' + lastName[Math.floor(Math.random() * 20)],
				},
				{
					content: '인생을 살다가 보면은 정말 다양한 일들이 일어나는데 뉴스를 보다가도 어떻게 이런 사건이 있을수도 있지, 알려지지는 않았지만 생각보다 많습니다 저도 억울하게 당한 사건이라 너무 힘들고 우울해지고 해서 병원도 다니고 하다가힘을 내서 경찰에 고소를 하고 증거를 수집하고 제출하고 증거자료로 녹취록도 제출할려고 찾아보다가 여기에 의뢰 했습니다 일단 제 상황 너무 잘 이해해 주셔서 감사하고 소통도 빠르시고 덕분에 만족스러운 결과 받아보아서 감사합니다 비용도 저렴하게 했네요 . 다음에 또 연락드릴게요 ',
					name: firstName[Math.floor(Math.random() * 10)] + '*' + lastName[Math.floor(Math.random() * 20)],
				},
				{
					content: '법원 제출용 녹취록 맞나요? "네, 증거자료 제출용입니다" 라고 답변을 해주시고 녹취록 작성관련 팁들을 잘 알려주어서 3박자 금액, 작성시간, 만족도 가 다 만족시켜주어서 좋아요 ',
					name: firstName[Math.floor(Math.random() * 10)] + '*' + lastName[Math.floor(Math.random() * 20)],
				},
				{
					content: '단순히 들리는데로 적는게 아니라 내용을 이해하고 적는다는 느낌이 들었습니다 제가 드린 파일은 좀 어려운 전공용어나 관련 영어도 많이 나오는 파일이라서 작성하시기 힘들었을건데 작성 너무 만족스러웠습니다 그래서 비결이 뭐나고 물어보니여기는 각자 맡은 전공 분야가 있어서 더 고객분들이 만족하신다고 하시더라고요 제 사건 덕분에 증거로 잘 제출할 수 있어서 소송에서 큰 도움이 되었습니다 ',
					name: firstName[Math.floor(Math.random() * 10)] + '*' + lastName[Math.floor(Math.random() * 20)],
				},
				{
					content: '회사라서 녹취록을 여러 군데 이용해봤는데, 일정을 잘 지키고, 깔끔하게 작업하는 곳은 처음이였습니다. 첫 작업부터 너무 마음에 들어서 이제 여기서만 의뢰를 맡기고 있습니다. 저희 사내 변호사 분도 만족하시네요',
					name: firstName[Math.floor(Math.random() * 10)] + '*' + lastName[Math.floor(Math.random() * 20)],
				},

			]
		}},
		methods: {
			
		}
}
</script>

<style lang="scss" scoped>

</style>