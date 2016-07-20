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

  .mfp-iframe {
    img {
      width: 100%;
    }
  }


</style>

<template>
  <div>
    <div class="mdl-grid" id="video_list">
      <div v-for="img in conteudo.imagens" class="mdl-cell mdl-cell--3-col">
        <a :href="img" target="_blank" :title="img" style="text-decoration: none; text-align: center;" class="popup-iframe">
          <div class="mdl-card mdl-shadow--2dp single-card">
            <img :alt="img" :src="img">
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
        
      }
    },
    computed: {
      
    },
    attached: function() {
      setTimeout(function() {
        jQuery('.popup-iframe').magnificPopup({type:'image'});
      }, 1000)
    },
    beforeDestroy: function(){

    },

    components: {

    },

    filters: {

    }

  }

</script>