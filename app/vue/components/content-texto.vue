<style lang="scss">

  .info-texto {
    letter-spacing: 0;
    padding: 30px;
  }


</style>

<template>
  <div class="info-texto">
    <div id="text-content" v-if="conteudo.texto">
      {{{ conteudo.texto | marked }}}
    </div>
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
      }
    },
    computed: {

    },
    attached: function() {
      var self = this
      setTimeout(function() {
        $$$('#text-content a').on('click', function(e) {
          e.preventDefault()
          self.$parent.$parent.link = e.currentTarget.href
        })
      }, 1000)
    },
    beforeDestroy: function(){
      $$$('#text-content a').off('click', function(e) {
        e.preventDefault()
        self.$parent.$parent.link = e.currentTarget.href
      })
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