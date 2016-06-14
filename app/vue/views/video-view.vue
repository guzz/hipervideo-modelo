<style lang="scss">
	.sidebar {
		width: 22%;
		@media screen and (min-width: 1600px) {
			width: 15%;
		}
		&.has-info {
			@media screen and (min-width: 1600px) {
				width: 16%;
			}
		}
	}
	.sidebar_content {
		position: relative;
		height: 100%;
		z-index: 20;
	}
	.sidebar_back {
		position: absolute;
		background-color: rgba(0,0,0,.5);
		width: 300px;
		height: 100%;
		top: 0;
		left: 0;
		transition: all 0.6s;
		-webkit-transform: translate3d(-300px,0,0);
		-moz-transform: translate3d(-300px,0,0);
		-o-transform: translate3d(-300px,0,0);
		-ms-transform: translate3d(-300px,0,0);
		transform: translate3d(-300px,0,0);
		z-index: 10;
		.sidebar.is-open & {
			-webkit-transform: translate3d(0,0,0);
			-moz-transform: translate3d(0,0,0);
			-o-transform: translate3d(0,0,0);
			-ms-transform: translate3d(0,0,0);
			transform: translate3d(0,0,0);
		}
	}

	.sidebar-right {
		position: absolute;
		right: 0;
		top: 57px;
		width: 300px;
	}

	.infopanel {
		position: absolute;
		background-color: rgba(0,0,0,.8);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		transition: all 0.6s;
		-webkit-transform: translate3d(127%,0,0);
		-moz-transform: translate3d(127%,0,0);
		-o-transform: translate3d(127%,0,0);
		-ms-transform: translate3d(127%,0,0);
		transform: translate3d(127%,0,0);
		&.is-open {
			-webkit-transform: translate3d(300px,0,0);
			-moz-transform: translate3d(300px,0,0);
			-o-transform: translate3d(300px,0,0);
			-ms-transform: translate3d(300px,0,0);
			transform: translate3d(300px,0,0);
		}
		.border {
			position: absolute;
			height: 100%;
			width: 10px;
			top: 0;
			left: 0;
		}
		.back {
			position: absolute;
			top: 10%;
			left: 79%;
			color: #fff;
			font-size: 24px;
		}
	}

	.debug {
		position: absolute;
		width: 400px;
		left: 50%;
		top: 40%;
		margin-left: -200px;
		text-align: center;
		.btn {
			cursor: pointer;
			padding: 10px;
			background: #ccc;
			display: inline-block;
			margin: 4px;
			color: black; 
			font-size: 10px;
		}
	}

	#video-controls {
	  position: fixed;
	  top: 0;
	  width: 100%;
	  display: block;
	  z-index: 25;
	  &.hover {
	    .rangeslider, .rangeslider__fill {
	      top: 0px;
	      height: 3px;
	    }
	  }
	}

	.sidebar_opener {
		position: relative;
		transition: all 0.6s ease 0.6s;
		overflow: hidden;
		&.sidebar-enter, &.sidebar-leave {
			-webkit-transform: translate3d(-100px,0,0);
			-moz-transform: translate3d(-100px,0,0);
			-o-transform: translate3d(-100px,0,0);
			-ms-transform: translate3d(-100px,0,0);
			transform: translate3d(-100px,0,0);
		}
		&.sidebar-leave {
			transition: all 0.3s ease 0;
		}
		.sidebar_opener__inside {
			display: inline-block;
			color: #fff;
			padding: 10px;
			height: 28px;
			line-height: 28px;
			transition: all 0.6s ease;
		}
	}

	.infopanel {
		-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 5% 20% 3% 3%;
		width: 79%;
		@media screen and (min-width: 1600px) {
			width: 85%;
		}
	}

	.is-cartela {
		height: auto !important;
	}

	.sidebar_cartela {
		transition: all 0.5s ease 0.5s;
		position: fixed;
		bottom: 60px;
		left: 0;
		min-width: 40%;
		&.expand-enter, &.expand-leave {
			left: -800px;
		}
	}

	.not-loading {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -150;
		opacity: 0;
		padding-top: 22%;
		text-align: center; 
		background-color: rgba(50, 50, 50, 0.6);
		transition: opacity 0.5s;
	}

	.loading {
		opacity: 1;
		color: white;
		z-index: 150;
	}

	.pausado {
		opacity: 0.3 !important;
	}

