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
            총 길이: {{'this.previewText[this.previewText.length-1].minEnd'}} |
            선택 길이: {{this.selected.length}}
          </p>
        </v-row>
        <p v-for="(pre, i) in Object.keys(previewText)" :key="i" >{{pre}}</p>

        <div class="text--primary previewCheckboxes" :id="'previewCheckboxes-'+i" v-for="(text, i) in previewText[pre]" :key="i">
          <div @click="onLabelClicked(i, $event)" class="previewLabel">
            <div class="px-5 previewLabelCard my-5">
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
                    color="transparent"
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
          </div>
          <div class="checkboxWrapper" @click="onCheckboxWrapperClicked(i)">
            <input
              type="checkbox"
              v-model="selected"
              :value=i
              class="previewCheckbox"
              :id="'previewCheck-'+i"
            />
              <!-- @change="checkboxClicked" -->
              <!-- @click="onCheckboxClicked(i, $event)" -->
            <span class="mdi mdi-24px mdi-check-circle"></span>

          </div>
        </div>
      </v-card-text>
    </div>
    <!-- 하단 버튼 -->
    <v-row class="selectBtns d-flex justify-end pt-0">
      <v-col class="d-flex justify-end pr-0 mr-4">
        <button class="mr-4 reset" @click="reset">
          <v-img
            alt="reset"
            class="shrink"
            contain
            src="../assets/undo-arrow.png"
            transition="scale-transition"
            width="20"
          />
        </button>
        <!-- <v-btn
          outlined
          class="px-0 py-5"
          @click="reset"
        >
          <v-img
            alt="reset"
            class="shrink"
            contain
            src="../assets/undo-arrow.png"
            transition="scale-transition"
            width="20"
          />
        </v-btn> -->
        <button class="mr-4 selectAll" @click="all">
          <span class="mdi mdi-24px mdi-check-circle"></span>
          전체 선택
        </button>
      </v-col>
    </v-row>
    <v-row class="justify-center mb-0">
      <!-- <v-btn
        width="80%"
        class="mr-4"
        color="accent"
        @click="validate"
      >
        등록
      </v-btn> -->
      <button class="mr-4 mb-5 validateBtn" @click="validate">
        등록하기
      </button>
    </v-row>
  </v-row>

