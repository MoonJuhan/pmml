<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs0 lg1 xl1></v-flex>
      <v-flex xs12 lg10 xl10>
        <v-container class="contentsDiv">
          <v-layout row wrap>

            <v-flex xs12>
              <img src="../../assets/logo_pmml_03.svg" class="svgLogoinAbout">
              <div class="aboutTitle">About PMML</div>
              <div class="aboutContents">
                <p class="contentsText">PMML(PandoraCube Military Member List) 프로젝트는 판도라큐브 회원중</p>
                <p class="contentsText">현재 병역의 의무(군 복무)를 이행중인 회원의 정보를 보여주는 사이트입니다.</p>
                <p class="contentsText">리스트의 본인들은 남은 복무 기간등 정보를 찾아 볼수 있고,</p>
                <p class="contentsText">동아리 인원들은 군 복무로 인한 비활동 회원의 복귀 시기 등을 추적하기 용이합니다. </p>
              </div>
            </v-flex>

            <hr>

            <v-flex xs12>
              <div class="aboutTitle"><span class="devText">Dev</span> History</div>
            </v-flex>

            <v-flex xs6>
              <div class="aboutContents">
                <h1 class="historyYear">2018</h1>
                <table class="monthDiv">
                  <tr class="historyText">
                    <td rowspan="3" class="historyMonth">04</td>
                    <td class="historyText">육군 사이버지식정보방에서 웹 개발 환경 GoormIDE, 프론트엔드 프레임워크 Vue.js를 이용하여 개발을 시작하였습니다.</td>
                  </tr>
                  <tr>
                    <td class="historyText">개발 환경의 제한으로 GitHub Pages를 통해 배포를 하였습니다. 디자인은 Materializecss를 이용하여 머티리얼 디자인을 적용하였습니다.</td>
                  </tr>
                  <tr>
                    <td class="historyText">DB는 GoogleSpreadSheet를 이용하고 사이트에서 데이터를 받아오는 방식으로 하였습니다.</td>
                  </tr>
                </table>

                <br>

                <table class="monthDiv">
                  <tr class="historyText">
                    <td rowspan="1" class="historyMonth">09</td>
                    <td class="historyText">배포를 목표로 하던 프로젝트를 육군 내에서 개발하기 힘들어 잠정 중단을 하였습니다.</td>
                  </tr>
                </table>

                <br>

                <table class="monthDiv">
                  <tr class="historyText">
                    <td rowspan="1" class="historyMonth">12</td>
                    <td class="historyText">전역후 php를 이용해 웹 서버에 올릴 준비를 하였습니다.</td>
                  </tr>
                </table>
              </div>
            </v-flex>

            <v-flex xs6>
              <div class="aboutContents">
                <h1 class="historyYear">2019</h1>
                <table class="monthDiv">
                  <tr class="historyText">
                    <td rowspan="2" class="historyMonth">01</td>
                    <td class="historyText">Vue CLI를 이용해 프로젝트를 새로 구성 하였습니다. UI 라이브러리를 Materializecss에서 Vuetify로 교체 하였습니다.</td>
                  </tr>
                  <tr>
                    <td class="historyText">동아리 서버를 이용하여 프로토타입 배포를 시작하였습니다.</td>
                  </tr>
                </table>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.contentsDiv{
  color: white;
}

.aboutContents {
  font-size: 1.25rem;
  margin: 0 20px;
}

.aboutTitle{
  font-size: 2rem;
  font-weight: bold;
}

.contentsText {
  margin-bottom: 8px;
}

.devText {
  color: #2196f3;
}

.historyYear{
  font-size: 2rem;
  padding-bottom: 5px;
}

.historyMonth {
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 10px;
  color: #2196f3;
  vertical-align: top;
}

.historyText {
  font-size: 1rem;
  text-align: left;
}

hr {
  margin: 16px auto;
  width: 99.5%;
  border-color: #ffffff5c;
}

.svgLogoinAbout {
  height: 12rem;
}

</style>
