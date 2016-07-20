<style lang="scss">
  #video_list {
    .mdl-card {
          min-height: 150px !important;
    }
    .mdl-card__title {
      padding: 10px;
      .mdl-card__title-text {
        font-size: 14px;
      }
    }
  }
</style>

<template>
  <div>
    <div class="mdl-grid" id="video_list">
      <div v-for="video in videos" class="mdl-cell mdl-cell--3-col">
        <a :href="video.url" target="_blank" :title="video.title" style="text-decoration: none; text-align: center;" class="popup-iframe">
          <div class="mdl-card mdl-shadow--2dp single-card">
            <img :alt="video.title" src="http://img.youtube.com/vi/{{video.id}}/mqdefault.jpg">
            <div class="mdl-card__title">
              <h2 class="mdl-card__title-text">{{video.title}}</h2>
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
        videos: []
      }
    },
    computed: {
      
    },
    attached: function() {
      var self = this

      var playlistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=' + this.conteudo.videos + '&key=AIzaSyCwNv14d5bNQ4MwaodqT6z45-6A5y4kzus';
      var videoURL= 'http://www.youtube.com/watch?v=';
      $$$.getJSON(playlistUrl, function(data) {
        // console.log(data);
        $$$.each(data.items, function(i, item) {
          // console.log(item)
          var video_data = {};
          video_data.title = item.snippet.title;
          video_data.id = item.snippet.resourceId.videoId;
          video_data.url = videoURL + video_data.id;
          self.videos.push(video_data);
        });
      })

      setTimeout(function() {
        jQuery('.popup-iframe').magnificPopup({type:'iframe'});
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