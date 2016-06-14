<style lang="scss">
  
</style>

<template>
  <audio id="audioDesc" crossOrigin="anonymous" style="display: none;">
    <source src="{{wav}}" type="audio/wav" id="wav">
    <source src="{{mp3}}" type="audio/mpeg" id="mp3">
  </audio>
</template>

<script>

  var Vue = require('vue')

  module.exports = {
    replace: true,
    data: function(){
      return {
        wav: "",
        mp3: "",
        audioDesc: null,
        vid: null
      }
    },
    created: function() {
      this.mp3 = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/audioDesc/audioDesc_"+this.$parent.id+".mp3";
      this.wav = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/audioDesc/audioDesc_"+this.$parent.id+".wav";
    },
    attached: function() {
      
      var self = this;

      this.audioDesc = document.getElementById("audioDesc");
      this.vid = document.getElementById("hipVid-"+this.$parent.id);
      this.audioDesc.volume = 0;

      this.$on('audio-update', function (time) {
        if (self.audioDesc.currentTime > time + 0.5 || self.audioDesc.currentTime < time - 0.5) {
          self.audioDesc.currentTime = time;
        }
      })

      this.$on('mudou-audioDesc', function (val) {
        if (val === true) {
          console.log(this.vid.volume);
          self.audioDesc.volume = 1;
          self.vid.volume = 0;
          console.log(this.vid.volume);
        } else {
          console.log(this.vid.volume);
          self.audioDesc.volume = 0;
          self.vid.volume = 1;
          console.log(this.vid.volume);
        }
      })

      this.vid.addEventListener("play" , function() {
        self.audioDesc.play();
      })

      this.vid.addEventListener("pause" , function() {
        self.audioDesc.pause();
      })

      if (this.$parent.$parent.audioDesc) {
        console.log(this.vid.volume);
        this.audioDesc.volume = 1;
        this.vid.volume = 0;
        console.log(this.vid.volume);
      }
      
    },
    beforeDestroy: function(){
      this.$off('audio-update')
      this.$off('mudou-audioDesc')
      this.vid.removeEventListener("play" , function() {
        self.audioDesc.play();
      })

      this.vid.removeEventListener("pause" , function() {
        self.audioDesc.pause();
      })
      
    }
  }
</script>