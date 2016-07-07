<style lang="scss">

</style>

<template>
  <div>
    <a v-for="link in conteudo.links" :href="link.link">{{link.nome}}</a>
  </div>
</template>

<script>
  var $$$ = require('jquery')

  module.exports = {

    replace: true,
    props: ['conteudo'],
    data: function(){
      return {
      }
    },
    computed: {

    },
    attached: function() {
      
    },
    beforeDestroy: function(){

    },

    components: {
      
    },

    filters: {

    }

  }

</script>