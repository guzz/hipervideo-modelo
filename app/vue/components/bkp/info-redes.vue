<style lang="scss">
  #conteudo_info_redes {
    overflow: hidden;
    position: relative;
    height: 85%;
    padding-left: 40px;
    padding-right: 40px;
    transition: all 0.3s ease;
    & img { width: 100%; }
    #app.marco-fechado & {
      height: 85%;
    }
  }

  .voltar {
    cursor: pointer;
    font-size: 150%;
    position: absolute;
    background-color: #555;
    top: 0;
    right: 30px;
    padding: 10px;
    &:hover {
      background-color: #999;
    }
  }

  .info-texto {
    letter-spacing: 0;
  }
  
  .image-list-redes {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
    }
  }

  .video-list-redes {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
      width: 220px;
    }
  }

  .mulher-bg {
    background-color: #ed1e79;
  }

  .adolescente-bg {
    background-color: #00a300;
  }

  .crianca-bg {
    background-color: #0cc;
  }

  .prisional-bg {
    background-color: #f00;
  }

  .deficiencia-bg {
    background-color: #00c;
  }

</style>

<template>
  <div style="height: 100%;">
  <h3>Clique nos botões acima da rede para filtrar o conteúdo de cada área.</h3>
  <h3>Clique pontos da rede para ver seu conteúdo relacionando.</h3>
  <div id="conteudo_info_redes">

    <div :is="in-mapa" :mapa="conteudo.mapa" v-if="conteudo && hasMap"></div>

    <h2 v-if="conteudo && conteudo.title"> 
      {{conteudo.title}} 
    </h2>
    <h2 v-if="conteudo && conteudo.ano"> 
      {{conteudo.ano}} 
    </h2>
    <div class="info-texto">
      {{{html_texto }}}
    </div>

    <div :is="in-databars" :databars="conteudo.databars" v-if="conteudo && hasDatabars"></div>
    
    <h3 v-if="conteudo && conteudo.imagens"> IMAGENS </h3>
    <div class="image-list-redes"></div>
    <h3 v-if="conteudo && conteudo.videos"> VÍDEOS </h3>
    <div class="video-list-redes"></div>
    <h3 v-if="conteudo && conteudo.arquivos"> LINKS </h3>
    <div class="link" :class="[conteudo.group + '-bg']" v-for="cont in conteudo.arquivos">
      <a :href="cont.link" target="_blank">
        {{cont.nome | uppercase}}
      </a>
    </div>
    <h3 v-if="conteudo && conteudo.discursoes"> DISCUSSÃO </h3>
    <div class="link" :class="[conteudo.group + '-bg']" v-for="cont in conteudo.discursoes">
      <a :href="cont.link" target="_blank">
        {{cont.nome | uppercase}}
      </a>
    </div>
    <div class="link" :class="[conteudo.icon + '-bg']" v-if="conteudo && conteudo.hipervideo">
      <a :href="conteudo.hipervideo.link">
        {{conteudo.hipervideo.nome | uppercase}}
      </a>
    </div>
  </div>
  <div class="voltar" @click="voltar">VOLTAR</div>
  </div>
</template>

<script>
  var Vue = require('vue')
  var $$$ = require('jquery')
  var perfectScrollbar = require('perfect-scrollbar')
  var slick = require('slick-carousel')
  var marked = require('marked')

  module.exports = {
    replace: true,

    props: ['glossario'],

    data: function(){
      return {
        conteudo: {},
        html_texto: '',
        videoIndex: 0,
        imageIndex: 0
      }
    },
    computed: {
      hasDatabars: function(){
        return this.conteudo.databars !== undefined
      },
      hasMap: function(){
        return this.conteudo.mapa !== undefined
      }
    },
    attached: function() {
      var self = this

      $$$('.image-list-redes').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
      });

      $$$('.video-list-redes').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
      })

      $$$('#conteudo_info_redes').perfectScrollbar({
        suppressScrollX: true
      });

      this.$on('create-conteudo', function(d) {
        self.conteudo = d.conteudo

        for (var i = 0; i < self.imageIndex; i++) {
          $$$('.image-list-redes').slick('slickRemove', i);
        }
        for (var i = 0; i < self.videoIndex; i++) {
          $$$('.video-list-redes').slick('slickRemove', i);
        }
        self.imageIndex = 0;
        self.videoIndex = 0;

        if (self.conteudo.texto !== "") {
          self.html_texto = marked(self.conteudo.texto);
        } else {
          self.html_texto = marked(d.text);
        }

        if (self.conteudo.imagens) {
          for (var i = self.conteudo.imagens.length - 1; i >= 0; i--) {
            $$$('.image-list-redes').slick('slickAdd','<img src="' + self.conteudo.imagens[i].src + '">');
            self.imageIndex ++;
          };
        }

        if (self.conteudo.videos) {
          var playlistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=' + self.conteudo.videos + '&key=AIzaSyCwNv14d5bNQ4MwaodqT6z45-6A5y4kzus';
          var videoURL= 'http://www.youtube.com/watch?v=';
          $$$.getJSON(playlistUrl, function(data) {
            console.log(data);
            var list_data=[];
            $$$.each(data.items, function(i, item) {
              var video_data = {};
              video_data.title = item.snippet.title;
              video_data.id = item.snippet.resourceId.videoId;
              video_data.url = videoURL + video_data.id;
              list_data.push(video_data);
            });
            for (var i = list_data.length - 1; i >= 0; i--) {
              $$$('.video-list').slick('slickAdd','<div><a href="'+ list_data[i].url +'" target="_blank" title="'+ list_data[i].title +'" style="text-decoration: none; text-align: center;" class="popup-iframe"><img alt="'+ list_data[i].title +'" src="http://img.youtube.com/vi/'+ list_data[i].id +'/0.jpg"</a><p>' + list_data[i].title + '</p></div>');
              self.videoIndex ++;
              jQuery('.popup-iframe').magnificPopup({type:'iframe'});
            };
          });
        }
        
      })
      
    },
    methods: {

      voltar: function() {
        this.glossario = false;
      }

    },
    components: {
      'in-databars': require('../components/content-databars.vue'),
      'in-mapa': require('../components/content-map.vue')
    }

  }

</script>