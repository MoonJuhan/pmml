// 새로운 뷰를 정의합니다 jsbin.com
var app = new Vue({
  el: '#app', // 어떤 엘리먼트에 적용을 할 지 정합니다
  // data 는 해당 뷰에서 사용할 정보를 지닙니다
  data: {
    name: 'Vue',
    n1: 'hello'
  }   
});

var GSScurl = "https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?";
function b1_c() {
	var name2 = document.getElementById("name1").value;
    alert(name2);
  
  
  
}

$.getJSON(GSScurl,function(data){
  var entry=data.feed.entry;//구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.			
  
  for(var i in entry){ // 각 행에대해 아래 스크립트를 실행합니다.		
    if(entry[i].content.$t == '강승곤'){
      var in1 = i;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");
      
      in1++;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");
            
      in1++;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");
            
      in1++;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");
            
      in1++;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");
            
      in1++;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");
            
      in1++;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");

    }			
  } 		
});