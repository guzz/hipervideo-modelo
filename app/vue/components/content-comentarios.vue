<style lang="scss">
  .coment {
    background: rgba(255,255,255,.1);
    min-height: 0;
    .coment_usr {
      width: 10%;
      border-right: 1px solid rgba(255,255,255,.3);
      img {
        width: 40% !important;
        border-radius: 50%;
        margin-left: 30%;
      }
    }
  }
  #chat_user {
    min-height: 0;
    background: rgba(255,255,255,0.8);
    button {
      width: 100%;
      height: 100%;
    }
  }
  #chat_text {
    min-height: 0;
    background: rgba(255,255,255,0.8);
    .mdl-textfield {
      width: 100%;
    }
    button {
      width: 100%;
      height: 100%;
      &:hover {
        background: transparent;
        .material-icons {
          color: rgba(0,0,0,.6);
        }
      }
    }
    textarea {
      color: rgba(0,0,0,.6);
    }
    .material-icons {
      font-size: 60px;
      color: rgba(0,0,0,.2);
    }
  }
</style>

<template>
  <div id="posts" class="mdl-grid">
    <div v-for="coment in conteudo.comentarios" class="mdl-cell mdl-cell--12-col">
      <div class="coment mdl-card mdl-shadow--2dp single-card mdl-grid">
        <div class="coment_usr mdl-cell mdl-cell--2-col">
          <img :src="coment.usr.foto">
          <p style="text-align: center;">{{coment.usr.nome}}</p>
        </div>
        <div class="coment_text mdl-cell mdl-cell--10-col">
          <p v-for="c in coment.text">{{{c | marked}}}</p>
        </div>
      </div>
    </div >
    <div class="mdl-cell mdl-cell--12-col">
      <div v-if="user.connected" id="chat_text" class="mdl-card mdl-shadow--2dp single-card mdl-grid">
        <div class="mdl-cell mdl-cell--10-col">
          <div class="mdl-textfield mdl-js-textfield">
            <textarea class="mdl-textfield__input" type="text" :rows="chat_rows" @keyup.enter="enterEvent" id="comente" v-model="chat_text"></textarea>
            <label class="mdl-textfield__label" for="address">Deixe um comentário...</label>
          </div>
        </div>
        <div class="coment_text mdl-cell mdl-cell--2-col">
          <button @click="sendChat" class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">send</i>
          </button>
        </div>
      </div>
      <div v-if="!user.connected" id="chat_user" class="mdl-card mdl-shadow--2dp single-card mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
          <button @click="connect" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            <i class="fa fa-trello" aria-hidden="true"></i>
            Conecte-se com o Trello
          </button>
        </div>
      </div>
    </div >
  </div>
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')

  module.exports = {

    replace: true,
    props: ['conteudo', 'user'],
    data: function(){
      return {
        chat_rows: 1,
        chat_text: ''
      }
    },
    computed: {

    },
    attached: function() {
      self=this
      $$$('#posts a').on('click', function(e) {
        e.preventDefault()
        self.$parent.$parent.link = e.currentTarget.href
      })

      componentHandler.upgradeDom()
    },
    beforeDestroy: function(){
      $$$('#posts a').off('click', function(e) {
        e.preventDefault()
        self.$parent.$parent.link = e.currentTarget.href
      })
    },

    methods: {
      addRow: function() {
        this.chat_rows += 1
      },
      sendChat: function() {
        var c = {
          text: [],
          usr: {
            nome: this.user.nome,
            foto: this.user.img,
            id: this.user.board
          }
        }

        Trello.post('/cards/'+this.conteudo.card+'/actions/comments', {text: this.chat_text}, function(data) {
          console.log(data)
        })
        c.text.push(this.chat_text)
        this.conteudo.comentarios.push(c)
        this.chat_rows = 1
        this.chat_text = ''
      },
      enterEvent: function(e) {
        if (e.ctrlKey) {
          this.sendChat()
        } else {
          this.addRow()
        }
      },
      connect: function() {
        this.$root.connectTrello()
      }
    },

    filters: {
      'marked': marked
    }

  }

</script>