<style lang="scss">
  #link-sidebar {
    .mdl-layout__container {
      z-index: 5;
    }
  }

</style>

<template>
  <div id="link-sidebar" style="height: 100%;">
    <div class="border context-bg"></div>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header context-bg">
        <div class="mdl-layout__header-row">
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="" @click.prevent="closeLink" style="color: rgb(66,66,66);" href="#"><i style="font-size: 35px; float: right; color: white;" class="material-icons">arrow_back</i></a>
          </nav>

        </div>
        <div class="mdl-layout__tab-bar context-bg">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" style="margin: 6px;">
            <a style="color: black; text-decoration: none;" :href="link" target="_blank">Abrir link em outra aba</a>
          </button>
        </div>
      </header>
      <main class="mdl-layout__content" id="content_main" style="height: 100%;">
        <div class="page-content" style="height: 100%;">
          <div class="mdl-grid" style="height: 100%; padding: 0;">
            <div class="mdl-cell mdl-cell--12-col" style="height: 100%; margin: 0;">
              <div id="conteudo_info" style="padding:0;height: 100%;background: white;">
                <iframe style="height: 100%;" :src="link"></iframe>
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
    props: ['link'],
    data: function(){
      return {
      }
    },
    computed: {
      
    },
    attached: function() {
      componentHandler.upgradeDom()
    },
    beforeDestroy: function(){
      
    },
    methods: {
      closeLink: function() {
        this.$parent.link = null
        if (this.$parent.params.route.length === 1) {
          this.$parent.videoPlay()
        }
      }
    },
    components: {
      
    },

    filters: {

    }

  }

</script>