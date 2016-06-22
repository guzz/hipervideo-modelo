<style lang="scss">
	.sidebar_block {
		width: 120%;
		height: 100%;
		overflow: hidden;
		transition: all .6s ease;
		&.blc-enter, &.blc-leave {
			transform: translate3d(-400px,0,0);
			max-height: 0;
		}
		.sidebar.has-info & {
			width: 100%;
			max-height: 48px;
		}
	}
	#cartela_nome, #cartela_funcao{
		float: right;
		font-size: 16px;
		font-size: 170%;
		padding-left: 20px;
		padding-right: 20px;
	}
	#cartela_funcao {
		color: #555;
	}
	.sidebar_block__header {
		font-family: 'fonte-bold', sans-serif;
		font-weight: 900;
		position: relative;
		color: #fff;
		padding: 10px;
		height: 28px;
		line-height: 28px;
	}
	.sidebar_block__content {
		overflow: hidden;
    height: 40%;
    position: relative;
    padding: 15px;
    padding-right: 21px;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.4em;
    width: 85%;
    letter-spacing: 0;
		transition: all 0.3s ease;
		color: white;
	}
	.timer {
		display: block;
		position: absolute;
		cursor: pointer;
		top: 10px;
		right: 10px;
		width: 28px;
		height: 28px;
		.progress {
			fill: transparent;
			stroke: #fff;
  			stroke-width: 2px;
  			stroke-dasharray: 75 75;
  			stroke-linecap: round;
  			transition: all 0.5s linear;
  			-webkit-transform: translate(0px,28px) rotate(-90deg);
				-moz-transform: translate(0px,28px) rotate(-90deg);
				-o-transform: translate(0px,28px) rotate(-90deg);
				-ms-transform: translate(0px,28px) rotate(-90deg);
  			transform: translate(0px,28px) rotate(-90deg);
  			&.fadeout {
  				opacity: 0;
  			}
		}
		.base {
			stroke: #fff;
  			stroke-width: 2px;
  			fill: transparent;
  			opacity: 0.2;
		}
		.close {
			transition: transform 0.3s ease, opacity 0.3s linear;
			opacity: 0;
			-webkit-transform: translate(14px,14px) scale(.5);
			-moz-transform: translate(14px,14px) scale(.5);
			-o-transform: translate(14px,14px) scale(.5);
			-ms-transform: translate(14px,14px) scale(.5);
			transform: translate(14px,14px) scale(.5);
			line {
				stroke: #fff;
  				stroke-width: 2px;
  				stroke-linecap: round;
			}
		}
		&.fixed,
		&:hover {
			.close {
				opacity: 1;
				-webkit-transform: translate(14px,14px) scale(1);
				-moz-transform: translate(14px,14px) scale(1);
				-o-transform: translate(14px,14px) scale(1);
				-ms-transform: translate(14px,14px) scale(1);
				transform: translate(14px,14px) scale(1);
			}
		}
	}
</style>

<template>
	<div class="sidebar_block" transition="blc">
		<div class="sidebar_block__header context-bg">
			{{content.title | uppercase}}
			<svg width="28" height="28" class="timer clickable" @click="onTimerClick" :class="{fixed: content.start === null}">
				<circle class="base" cx="14" cy="14" r="12"></circle>
				<circle :class="{fadeout: perc < 3}" class="progress" cx="14" cy="14" r="12" :stroke-dashoffset="perc"></circle>
				<g class="close">
					<line x1="-4" y1="-4" x2="4" y2="4" />
					<line x1="-4" y1="4" x2="4" y2="-4" />
				</g>
			</svg>
		</div>
		<div id="sidebar_block__content" class="sidebar_block__content">
			<div :is="content.type" :fields="content.fields"></div>
		</div>
		<p v-if="!content.ap" style="padding-left: 10px;"><strong><a style="font-weight: 900; text-decoration: none;" :href="'#/' + content.videoID + '/info/' + content.id">SAIBA MAIS</a></strong></p>
		<button v-if="!content.ap" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" @click="parentBlock(content.id - 1)" :disabled="eventoStart">
			<i class="material-icons">chevron_left</i>
		</button>
		<button v-if="!content.ap" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" @click="seekVideo(content.id)" :disabled="isAp || eventoAt">
			Ir para ponto no video
		</button>
		<button v-if="!content.ap" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" @click="parentBlock(content.id + 1)" :disabled="eventoEnd">
			<i class="material-icons">chevron_right</i>
		</button>
		<p v-if="!content.ap" style="color:white; text-align: center;">{{content.id + 1}} / {{numEvents}}</p>
	</div>
</template>

<script>
	var Vue = require('vue')
	var $$$ = require('jquery')
	require('perfect-scrollbar/jquery')($$$)
	
	module.exports = {
		replace: true,
		props: ['content', 'video', 'conteudo', 'events'],
		data: function(){
			return {
				html_resumo: null
			}
		},
		computed: {
			perc: function () {
				var start = this.content.start;
				var end = this.content.end;
				var time = this.video.time;
				return 75 - Math.floor(75 * (time - start) / (end - start));
			},
			eventoStart: function() {
				return this.content.id < 1
			},
			eventoEnd: function() {
				return this.content.id + 1 === this.events.length
			},
			eventoAt: function() {
				return this.content.start !== null
			},
			isAp: function() {
				if (this.content.ap !== undefined) {
					return true
				} else {
					return false
				}
			},
			numEvents: function() {
				return this.events.length
			}
		},
		attached: function() {
			$$$('.sidebar_block__content').perfectScrollbar({
				suppressScrollX: true
			});
		},
		methods: {
			onTimerClick: function(){
				this.$dispatch('block-timer-clicked', this, this.content.id)
				if (this.conteudo && this.conteudo.id === this.content.id) {
					window.location.href = "/#/" + this.$parent.params.video;
				}
			},
			parentBlock: function(id) {
				this.$parent.addBlockById(id)
			},
			seekVideo: function(id) {
				this.$parent.seekEvento(id)
			}
		},
		components: {
			'text': require('../components/sidebar-block-text.vue'),
			'profile': require('../components/sidebar-block-profile.vue'),
			'databars': require('../components/sidebar-block-databars.vue')
		}
	}
</script>