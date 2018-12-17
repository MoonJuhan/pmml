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

// Export JSON to List
var exportJson = function(sheetData, list) {
	$.getJSON(sheetData, function(data) {
		entry = data.feed.entry;
		//구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.
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
					var person = {
						name: entry[i].content.$t
					};
					list[x] = person;
					autocompleteDB[person.name] = null;
					y++;
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
								list[x].stuID = entry[y].content.$t;
								break;
								case 'C':
								list[x].enlistDay = entry[y].content.$t;
								break;
								case 'D':
								list[x].dischargeDay = entry[y].content.$t;
								break;
								case 'E':
								list[x].armyType = entry[y].content.$t;
								break;
								case 'F':
								list[x].assignment = entry[y].content.$t;
								break;
								case 'G':
								list[x].commentEtc = entry[y].content.$t;
								break;
								case 'H':
								list[x].vacation = entry[y].content.$t;
								break;
								case 'I':
								list[x].comment = entry[y].content.$t;
								break;
								case 'J':
								list[x].department = entry[y].content.$t;
								break;
								case 'K':
								list[x].commentPan = entry[y].content.$t;
								break;
								case 'L':
								list[x].remainDay = entry[y].content.$t;
								break;
								case 'M':
								list[x].workDay = entry[y].content.$t;
								break;
								case 'N':
								list[x].shortenDay = entry[y].content.$t;
								break;
							}
						}else if(sheetId == 2 && condition){
							switch (lineCode) {
								case 'B':
								list[x].stuID = entry[y].content.$t;
								break;
								case 'C':
								list[x].enlistDay = entry[y].content.$t;
								break;
								case 'D':
								list[x].dischargeDay = entry[y].content.$t;
								break;
								case 'E':
								list[x].armyType = entry[y].content.$t;
								break;
								case 'F':
								list[x].assignment = entry[y].content.$t;
								break;
								case 'G':
								list[x].commentEtc = entry[y].content.$t;
								break;
								case 'H':
								list[x].comment = entry[y].content.$t;
								break;
								case 'I':
								list[x].department = entry[y].content.$t;
								break;
								case 'J':
								list[x].commentPan = entry[y].content.$t;
								break;
							}
						}
						y++
					}
					x++;
				}
			}
		}
	});

};
exportJson(sheetData_Active, memberList_A);
exportJson(sheetData_Discharged, memberList_D);

// Modal
Vue.component('modal', {
	template: '#modal-template'
});

// Main Vue Component
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
	},
	// 메소드는 `methods` 객체 안에 정의합니다
	methods: {
		updateValue: function(value) {
			this.name = value;

			auto(); // autocomplete
			dataReset();
			findMember_A(value);
			findMember_D(value);
		}
	}
});

var findMember_A = function(value) {
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

var findMember_D = function(value) {
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
	app.shortenDay = '이 만큼 이득봄!';

	app.assignment = '이 사람의 보직은?';
	app.commentEtc = '찾는 중 입니다';

	app.remaingage = '100%';
	app.gagestyle.width = '0%';

	app.vacation = '언제 휴가 나오는가';
	app.comment = '할 말 있습니다!';
};

window.onload = function() {
	if (memberList_D.length + memberList_A.length == 0) {
		app.showModal = true;
	}
};
