<style lang="scss">
	.mdl-card {
		width: auto;
		min-height: 150px;
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
			margin: 95px auto;
		}
    .play-img {
    	position: absolute;
	    top: 0;
	    left: 0;
	    opacity: 1;
	    width: 100%;
    }
    .mdl-button {
    	-webkit-transition: all .1s ease;
			   -moz-transition: all .1s ease;
			    -ms-transition: all .1s ease;
			     -o-transition: all .1s ease;
			        transition: all .1s ease;
    	overflow: visible;
    	transform: scale(.7);
    	&:hover {
    		background-color: transparent;
    		transform: scale(.8);
    		.dot {
    			color: rgb(255,82,82);
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
					font-size: 68px;
    			margin-left: 18px;
				}
    		}
    		@media screen and (min-width: 1440px) {
				font-size: 100px;
    		left: -60%;
			}
    }
	}

	.clear {
		clear: both;
	}


// Classes dos containers do banner de filmes

	.banner-conteiner {
		-webkit-transition: all .4s ease .1s;
		   -moz-transition: all .4s ease .1s;
		    -ms-transition: all .4s ease .1s;
		     -o-transition: all .4s ease .1s;
		        transition: all .4s ease .1s;
		height: 60%;
		overflow: hidden;
		position: relative;
		background: transparent;
		&.aberto {
			height: 0;
			padding: 0;
		}

	}


// Classes das divs internas dos containers

	.content{
		margin-top: 64px;

		@media screen and (max-width: 1023px) {
				margin-top: 56px;	
			}
	}		

	.hiper-list {
		padding: 0 50px;
		margin-bottom: 0;
		.slick-slide {
			margin-top: 16px;
			.material-icons {
				color: white;
				-webkit-transition: all .2s ease;
				   -moz-transition: all .2s ease;
				    -ms-transition: all .2s ease;
				     -o-transition: all .2s ease;
				        transition: all .2s ease;
				opacity: 0;
			}
			&:hover {
				.material-icons {
					opacity: 1;
				}
			}
		}
		.slick-list {
			margin-bottom: 0;
		}
		.list-h {
	    background: rgba(0,0,0,0);
	    height: 95%;
	    top: 8px;
	    position: absolute;
	    width: 40px;
	    color: gainsboro;
	    position: absolute;
	    border: none;
	    cursor: pointer;
	    &:focus {
	    	outline: 0;
	    }
	    .material-icons {
	    	-webkit-transition: all .1s ease;
				   -moz-transition: all .1s ease;
				    -ms-transition: all .1s ease;
				     -o-transition: all .1s ease;
				        transition: all .1s ease;
	    	font-size: 50px;
	    	margin-left: -9px;
	    }
	    &.slick-disabled {
	    	.material-icons {
	    		color: black;
	    		opacity: .5
	    	}
	    }
	    &:hover {
	    	.material-icons {
	    		transform: scale(1.3);
	    	}
	    	&.slick-disabled {
	    		.material-icons {
	    			transform: scale(1);
	    		}
	    	}
	    }
		}
		.list-prev {
			left: 9px;
		}
		.list-next {
			right: 9px;
		}
		.slider-cards {
			&.select {
				.mdl-card {
					border: 5px solid white;
					.mdl-card__menu {
						.mdl-button {
							opacity: 0!important;
							cursor: default;
						}
					}
					.play-div {
						.material-icons {
							opacity: 1!important;
						}
					}
				}
			}
			@media screen and (max-width: 720px){
				max-height: 140px;
			}
		}
		.single-card {
			max-height: auto!important;
			@media screen and (max-width: 730px){
				max-height: 20px!important;
			}
		}
		.mdl-card__menu {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.mdl-button {
				width: 100%;
				&:hover {
					background: transparent;
					.material-icons {
						transform: scale(1.2)
					}
				}
				.material-icons {
					font-size: 60px;
			    text-shadow: 1px 3px 8px black;
			    margin-top: -9px;
			    color: white;
				}
			}
		}

	}
</style>

<template>
<div id="content" class="content">
	
	<div class="mdl-grid banner-conteiner">
		
		<banner-conteiner :banner.sync="banner" v-if="banner"></banner-conteiner>
		<div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -2; background: black"></div>

	</div>

	<div class="mdl-grid hiper-list slider-cards">

	  <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-phone slider-cards" :class="{ select: banner !== null && banner.id === database[$index].headers.id }" id="hip-{{hipId[$index]}}" v-for="hipervideo in database" transition="fade">
	  	<div class="mdl-card mdl-shadow--2dp single-card" style="background-size: 100% 100%;" :style="{'background-image': 'url('+hipervideo.headers.img+')'}">
			  <div class="mdl-card__title display-home">
			    <h2 class="mdl-card__title-text">{{hipervideo.headers.nome}}</h2>
			  </div>
			  <dir class="play-div">
			  	<!-- <img v-if="hipervideo.headers.img" :src="hipervideo.headers.img" class="play-img"> -->
			  	<a class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" href="/#/{{hipId[$index]}}">
			  		<i class="material-icons dot">play_arrow</i>
			      <i class="material-icons">play_circle_outline</i>
			    </a>
			  </dir>
			  <div class="mdl-card__menu">
			    <button class="mdl-button mdl-js-button" v-if="!home" @click="changeBanner($index)">
			      <i class="material-icons">expand_less</i>
			    </button>
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
				home: false,
				banner: null
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
			},
			changeBanner: function(id) {
				var self = this
				if (this.banner.id !== this.database[id].headers.id) {
					this.banner = null
					setTimeout(function() {
						self.banner = self.database[id].headers
					}, 1000)
				}
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
      },
      isSelect: function() {
      	var states = []
      	for (var i = 0; i < this.database.length; i++) {
      		if (this.database[i].id === this.banner.id ) {
      			states.push(true)
      		} else {
      			states.push(false)
      		}
      	}
      	return states
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

			this.banner = this.database[0].headers

			componentHandler.upgradeDom()

			jQuery('.hiper-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="list-prev list-h"><i class="material-icons">chevron_left</i></button>"',
        nextArrow: '<button type="button" class="list-next list-h"><i class="material-icons">chevron_right</i></button>"',
        responsive: [
        	{
        		breakpoint: 480,
        		settings: {
        			slidesToShow: 1,
        			slidesToScroll: 1
        		}
        	},
        	{
        		breakpoint: 1440,
        		settings: {
        			slidesToShow: 3,
        			slidesToScroll: 3
        		}
        	}
        ]
      })

      jQuery('.hiper-list').slick('slickGoTo', 0)

		},
		components: {
			'banner-conteiner': require('../components/banner-conteiner.vue')
		},
		filters: {
      marked: function(value) {
      	return marked(value)
      }
    }
	}
</script>