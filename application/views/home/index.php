<div class="container">

  <div class="row contents">

    <div class="col l3 m3 s12">
      <div id="inputCard" class="customcard">
        <span class="cardTitle">입력</span>
        <div class="input-field">
          <input id="inputName" type="text" class="validate autocomplete" v-on:input="updateValue($event.target.value)">
          <label id="nameLabel" class="active" for="inputName">이름</label>
        </div>
      </div>
    </div>

    <div class="col l5 m5 s12">
      <div class="customcard">
        <span class="cardTitle">학교 관련</span>
        <div class="cardContents">
          <span v-html="stuID"></span>
          <span v-html="department"></span>
          <div>
            동아리 코멘트 :
            <span v-html="commentPan"></span>
          </div>
        </div>

      </div>
    </div>

    <div class="col l4 m4 s12">
      <div class="customcard">
        <span class="cardTitle">소속</span>
        <div class="cardContents">
          <span v-html="armyType"></span>
          <br>
          <span v-html="regiment"></span>
        </div>

      </div>
    </div>

    <div class="col l4 m4 s12">
      <div class="customcard">
        <span class="cardTitle">날짜</span>
        <div class="cardContents">
          남은날 :
          <span v-html="remainDay"></span>
          <br> 입대일 :
          <span v-html="enlistDay"></span>
          <br> 전역일 :
          <span v-html="dischargeDay"></span>
        </div>

      </div>
    </div>

    <div class="col l4 m4 s12">
      <div class="customcard">
        <span class="cardTitle">날짜</span>
        <div class="cardContents">
          일과 일수 :
          <span v-html="workDay"></span>
          <br> 휴일 수 :
          <span v-html="holiday"></span>
          <br> 단축 일수 :
          <span v-html="shortenDay"></span>
        </div>

      </div>
    </div>

    <div class="col l4 m4 s12">
      <div class="customcard">
        <span class="cardTitle">보직</span>
        <div class="cardContents">

          <span v-html="assignment"></span>
          <br> 보직 코멘트 :
          <span v-html="commentEtc"></span>
        </div>

      </div>
    </div>

    <div class="col l6 m6 s12">
      <div class="customcard">
        <span class="cardTitle">진행도</span>
        <div class="cardContents">
          <div class="progress">
            <div class="determinate" v-bind:style="gagestyle"></div>
          </div>
          <div>
            <span v-html="gagestyle.width"></span>
            <span class="gage2" v-html="remaingage"></span>
          </div>
        </div>

      </div>
    </div>

    <div class="col l6 m6 s12">
      <div class="customcard">
        <span class="cardTitle">기타</span>
        <div class="cardContents">
          다음 휴가 계획 :
          <span v-html="vacation"></span>
          <br> 남길 말 :
          <span v-html="comment"></span>
          <br>
        </div>

      </div>
    </div>


    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false">
      <h4 slot="header">Load Fail</h4>
      <p slot="body">
        멤버들의 정보가 로드되지 않았습니다.
        <br> 새로고침을 해보십시오.
      </p>
    </modal>

  </div>

  <iframe id="googlesheet" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQquO5M8p9wZZZGKpHRW5kUM_6BRZxxtFiVjiXIMzqmjarCmx4H9tcHVYNiZsJinCKZIX0XDn8AsiXk/pubhtml/sheet?headers=false&gid=0"></iframe>

</div>
