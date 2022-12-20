<template>
  <!-- 녹취록 -->
  <v-row v-if="showPreview" class="flex-column">
    <v-card color="grey lighten-4" elevation="6" class="mx-auto mt-5" style="width: 800px; margin-bottom: 1px;">
      <v-card-text class="text-subtitle-1">
        원하시는 구간을 설정해주세요
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto mt-0 mb-5 previewContainer"
      max-width="800"
      max-height="500"
    >
      <v-card-text>
        <h2 class="text--primary font-class my-8">
          녹취록 미리보기
        </h2>
        <div class="text--primary" id="previewCheckboxes" v-for="(text, i) in previewText" :key="i" max-height="600px">
          <input
            type="checkbox"
            v-model="selected"
            :value=i
            class="previewCheckbox"
            :id="'previewCheck-'+i"
            @change="checkboxClicked"
          />
          <label :for="'previewCheck-'+i" class="previewLabel">
            <v-card v-if="i==0" class="disabledLabel mt-5">
              <v-card-subtitle>전체 선택하기</v-card-subtitle>
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
</template>

<script>
export default {
  name: 'sentencesComponent',
  props: {
    previewText: [],
    showPreview: Boolean,
  },
  data: () => {
    return {
      selected: [],
      checkbox: false,
    }
  },
  methods: {
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
  }
}
</script>

<style>
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