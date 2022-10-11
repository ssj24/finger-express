(function(){"use strict";var e={2581:function(e,t,a){var s=a(144),i=a(998),r=a(6843),o=a(6312),l=a(6190),n=a(9582),c=a(4886),u=a(8271),d=a(5495),m=a(3059),p=a(3687),v=function(){var e=this,t=e._self._c;return t(i.Z,{staticClass:"appContainer"},[t(r.Z,{attrs:{app:"",color:"accent",dark:""}},[t(l.Z,{staticClass:"d-flex align-center",attrs:{text:"",id:"no-background-hover",ripple:!1},on:{click:e.reloadPage}},[t(d.Z,{staticClass:"shrink mr-2",attrs:{alt:"Finger Express Logo",contain:"",src:a(1500),transition:"scale-transition",width:"40"}}),t(o.Z,{staticClass:"shrink mt-1 hidden-sm-and-down font-weight",attrs:{color:"primary",contain:"","min-width":"150",width:"150"}},[e._v(" Finger Express ")])],1),t(p.Z),t(l.Z,{staticClass:"white--text font-weight",attrs:{plain:""},on:{click:function(t){return e.compChanged(!0)}}},[e._v("신청하기")]),t(l.Z,{staticClass:"white--text font-weight",attrs:{plain:""},on:{click:function(t){return e.viewHistory(!0)}}},[e._v("마이페이지")])],1),t(m.Z,{staticClass:"d-flex justify-center align-center"},[e.applicationForm||e.checkHistory?e.applicationForm&&!e.checkHistory?t("Form"):e.checkHistory?t("History"):e._e():t("Home",{attrs:{"application-form":e.applicationForm},on:{clicked:e.compChanged}})],1),t(u.Z,{attrs:{dark:"",padless:""}},[t(n.Z,{staticClass:"black--text text-center",staticStyle:{width:"100%"},attrs:{flat:"",tile:"",color:"secondary"}},[t(c.ZB,{staticClass:"black--text"},[e._v(" COPYRIGHT © TEBAH SOFT. 2021. ALL RIGHTS RESERVED. "),t("br"),e._v(" 사업자등록번호: 440-87-02207, 상호명:테바소프트(주), 대표자명:오정섭, 사업장주소:대전 유성구 대덕대로512번길 20 "),t("br"),e._v(" 통신판매신고: 제2022-대전유성-0475호 E-mail: tebahsoft@gmail.com 고객센터: 070-7565-8698 개인정보책임: 오정섭(070-7565-8698) "),t("br"),e._v(" [개인정보보호규정] [이용약관] ")])],1)],1)],1)},f=[],h=a(266),x=a(2118),g=a(1713),b=function(){var e=this,t=e._self._c;return t(x.Z,{staticClass:"landing-container d-flex align-center"},[t(g.Z,{staticClass:"text-center"},[t(h.Z,{staticClass:"d-flex justify-center",attrs:{cols:"12"}},[t(d.Z,{staticClass:"shrink my-3",attrs:{src:a(1500),contain:"",width:"200px",height:"200px"}})],1),t(h.Z,{staticClass:"mb-4"},[t("h1",{staticClass:"display-2 font-weight-bold mb-3 text-uppercase"},[e._v(" Finger Express ")]),t("p",{staticClass:"subheading font-weight-regular"},[e._v(" 음성인식 기반 속기사 서비스 "),t("br"),e._v("공증까지 완벽하게 ")])]),t(h.Z,{staticClass:"mb-5",attrs:{cols:"12"}},[t(l.Z,{attrs:{"x-large":"",width:"200px",color:"accent"},on:{click:e.clicked}},[e._v("신청하기")])],1)],1)],1)},y=[],Z={name:"LandingHome",props:{applicationForm:Boolean},data:()=>({}),methods:{clicked(){this.$emit("clicked",!0)}}},k=Z,_=a(1001),C=(0,_.Z)(k,b,y,!1,null,null,null),w=C.exports,L=a(120),P=a(4127),A=a(1625),z=a(5125),F=a(4324),H=a(2661),M=a(7808),j=function(){var e=this,t=e._self._c;return t("div",{staticClass:"d-flex flex-column align-center justify-center"},[t(h.Z,{attrs:{cols:"11",md:"8",lg:"6"}},[t(z.Z,{ref:"form",staticClass:"my-10",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(M.Z,{attrs:{counter:10,rules:e.nameRules,label:"이름",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),t(M.Z,{attrs:{rules:e.emailRules,label:"이메일",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),t(g.Z,[t(h.Z,{attrs:{cols:"9",md:"10"}},[t(g.Z,[t(h.Z,{attrs:{cols:"4",md:"3"}},[t(M.Z,{attrs:{label:"우편번호",required:""},model:{value:e.postcode,callback:function(t){e.postcode=t},expression:"postcode"}})],1),t(h.Z,[t(M.Z,{attrs:{rules:e.addressRules,label:"주소",required:""},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)],1),t(M.Z,{attrs:{label:"상세주소",required:""},model:{value:e.extraAddress,callback:function(t){e.extraAddress=t},expression:"extraAddress"}})],1),t(h.Z,{staticClass:"d-flex justify-center align-center",attrs:{cols:"3",md:"2"}},[t(l.Z,{attrs:{width:"100%",color:"accent",outlined:""},on:{click:e.execDaumPostcode}},[e._v("찾기")])],1)],1),t(H.Z,{attrs:{items:e.delivery,rules:[e=>!!e||"하나를 선택해주세요"],label:"배송 방식",required:""},model:{value:e.select,callback:function(t){e.select=t},expression:"select"}}),t(g.Z,{staticClass:"pa-0"},[t(h.Z,{attrs:{cols:"8",md:"10"}},[t(A.Z,{staticClass:"pa-0",attrs:{color:"orange accent-4",counter:"",label:"파일 업로드",accept:"audio/*, video/*",placeholder:"음성 파일을 선택해주세요",rules:e.fileRules,id:"fileInput"},on:{change:e.uploadHandler},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}})],1),t(h.Z,{staticClass:"d-flex justify-center align-center mb-4",attrs:{cols:"4",md:"2"}},[t(l.Z,{attrs:{width:"100%",color:"accent",outlined:"",disabled:null==e.file},on:{click:e.showPreview}},[e._v(" 미리보기 ")])],1)],1),t(g.Z,[t(h.Z,{staticClass:"pt-0",attrs:{cols:"12"},on:{dragover:function(e){e.preventDefault()},drop:function(e){e.preventDefault()}}},[t(n.Z,{staticClass:"pa-5 d-flex justify-center align-center dragContainer",on:{drop:e.dragFile}},[e.file?t("span",[t("div",{staticClass:"text-subtitle-2"},[e._v(e._s(e.file.sizeInMB)+"MB")]),t("p",{staticClass:"text-subtitle-1 text--primary"},[e._v(" "+e._s(e.file.name)+" ")])]):t("span",[t(F.Z,{attrs:{left:""}},[e._v(" mdi-music-note-plus ")]),e._v("파일을 드래그해서 추가해주세요 ")],1)])],1)],1),e.preview?t(g.Z,[t(n.Z,{staticClass:"mx-auto my-5 previewContainer",attrs:{"max-width":"800","max-height":"500"}},[t(c.ZB,[t("h2",{staticClass:"text--primary font-class my-8"},[e._v(" 녹취록 미리보기 ")]),t(g.Z,[t(h.Z,{staticClass:"d-flex justify-end"},[t(l.Z,{class:{primary:e.selectWhole},on:{click:function(t){e.selectWhole=!0}}},[e._v("전체 선택하기")]),t(l.Z,{class:{primary:!e.selectWhole},on:{click:function(t){e.selectWhole=!1}}},[e._v("구간 선택하기")])],1)],1),e._l(e.previewText,(function(a,s){return t("div",{key:s,staticClass:"text--primary",attrs:{id:"previewCheckboxes","max-height":"600px"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],staticClass:"previewCheckbox",attrs:{type:"checkbox",id:"previewCheck-"+s,disabled:""},domProps:{value:s,checked:Array.isArray(e.selected)?e._i(e.selected,s)>-1:e.selected},on:{change:[function(t){var a=e.selected,i=t.target,r=!!i.checked;if(Array.isArray(a)){var o=s,l=e._i(a,o);i.checked?l<0&&(e.selected=a.concat([o])):l>-1&&(e.selected=a.slice(0,l).concat(a.slice(l+1)))}else e.selected=r},e.checkboxClicked]}}),t("label",{staticClass:"previewLabel",attrs:{for:"previewCheck-"+s}},[e.selectWhole&&0==s?t("span"):e.selectWhole||0!=s?t(n.Z,{staticClass:"px-5 previewLabelCard my-5",attrs:{shaped:""}},[t(c.Qq,[t(g.Z,[t(P.Z,{staticClass:"ma-2",attrs:{ripple:!1,color:"primary",label:"",outlined:""}},[t(F.Z,{attrs:{left:""}},[e._v(" mdi-clock ")]),e._v(" "+e._s(a.start)+" ")],1),t(P.Z,{staticClass:"my-2 plainChip",attrs:{color:"grey--darken-4",label:""}},[t(F.Z,{attrs:{left:""}},[e._v(" mdi-account-circle-outline ")]),e._v(" "+e._s(a.name)+" ")],1)],1)],1),t(g.Z,[t(h.Z,[t("p",{},[e._v(e._s(a.sentence))])])],1)],1):t(n.Z,{staticClass:"disabledLabel mt-5"},[t(c.Qq,[e._v("원하시는 구간을 클릭해주세요")])],1)],1)])}))],2)],1)],1):e._e(),t(L.Z,{attrs:{rules:[e=>!!e||"동의하지 않으시면 다음 단계로 넘어갈 수 없습니다"],label:"이용약관",required:""},model:{value:e.checkbox,callback:function(t){e.checkbox=t},expression:"checkbox"}}),t(g.Z,{staticClass:"d-flex justify-end"},[t(h.Z,{staticClass:"d-flex justify-end pr-0"},[t(l.Z,{staticClass:"pa-0",attrs:{plain:""},on:{click:e.reset}},[t(d.Z,{staticClass:"shrink mr-2",attrs:{alt:"reset",contain:"",src:a(9871),transition:"scale-transition",width:"20"}})],1)],1),t(h.Z,{attrs:{cols:"4",md:"2"}},[t(l.Z,{staticClass:"mr-4",attrs:{width:"100%",disabled:!e.valid,color:"accent"},on:{click:e.validate}},[e._v(" 등록 ")])],1)],1)],1)],1)],1)},S=[],O={name:"applicationForm",props:{},data:()=>{let e=[{},{start:"0001",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"abc1",sent_no:0},{start:"0005",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"abc1",sent_no:1},{start:"0007",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"zzz2",sent_no:2},{start:"0009",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"abc1",sent_no:3},{start:"0012",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"zzz2",sent_no:4},{start:"0014",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"abc1",sent_no:5},{start:"0017",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"abc1",sent_no:6},{start:"0019",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"zzz2",sent_no:7},{start:"0021",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"abc1",sent_no:8},{start:"0022",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"zzz2",sent_no:9},{start:"0023",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"333",sent_no:10},{start:"0025",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"zzz2",sent_no:11},{start:"0026",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"abc1",sent_no:12},{start:"0030",sentence:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium ullam corporis veritatis? Maxime aspernatur repudiandae sunt iure corrupti vel voluptates autem ducimus facere exercitationem alias, aperiam eos voluptatem optio.",name:"333",sent_no:13}],t="",a="";return{valid:!0,name:"",nameRules:[e=>!!e||"이름을 입력해주세요",e=>e&&e.length<=10||"10자 이내로 입력해주세요"],email:"",emailRules:[e=>!!e||"이메일을 입력해주세요",e=>/.+@.+\..+/.test(e)||"유효한 이메일 주소가 아닙니다"],postcode:t,address:t?t+")"+a:"",addressRules:[e=>!!e||"주소를 입력해주세요"],extraAddress:"",select:null,delivery:["이메일","등기"],file:null,fileRules:[e=>!!e||"파일을 등록해주세요"],preview:!1,selectWhole:!0,selected:[],previewText:e,checkbox:!1}},watch:{selectWhole(e){const t=document.querySelectorAll(".previewCheckbox"),a=document.querySelector(".previewContainer").querySelectorAll("label");if(e){for(let e=1;e<a.length;e++)a[e].children[0].classList.remove("blue-grey"),a[e].children[0].classList.remove("lighten-4");this.selected=[]}for(const s of t)s.disabled=e},selected(e){console.log(e)}},methods:{validate(){if(this.$refs.form.validate()){let e={name:this.name,email:this.email,postcode:this.postcode,address:this.address+this.extraAddress,delivery:"이메일"===this.select?"d1":"d2",file:this.file};console.log(e)}},reset(){this.$refs.form.reset()},execDaumPostcode(){new window.daum.Postcode({oncomplete:e=>{""!==this.extraAddress&&(this.extraAddress=""),"R"===e.userSelectedType?this.address=e.roadAddress:this.address=e.jibunAddress,"R"===e.userSelectedType?(""!==e.bname&&/[동|로|가]$/g.test(e.bname)&&(this.extraAddress+=e.bname),""!==e.buildingName&&"Y"===e.apartment&&(this.extraAddress+=""!==this.extraAddress?`, ${e.buildingName}`:e.buildingName),""!==this.extraAddress&&(this.extraAddress=`(${this.extraAddress})`)):this.extraAddress="",this.postcode=e.zonecode}}).open()},showFile(){this.file.sizeInMB=(this.file.size/1048576).toFixed(2)},uploadHandler(e){this.file=e,this.showFile()},dragFile(e){this.file=e.dataTransfer.files[0],this.showFile()},showPreview(){this.preview=!0},changeLabel(e,t,a,s=null){for(let i=1;i<a.length;i++){let r=document.querySelector(`label[for="previewCheck-${a[i].value}"]`).children[0];s?(r.classList.remove("blue-grey"),r.classList.remove("lighten-4")):e<=a[i].value&&a[i].value<t?(r.classList.add("blue-grey"),r.classList.add("lighten-4")):e<=a[i].value&&a[i].value>=t&&(r.classList.remove("blue-grey"),r.classList.remove("lighten-4"))}},checkboxClicked(){let e=document.querySelectorAll(".previewCheckbox"),t=Array.from(e);this.selected.length||this.changeLabel(0,t.length,t,!0);let a=this.selected.sort((function(e,t){return e-t}));a.forEach(((e,s)=>{s%2==1?this.changeLabel(a[s-1],e,t):s==a.length-1&&(console.log("last"),this.changeLabel(e,t.length,t))}))}}},q=O,R=(0,_.Z)(q,j,S,!1,null,"f1112330",null),T=R.exports,E=function(){var e=this,t=e._self._c;return t("div",{staticClass:"d-flex flex-column align-center justify-center"},[e._v(" History ")])},B=[],W={name:"checkHistory"},$=W,D=(0,_.Z)($,E,B,!1,null,null,null),I=D.exports,N={name:"App",components:{Home:w,Form:T,History:I},data:()=>({applicationForm:!1,checkHistory:!1}),methods:{reloadPage(){window.location.reload()},compChanged(e){this.applicationForm=e,e&&(this.checkHistory=!1)},viewHistory(e){this.checkHistory=e}}},G=N,Q=(0,_.Z)(G,v,f,!1,null,null,null),Y=Q.exports,V=a(1705),J=a(2638);s.ZP.use(V.Z);var K=new V.Z({theme:{themes:{light:{primary:J.Z.amber.darken4,secondary:J.Z.amber.lighten5,accent:J.Z.orange.darken4}}}});s.ZP.config.productionTip=!1,new s.ZP({vuetify:K,render:e=>e(Y)}).$mount("#app")},1500:function(e,t,a){e.exports=a.p+"img/thunderBig.9564f454.png"},9871:function(e,t,a){e.exports=a.p+"img/undo-arrow.1894e1f4.png"}},t={};function a(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,s,i,r){if(!s){var o=1/0;for(u=0;u<e.length;u++){s=e[u][0],i=e[u][1],r=e[u][2];for(var l=!0,n=0;n<s.length;n++)(!1&r||o>=r)&&Object.keys(a.O).every((function(e){return a.O[e](s[n])}))?s.splice(n--,1):(l=!1,r<o&&(o=r));if(l){e.splice(u--,1);var c=i();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[s,i,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/finger-express/"}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,r,o=s[0],l=s[1],n=s[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(i in l)a.o(l,i)&&(a.m[i]=l[i]);if(n)var u=n(a)}for(t&&t(s);c<o.length;c++)r=o[c],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},s=self["webpackChunkfinger_express"]=self["webpackChunkfinger_express"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=a.O(void 0,[998],(function(){return a(2581)}));s=a.O(s)})();
//# sourceMappingURL=app.d90e9f3e.js.map