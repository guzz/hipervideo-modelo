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



	.icons {
		font-size: 20px;
		vertical-align: middle;
		cursor: default;
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
		background-image: url("http://i.imgur.com/wOWmkC7.jpg");
		&.aberto {
			height: 0;
			padding: 0;
		}

	}

	.banner-data {
		filter:alpha(opacity=100);
    	opacity: 1;
	    -moz-opacity: 1;
	    -webkit-opacity: 1;
	    color: white;
	}

	.banner-overlay {
		filter:alpha(opacity=50);
    	opacity: 0.5;
	    -moz-opacity:0.5;
	    -webkit-opacity:0.5;
	}

	.banner-owner {
		filter:alpha(opacity=100);
    	opacity: 1;
	    -moz-opacity: 1;
	    -webkit-opacity: 1;
	}


// Classes das divs internas dos containers

	#video-data {
		width: 90%;
		margin-left: 5%;
		padding-bottom: 10px;
	}

	#video-title {
		margin-bottom: 10px;
		font-size: 30px;
		text-align: center;
		line-height: 30px;
		
		@media screen and (max-width: 500px){
			font-size: 18px;
			line-height: 20px;
		}
	}

	#video-length {
		width: 33%;
		margin-right: 0.5%;
		float: left;
	}

	#video-qual {
		width: 33%;
		text-align: center;
		margin-right: 0.5%;
		float: left;
		
		@media screen and (max-width: 500px){
			width: 20%;	
		}
	}

	#video-acce {
		width: 33%;
		text-align: right;
		float: left;

		@media screen and (max-width: 500px){
			width: 20%;	
		}
	}

	#video-description {
		clear: left;
		margin-top: 10%;
		margin-bottom: 5%;
		@media screen and (max-width: 550px) {
				font-size: 80%;
				margin-top: 10%;
				margin-bottom: 2%;	
			}
	}

	#video-perks {
		float: left;
		width: 60%;
		@media screen and (max-width: 320px) {
				visibility: hidden;
			}
		@media screen and (max-width: 550px) {
				width: 100%;
			}
	}

	#video-play {
		float: right;
		width: 30%;
		text-align: center;
		@media screen and (max-width: 550px) {
				visibility: hidden;
			}
	}

	.play-btn {
		color: white;
		font-size: 70px;
	}

	#video-owner {
		text-align: center;
		color: white;
		margin-top: 5%;
		@media screen and (max-width: 550px) {
				visibility: hidden;
			}
	}

	.img-owner {
		height: 70px;
		@media screen and (max-width: 550px) {
				visibility: hidden;
			}

	}
	.hiper-list {
		padding: 0 50px;
		margin-bottom: 0;
		.slick-slide {
			margin-top: 16px;
/*			&:hover {
				transform: scale(1.1);
		    margin-left: 16px;
		    margin-right: 16px;
			}*/
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
	    color: black;
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
	    		color: gainsboro;
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
	}
	.img-owner {
		height: 70px;
	}

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
/*			&:hover {
				transform: scale(1.1);
		    margin-left: 16px;
		    margin-right: 16px;
			}*/
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
	    color: black;
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
	    		color: gainsboro;
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

	}
</style>

<template>
<div id="content" class="content">
	
	<div class="mdl-grid banner-conteiner">
		<div class="mdl-cell mdl-cell--6-col banner-data">

			<div id="video-data">
				<div id="video-title">Título longo pra caramba de exemplo de um vídeo</div>
				
				<div id="video-length">
					<i class="fa fa-clock-o icons"></i> 01:15:25
				</div>
				
				<div id="video-qual">
					<div id="vidqual1" class="icon material-icons icons">videocam</div>
					<div class="mdl-tooltip" for="vidqual1">Qualidade Normal</div>
					
					<div id="vidqual2" class="icon material-icons icons">hd</div>
					<div class="mdl-tooltip" for="vidqual2">Qualidade HD</div>
					
					<div id="vidqual3" class="icon material-icons icons" style="color: red">hd</div>
					<div class="mdl-tooltip" for="vidqual3">Qualidade Full HD</div>
				</div>
				
				<div id="video-acce">
					<i class="fa fa-audio-description"></i>
					<i class="fa fa-cc"></i>
					<i class="fa fa-signing"></i>
				</div>
			
				<div id="video-description">
					Esta é uma descrição de exemplo de um vídeo que tem uma hora de duração, quinze minutos e vinte e cinco segundos. Alem disso ele conta com versões em alta qualidade (720p) e Full HD (1080p) e ainda conta com closed captions (legendas) e descrição do vídeo em audio.
				</div>

				<div id="video-perks">

					<div style="width: 50%; float: left">
					<i class="material-icons icons">check_circle</i> Perk 1 <br>
					<i class="material-icons icons">check_circle</i> Perk 2 <br>
					<i class="material-icons icons">check_circle</i> Perk 3 <br>
					<i class="material-icons icons">check_circle</i> Perk 4 <br>
					<i class="material-icons icons">check_circle</i> Perk 5 <br>
					</div>

					<div style="width: 50%; float: left">
					<i class="material-icons icons">check_circle</i> Perk 1 <br>
					<i class="material-icons icons">check_circle</i> Perk 2 <br>
					<i class="material-icons icons">check_circle</i> Perk 3 <br>
					<i class="material-icons icons">check_circle</i> Perk 4 <br>
					<i class="material-icons icons">check_circle</i> Perk 5 <br>
					</div>

				</div>

				<div id="video-play">
				  	<a href="#">
				  		<i class="material-icons play-btn">play_circle_outline</i>
				    </a>
				</div>

				<div class="clear"> </div>

			</div>

		</div>
		
		<div class="mdl-cell mdl-cell--4-col banner-overlay">
		</div>
		
		<div class="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone banner-owner">
			
			<div id="video-owner">
				<div>
				<a href="http://www.jardimdigital.com.br" target="_blank">
				<img class="img-owner" src="http://jardimdigital.com.br/wp-content/uploads/2016/03/Logo.png" >
				</a>
				</div>
			</div>

		</div>

	</div>

	<div class="mdl-grid hiper-list slider-cards">

	  <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-phone slider-cards" id="hip-{{hipId[$index]}}" v-for="hipervideo in database" transition="fade">
	  	<div class="mdl-card mdl-shadow--2dp single-card">
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
	       	}
	       ]
	    })


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