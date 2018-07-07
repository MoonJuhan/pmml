var GSScurl =
    'https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?';
var entry;
var member_list = new Array();

// Autocomplete Test
var testob = new Object();
testob['문주한'] = null;

$.getJSON(GSScurl, function(data) {
    entry = data.feed.entry;
    //구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.
    var x = 0;

    for (var i in entry) {
        if (entry[i].title.$t.substring(0, 1) == 'A') {
            if (entry[i].title.$t != 'A1' && entry[i].title.$t != 'A2') {
                member_list[x] = new Object();
                member_list[x].name = entry[i].content.$t;
                testob[member_list[x].name] = null;

                var y = i;
				y++;
				
                for (var z = 0; z < 11; z++) {
					var check_a = entry[y].title.$t.substring(0, 1);
					
					if(check_a == 'A'){
						z = 9;
					}
					
                    switch (check_a) {
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
						case 'H':
                            member_list[x].CommentEtc = entry[y].content.$t;
                            break;
						case 'K':
							member_list[x].department = entry[y].content.$t;
							break;
						case 'L':
							member_list[x].CommentPan = entry[y].content.$t;
							break;
                    }
                    y++;
                }
                x++;
            }
        }
    }
});

// Modal
Vue.component('modal', {
  template: '#modal-template'
});

var app = new Vue({
    el: '#app',
    data: {
		showModal: false,
        name: '이름',
        stuID: '학번',
        dday: '남은날',
        inday: '입대일',
        outday: '전역일',
        regiment: '소속',
        assignment: '보직',
		CommentEtc: '기타 코멘트',
		department: '학과',
		CommentPan: '동아리 코멘트',
        gagestyle: {
            width: '0%'
        },
		remaingage: '0%'
    },
    // 메소드는 `methods` 객체 안에 정의합니다
    methods: {
        updateValue: function(value) {
            this.name = value;

            auto(); // autocomplete
            find_member(value);
        }
    }
});

var find_member = function(value) {
    for (var i = 0; i < member_list.length; i++) {
        // 각 행에대해 아래 스크립트를 실행합니다.
        if (member_list[i].name == value) {
            app.stuID = member_list[i].stuID;
            app.dday = member_list[i].dday;
            app.inday = member_list[i].inday;
            app.outday = member_list[i].outday;
            app.regiment = member_list[i].regiment;
            app.assignment = member_list[i].assignment;
			app.CommentEtc = member_list[i].CommentEtc;
			app.department = member_list[i].department;
			app.CommentPan = member_list[i].CommentPan;

            var strDate1 = app.inday;
            var strDate2 = app.outday;
            var arr1 = strDate1.split('.');
            var arr2 = strDate2.split('.');
            var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
            var dat2 = new Date(arr2[0], arr2[1], arr2[2]);

            // 날짜 차이 알아 내기
            var diff = dat2 - dat1;
            var currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
            var allday = parseInt(diff / currDay);

            var percent = (allday - app.dday) / allday * 100;
			percent = percent.toFixed(2);
			app.remaingage = (100 - percent) + '%';
            app.gagestyle.width = percent + '%';
        }
    }
};

var auto = function() {
    $('input.autocomplete').autocomplete({
        data: testob,
        limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function() {
            app.name = event.target.value;
            find_member(event.target.value);
        }
    });
};

window.onload = function(){
	if(member_list.length == 0){
		app.showModal = true;	
	}
};


