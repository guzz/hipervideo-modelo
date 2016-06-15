<style lang="scss">
	.mdl-card {
		width: auto;
		min-height: 270px;
		-webkit-transition: all .3s ease;
		   -moz-transition: all .3s ease;
		    -ms-transition: all .3s ease;
		     -o-transition: all .3s ease;
		        transition: all .3s ease;
		@media screen and (max-width: 1366px) {
			min-height: 205px;
		}
	}
	.mdl-cell {
		-webkit-transition: all .3s ease;
		   -moz-transition: all .3s ease;
		    -ms-transition: all .3s ease;
		     -o-transition: all .3s ease;
		        transition: all .3s ease;
		&.ativo {
			position: fixed;
	    top: 0;
	    z-index: 999999999;
	    right: 0;
	    width: 95%;
	    margin: 0;
	    display: block!important;
	    height: 100%;
	    .mdl-card {
	    	height: 100%;
	    }
		}
	}
	.mdl-card__actions {
		position: absolute;
    bottom: 0;
	}
	.display-home {
		display: none;
		&.ativo {
			display: block;
			background-color: white;
		}
	}
	.play-div {
		padding: 0;
    margin: 73px auto;
    @media screen and (min-width: 1440px) {
			margin: 100px auto;
		}
    .play-img {
    	position: absolute;
	    top: 0;
	    left: 0;
	    opacity: .5;
	    width: 100%;
    }
    .mdl-button {
    	-webkit-transition: all .1s ease;
			   -moz-transition: all .1s ease;
			    -ms-transition: all .1s ease;
			     -o-transition: all .1s ease;
			        transition: all .1s ease;
    	overflow: visible;
    	&:hover {
    		background-color: transparent;
    		transform: scale(1.1);
    		.dot {
    			color: red;
    		}
    	}
    }
    .material-icons {
    	font-size: 63px;
    	left: 40%;
    	&.dot {
    		font-size: 43px;
		    margin-left: 11px;
		    z-index: 1;
		    @media screen and (min-width: 1440px) {
					font-size: 63px;
    			margin-left: 21px;
				}
    	}
    	@media screen and (min-width: 1440px) {
				font-size: 100px;
    		left: -60%;
			}
    }
	}
</style>

<template>
<div class="page-content">
	<div class="mdl-grid" style="background-color: red; height: 565px;">
		<div class="mdl-cell mdl-cell--12-col"></div>
	</div>
	<div class="mdl-grid">

	  <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-phone" id="hip-{{hipId[$index]}}" v-for="hipervideo in database" transition="fade">
	  	<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			  <div class="mdl-card__title display-home" :class="{ativo: home}">
			    <h2 class="mdl-card__title-text">{{hipervideo.headers.nome}}</h2>
			  </div>
			  <div class="mdl-card__supporting-text display-home" :class="{ativo: home}">
			    {{{ hipervideo.headers.descricao | marked }}}
			  </div>
			  <dir class="play-div">
			  	<img v-if="hipervideo.headers.img" :src="hipervideo.headers.img" class="play-img">
			  	<a class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" href="/#/{{hipId[$index]}}">
			  		<i class="material-icons dot">play_arrow</i>
			      <i class="material-icons">play_circle_outline</i>
			    </a>
			  </dir>
			  <div class="mdl-card__actions mdl-card--border display-home" :class="{ativo: !home}" style="padding:0;">
			    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/#/home/{{hipId[$index]}}" style="width:100%;">
			      {{hipervideo.headers.nome}}
			    </a>
			  </div>
			  <div class="mdl-card__menu">
			    <a class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" v-if="!home" href="/#/home/{{hipId[$index]}}">
			      <i class="material-icons">add</i>
			    </a>
			    <a class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" v-if="home" href="/#/home">
			      <i class="material-icons">close</i>
			    </a>
			  </div>
			</div>
	  </div>

	</div>
	
</div>
</template>

<script>
	var $$$ = require('jquery')
	var marked = require('marked')
	module.exports = {
		replace: true,
		props: ['database', 'ready'],
		data: function(){
			return {
				home: false
			}
		},
		methods: {
			hiperHome: function (id) {
				$$$('#hip-'+id).addClass('ativo')
				$$$('.mdl-cell').css('display', 'none')
			},
			fechar: function () {
				$$$('.mdl-cell').removeClass('ativo')
				$$$('.mdl-cell').css('display', 'block')
			},
			hiper: function (id) {
				$$$('.'+id).removeClass('ativo')
				var head = $$$('header')
				head.removeClass('ativo')
			}
		},
		computed: {
      hipId: {
      	get: function() {
      		var hip = this.database
					var ids = []
					for (var i = 0, antes = 0; i < hip.length; i++) {
						var hipid = hip[i].headers.id
						ids.push(hipid)
					}
					return ids
      	}
      }
		},
		attached: function () {
			this.$dispatch('home-view-ready');
			$$$('body').removeClass("tocando");
			
			var browser = useragent.browser
			var version = useragent.version.split('.')

			var cond0 = browser.search("Chrome") === -1
			var cond1 = browser.search("Firefox") !== -1 && Number(version[0]) < 23
			var cond2 = browser.search("Chrome") !== -1 && Number(version[0]) < 29
			
			var snackbarContainer = document.querySelector('#demo-snackbar-example')

			// browser not chrome
			var fn = function(msg) {
				var data = {
		      message: msg,
		      timeout: 10000,
		      actionHandler: function(event) {
		      	snackbarContainer.className = "mdl-js-snackbar mdl-snackbar"
		      },
		      actionText: 'OK'
		    }

				setTimeout(function() {
		    	snackbarContainer.MaterialSnackbar.showSnackbar(data);
		    }, 500)
			}

			if (cond0) { 

				var m = 'Recomendamos a utilização do navegador GOOGLE CHROME para uma melhor experiência.'

		    fn(m)
		    
			}

			// old firefox

			if (cond1) {

				var m = 'Você está usando a versão ' + useragent.Version + ' do Firefox. Recomendamos que você atualize o Firefox para a última versão.'

		    fn(m)

			}

			// old chrome
			
			if (cond2) {

				var m = 'Você está usando a versão ' + useragent.Version + ' do Chrome. Recomendamos que você atualize o Chrome para a última versão.'

		    fn(m)

			}

			this.ready = true

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