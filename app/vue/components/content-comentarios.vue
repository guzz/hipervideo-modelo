<style lang="scss">

</style>

<template>
  <div class="">
    <div v-for="coment in chat">
      <div>
        <img :src="coment.usr.foto">
        <p>{{coment.usr.nome}}</p>
      </div>
      <div>{{coment.text}}</div>
    </div >
  </div>
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')

  module.exports = {

    replace: true,
    props: ['conteudo'],
    data: function(){
      return {
        chat: []
      }
    },
    computed: {

    },
    attached: function() {
      for (var i = 0; i < this.conteudo.comentarios.length; i++) {
        this.chat.push(this.conteudo.comentarios[i])
      }
    },
    beforeDestroy: function(){

    },

    components: {
      
    },

    filters: {
      'marked': marked
    }

  }

</script>