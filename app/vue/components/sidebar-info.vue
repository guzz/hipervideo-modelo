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

  .mdl-layout__tab {
    padding: 0 24px 0 32px;
    &.is-hidden {
      display: none;
    }
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
          <a v-for="cont in conteudo" href="" @click.prevent="changeTab($key)" class="mdl-layout__tab" :class="{'is-active': $key === tab, 'is-hidden': $key === 'id' || $key === 'title' || $key === 'card'}">
            <span><i class="material-icons" style="position: absolute; left: 0; top: 12px;">{{icon[$key]}}</i></span>
            {{$key}}
          </a>
        </div>
      </header>
      <main class="mdl-layout__content" id="content_main" style="height: 100%;">
        <div class="page-content" style="height: 100%;">
          <div class="mdl-grid" style="height: 100%; padding: 0;">
            <div class="mdl-cell mdl-cell--12-col" style="height: 100%; margin: 0;">
              <div id="conteudo_info" style="padding:0;height: 100%;">

                <div :is="tab" transition="fade" :conteudo="conteudo" :user.sync="user" v-ref:tab></div>

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

  module.exports = {

    replace: true,
    props: ['params', 'conteudo', 'user'],
    data: function(){
      return {
        tab: 'texto',
        icon: {
          texto: 'format_align_left',
          links: 'link',
          videos: 'video_library',
          imagens: 'photo_library',
          mapa: 'map',
          graficos: 'pie_chart',
          comentarios: 'forum'
        }
      }
    },
    computed: {
      
    },
    attached: function() {
      var self = this

      this.$on('create-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar({
          suppressScrollX: true
        });

        self.getImages()

        $$$('#conteudo_info').perfectScrollbar('update');
        
      })

      this.$on('destroy-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar('destroy');
      })

      this.$on('so-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar({
          suppressScrollX: true
        });
      })
      componentHandler.upgradeDom()
      
    },
    beforeDestroy: function(){
      this.$off('create-scrollbar')
      this.$off('destroy-scrollbar')
    },
    methods: {
      changeTab: function(tab) {
        this.tab = tab
      },
      getImages: function() {
        var self = this
        Trello.get("/cards/"+this.$parent.db.eventos[parseInt(this.conteudo.id)].card+"/attachments", function(attach) {
          // console.log(attach)
          if (attach.length > 0) {
            self.conteudo = Object.assign({}, self.conteudo, {
              imagens: [],
              comentarios: []
            })
            // self.conteudo.imagens = []
            // self.conteudo.comentarios = []
            for (var i = attach.length - 1; i >= 0; i--) {
              self.conteudo.imagens.push(attach[i].url)
            };
            self.getComments()
          } else {
            self.conteudo = Object.assign({}, self.conteudo, {
              comentarios: []
            })
            // self.conteudo.comentarios = []
            self.getComments()
          }
        })
      },
      getComments: function() {
        var self = this
        Trello.get("/cards/"+self.$parent.db.eventos[parseInt(self.conteudo.id)].card+"/actions", function(comment) {
          if (comment.length > 0) {
            var usr_atual = {
              id: '',
              i: -1
            }
            for (var i = comment.length - 1; i >= 0; i--) {
              if (comment[i].type === 'commentCard') {
                var c = {
                  text: [],
                  usr: {
                    foto: 'https://trello-avatars.s3.amazonaws.com/'+ comment[i].memberCreator.avatarHash +'/30.png',
                    nome: comment[i].memberCreator.username,
                    id: comment[i].memberCreator.id
                  }
                }
                if (usr_atual.id === comment[i].memberCreator.id) {
                  self.conteudo.comentarios[usr_atual.i].text.push(comment[i].data.text)
                } else {
                  c.text.push(comment[i].data.text)
                  self.conteudo.comentarios.push(c)
                  usr_atual.id = c.usr.id
                  usr_atual.i += 1
                }
              }
            };
          }
        })
      }
    },
    components: {
      'texto': require('../components/content-texto.vue'),
      'videos': require('../components/content-videos.vue'),
      'imagens': require('../components/content-imagens.vue'),
      'links': require('../components/content-links.vue'),
      'graficos': require('../components/content-databars.vue'),
      'comentarios': require('../components/content-comentarios.vue'),
      'mapa': require('../components/content-map.vue')
    },

    filters: {

    }

  }

</script>