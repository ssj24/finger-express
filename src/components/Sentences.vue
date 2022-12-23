<template>
<v-card v-if="showPreview" class="pa-5">
  <!-- 녹취록 -->
  <v-row class="flex-column">
    <v-card
      class="mx-auto mt-0 mb-5 previewContainer"
      max-width="800"
      max-height="500"
    >
      <v-card-text>
        <v-row class="justify-space-between align-center">
          <v-col>
            <h2 class="text--primary text-left font-class my-2">
              녹취록 미리보기
            </h2>
            <p>원하는 구간을 선택해주세요.</p>
          </v-col>
          <p>
            총 길이: {{this.previewText[this.previewText.length-1].end}} |
            선택 길이: {{this.previewText.length}}
          </p>
        </v-row>
        <div class="text--primary previewCheckboxes" :id="'previewCheckboxes-'+i" v-for="(text, i) in previewText" :key="i">
          <label :for="'previewCheck-'+i" class="previewLabel">
            <div v-if="i==0" class="disabledLabel mt-5">
              <v-card-subtitle>전체 선택하기</v-card-subtitle>
            </div>
            <div v-else class="px-5 previewLabelCard my-5">
              <v-card-subtitle>
                <v-row>
                  <v-chip
                    :ripple="false"
                    class="ma-2"
                    color="blue"
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
                    plain
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
            </div>
          </label>
          <div class="checkboxWrapper">
            <input
              type="checkbox"
              v-model="selected"
              :value=i
              class="previewCheckbox"
              :id="'previewCheck-'+i"
              @click="onCheckboxClicked"
              @change="checkboxClicked"
            />
            <span class="mdi mdi-24px mdi-check-circle"></span>

          </div>
        </div>
      </v-card-text>
    </v-card>
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
  </v-row>

</v-card>
</template>

<script>
export default {
  name: 'sentencesComponent',
  props: {
    valid: Boolean,
    serverFileNameList: [],
    previewText: [],
    showPreview: Boolean,
  },
  data: () => {
    return {
      selected: [],
      checked: [],
      checkbox: false,
    }
  },
  watch: {
    // selected(newVal) {
    //   console.log('watch-selected', newVal);
    // }
  },
  methods: {
    changeLabel(start, end, arr, empty=null) {

      // for (let i = 0; i<this.checked.length; i++) {
      //   if (empty) {
          
      //   }
      // }
      for (let i=1; i<arr.length; i++) {
        let selectedDiv = document.getElementById(`previewCheckboxes-${i}`);
        // let selectedCheckbox = selectedDiv.querySelector('input[type="checkbox"]');
        if (empty) {
          selectedDiv.classList.remove("borderBlue");
          // selectedCheckbox.checked = false;
          // selectedDiv.classList.remove("lighten-4");
        } else if (start <= arr[i].value && arr[i].value < end) {
          selectedDiv.classList.add("borderBlue");
          // selectedCheckbox.checked = true;

          // selectedDiv.classList.add("lighten-4");
        } else if (start <= arr[i].value && arr[i].value >= end) {
          selectedDiv.classList.remove("borderBlue");
          // selectedCheckbox.checked = false;
          // selectedDiv.classList.remove("lighten-4");
        }
      }
    },
    onCheckboxClicked() {
      // e.preventDefault();
      // this.selected.push(e.target._value);
      // console.log(this.selected);
    },
    checkboxClicked() {
      console.log(this.selected);
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
    reset () {
      this.$emit('resetClicked')
    },
    validate () {
      const selectedData = [];
      const scopeData = [];

      for (let i = 1; i < this.selected.length; i += 2) {
        console.log(i);
        scopeData.push({ 'start_time': this.previewText[this.selected[i-1]].start, 'end_time': this.previewText[this.selected[i]-1].end});
      }
      if (this.selected.length % 2) {
        // console.log(this.previewText[this.selected[this.selected.length-1]])
        scopeData.push({ 'start_time': this.previewText[this.selected[this.selected.length-1]].start, 'end_time': this.previewText[this.previewText.length-1].end})
      }
      selectedData.push({
        file_name: this.serverFileNameList[0],
        stt_scope: scopeData
      })
      console.log(this.serverFileNameList);
      this.$emit('validateClicked', selectedData)
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
.previewCheckboxes {
  display: flex;
  max-width: 600px;
  margin-bottom: 20px;
  border-radius: 10px;
}
.borderBlue {
  border: 1px solid #2196F3;
}
.previewLabel {
  width: 80%;
}
.font-class {
	font-family: 'S-CoreDream-3Light',  sans-serif;
	font-weight: 500;
	text-align: center;
}
.checkboxWrapper {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.previewCheckbox {
	display: none;
}
.mdi-check-circle::before {
  color: #dedede;
}

.previewCheckbox:checked + .mdi-check-circle::before {
  color: #2196F3;
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