</v-card>
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
      temp: false,
      selected: [],
      checked: [],
      checkbox: false,
      previewCheckboxes: NodeList,
      previewCheckboxesArray: [],
      isAll: false,
    }
  },
  watch: {
    showPreview() {
      setTimeout(() => {
        console.log(this.previewText);
        this.previewCheckboxes = document.querySelectorAll('.previewCheckboxes');
        this.previewCheckboxesArray = Array.from(this.previewCheckboxes);
      }, 500);
    }
  },
  updated() {
    
  },
  methods: {
    changeLabel(start, end, bool, empty=null) {
      for (let i=start; i<this.previewCheckboxesArray.length; i++) {
        let selectedDiv = this.previewCheckboxesArray[i];
        // let selectedDiv = document.getElementById(`previewCheckboxes-${i}`);
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
    onCheckboxWrapperClicked(i) {
      const target = document.getElementById('previewCheck-' + i).closest('.previewCheckboxes');
      if (!this.selected.includes(i)) {
        this.selected.push(i);
      } else {
        this.selected = this.selected.filter(x => x !== i)
      }
      target.classList.toggle('borderBlue')
      this.isAll = false;
      console.log(this.selected)
    },
    setPeriod() {
      console.log(this.temp)
    },
    onLabelClicked(i, e) {
      if (this.temp === false) {
        this.temp = i;
        e.target.closest('.previewCheckboxes').classList.add('borderBlue');
        e.target.closest('.previewCheckboxes').classList.add('backBlue');
        this.setPeriod();
      } else { // 이미 설정된 구간 내부를 클릭했을 때, 클릭한 곳은 f 다음 클릭은 t이면 어디에 맞추지? 
        for (let item=this.temp; item <= i; item++) {
          if (item == this.temp) {
            document.getElementById('previewCheckboxes-'+item).classList.remove('backBlue');
          }
          if (!this.selected.includes(item)) {
            this.selected.push(item);
            document.getElementById('previewCheckboxes-'+item).classList.add('borderBlue');
          } else {
            this.selected = this.selected.filter(x => x != item);
            document.getElementById('previewCheckboxes-'+item).classList.remove ('borderBlue');

          }
        }
        this.temp = false;
        this.isAll = false;
        console.log(this.selected);
        }
      // const targetCheckbox = document.getElementById('previewCheck-'+i);
      // targetCheckbox.checked = !targetCheckbox.checked;
    },

    reset () {
      for (const i of this.selected) {
        document.getElementById('previewCheckboxes-'+i).classList.remove('borderBlue');
      }
      this.selected = [];
      this.isAll = false;
    },
    all () {
      for (let i=0; i<this.previewText.length; i++) {
        if (!this.selected.includes(i)) {
          this.selected.push(i);
          document.getElementById('previewCheckboxes-'+i).classList.add('borderBlue');
        }
      }
      this.isAll = true; // 전체 선택되었다는 표시가 버튼에 나타나야 함
    },
    validate () {
      const selectedData = [];
      const scopeData = [];
      this.selected.sort((a, b) => a - b);
      console.log(this.selected);
      let tempStart = this.previewText[this.selected[0]].start;
      let temp = this.selected[0];
      if (this.isAll) {
        scopeData.push({ 'start_time': this.previewText[1].start, 'end_time': this.previewText[this.previewText.length-1].end});
      } else {
        for (let i=0; i<this.selected.length; i++) {
          if (temp == this.selected[i]) {
            console.log('temp == this.selected[i]', i);
            temp++
          } else {
            console.log('temp != this.selected.length', i);
            console.log('push', this.selected[i-1])
            scopeData.push({ 'start_time': tempStart, 'end_time': this.previewText[this.selected[i-1]].end});
            tempStart = this.previewText[this.selected[i]].start;
            temp = this.selected[i];
          }
          if (temp == this.selected[this.selected.length-1]) {
            console.log('temp == this.selected.length', i);
            scopeData.push({ 'start_time': tempStart, 'end_time': this.previewText[this.selected[i]].end});
            console.log('push', this.selected[i])
          } 
        }
      }

      // if (this.selected.length === 1 && this.selected[0] === 0) {
      //   scopeData.push({ 'start_time': this.previewText[1].start, 'end_time': this.previewText[this.previewText.length-1].end})
      // } else {
      //   for (let i = 1; i < this.selected.length; i += 2) {
      //     console.log(i);
      //     scopeData.push({ 'start_time': this.previewText[this.selected[i-1]].start, 'end_time': this.previewText[this.selected[i]-1].end});
      //   }
      //   if (this.selected.length % 2) {
      //     // console.log(this.previewText[this.selected[this.selected.length-1]])
      //     scopeData.push({ 'start_time': this.previewText[this.selected[this.selected.length-1]].start, 'end_time': this.previewText[this.previewText.length-1].end})
      //   }
      // }

      // scopeData.push({ 'start_time': this.previewText[this.selected[0]].start, 'end_time': this.previewText[this.selected[this.selected.length-1]].end});
      selectedData.push({
        file_name: this.fileName,
        total_duration: this.previewText[this.previewText.length-1].end,
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
  height: auto;
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
.backBlue {
  background-color: #AEE2FF;
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
	display: none;
}
.mdi-check-circle::before {
  color: #dedede;
}
.checkboxWrapper:hover .mdi-check-circle::before {
  color: #AEE2FF;
}

.previewCheckbox:checked + .mdi-check-circle::before {
  color: #2196F3;
}
.previewCheckbox:checked + .previewLabel {
	backdrop-filter: grayscale(10%);
}
.previewCheckbox:disabled + .previewLabel {
	pointer-events: none;
}
.previewLabel:hover {
	cursor: pointer;
}
.disabledLabel {
	pointer-events: none;
}
.selectBtns {
  height: 72px;
}
.selectAll,
.validateBtn {
  font-size: 15px;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.validateBtn {
  background-color: #E4E5ED;
  color: #9A9BA7;
  font-size: 18px;
  font-weight: 900;
  width: 80%;
}
.validateBtn:hover {
  background-color: #00A3FF;
  color: white;
}
</style>