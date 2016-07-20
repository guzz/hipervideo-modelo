<style lang="scss">
  #list_files {
    .mdl-card {
      min-height: 100px;
    }
    .material-icons {
      font-size: 80px;
    }
    .mdl-card__title {
      padding: 10px;
      background: rgba(0,0,0,.2);
      .mdl-card__title-text {
        font-size: 14px;
      }
    }
  }
  #list_links {
    .mdl-card {
      min-height: 350px;
    }

  }
</style>

<template>
  <div>
    <div class="mdl-grid" id="list_files">
      <div v-for="link in link_files" class="mdl-cell mdl-cell--2-col">
        <a :href="link.link" @click.prevent="openLink(link.link)" :title="link.nome" style="text-decoration: none; text-align: center;" class="popup-iframe">
          <div class="mdl-card mdl-shadow--2dp single-card">
            <div><i class="material-icons">{{link.icon}}</i></div>
            <div class="mdl-card__title">
              <h2 class="mdl-card__title-text">{{link.nome}}</h2>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="mdl-grid" id="list_links">
      <div v-for="link in link_cards" class="mdl-cell mdl-cell--6-col">
        <a :href="link.link" @click.prevent="openLink(link.link)" :title="link.nome" style="text-decoration: none; text-align: center;">
          <div class="mdl-card mdl-shadow--2dp single-card" :style="{ backgroundImage: 'url('+link.img+')' }" style="background-size: 100%;">
            <!-- <img :alt="link.nome" :src="link.img"> -->
            <div class="mdl-card__title" style="background: rgba(255,255,255,0.6)">
              <h2 class="mdl-card__title-text">{{link.nome}}</h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
  var $$$ = require('jquery')

  module.exports = {

    replace: true,
    props: ['conteudo'],
    data: function(){
      return {
        link_files: [],
        link_cards: []
      }
    },
    computed: {

    },
    attached: function() {
      var self = this
      for (var i = 0; i < this.conteudo.links.length; i++) {
        var n = {}
        var split = this.conteudo.links[i].link.split('.')
        var format = split[split.length - 1]
        if (format === "jpg" || format === "png" || format === "jpeg") {
          n.icon = 'photo'
          n.nome = this.conteudo.links[i].nome
          n.link = this.conteudo.links[i].link
          this.link_files.push(n)
        } else if (format === "pdf" || format === "doc" || format === "odt" || format === "docx") {
          n.icon = 'insert_drive_file'
          n.nome = this.conteudo.links[i].nome
          n.link = this.conteudo.links[i].link
          this.link_files.push(n)
        } else {
          $$$.ajax({
            url: 'http://opengraph.io/api/1.0/site/'+this.conteudo.links[i].link,
            crossDomain: true,
            dataType: 'json',
            xhrFields: {
              a: i
            },
            success: function(data) {
              var t = {}
              if (data.error) {
                t.nome = self.conteudo.links[this.xhrFields.a].nome
                t.img = "https://s3-sa-east-1.amazonaws.com/jardim-sites/hipervideo-modelo/fundo_link.png"
                t.desc = ""
                t.link = self.conteudo.links[this.xhrFields.a].link
              } else {
                t.nome = data.hybridGraph.title
                t.img = data.hybridGraph.image
                t.desc = data.hybridGraph.description
                t.link = self.conteudo.links[this.xhrFields.a].link
              }
              self.link_cards.push(t)
            }
          })
        }
      }

    },
    beforeDestroy: function(){

    },

    methods: {
      openLink: function(link) {
        this.$parent.$parent.link = link
      }
    },

    components: {
      
    },

    filters: {

    }

  }

</script>