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
                <v-autocomplete
                class="autocompleteInput"
                v-model="model"
                label="이름"
                :items="nameDB"
                @click="clickInput();"
                @keyup="updateValue($event.target.value);"
                @change="updateValue($event);"
                >
                <v-slide-x-reverse-transition
                slot="append"
                mode="out-in"
                >
              </v-slide-x-reverse-transition>
            </v-autocomplete>
          </v-card>
        </v-flex>

        <v-flex xs12 lg5 xl5>
          <v-card class="contentsCard">
            <div class="cardTitle">학교 관련</div>
            <div class="cardContents">
              <span v-html="stuID"></span>
              <span v-html="department"></span>
              <div class="secondLine">
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
              <div v-html="regiment" class="secondLine"></div>
            </div>
          </v-card>
        </v-flex>

        <v-flex xs12 lg4 xl4>
          <v-card class="contentsCard">
            <div class="cardTitle">날짜</div>
            <div class="cardContents">
              남은날 :
              <span v-html="remainDay"></span>
              <br>
              <div class="secondLine">
                입대일 :
                <span v-html="enlistDay"></span>
              </div>
              <div class="secondLine">
                전역일 :
                <span v-html="dischargeDay"></span>
              </div>
            </div>
          </v-card>
        </v-flex>

        <v-flex xs12 lg4 xl4>
          <v-card class="contentsCard">
            <div class="cardTitle">날짜</div>
            <div class="cardContents">
              일과 일수 :
              <span v-html="workDay"></span>
              <br>
              <div class="secondLine">
                휴일 수 :
                <span v-html="holiday"></span>
              </div>
              <div class="secondLine">
                단축 일수 :
                <span v-html="shortenDay"></span>
              </div>

            </div>
          </v-card>
        </v-flex>

        <v-flex xs12 lg4 xl4>
          <v-card class="contentsCard">
            <div class="cardTitle">보직</div>
            <div class="cardContents">

              <span v-html="assignment"></span>
              <br>
              <div class="secondLine">
                보직 코멘트 :
                <span v-html="commentEtc" class="secondLine"></span>
              </div>
            </div>
          </v-card>
        </v-flex>

        <v-flex xs12 lg6 xl6>
          <v-card class="contentsCard">
            <div class="cardTitle">진행도</div>
            <div class="cardContents">
              <v-progress-linear
              color="blue"
              height="8"
              :value="gagestyle"
              ></v-progress-linear>
              <div>
                <span v-html="gagestyle"></span>%
                <span class="remainGage" v-html="remaingage"></span>
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
              <br>
              <div class="secondLine">
                남길 말 :
                <span v-html="comment"></span>
              </div>
            </div>
          </v-card>
        </v-flex>

        <iframe
        class="googleSheet"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQquO5M8p9wZZZGKpHRW5kUM_6BRZxxtFiVjiXIMzqmjarCmx4H9tcHVYNiZsJinCKZIX0XDn8AsiXk/pubhtml/sheet?headers=false&gid=0"
        ></iframe>


      </v-layout>
    </v-container>
  </v-flex>
</v-layout>
</v-container>
</template>

<script>
// Sheet Data
var sheetData_Active =
"https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1";
var sheetData_Discharged =
"https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/2/public/basic?alt=json-in-script&min-row=1&min-col=1";
var entry;
var memberList_A = [];
var memberList_D = [];

// Autocomplete DB
var autocompleteDB = [];

// Export JSON to List
var exportJson = function(sheetDataLink, memberList) {
  var sheetJson;
  axios.get(sheetDataLink)
  .then(function(response) {
    sheetJson = response.data.slice(28,response.data.length -2);
    entry = JSON.parse(sheetJson).feed.entry;

    var x = 0;
    var sheetId;
    if(entry[0].content.$t == "판도라큐브 군 복무 인원 리스트"){
      sheetId = 1;
    }else if(entry[0].content.$t == "판도라큐브 군 전역 인원 리스트"){
      sheetId = 2;
    }

    for(var i in entry){
      if (entry[i].title.$t.substring(0, 1) == 'A') {
        if (entry[i].title.$t != 'A1' && entry[i].title.$t != 'A2') {
          var condition = 1;

          var y = i;
          y++;

          autocompleteDB.push(entry[i].content.$t);

          var person = {
            name: entry[i].content.$t
          };
          memberList[x] = person;

          while(condition){
            if(y < entry.length){
              var lineCode = entry[y].title.$t.substring(0, 1);

              if (lineCode == 'A') {
                condition = 0;
              }
            } else {
              condition = 0;
            }

            if(sheetId == 1 && condition){
              switch (lineCode) {
                case 'B':
                memberList[x].stuID = entry[y].content.$t;
                break;
                case 'C':
                memberList[x].enlistDay = entry[y].content.$t;
                break;
                case 'D':
                memberList[x].dischargeDay = entry[y].content.$t;
                break;
                case 'E':
                memberList[x].armyType = entry[y].content.$t;
                break;
                case 'F':
                memberList[x].assignment = entry[y].content.$t;
                break;
                case 'G':
                memberList[x].commentEtc = entry[y].content.$t;
                break;
                case 'H':
                memberList[x].vacation = entry[y].content.$t;
                break;
                case 'I':
                memberList[x].comment = entry[y].content.$t;
                break;
                case 'J':
                memberList[x].department = entry[y].content.$t;
                break;
                case 'K':
                memberList[x].commentPan = entry[y].content.$t;
                break;
                case 'L':
                memberList[x].remainDay = entry[y].content.$t;
                break;
                case 'M':
                memberList[x].workDay = entry[y].content.$t;
                break;
                case 'N':
                memberList[x].shortenDay = entry[y].content.$t;
                break;
              }
            }else if(sheetId == 2 && condition){
              switch (lineCode) {
                case 'B':
                memberList[x].stuID = entry[y].content.$t;
                break;
                case 'C':
                memberList[x].enlistDay = entry[y].content.$t;
                break;
                case 'D':
                memberList[x].dischargeDay = entry[y].content.$t;
                break;
                case 'E':
                memberList[x].armyType = entry[y].content.$t;
                break;
                case 'F':
                memberList[x].assignment = entry[y].content.$t;
                break;
                case 'G':
                memberList[x].commentEtc = entry[y].content.$t;
                break;
                case 'H':
                memberList[x].comment = entry[y].content.$t;
                break;
                case 'I':
                memberList[x].department = entry[y].content.$t;
                break;
                case 'J':
                memberList[x].commentPan = entry[y].content.$t;
                break;
                case 'K':
                memberList[x].shortenDay = entry[y].content.$t;
                break;
              }
            }
            y++
          }
          x++;
        }
      }
    }
  })
  .catch(function(error) {
    console.log(error);
  });
};

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
      gagestyle: 0,
      remaingage: '100%',
      vacation: '언제 휴가 나오는가',
      comment: '할 말 있습니다!',
      showModal: false,
      model: null,
      nameDB: []
    }

  },
  created() {
    exportJson(sheetData_Active, memberList_A);
    exportJson(sheetData_Discharged, memberList_D);

  },
  methods: {
    clickInput: function() {
      this.nameDB = autocompleteDB;
    },
    updateValue: function(value) {
      dataReset(this);
      findMember(value, this);
    }
  }
}

