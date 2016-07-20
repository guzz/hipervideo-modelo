<style lang="scss">
  .banner-cont {
    -webkit-transition: all .6s ease;
       -moz-transition: all .6s ease;
        -ms-transition: all .6s ease;
         -o-transition: all .6s ease;
            transition: all .6s ease;
    opacity: 1;
  }
  .slide-transition {
    
  }
  .slide-enter, .slide-leave {
    -webkit-transform: translate(24px,0px) scale(1);
    -moz-transform: translate(24px,0px) scale(1);
    -o-transform: translate(24px,0px) scale(1);
    -ms-transform: translate(24px,0px) scale(1);
    transform: translate(24px,0px) scale(1);
    opacity: 0 !important;
  }

  .sli-transition {
    
  }
  .sli-enter, .sli-leave {
    -webkit-transform: translate(0px,24px) scale(1);
    -moz-transform: translate(0px,24px) scale(1);
    -o-transform: translate(0px,24px) scale(1);
    -ms-transform: translate(0px,24px) scale(1);
    transform: translate(0px,24px) scale(1);
    opacity: 0 !important;
  }

  .icons {
    font-size: 20px;
    vertical-align: middle;
    cursor: default;
  }



// Classes dos containers do banner de filmes

  .banner-data {
    filter:alpha(opacity=100);
      opacity: 1;
      -moz-opacity: 1;
      -webkit-opacity: 1;
      color: white;
  }

  .banner-overlay {
    filter:alpha(opacity=50);
      opacity: 0.5;
      -moz-opacity:0.5;
      -webkit-opacity:0.5;
  }

  .banner-owner {
    filter:alpha(opacity=100);
      opacity: 1;
      -moz-opacity: 1;
      -webkit-opacity: 1;
  }


// Classes das divs internas dos containers

  #video-data {
    width: 90%;
    margin-left: 5%;
    padding-bottom: 10px;
  }

  #video-title {
    margin-bottom: 10px;
    font-size: 30px;
    text-align: center;
    line-height: 30px;
    @media screen and (max-width: 550px) {
        font-size: 18px;
        line-height: 20px;  
      }
  }

  #video-length {
    width: 33%;
    margin-right: 0.5%;
    float: left;
  }

  #video-qual {
    width: 33%;
    text-align: center;
    margin-right: 0.5%;
    float: left;
  }

  #video-acce {
    width: 33%;
    text-align: right;
    float: left;
  }

  #video-description {
    clear: left;
    margin-top: 10%;
    margin-bottom: 5%;
    @media screen and (max-width: 550px) {
        font-size: 80%;
        margin-top: 10%;
        margin-bottom: 2%;  
      }
  }

  #video-perks {
    float: left;
    width: 60%;
    @media screen and (max-width: 320px) {
        visibility: hidden;
      }
    @media screen and (max-width: 550px) {
        width: 100%;
      }
  }

  #video-play {
    float: right;
    width: 30%;
    text-align: center;
    @media screen and (max-width: 550px) {
        visibility: hidden;
      }
  }

  #link-play {
    &:hover {
      .play-arrow, .play-btn {
        transform: scale(1.2)
      }
      .play-arrow {
        color: rgb(255,82,82);
      }
    }
  }

  .play-btn, .play-arrow {
    -webkit-transition: all .3s ease;
       -moz-transition: all .3s ease;
        -ms-transition: all .3s ease;
         -o-transition: all .3s ease;
            transition: all .3s ease;
  }

  .play-btn {
    color: white;
    font-size: 70px;
  }

  .play-arrow {
    z-index: 1;
    color: white;
    position: absolute;
    font-size: 46px;
    margin-left: 14px;
    margin-top: 12px;
  }

  #video-owner {
    text-align: center;
    color: white;
    margin-top: 5%;
    @media screen and (max-width: 550px) {
        visibility: hidden;
      }
  }

  .img-owner {
    height: 70px;
    @media screen and (max-width: 550px) {
        visibility: hidden;
      }

  }
 

