var GSScurl = "https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?";
var entry;
var member_list = new Array();

// Router Test
var Header = {
	template : '<header class="no-padding">\
        <div class="navbar-fixed">\
            <nav class="navfeature #37474f blue-grey darken-1">\
                <div class="container nav-wrapper">\
                    <a href="#" class="waves-effect waves-light brand-logo">\
                  <span class="navmenu">PMML</span>\
                  </a>\
                    <ul id="nav" class="hide-on-med-and-down right">\
                        <li><router-link class="navmenu" to="/about">About</router-link></li>\
                        <li><router-link class="navmenu" to="/list">List</router-link></li>\
                        <li><a class="navmenu" href="https://docs.google.com/spreadsheets/d/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/edit?usp=sharing">Edit</a>\</li>\
                    </ul>\
                </div>\
            </nav>\
        </div>\
    </header>'
};

var Footer = {
	template : '<footer class="page-footer #bdbdbd grey lighten-1">\
        <div class="footer-copyright">\
            <div class="container">\
                © 2014 Copyright Text\
                <a class="grey-text text-lighten-4 right" href="#!">More Links</a>\
            </div>\
        </div>\
    </footer>'	
};

var routes = [
	{	
		path: '/',	
		components: {	
			header : Header,	
			footer : Footer
		}
	},
	{
		path: '/about',
		components: {
			header : Header,
			footer : Footer
		}
	},
	{
		path: '/list',
		components: {
			header : Header,
			footer : Footer
		}
	}
];


var router = new VueRouter({
	routes
});

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


var app = new Vue({
    el: '#app',
	router: router,
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

			$('input.autocomplete').autocomplete({
				data: testob,
				limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
			});
			
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
			alert("버튼 클릭!");
		}
    }
});

console.log(testob);
console.log(member_list);


    

	


