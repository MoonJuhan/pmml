<template lang="html">


  <v-container>
    <v-layout row wrap>
      <v-flex xs0 lg1 xl1></v-flex>

      <v-flex xs12 lg10 xl10>
        <v-container class="contentsDiv">
          <v-layout row wrap>
            <v-flex xs12 lg3 xl3>
              <v-card class="contentsCard">
                <div class="cardTitle">입력</div>
                <div class="input-field">
                  <input id="inputName" type="text" class="validate autocomplete" v-on:input="updateValue($event.target.value)">
                  <label id="nameLabel" class="active" for="inputName">이름</label>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs12 lg5 xl5>
              <v-card class="contentsCard">
                <div class="cardTitle">학교 관련</div>
                <div class="cardContents">
                  <span v-html="stuID"></span>
                  <span v-html="department"></span>
                  <div>
                    동아리 코멘트 :
                    <span v-html="commentPan"></span>
                  </div>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs12 lg4 xl4>
              <v-card class="contentsCard">
                <div class="cardTitle">소속</div>
                <div class="cardContents">
                  <span v-html="armyType"></span>
                  <br>
                  <span v-html="regiment"></span>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs12 lg4 xl4>
              <v-card class="contentsCard">
                <div class="cardTitle">날짜</div>
                <div class="cardContents">
                  남은날 :
                  <span v-html="remainDay"></span>
                  <br> 입대일 :
                  <span v-html="enlistDay"></span>
                  <br> 전역일 :
                  <span v-html="dischargeDay"></span>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs12 lg4 xl4>
              <v-card class="contentsCard">
                <div class="cardTitle">날짜</div>
                <div class="cardContents">
                  일과 일수 :
                  <span v-html="workDay"></span>
                  <br> 휴일 수 :
                  <span v-html="holiday"></span>
                  <br> 단축 일수 :
                  <span v-html="shortenDay"></span>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs12 lg4 xl4>
              <v-card class="contentsCard">
                <div class="cardTitle">보직</div>
                <div class="cardContents">

                  <span v-html="assignment"></span>
                  <br> 보직 코멘트 :
                  <span v-html="commentEtc"></span>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs12 lg6 xl6>
              <v-card class="contentsCard">
                <div class="cardTitle">진행도</div>
                <div class="cardContents">
                  <div class="progress">
                    <div class="determinate" v-bind:style="gagestyle"></div>
                  </div>
                  <div>
                    <span v-html="gagestyle.width"></span>
                    <span class="gage2" v-html="remaingage"></span>
                  </div>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs12 lg6 xl6>
              <v-card class="contentsCard">
                <div class="cardTitle">기타</div>
                <div class="cardContents">
                  다음 휴가 계획 :
                  <span v-html="vacation"></span>
                  <br> 남길 말 :
                  <span v-html="comment"></span>
                  <br>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>


  <!--
  <div class="container">

  <div class="row contents">

  <div class="col l3 m3 s12">
  <div id="inputCard" class="customcard">
  <span class="cardTitle">입력</span>
  <div class="input-field">
  <input id="inputName" type="text" class="validate autocomplete" v-on:input="updateValue($event.target.value)">
  <label id="nameLabel" class="active" for="inputName">이름</label>
</div>
</div>
</div>

<div class="col l5 m5 s12">
<div class="customcard">
<span class="cardTitle">학교 관련</span>
<div class="cardContents">
<span v-html="stuID"></span>
<span v-html="department"></span>
<div>
동아리 코멘트 :
<span v-html="commentPan"></span>
</div>
</div>

</div>
</div>

<div class="col l4 m4 s12">
<div class="customcard">
<span class="cardTitle">소속</span>
<div class="cardContents">
<span v-html="armyType"></span>
<br>
<span v-html="regiment"></span>
</div>

</div>
</div>