var findMember = function(value, app) {
  for (var i = 0; i < memberList_A.length; i++) {
    if (memberList_A[i].name == value) {
      findMemberInfo(memberList_A[i], app, 1);
    }
  }

  for (var j = 0; j < memberList_D.length; j++) {
    if (memberList_D[j].name == value) {
      findMemberInfo(memberList_D[j], app, 0);
    }
  }
};

var findMemberInfo = function(memberList, app, active){
  // 학교 관련
  app.stuID = memberList.stuID;
  app.department = memberList.department;
  app.commentPan = memberList.commentPan;

  //소속
  var splitRegiment = memberList.armyType.split(' ');
  var remainRegiment = '';
  app.armyType = splitRegiment[0];
  for (var x = 1; x < splitRegiment.length; x++) {
    remainRegiment = remainRegiment + splitRegiment[x] + ' ';
  }
  app.regiment = remainRegiment;

  //날짜
  app.enlistDay = memberList.enlistDay;
  app.dischargeDay = memberList.dischargeDay;
  app.shortenDay = memberList.shortenDay;

  //보직
  app.assignment = memberList.assignment;
  app.commentEtc = memberList.commentEtc;

  //기타
  app.comment = memberList.comment;

  // 진행
  app.remaingage = '0%';
  app.gagestyle = 100;
  if(active){
    findMemberInfo_A(memberList, app);
  }else{
    findMemberInfo_D(app);
  }
}

var findMemberInfo_A = function(memberList, app){
  //날짜
  app.remainDay = memberList.remainDay;
  app.workDay = memberList.workDay;
  app.holiday = app.remainDay - app.workDay;

  //기타
  app.vacation = memberList.vacation;

  // 진행
  var strDate1 = app.enlistDay;
  var strDate2 = app.dischargeDay;
  var arr1 = strDate1.split('.');
  var arr2 = strDate2.split('.');
  var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
  var dat2 = new Date(arr2[0], arr2[1], arr2[2]);

  // 날짜 차이 알아 내기
  var diff = dat2 - dat1;
  var currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
  var allDay = parseInt(diff / currDay);

  var percent = (allDay - app.remainDay) / allDay * 100;
  percent = percent.toFixed(2);
  app.remaingage = (100 - percent).toFixed(2) + '%';
  app.gagestyle = percent;
}

var findMemberInfo_D = function(app){
  //날짜
  app.remainDay = "끝이 왔다";
  app.workDay = "밖에서 일하겠습니다";
  app.holiday = "밖에서 쉬겠습니다";

  //기타
  app.vacation = "평생 휴가 입니다";

  // 진행
  app.remaingage = '0%';
  app.gagestyle = 100;
}

var dataReset = function(app) {
  app.stuID = '00학번';
  app.department = '무슨과일까?';
  app.commentPan = '동아리에선 이런 사람 이였다';

  app.armyType = '어디일까?';
  app.regiment = '자세한 위치를 찾는 중 입니다';

  app.remainDay = '얼마나 남았을까?';
  app.enlistDay = '이미 갔습니다';
  app.dischargeDay = '나는 돌아온다';

  app.workDay = '이 만큼 일해야 됨';
  app.holiday = '이 만큼 쉬는 날';
  app.shortenDay = '이 만큼 이득봄!';

  app.assignment = '이 사람의 보직은?';
  app.commentEtc = '찾는 중 입니다';

  app.remaingage = '100%';
  app.gagestyle = '0%';

  app.vacation = '언제 휴가 나오는가';
  app.comment = '할 말 있습니다!';
};

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
  font-size: 1.5em;
  font-weight: bold;
}

.cardContents {
  font-size: 1.25rem;
  padding: 3px 10px;
}

.secondLine {
  padding-top: 2px;
}
.autocompleteInput {
  padding: 13px;
  color: rgb(66, 80, 91);
}
.remainGage {
  float: right;
}

.googleSheet{
  margin-left: 14px;
  margin-right: 14px;
  width: 100%;
	height: 300px;
}
</style>
