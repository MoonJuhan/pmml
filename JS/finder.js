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
				var person = {
					name: entry[i].content.$t
				};

				memberList[x] = person;
				autocompleteDB[memberList[x].name] = null;

				var y = i;
				y++;

				for (var z = 0; z < 12; z++) {
					var checkA = entry[y].title.$t.substring(0, 1);

					if (checkA == 'A') {
						z = 9;
					}

					switch (checkA) {
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
		name: '',
		stuID: '00학번',
		department: '무슨과일까?',
		commentPan: '동아리에선 이런 사람 이었다',
		armyType: '어디일까?',
		regiment: '자세한 위치를 찾는 중 입니다',
		remainDay: '얼마나 남았을까?',
		enlistDay: '이미 갔습니다',
		dischargeDay: '나는 돌아온다',
		workDay: '이 만큼 일해야 됨',
		holiday: '이 만큼 쉬는 날',
		shortenDay: '단축 소식이 없습니다',
		assignment: '이 사람의 보직은?',
		commentEtc: '찾는 중 입니다',
		gagestyle: {
			width: '0%'
		},
		remaingage: '100%',
		vacation: '언제 휴가 나오는가',
		comment: '할 말 있습니다!',
		showModal: false
	},
	// 메소드는 `methods` 객체 안에 정의합니다
	methods: {
		updateValue: function(value) {
			this.name = value;

			auto(); // autocomplete
			dataReset();
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
			app.workDay = memberList[i].workDay;
			app.holiday = app.remainDay - app.workDay;
			app.enlistDay = memberList[i].enlistDay;
			app.dischargeDay = memberList[i].dischargeDay;

			var splitRegiment = memberList[i].armyType.split(' ');
			var remainRegiment = '';
			app.armyType = splitRegiment[0];
			for (var x = 1; x < splitRegiment.length; x++) {
				remainRegiment = remainRegiment + splitRegiment[x] + ' ';
			}
			app.regiment = remainRegiment;

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

var dataReset = function() {
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
	app.shortenDay = '단축 소식이 없습니다';

	app.assignment = '이 사람의 보직은?';
	app.commentEtc = '찾는 중 입니다';

	app.remaingage = '100%';
	app.gagestyle.width = '0%';

	app.vacation = '언제 휴가 나오는가';
	app.comment = '할 말 있습니다!';
};

window.onload = function() {
	if (memberList.length == 0) {
		app.showModal = true;
	}
};