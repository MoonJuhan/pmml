var GSScurl = "https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?";
var entry;


var GSStest = GSScurl.substring(0, 5);
if(GSStest == "https"){
  document.write(GSStest);
  // alert("로드가 안됩니다 잠시후 다시 시도해 주세요.");
}

var a = new Array();
var t = 1;
a[1] = new Object();
a[1].name = '문주한';
a[1].age = 1;

document.write(a[t].name + a[t].age);

$.getJSON(GSScurl,function(data){
  entry=data.feed.entry;
  //구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.	
  var x = 0;
  
  for(var i in entry){
  if(entry[i].title.$t.substring(0, 1) == 'A' || entry[i].title.$t.substring(1, 2) > 1){
    member_list[x] = new Object();
    member_list[x].name = entry[i].content.$t;
    
    for(var z = 0; y < 7; y++){
      var y = i;
      switch(entry[y].title.$t.substring(0, 1)) {
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
});

var member_list = new Array();



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
    updateValue: function (value) {
      var name2 = document.getElementById("name1").value;
      this.name = name2;
      
      for(var i in entry){ // 각 행에대해 아래 스크립트를 실행합니다.
        if(entry[i].content.$t == name2){
          var in1 = i;
          in1++;
          this.stuID = entry[in1].content.$t;
          in1++;
          this.dday = entry[in1].content.$t;
          in1++;
          this.inday = entry[in1].content.$t;
          in1++;
          this.outday = entry[in1].content.$t;
          in1++;
          this.regiment = entry[in1].content.$t;
          in1++;
          this.assignment = entry[in1].content.$t;
          
          var strDate1 = this.inday; 
          var strDate2 = this.outday; 
          var arr1 = strDate1.split('.'); 
          var arr2 = strDate2.split('.'); 
          var dat1 = new Date(arr1[0], arr1[1], arr1[2]); 
          var dat2 = new Date(arr2[0], arr2[1], arr2[2]);
      
          // 날짜 차이 알아 내기
          var diff = dat2 - dat1;
          var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
          var allday = parseInt(diff/currDay);
          
          var percent = (allday - this.dday) / allday * 100;
          this.gagestyle.width = percent + '%';
          
        }
      }
    }  
  }
});

/*
clickbtn: function () {
      var t1 = document.getElementById("name1").value;
      
      // document.write(t1);
      
      var t2 = t1.substring(0, 1);
      var t3 = t1.substring(1, 2);
      // document.write(t1 + " ");
      // document.write(t2 + " "); // 알파벳
      // document.write(t3 + " "); // 숫자

      var strDate1 = "17. 3. 6"; 
      var strDate2 = "18. 12. 5"; 
      var arr1 = strDate1.split('.'); 
      var arr2 = strDate2.split('.'); 
      var dat1 = new Date(arr1[0], arr1[1], arr1[2]); 
      var dat2 = new Date(arr2[0], arr2[1], arr2[2]);
      
      
      // 날짜 차이 알아 내기
var diff = dat2 - dat1;
var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨

 
document.write("* 날짜 두개 : " + strDate1 + ", " + strDate2 + "<br/>");
document.write("* 일수 차이 : " + parseInt(diff/currDay) + " 일<br/>");





      
    }
*/