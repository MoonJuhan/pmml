var GSScurl =
	'https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?';
var entry;
var memberList = [];

// Autocomplete DB
var autocompleteDB = {};
autocompleteDB['문주한'] = null;

$.getJSON(GSScurl, function(data) {
	entry = data.feed.entry;
	//구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.
	var x = 0;

	for (var i in entry) {
		if (entry[i].title.$t.substring(0, 1) == 'A') {
			if (entry[i].title.$t != 'A1' && entry[i].title.$t != 'A2') {
				memberList[x].name = entry[i].content.$t;
				autocompleteDB[memberList[x].name] = null;

				var y = i;
				y++;

				for (var z = 0; z < 11; z++) {
					var check_a = entry[y].title.$t.substring(0, 1);

					if (check_a == 'A') {
						z = 9;
					}

					switch (check_a) {
						case 'B':
							memberList[x].stuID = entry[y].content.$t;
							break;
						case 'C':
							memberList[x].remainDay = entry[y].content.$t;
							break;
						case 'D':
							memberList[x].enlistDay = entry[y].content.$t;
							break;
						case 'E':
							memberList[x].dischargeDay = entry[y].content.$t;
							break;
						case 'F':
							memberList[x].regiment = entry[y].content.$t;
							break;
						case 'G':
							memberList[x].assignment = entry[y].content.$t;
							break;
						case 'H':
							memberList[x].commentEtc = entry[y].content.$t;
							break;
						case 'I':
							memberList[x].vacation = entry[y].content.$t;
							break;
						case 'J':
							memberList[x].comment = entry[y].content.$t;
							break;
						case 'K':
							memberList[x].department = entry[y].content.$t;
							break;
						case 'L':
							memberList[x].commentPan = entry[y].content.$t;
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
		remainDay: '남은날',
		enlistDay: '입대일',
		dischargeDay: '전역일',
		regiment: '소속',
		assignment: '보직',
		commentEtc: '기타 코멘트',
		department: '학과',
		commentPan: '동아리 코멘트',
		gagestyle: {
			width: '0%'
		},
		remaingage: '0%',
		vacation: '',
		comment: ''
	},
	// 메소드는 `methods` 객체 안에 정의합니다
	methods: {
		updateValue: function(value) {
			this.name = value;

			auto(); // autocomplete
			findMember(value);
		},
		personInfoResize: function() {
			// 리사이즈
		}
	}
});
var findMember = function(value) {
	for (var i = 0; i < memberList.length; i++) {
		// 각 행에대해 아래 스크립트를 실행합니다.
		if (memberList[i].name == value) {
			app.stuID = memberList[i].stuID;
			app.remainDay = memberList[i].remainDay;
			app.enlistDay = memberList[i].enlistDay;
			app.dischargeDay = memberList[i].dischargeDay;
			app.regiment = memberList[i].regiment;
			app.assignment = memberList[i].assignment;
			app.commentEtc = memberList[i].commentEtc;
			app.department = memberList[i].department;
			app.commentPan = memberList[i].commentPan;
			app.vacation = memberList[i].vacation;
			app.comment = memberList[i].comment;

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
			var inputData = document.getElementById('name1').value;

			app.name = inputData;
			findMember(inputData);
		}
	});
};

window.onload = function() {
	if (memberList.length == 0) {
		app.showModal = true;
	}
};