</style>

<template>
  
  <div v-if="banner" class="mdl-cell mdl-cell--6-col banner-data banner-cont" transition="slide">

    <div id="video-data">
      <div id="video-title">{{ banner.nome }}</div>
      
      <div id="video-length">
        <i class="fa fa-clock-o icons"></i> {{ banner.duracao }}
      </div>
      
      <div id="video-qual">
        <div v-if="banner.qualidades['baixa']" id="vidqual1" class="icon material-icons icons">videocam</div>
        <div v-if="banner.qualidades['baixa']" class="mdl-tooltip" for="vidqual1">Qualidade Baixa</div>
        
        <div v-if="banner.qualidades['media']" id="vidqual2" class="icon material-icons icons">hd</div>
        <div v-if="banner.qualidades['media']" class="mdl-tooltip" for="vidqual2">Qualidade Média</div>
        
        <div v-if="banner.qualidades['alta']" id="vidqual3" class="icon material-icons icons" style="color: red">hd</div>
        <div v-if="banner.qualidades['alta']" class="mdl-tooltip" for="vidqual3">Qualidade Alta</div>
      </div>
      
      <div id="video-acce">
        <i v-if="banner.acessibilidade['audio']" id="audiodescr" class="fa fa-audio-description"></i>
        <div v-if="banner.acessibilidade['audio']" class="mdl-tooltip mdl-tooltip--left" for="audiodescr">Audio Descrição</div>
        
        <i v-if="banner.acessibilidade['cc']" id="closedcapts" class="fa fa-cc"></i>
        <div v-if="banner.acessibilidade['cc']" class="mdl-tooltip mdl-tooltip--left" for="closedcapts">Legendas</div>

        <i v-if="banner.acessibilidade['libras']" id="signing" class="fa fa-signing"></i>
        <div v-if="banner.acessibilidade['libras']" class="mdl-tooltip mdl-tooltip--left" for="signing">Libras</div>
      </div>
    
      <div id="video-description">
        {{{ banner.descricao | marked }}}
      </div>

      <div id="video-perks">

        <div style="width: 50%; float: left">
          <div v-for="tagA in tagsA">
            <i class="material-icons icons">check_circle</i> {{tagA}} <br>
          </div>
        </div>

        <div style="width: 50%; float: left">
          <div v-for="tagB in tagsB">
            <i class="material-icons icons">check_circle</i> {{tagB}} <br>
          </div>
        </div>

      </div>

      <div id="video-play">
          <a href="/#/{{banner.id}}" id="link-play">
            <i class="material-icons play-arrow">play_arrow</i>
            <i class="material-icons play-btn">play_circle_outline</i>
          </a>
      </div>

      <div class="clear"> </div>

    </div>

  </div>
  
  <div v-if="banner" class="mdl-cell mdl-cell--4-col banner-overlay banner-cont" transition="slide">
  </div>
  
  <div v-if="banner" class="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone banner-owner banner-cont" transition="sli">
    
    <div id="video-owner">
      <div>
      <a :href="banner.owner.url" target="_blank" transition="fade">
      <img class="img-owner" :src="banner.owner.img" transition="fade">
      </a>
      </div>
    </div>

  </div>
  <div v-if="banner" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1; background-size: 100%;" transition="fade" :style="{'background-image': 'url('+banner.capa+')'}"></div>

</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  module.exports = {
    replace: true,
    props: ['banner'],
    data: function(){
      return {
        tagsA: [],
        tagsB: []
      }
    },
    methods: {
      
    },
    computed: {
      
    },
    attached: function () {

      for (var i = 0; i < this.banner.tags.length; i++) {
        if (i % 2 == 0) {
          this.tagsA.push(this.banner.tags[i])
        } else {
          this.tagsB.push(this.banner.tags[i])
        }
      }

      componentHandler.upgradeDom()

    },
    components: {
      
    },
    filters: {
      marked: function(value) {
        return marked(value)
      }
    }
  }
</script>