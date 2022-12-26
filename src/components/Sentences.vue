<template>
<v-card v-if="showPreview" class="pa-5 mx-auto">
  <!-- 녹취록 -->
  <v-row class="flex-column">
    <div
      class="mx-0 mt-0 mb-5 previewContainer"
    >
      <v-card-text>
        <v-row class="justify-space-between align-center">
          <v-col cols="12" sm="7">
            <h2 class="text--primary text-left font-class my-2">
              녹취록 미리보기
            </h2>
            <p>원하는 구간을 선택해주세요.</p>
          </v-col>
          <p class="mr-5">
            총 길이: {{this.previewText[this.previewText.length-1].minEnd}} |
            선택 길이: {{this.previewText.length}}
          </p>
        </v-row>
        <div class="text--primary previewCheckboxes" :id="'previewCheckboxes-'+i" v-for="(text, i) in previewText" :key="i">
          <label :for="'previewCheck-'+i" class="previewLabel">
            <div v-if="i==0" class="disabledLabel pa-5">
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
                    {{text.minStart}}
                  </v-chip>
                  <v-chip
                    class="my-2 plainChip"
                    color="white"
                    label
                    plain
                  >
                    <v-icon left color="grey">
                      mdi-account-circle-outline
                    </v-icon>
                    {{text.name}}
                  </v-chip>
                </v-row>
              </v-card-subtitle>
              <v-row>
                <v-col>
                  <p class="ml-2">{{text.sentence}}</p>
                </v-col>
              </v-row>
            </div>
          </label>
          <div class="checkboxWrapper" @click="onCheckboxWrapperClicked(i, $event)">
            <input
              type="checkbox"
              v-model="selected"
              :value=i
              class="previewCheckbox"
              :id="'previewCheck-'+i"
              @click="onCheckboxClicked(i, $event)"
            />
              <!-- @change="checkboxClicked" -->
            <span class="mdi mdi-24px mdi-check-circle"></span>

          </div>
        </div>
      </v-card-text>
    </div>
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
          class="mr-4"
          color="accent"
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
    serverFileNameList: [],
    previewText: [],
    showPreview: Boolean,
  },
  data: () => {
    return {
      selected: [],
      checked: [],
      checkbox: false,
      previewCheckboxes: HTMLCollection,
      previewCheckboxesArray: [],
    }
  },
  watch: {
    // selected(newVal) {
    //   console.log('watch-selected', newVal);
    // }
  },
  mounted() {
    this.previewCheckboxes = document.querySelectorAll('.previewCheckbox');
    this.previewCheckboxesArray = Array.from(this.previewCheckboxes);
  },
  methods: {
    changeLabel(start, end, empty=null) {
      // console.log(start, end)
      // for (let i = 0; i<this.checked.length; i++) {
      //   if (empty) {
          
      //   }
      // }
      for (let i=1; i<this.previewCheckboxesArray.length; i++) {
        let selectedDiv = document.getElementById(`previewCheckboxes-${i}`);
        // let selectedCheckbox = selectedDiv.querySelector('input[type="checkbox"]');
        if (empty !== null) {
          selectedDiv.classList.remove("borderBlue");
          // selectedCheckbox.checked = false;
          // selectedDiv.classList.remove("lighten-4");
        } else if (start <= this.previewCheckboxesArray[i].value && this.previewCheckboxesArray[i].value < end) {
          selectedDiv.classList.add("borderBlue");
          // selectedCheckbox.checked = true;

          // selectedDiv.classList.add("lighten-4");
        } else if (start <= this.previewCheckboxesArray[i].value && this.previewCheckboxesArray[i].value >= end) {
          selectedDiv.classList.remove("borderBlue");
          // selectedCheckbox.checked = false;
          // selectedDiv.classList.remove("lighten-4");
        }
      }
    },
    onCheckboxWrapperClicked(i, e) {
      // const target = document.getElementById('previewCheck-' + i);
      // this.onCheckboxClicked(i, e)
      console.log(i, e);
    },
    onCheckboxClicked(i, e) {
      e.preventDefault();
      console.log('out', this.selected)
      if (!this.selected.includes(i)) {
        console.log(this.selected);
        document.getElementById('previewCheck-' + i).checked = true;
        this.selected.push(i);
        this.checkboxClicked();
      } else {
        document.getElementById('previewCheck-' + i).checked = false;
        this.selected = this.selected.filter(x => x!==i);
        console.log(this.selected);
        this.checkboxClicked();
      }
      // this.selected.push(e.target._value);
      // console.log(this.selected);
    },
    checkboxClicked() {
      console.log(this.selected);
      // let targetId = e.target.id;
      // let targetVal = e.target.value;
      // let targetLabel = document.getElementById(targetId).parentElement.querySelector(".previewLabel");
      if (!this.selected.length) {
        this.changeLabel(0, this.previewCheckboxesArray.length, true);
      }
      let sortedSelect = this.selected.sort(function(a, b){return a-b});
      sortedSelect.forEach((x, i) => {
        if(i % 2 == 1) {
          this.changeLabel(sortedSelect[i-1], x);
        } else if (i == sortedSelect.length -1) {
          console.log('last');
          this.changeLabel(x, this.previewCheckboxesArray.length);
        }
      });
    },
    reset () {
      this.$emit('resetClicked')
    },
    validate () {
      const selectedData = [];
      const scopeData = [];
      if (this.selected.length === 1 && this.selected[0] === 0) {
        scopeData.push({ 'start_time': this.previewText[1].start, 'end_time': this.previewText[this.previewText.length-1].end})
      } else {
        for (let i = 1; i < this.selected.length; i += 2) {
          console.log(i);
          scopeData.push({ 'start_time': this.previewText[this.selected[i-1]].start, 'end_time': this.previewText[this.selected[i]-1].end});
        }
        if (this.selected.length % 2) {
          // console.log(this.previewText[this.selected[this.selected.length-1]])
          scopeData.push({ 'start_time': this.previewText[this.selected[this.selected.length-1]].start, 'end_time': this.previewText[this.previewText.length-1].end})
        }
      }
      selectedData.push({
        file_name: this.serverFileNameList[0],
        stt_scope: scopeData
      })
      console.log(selectedData);
      this.$emit('validateClicked', selectedData)
    },
  }
}
</script>

<style>
.previewContainer {
	max-height: 500px;
	overflow: auto;
}
.previewCheckboxes {
  display: flex;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #dedede;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 6px 12px -2px, rgba(0, 0, 0, 0.1) 0px 3px 7px -3px;
}
.previewCheckboxes:hover {
  border: 1px solid #2195f36c;
}
.borderBlue {
  border: 1px solid #2196F3;
}
.previewLabel {
  width: 100%;
  min-width: 80%;
}
.font-class {
	font-family: 'S-CoreDream-3Light',  sans-serif;
	font-weight: 500;
	text-align: center;
}
.checkboxWrapper {
  width: 20%;
  max-width: 100px;
  border-left: 1px dashed #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
}
.previewCheckbox {
	/* display: none; */
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