</style>

<template>
	<div>

		<!-- VIDEO -->

		<in-bg-video v-ref:hipervideo></in-bg-video>

		<!-- NAV-VIDEO -->

		<nav class="hover" id="video-controls">
			<in-topbar-slider></in-topbar-slider>
			<input type="range" id="seek-bar-{{id}}" min="0" max="1000" data-rangeslider="" style="display: none;">
		</nav>

		<!-- SIDEBAR -->

		<div class="sidebar" :class="{'is-open': hasBlocks || hasInfo || fixedSidebar, 'has-info': hasInfo}">

			<!-- CONTENT -->

			<div class="sidebar_content">
				<in-sidebar-block v-for="content in contentBlocks" transition="sidebar"></in-sidebar-block>
				<div class="sidebar_opener clickable" @click="openDefaultBlock" v-show="!hasBlocks && !fixedSidebar && !hasInfo" transition="sidebar">
					<div class="sidebar_opener__inside context-bg">abrir</div>
				</div>
			</div>

			<!-- CARTELAS -->

			<!-- <div v-show="cartela" class="sidebar_cartela" transition="expand">
				<div class="sidebar_block__header context-bg" style="font-size: 100%;">
					<div id="cartela_nome">
						{{contentCartela.title | uppercase}}
					</div>
				</div>
				<div class="sidebar_block__header" style="background: #fff;">
					<div id="cartela_funcao">
						{{contentCartela.funcao}}
					</div>
				</div>
			</div> -->

			<!-- BACKGROUND -->

			<div class="sidebar_back"></div>
		</div>

		<!-- INFO -->
	
		<div id="infopanel" class="infopanel" :class="{'is-open': hasInfo}">
	    <in-sidebar-info :id="id" :conteudo="conteudo"></in-sidebar-info>
	  </div>

		<div id="loading" class="not-loading"><i class="fa fa-refresh fa-3x fa-spin"></i></div>
	
		
	</div>
</template>

