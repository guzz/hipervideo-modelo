<style lang="scss">
	.hipVid {
	  background-size: cover;
	  height: auto;
	  width: 100%;
	  position: fixed;
	  left: 0;
	  transition: all 0.5s ease 0s;
	  z-index: -100;
	  opacity: 1;
	  #full:-webkit-full-screen & {
		  z-index: 0;
		}
	}
	.hipVid-status {
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -40px;
		margin-left: -35px;
		z-index: -99;
		transition: all 0.5s;
		&.is-play {
			opacity: 0;
			transform: scale(1.2);
		}
		i.fa {
			opacity: 0.5;
		}
	}
</style>

<template>
	<div class="hipVid-status" :class="{'is-play': playing}">
		<i id="pauseplay" class="fa fa-5x" :class="{'fa-play': playing, 'fa-pause': !playing}"></i>
	</div>
	<video :poster="db.headers.img" class="hipVid" :id="'hipVid-' + db.headers.id" autoplay>
		<source :src="db.headers.url + '_' + acessibilidade + '_' + queQualidade + '.mp4'" type="video/mp4" id="mp4">
	</video>
</template>

<script>

	var Vue = require('vue')
	var $$$ = require('jquery')

	module.exports = {
		props: ['db', 'video', 'qualidade', 'acessibilidade', 'playing'],
		data: function(){
			return {
				qual: 'baixa',
				lib: 'normal',
				timecodeAntigo: 0,
				hipervideo: null,
				timecode: 0
			}
		},
		watch : {
			qualidade: function () {
				this.updateVideo()
			},
			acessibilidade: function () {
				this.updateVideo()
			}
		},
		computed: {
			queQualidade: function () {
				if (this.qualidade === 0) {
					return "baixa"
				} else if (this.qualidade === 1) {
					return "media"
				} else if (this.qualidade === 2) {
					return "alta"
				}
			}
		},
		created: function() {
			if (this.acessibilidade === "libras" && !this.db.headers.acessibilidade.libras) {
				console.log('libras')
				this.acessibilidade = "normal"
			} else if (this.acessibilidade === "audio" && !this.db.headers.acessibilidade.audio) {
				this.acessibilidade = "normal"
			}
		},
		attached: function() {
			
			var self = this;

			this.hipervideo = this.video.tag
			this.hipervideo.load()
			var seekBar = $$$('#seek-bar-'+this.db.headers.id).get(0)
			var selector = $$$('.rangeslider').get(0)

			var tempoCorrido = function(array) {
				var min = array[0]
				var sec = array[1]
				$$$('#tp-cr-min').text(min)
				$$$('#tp-cr-sec').text(sec)
			};

			function toFormat(time) {
			  var secT  = Math.floor(time),
			      sec   = (secT % 60).toFixed(),
			      min   = Math.floor(secT / 60),
			      sec_  = toDigits(sec),
			      min_  = toDigits(min)

			  function toDigits(n) {
			    return n > 9 ? "" + n: "0" + n
			  }

			  return [min_.toString(), sec_.toString()]
			}

			this.hipervideo.addEventListener("loadstart" , function() {
				$$$('#loading').addClass('loading')
			})

			this.hipervideo.addEventListener("canplay" , function() {
				setTimeout(function() {
					$$$('#loading').removeClass('loading')
					self.$dispatch('hipervideo-canplay')
				}, 500)
			})

			this.hipervideo.addEventListener("loadedmetadata" , function() {
				var duracao = toFormat(self.hipervideo.duration)
				// this.play();
				var tempoTotal = function(array) {
					var min = array[0]
					var sec = array[1]
					$$$('#tp-tt-min').text(min)
					$$$('#tp-tt-sec').text(sec)
				};

				tempoTotal(duracao)
			})

			this.hipervideo.volume = 1
		  
			// Update the seek bar as the video plays
			this.hipervideo.addEventListener("timeupdate", function() {
				// Calculate the slider value
				var value = (1000 / self.hipervideo.duration) * self.hipervideo.currentTime
				var fillWidth = seekBar.value / 10
				var bufferEnd = self.hipervideo.buffered.end(0)
				var bufferWidth = bufferEnd / self.hipervideo.duration * 100
				var tempo = toFormat(self.hipervideo.currentTime)
				var t = self.hipervideo.currentTime
				tempoCorrido(tempo)
				if (self.timecode !== self.timecodeAntigo) {
					self.hipervideo.currentTime = self.timecode
					self.timecodeAntigo = self.timecode
				}

				// Update the slider value
				seekBar.value = value
				$$$('.rangeslider__fill').css('width', fillWidth+"%")
				$$$('.rangeslider__buffer').css('width', bufferWidth+"%")
				
				// Dispatch timeupdate to parent
				self.$dispatch('video-timeupdate', self.hipervideo.currentTime, self.hipervideo.duration, self.hipervideo.currentTime/self.hipervideo.duration)
			})
		},
    beforeDestroy: function(){
    	var self = this

      this.$off('mudou-qualidade')
      this.$off('mudou-acess')

      this.hipervideo.removeEventListener("loadstart" , function() {
				$$$('#loading').addClass('loading')
			})

			this.hipervideo.removeEventListener("canplay" , function() {
				$$$('#loading').removeClass('loading')
				self.$dispatch('hipervideo-canplay')
			})

			this.hipervideo.removeEventListener("loadedmetadata" , function() {
				var duracao = toFormat(self.hipervideo.duration)
				var tempoTotal = function(array) {
					var min = array[0]
					var sec = array[1]
					$$$('#tp-tt-min').text(min)
					$$$('#tp-tt-sec').text(sec)
				};

				tempoTotal(duracao)
			})

			this.hipervideo.removeEventListener("timeupdate", function() {
				// Calculate the slider value
				var value = (1000 / self.hipervideo.duration) * self.hipervideo.currentTime;
				var fillWidth = seekBar.value / 10
				var tempo = toFormat(self.hipervideo.currentTime)
				tempoCorrido(tempo)

				// Update the slider value
				seekBar.value = value
				$$$('.rangeslider__fill').css('width', fillWidth+"%")
				$$$('.rangeslider__handle').css('left', fillWidth+"%")

				// Dispatch timeupdate to parent
				self.$dispatch('video-timeupdate', self.hipervideo.currentTime, self.hipervideo.duration, self.hipervideo.currentTime/hipervideo.duration)
			});

    },
		methods: {
			play: function(){
				this.hipervideo.play()
				this.playing = true
			},
			pause: function(){
				this.hipervideo.pause()
				this.playing = false
			},
			continuarTemp: function() {
				this.hipervideo.currentTime = this.video.time
			},
			updateVideo: function () {
				this.timecode = this.video.time
				this.hipervideo.load()
				this.continuarTemp()
			}
		}
	}
</script>