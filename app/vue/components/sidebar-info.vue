<style lang="scss">
  #conteudo_info {
    overflow: hidden;
    position: relative;
    height: 96%;
    padding-left: 40px;
    padding-right: 40px;
    transition: all 0.3s ease;
    & img { width: 100%; }
    #app.marco-fechado & {
      height: 100%;
    }
  }

  .info-texto {
    letter-spacing: 0;
  }
  
  .image-list {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
    }
  }

  .video-list {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
      width: 220px;
    }
    .slick-next {
      right: -25px !important;
    }
    .slick-prev {
      left: -25px !important;
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
    <div class="border context-bg"></div>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header context-bg">
        <div class="mdl-layout__header-row">
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="" style="color: rgb(66,66,66);" :href="'#/' + params.video"><i style="font-size: 35px; float: right; color: white;" class="material-icons">close</i></a>
          </nav>

        </div>
        <div class="mdl-layout__tab-bar context-bg">
          <a href="#scroll-tab-1" class="mdl-layout__tab is-active">Tab 1</a>
          <a href="#scroll-tab-2" class="mdl-layout__tab">Tab 2</a>
        </div>
      </header>
      <main class="mdl-layout__content">
        <div class="page-content">
          <div class="mdl-grid" style="height: 100%;">
            <div class="mdl-cell mdl-cell--12-col" style="height: 100%;">
              <div id="conteudo_info">

                <in-mapa :conteudo="conteudo" v-if="conteudo && hasMap"></in-mapa>

                <!-- <in-databars v-for="stat in conteudo.stats" :stat="stat" v-if="conteudo && hasDatabars"></in-databars> -->

                <div class="info-texto">
                  {{{html_texto | marked}}}
                </div>
                
                <h3 v-if="conteudo && conteudo.imagens"> IMAGENS </h3>
                <div class="image-list"></div>
                <h3 v-if="conteudo && conteudo.video_list"> VÍDEOS </h3>
                <div class="video-list"></div>
                <h3 v-if="conteudo && conteudo.arquivos"> LINKS </h3>
                <div class="link context-bg" v-for="cont in conteudo.arquivos">
                  <a :href="cont.link" target="_blank" class="context-bg">
                    {{cont.nome | uppercase}}
                  </a>
                </div>
                <h3 v-if="conteudo && conteudo.discursoes"> DISCUSSÃO </h3>
                <div class="link context-bg" v-for="cont in conteudo.discursoes">
                  <a :href="cont.link" target="_blank" class="context-bg">
                    {{cont.nome | uppercase}}
                  </a>
                </div>
                <div class="link" :class="conteudo.icon + '-bg'" v-if="conteudo && conteudo.hipervideo">
                  <a :href="conteudo.hipervideo.link" :class="conteudo.icon + '-bg'">
                    {{conteudo.hipervideo.nome | uppercase}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  var Vue = require('vue')
  var $$$ = require('jquery')
  var perfectScrollbar = require('perfect-scrollbar')
  var marked = require('marked')

  module.exports = {

    replace: true,
    props: ['params', 'conteudo'],
    data: function(){
      return {
        html_texto: '',
        videoIndex: 0,
        imageIndex: 0
      }
    },
    computed: {
      hasDatabars: function(){
        return this.conteudo.stats !== undefined
      },
      hasMap: function(){
        return this.conteudo.mapa !== undefined
      }
    },
    attached: function() {
      var self = this

      jQuery('.image-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
      });

      jQuery('.video-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
      })

      this.$on('create-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar({
          suppressScrollX: true
        });

        if (self.conteudo.texto !== "") {
          self.html_texto = self.conteudo.texto;
        } else {
          self.html_texto = self.$parent.component.fields.excerpt
        }

        Trello.get("/cards/"+self.$parent.db.eventos[parseInt(self.conteudo.id)].card+"/attachments", function(attach) {
          // console.log(attach)
          if (attach.length > 0) {
            for (var i = attach.length - 1; i >= 0; i--) {
              jQuery('.image-list').slick('slickAdd','<img src="' + attach[i].url + '">');
              self.imageIndex ++;
            };
          }
        })        

        if (self.$parent.conteudo.video_list) {
          var playlistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=' + self.conteudo.video_list + '&key=AIzaSyBmFsHCZeHcrFIb9Fskr718noTVpqRysKc';
          var videoURL= 'http://www.youtube.com/watch?v=';
          $$$.getJSON(playlistUrl, function(data) {
            // console.log(data);
            var list_data=[];
            $$$.each(data.items, function(i, item) {
              var video_data = {};
              video_data.title = item.snippet.title;
              video_data.id = item.snippet.resourceId.videoId;
              video_data.url = videoURL + video_data.id;
              list_data.push(video_data);
            });
            for (var i = list_data.length - 1; i >= 0; i--) {
              jQuery('.video-list').slick('slickAdd','<div><a href="'+ list_data[i].url +'" target="_blank" title="'+ list_data[i].title +'" style="text-decoration: none; text-align: center;" class="popup-iframe"><img alt="'+ list_data[i].title +'" src="http://img.youtube.com/vi/'+ list_data[i].id +'/0.jpg"</a><p>' + list_data[i].title + '</p></div>');
              self.videoIndex ++;
              jQuery('.popup-iframe').magnificPopup({type:'iframe'});
            };
          })
        }

        $$$('#conteudo_info').perfectScrollbar('update');
        
      })

      this.$on('destroy-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar('destroy');
        for (var i = 0; i < this.imageIndex; i++) {
          jQuery('.image-list').slick('slickRemove', 0);
        }
        // console.log('videoIndex no destroy ' + this.videoIndex);
        for (var i = 0; i < this.videoIndex + 1; i++) {
          // console.log('no destroy i = '+ i + ' e videoIndex = ' + this.videoIndex);
          jQuery('.video-list').slick('slickRemove', 0);
        }
        this.imageIndex = 0;
        this.videoIndex = 0;
      })

      this.$on('so-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar({
          suppressScrollX: true
        });
      })
      
    },
    beforeDestroy: function(){
      this.$off('create-scrollbar')
      this.$off('destroy-scrollbar')
    },

    components: {
      'in-databars': require('../components/content-databars.vue'),
      'in-mapa': require('../components/content-map.vue')
    },

    filters: {
      'marked': marked
    }

  }

</script>