<script>
	
	var Vue = require('vue')
	var $$$ = require('jquery')
	var _ = require('underscore')
	var perfectScrollbar = require('perfect-scrollbar')

	module.exports = {
		// replace para pegar com v-with objetos do parent
		replace: true,
		data: function(){
			return {
				id: this.$parent.params.video,
				params: this.$parent.params,
				db: this.$parent.db,
				events: null,
				counter: 0,
				contentBlocks: [],
				contentCartela: {title: "", funcao: ""},
				cartela: false,
				fixedSidebar: false,
				conteudo: {},
				videoTag: null,
				seeking: false,
				video: {
					popcorn: null,
					time: 0,
					duration: 0,
					progress: 0
				}
			}
		},
		computed: {
			hasBlocks: function() {
				return this.contentBlocks.length >= 2 || this.contentBlocks.length > 0 && !this.contentBlocks[0].funcao
			},
			hasInfo: function(){
				return this.params.route.length > 1 && this.params.route[1] == 'info'
			},
			hasLibras: function() {
				return this.libras
			}
		},
		attached: function() {

			var self = this

			// DATA
			
			// events: load hipervideo events
			this.events = this.db.eventos
			if (self.video.popcorn != null) {
				self.attachPopcornEvents();
			}

			// POPCORN

			this.videoTag = document.getElementById('hipVid-' + self.id);

			this.videoTag.addEventListener( "loadeddata", function() {

				self.video.popcorn = Popcorn("#hipVid-" + self.id);

				// attach events if data already loaded

				if(self.events != null){
					self.attachPopcornEvents();
				}

			}, false );

			this.videoTag.addEventListener( "play", function() {

				if (!self.seeking) {
					self.$broadcast('hipervideo-play')
					$$$('#hipVid-' + self.id).removeClass('pausado')
				}

			}, false );

			this.videoTag.addEventListener( "pause", function() {

				if (!self.seeking) {
					self.$broadcast('hipervideo-pause')
					$$$('#hipVid-' + self.id).addClass('pausado')
				}

			}, false );

			this.videoTag.addEventListener( "ended", function() {
				console.log(self.seeking);

				creditos.className = 'finalizado';
				self.videoPause();

			}, false );

			// CHILD LISTENERS

			this.$on('block-timer-clicked', function (child, id) {
				var node = _.findWhere(this.contentBlocks,{"id": id})
				if(node && node.start == null){
					node.start = -1
				}
				if (this.conteudo && this.conteudo.id === id) {
					this.$broadcast('destroy-scrollbar');
				}				
				this.removeBlock(id);
			})

			this.$on('video-timeupdate', function (time, duration, progress) {
				this.video.time = time
				this.video.duration = duration
				this.video.progress = progress
			})

			// DOM LISTENERS

			$$$('body').addClass("tocando");
			$$$(window).bind('mousemove', this.handleMouseMove);
			$$$(document).bind('keydown', this.keyEvents)

		},
		beforeDestroy: function(){
      this.$off('mudou-acess')
			this.$off('hipervideo-canplay')
			var self = this
			this.videoTag.removeEventListener( "play", function() {

				if (!self.seeking) {
					self.$broadcast('hipervideo-play')
					$$$('#hipVid-' + self.id).removeClass('pausado')
				}

			}, false );

			this.videoTag.removeEventListener( "pause", function() {
				console.log(self.seeking);

				if (!self.seeking) {
					self.$broadcast('hipervideo-pause')
					$$$('#hipVid-' + self.id).addClass('pausado')
				}

			}, false );

			this.videoTag.removeEventListener( "loadeddata", function() {

				self.video.popcorn = Popcorn("#hipVid-" + self.id);

				// attach events if data already loaded

				if(self.events != null){
					self.attachPopcornEvents();
				}

			}, false );
			this.videoTag.removeEventListener( "ended", function() {

				creditos.className = 'finalizado';
				self.videoPause();

			}, false );
			this.$off('block-timer-clicked')
			this.$off('video-timeupdate')
			this.$off('graph-node-clicked')
			location.reload()
    },
		ready: function(){
			this.$dispatch('video-view-ready');
		},
		detached: function(){
			$$$(window).unbind('mousemove', this.handleMouseMove)
			$$$(document).unbind('keydown', this.keyEvents)
		},
		methods: {
			infoOpen: function(info){
				var i = parseInt(info)
				var node = _.findWhere(this.events.nodes,{"id": i});
				this.$broadcast('info-open');
				this.videoPause();
				this.conteudo = node.conteudo;
				if (node.conteudo.texto === "") {
					this.conteudo.texto = node.component.fields.excerpt
				}
				this.conteudo.title = node.title;
				this.conteudo.id = node.id;
				this.conteudo.icon = node.icon;
				this.$broadcast('create-scrollbar');
			},
			infoClose: function(){
				this.$broadcast('info-close');
				this.videoPlay();
				this.conteudo = {};
				this.$broadcast('destroy-scrollbar');
			},
			videoPause: function(){
				this.$refs.hipervideo.pause()
			},
			videoPlay: function(){
				this.$refs.hipervideo.play()
			},
			makeFixedSidebar: function(){
				this.fixedSidebar = true;
			},
			openDefaultBlock: function(){
				this.contentBlocks.unshift({
					id: 99,
					ap: true,
					videoID: this.params.video,
					title: "APRESENTAÇÃO",
					type: "text",
					start: null,
					end: null,
					fields: {
						excerpt: this.db.descricao
					}
				})
			},
			attachPopcornEvents: function(){
				// console.log('attach events')

				var self = this
				var popcorn = this.video.popcorn
				var timecodes = []
				for (var i = 0; i < this.db.eventos.length; i++) {
					var a = this.db.eventos[i].timecode
					a.id = this.db.eventos[i].id
					timecodes.push(a)
				}

				timecodes.map(function(event){
					
					popcorn.code({
						start: event.start,
						end: event.end + 0.3,
						onStart: function() {
							self.addBlock(event)
						},
						onEnd: function() {
							self.removeBlock(event.id)
						}
					});

					return event
				});
			},
			handleMouseMove: function(event) {
				var controles = document.getElementById('video-controls');
				event = event || window.event; // IE-ism
				// event.clientX and event.clientY contain the mouse position
				if (event.clientY < 60) {
					controles.className = "";
				} else {
					controles.className = "hover";
				}
			},
			keyEvents: function(e) {
				var video = document.getElementById('hipVid-' + this.id);
				switch(e.which) {
					case 32 : 
						if (video.paused && !this.hasInfo) {
							this.videoPlay()
						} else if (!video.paused) {
							this.videoPause()
						}
						break;
					case 13 : 
						this.toggleFullScreen();
						break;
				}
			},
			toggleFullScreen: function() {
				var a = document.getElementById('full')
				if (!document.mozFullScreen && !document.webkitFullScreen) {
					if (a.mozRequestFullScreen) {
						a.mozRequestFullScreen();
					} else {
						a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
				} else {
				if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else {
						document.webkitCancelFullScreen();
					}
				}
			},
			addBlock: function(event){
				console.log(event.id)
				
				var node = _.findWhere(this.events,{"id": event.id})

				if(this.contentBlocks.length !== 0) {
					this.contentBlocks = [];
				}
				this.contentBlocks.unshift({
					id: event.id,
					videoID: this.params.video,
					title: node.title,
					type: node.component.type,
					start: event.start,
					end: event.end,
					fields: node.component.fields
				})
				console.log(this.contentBlocks[0].id)

				this.fixedSidebar = false;
			},
			addBlockById: function(id){

				if(_.findWhere(this.contentBlocks,{"id": id})) return;
				if(this.contentBlocks.length !== 0) {
					this.contentBlocks = [];
				}

				var node = _.findWhere(this.events.nodes,{"id": id})
				if(node.component.fields.excerpt === "") return;

				this.contentBlocks.unshift({
					id: node.id,
					videoID: this.params.video,
					title: node.title,
					type: node.component.type,
					start: null,
					end: null,
					fields: node.component.fields
				})

				if(node.geo){
					this.$broadcast('event-map', node.geo);
					this.geo = true
				}

				this.fixedSidebar = false;

				if (this.hasInfo) {
					var loc = window.location.href
					this.$broadcast('destroy-scrollbar');
					if (this.conteudo.id.toString().length === 1) {
						window.location.href = loc.substr(0, loc.length - 1) + node.id;
					} else {
						window.location.href = loc.substr(0, loc.length - 2) + node.id;	
					}
					this.$broadcast('so-scrollbar');
				}

			},
			removeBlock: function(id) {
				$$$('#app').addClass('marco-fechado');
				$$$('#marco-'+id).removeClass('hover');
				this.contentBlocks = _.reject(this.contentBlocks, function(block){
					return block.start === null ? false : block.id === id
				})
				this.cartela = null
			}
		},
		components: {
			'in-sidebar-block': require('../components/sidebar-block.vue'),
			'in-topbar-slider': require('../components/topbar-slider.vue'),
			'in-topbar-capitulos': require('../components/topbar-capitulos.vue'),
			'in-bg-video': require('../components/bg-video.vue'),
			'in-sidebar-chapter': require('../components/sidebar-chapter.vue'),
			'in-sidebar-block': require('../components/sidebar-block.vue'),
			'in-sidebar-info': require('../components/sidebar-info.vue')
		}
	}
</script>