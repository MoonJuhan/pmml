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
                <input v-on:input="updateValue3($event.target.value)">
                <v-autocomplete
                class="autocompleteInput"
                v-model="model"
                label="이름"
                :items="nameDB"
                @click="test();"
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
</template>

<script>
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
      gagestyle: {
        width: '0%'
      },
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
    test: function() {
      this.nameDB = autocompleteDB;
    },
    updateValue: function(value) {
      dataReset(this);
      findMember_A(value, this);
      findMember_D(value, this);
    }
  }
}

var findMember_A = function(value, app) {
  for (var i = 0; i < memberList_A.length; i++) {
    // 각 행에대해 아래 스크립트를 실행합니다.
    if (memberList_A[i].name == value) {
      app.stuID = memberList_A[i].stuID;
      app.remainDay = memberList_A[i].remainDay;
      app.workDay = memberList_A[i].workDay;
      app.holiday = app.remainDay - app.workDay;
      app.shortenDay = memberList_A[i].shortenDay;
      app.enlistDay = memberList_A[i].enlistDay;
      app.dischargeDay = memberList_A[i].dischargeDay;

      var splitRegiment = memberList_A[i].armyType.split(' ');
      var remainRegiment = '';
      app.armyType = splitRegiment[0];
      for (var x = 1; x < splitRegiment.length; x++) {
        remainRegiment = remainRegiment + splitRegiment[x] + ' ';
      }
      app.regiment = remainRegiment;

      app.assignment = memberList_A[i].assignment;
      app.commentEtc = memberList_A[i].commentEtc;
      app.department = memberList_A[i].department;
      app.commentPan = memberList_A[i].commentPan;
      app.vacation = memberList_A[i].vacation;
      app.comment = memberList_A[i].comment;

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
      app.gagestyle.width = percent + '%';
    }
  }
};

var findMember_D = function(value, app) {
  for (var i = 0; i < memberList_D.length; i++) {
    // 각 행에대해 아래 스크립트를 실행합니다.
    if (memberList_D[i].name == value) {
      app.stuID = memberList_D[i].stuID;
      app.remainDay = memberList_D[i].remainDay;
      app.workDay = memberList_D[i].workDay;
      app.holiday = app.remainDay - app.workDay;
      app.shortenDay = memberList_D[i].shortenDay;
      app.enlistDay = memberList_D[i].enlistDay;
      app.dischargeDay = memberList_D[i].dischargeDay;

      var splitRegiment = memberList_D[i].armyType.split(' ');
      var remainRegiment = '';
      app.armyType = splitRegiment[0];
      for (var x = 1; x < splitRegiment.length; x++) {
        remainRegiment = remainRegiment + splitRegiment[x] + ' ';
      }
      app.regiment = remainRegiment;

      app.assignment = memberList_D[i].assignment;
      app.commentEtc = memberList_D[i].commentEtc;
      app.department = memberList_D[i].department;
      app.commentPan = memberList_D[i].commentPan;
      app.vacation = memberList_D[i].vacation;
      app.comment = memberList_D[i].comment;

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
      app.gagestyle.width = percent + '%';
    }
  }
};

var auto = function() {
  $('input.autocomplete').autocomplete({
    data: autocompleteDB,
    limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function() {
      var inputData = document.getElementById('inputName').value;

      app.name = inputData;
      findMember_A(inputData);
      findMember_D(inputData);
    }
  });
};

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
  app.gagestyle.width = '0%';

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
  font-size: 1.4em;
}

.cardContents {
  padding: 2px 4px;
}

.autocompleteInput {
  padding: 13px;
  color: rgb(66, 80, 91);
}
.gage2 {
  float: right;
}
</style>
