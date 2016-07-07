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

  .mdl-layout__tab {
    &.is-hidden {
      display: none;
    }
  }


</style>

<template>
  <div>
    <div v-for="img in conteudo.imagens">
      <img :src="img">
    </div >
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