<div class="col l4 m4 s12">
<div class="customcard">
<span class="cardTitle">날짜</span>
<div class="cardContents">
남은날 :
<span v-html="remainDay"></span>
<br> 입대일 :
<span v-html="enlistDay"></span>
<br> 전역일 :
<span v-html="dischargeDay"></span>
</div>

</div>
</div>

<div class="col l4 m4 s12">
<div class="customcard">
<span class="cardTitle">날짜</span>
<div class="cardContents">
일과 일수 :
<span v-html="workDay"></span>
<br> 휴일 수 :
<span v-html="holiday"></span>
<br> 단축 일수 :
<span v-html="shortenDay"></span>
</div>

</div>
</div>

<div class="col l4 m4 s12">
<div class="customcard">
<span class="cardTitle">보직</span>
<div class="cardContents">

<span v-html="assignment"></span>
<br> 보직 코멘트 :
<span v-html="commentEtc"></span>
</div>

</div>
</div>

<div class="col l6 m6 s12">
<div class="customcard">
<span class="cardTitle">진행도</span>
<div class="cardContents">
<div class="progress">
<div class="determinate" v-bind:style="gagestyle"></div>
</div>
<div>
<span v-html="gagestyle.width"></span>
<span class="gage2" v-html="remaingage"></span>
</div>
</div>

</div>
</div>

<div class="col l6 m6 s12">
<div class="customcard">
<span class="cardTitle">기타</span>
<div class="cardContents">
다음 휴가 계획 :
<span v-html="vacation"></span>
<br> 남길 말 :
<span v-html="comment"></span>
<br>
</div>

</div>
</div>


<modal v-if="showModal" @close="showModal = false">
<h4 slot="header">Load Fail</h4>
<p slot="body">
멤버들의 정보가 로드되지 않았습니다.
<br> 새로고침을 해보십시오.
</p>
</modal>

</div>

<iframe id="googlesheet" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQquO5M8p9wZZZGKpHRW5kUM_6BRZxxtFiVjiXIMzqmjarCmx4H9tcHVYNiZsJinCKZIX0XDn8AsiXk/pubhtml/sheet?headers=false&gid=0"></iframe>

</div>
-->
</template>

<script>
var sheetData_Active =
"https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?";
var sheetData_Discharged =
"https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/2/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?";
var entry;
var memberList_A = [];
var memberList_D = [];

// Autocomplete DB
var autocompleteDB = {};
autocompleteDB['문주한'] = null;

export default {
  data () {
    return {
      name: '',
      stuID: '00학번',
      department: '무슨과일까?',
      commentPan: '동아리에선 이런 사람 이었다',
      armyType: '어디일까?',
      regiment: '자세한 위치를 찾는 중 입니다',
      remainDay: '얼마나 남았을까?',
      enlistDay: '이미 갔습니다',
      dischargeDay: '나는 돌아온다',
      workDay: '언제 일과 끝남',
      holiday: '사실 의미없음',
      shortenDay: '이득봄!',
      assignment: '이 사람의 보직은?',
      commentEtc: '찾는 중 입니다',
      gagestyle: {
        width: '0%'
      },
      remaingage: '100%',
      vacation: '언제 휴가 나오는가',
      comment: '할 말 있습니다!',
      showModal: false
    }

  },
  created() {
    test();
  },
  methods: {
    test() {
      console.log(autocompleteDB);
    }
  }
}
</script>

<style lang="css" scoped>
@media screen and (min-width:1904px) {
  .contentsDiv{
    width: 90%;
  }
}

.contentsCard {
  margin-left : 1rem;
  margin-right : 1rem;
  margin-bottom: 1rem;
  height: 9.8rem;
  text-align: left;
  color: white;
  background-color: rgba(0, 0, 0, 0.23);
}

.cardTitle {
  padding-top: 10px;
  padding-left: 10px;
	font-size: 1.4em;
}

.cardContents {
	padding: 2px 4px;
}

.gage2 {
	float: right;
}
</style>
