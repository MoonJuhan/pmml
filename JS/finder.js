var GSScurl = "https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?";
var entry;
var member_list = new Array();
/*
var GSStest = GSScurl.substring(0, 5);
if (GSStest == "https") {
    document.write(GSStest);
    // alert("로드가 안됩니다 잠시후 다시 시도해 주세요.");
}
*/

$.getJSON(GSScurl, function(data) {
    entry = data.feed.entry;
    //구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.	
    var x = 0;

    for (var i in entry) {
        if (entry[i].title.$t.substring(0, 1) == 'A') {
            if (entry[i].title.$t != 'A1' && entry[i].title.$t != 'A2') {

                member_list[x] = new Object();
                member_list[x].name = entry[i].content.$t;
                var y = i;
                for (var z = 0; z < 8; z++) {
                    switch (entry[y].title.$t.substring(0, 1)) {
                        case 'B':
                            member_list[x].stuID = entry[y].content.$t;
                            break;
                        case 'C':
                            member_list[x].dday = entry[y].content.$t;
                            break;
                        case 'D':
                            member_list[x].inday = entry[y].content.$t;
                            break;
                        case 'E':
                            member_list[x].outday = entry[y].content.$t;
                            break;
                        case 'F':
                            member_list[x].regiment = entry[y].content.$t;
                            break;
                        case 'G':
                            member_list[x].assignment = entry[y].content.$t;
                            break;
                    }
                    y++;
                }
                x++;
            }
        }
    }
});


var example2 = new Vue({
    el: '#app',
    data: {
        name: '이름',
        stuID: '학번',
        dday: '남은날',
        inday: '입대일',
        outday: '전역일',
        regiment: '소속',
        assignment: '보직',
        gagestyle: {
            width: '0%'
        }

    },
    // 메소드는 `methods` 객체 안에 정의합니다
    methods: {
        updateValue: function(value) {
            var name2 = document.getElementById("name1").value;
            this.name = name2;

            for (var i = 0; i < member_list.length; i++) { // 각 행에대해 아래 스크립트를 실행합니다.
                if (member_list[i].name == name2) {
                    this.stuID = member_list[i].stuID;
                    this.dday = member_list[i].dday;
                    this.inday = member_list[i].inday;
                    this.outday = member_list[i].outday;
                    this.regiment = member_list[i].regiment;
                    this.assignment = member_list[i].assignment;

                    var strDate1 = this.inday;
                    var strDate2 = this.outday;
                    var arr1 = strDate1.split('.');
                    var arr2 = strDate2.split('.');
                    var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
                    var dat2 = new Date(arr2[0], arr2[1], arr2[2]);

                    // 날짜 차이 알아 내기
                    var diff = dat2 - dat1;
                    var currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
                    var allday = parseInt(diff / currDay);

                    var percent = (allday - this.dday) / allday * 100;
                    this.gagestyle.width = percent + '%';

                }
            }
        },
		clickbtn: function(){
			axios.get(GSScurl)
  .then(function (response) {
    alert(response + "yes");
  })
  .catch(function (error) {
    alert(error + "fail");
  });
		}
    }
});
