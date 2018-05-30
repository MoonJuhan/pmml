var example2 = new Vue({
  el: '#app',
  data: {
    name: 'Vue.js'
  },
  // 메소드는 `methods` 객체 안에 정의합니다
  methods: {
    greet: function (event) {
      var name2 = document.getElementById("name1").value;
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      alert('Hello ' + this.name + name2);
      this.name = name2;
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        alert(event.target.tagName);
      }
    }
    
    
  }
});

var GSScurl = "https://spreadsheets.google.com/feeds/cells/14pDCMfhYCyTRfsl_RaWa-_viDwsNpGyLSRhHFMH3R1s/1/public/basic?alt=json-in-script&min-row=1&min-col=1&callback=?";
var entry;

$.getJSON(GSScurl,function(data){
  var entry=data.feed.entry;//구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.			
  
  for(var i in entry){ // 각 행에대해 아래 스크립트를 실행합니다.		
    if(entry[i].content.$t == "문주한"){
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
      
      in1++;
      $(".ggsdata").append(entry[in1].content.$t); 
      $(".ggsdata").append("<br>");

    }			
  } 		
});