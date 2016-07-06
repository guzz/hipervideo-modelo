<style lang="scss">

  .info-texto {
    letter-spacing: 0;
  }


</style>

<template>
  <div class="info-texto">
    {{{conteudo.texto | marked}}}
  </div>
</template>

<script>
  var marked = require('marked')

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
      'marked': marked
    }

  }

</script>