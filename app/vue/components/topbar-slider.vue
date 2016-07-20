<style lang="scss">
	.rangeslider {
		position: relative;
		border-radius: 0;
		width: 100%;
		background: none repeat scroll 0 0 rgba(0, 0, 0, 0.8);
		transition: all 0.3s ease;
		.rangeslider__fill {
			border-radius: 0;
		}
	}

	.rangeslider__fill {
		border-radius: 0;
		transition: all 0.3s ease;
	}

	.rangeslider__buffer {
		background: rgba(255,255,255,0);
		position: absolute;
		top: 0;
		left: 0;
		height: 27px;
		transition: all 0.3s ease;
		#video-controls.hover & {
			height: 3px;
		}
	}

	#tp-cr {
		position: absolute; 
		margin: 7px;
		opacity: 1;
		top: 0; 
		left: 5px; 
		color: white;
		font-weight: 700;
		font-size: 75%;
		z-index: 10;
		transition: all 0.3s ease;
		#video-controls.hover & {
			opacity: 0;
			font-size: 0;
		}
	}

	#tp-cr-min {
		position: relative; 
		float: left;
	}

	#tp-cr-sec{
		position: relative; 
		float: left;
	}

	#tp-tt {
		position: absolute; 
		margin: 7px;
		opacity: 1;
		top: 0; 
		right: 5px; 
		color: white;
		font-weight: 700;
		font-size: 75%;
		z-index: 10;
		transition: all 0.3s ease;
		#video-controls.hover & {
			opacity: 0;
			font-size: 0;
		}
	}

	#tp-tt-min {
		position: relative; 
		float: right;
	}

	#tp-tt-sec{
		position: relative; 
		float: right;
	}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently not supported by any browser */
  cursor:default;				/* Force the default cursor to show on element */
}

</style>

<template>
	
	<div class="rangeslider clickable" :id="'rangeslider-' + db.headers.id">
		<div id="tp-cr" class="noselect">
			<div id="tp-cr-min">00</div>
			<div style="position: relative; float: left;">:</div>
			<div id="tp-cr-sec">00</div>
		</div>
		<div id="tp-tt" class="noselect">
			<div id="tp-tt-sec">00</div>
			<div style="position: relative; float: right;">:</div>
			<div id="tp-tt-min">00</div>
		</div>
		<div class="rangeslider__buffer"></div>
		<div class="rangeslider__fill context-bg" style="width: 0px;"></div>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		replace: true,
		props: ['db'],
		data: function() {
			return {
				hip: null,
				sel: null,
				bol: false,
				seek: null
			}
		},
		attached: function() {
			var self = this

			this.hip = $$$('#hipVid-'+this.db.headers.id).get(0);
			this.sel = $$$('#rangeslider-'+this.db.headers.id).get(0);
			this.seek = $$$('#seek-bar-'+this.db.headers.id).get(0);
			this.bol = false;

			var seekTime = function(e) {
				var janela   = window.innerWidth,
					pos      = e.pageX,
					relativo = self.hip.duration * (pos / janela);

				self.hip.currentTime = relativo;
			};

			this.seek.addEventListener("change", function() {
				// Calculate the new time
				var time = self.hip.duration * (self.seek.value / 1000);

				// Update the video time
				self.hip.currentTime = time;
			});

			this.sel.addEventListener("mousemove", function(e) {
				var janela   = window.innerWidth,
				pos      = e.pageX,
				relativo = self.hip.duration * (pos / janela);

				if (self.bol===true) {
					seekTime(e);
				}
			});

			this.sel.addEventListener("click", function(e) {
				self.$parent.seeking = true
				setTimeout(function() {
					self.$parent.seeking = false
				}, 500)
			});

			this.sel.addEventListener("mouseup", function(e) {
				// self.hip.play();
				// $$$('video').removeClass('pausado');
				self.$dispatch('ping');
				self.$parent.seeking = false
				self.bol = false;
			});

			this.sel.addEventListener("mousedown", function(e) {
				self.$parent.seeking = true
				// self.hip.pause();
				self.bol = true;
				seekTime(e);
			});
		},
		beforeDestroy: function(){
			this.sel.removeEventListener("click", function(e) {
				self.$parent.seeking = true
				setTimeout(function() {
					self.$parent.seeking = false
				}, 500)
			});

			this.seek.removeEventListener("change", function() {
				// Calculate the new time
				var time = self.hip.duration * (self.seek.value / 1000);

				// Update the video time
				self.hip.currentTime = time;
			});

			this.sel.removeEventListener("mousemove", function(e) {
				var janela   = window.innerWidth,
				pos      = e.pageX,
				relativo = self.hip.duration * (pos / janela);

				if (self.bol===true) {
					seekTime(e);
				}
			});

			this.sel.removeEventListener("mouseup", function(e) {
				// self.hip.play();
				self.$parent.seeking = false
				self.bol = false;
			});

			this.sel.removeEventListener("mousedown", function(e) {
				self.$parent.seeking = true
				// self.hip.pause();
				self.bol = true;
				seekTime(e);
			});
		}
	}
</script>