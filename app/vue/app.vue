<style lang="scss">
	.view {
		height: 100%;
		&.is-video {
			overflow: hidden;
		}
	}
	.context-bg {
		background-color: rgb(96,125,139);
	}
	.app_load {
		position: fixed;
	    top: 0;
	    left: 0;
	    overflow: hidden;
	    height: 100%;
	    width: 100%;
	    background-color: #ffffff;
	    z-index: 4;
	}

	#p1 {
		margin: 22% auto;
	}
	
	.header-top {
		-webkit-transition: width .3s ease;
		   -moz-transition: width .3s ease;
		    -ms-transition: width .3s ease;
		     -o-transition: width .3s ease;
		        transition: width .3s ease;
		-webkit-transition: height .6s ease;
		   -moz-transition: height .6s ease;
		    -ms-transition: height .6s ease;
		     -o-transition: height .6s ease;
		        transition: height .6s ease;
		&.home-menu {
			width: 5%;
	    	min-height: 0;
	    	height: 0;
    	.mdl-layout-title {
				display: none;
			}
		}
		&.hide {
			display: none;
		}
	}
	.fade-transition {
		transition: opacity .6s ease;
		opacity: 1;
	}
	.fade-enter, .fade-leave {
		opacity: 0;
		position: absolute;
		width: 100%;
	}
	.grow-transition {
		min-height: inherit;
	}
	.grow-enter, .grow-leave {
		min-height: 0;
		height: 0;
	}
	.header__down {
		min-height: 500px;
		@media screen and (max-width: 1024px) {
			min-height: 190px;
		}
		@media screen and (max-width: 1366px) {
			min-height: 350px;
		}
	}
	.mdl-layout__header {
		@media screen and (max-width: 1024px) {
			display: block;
		}
	}
	.mdl-layout__drawer {
		/* overflow: hidden; */
		width: 30%;
		transform: translateX(-100%);

		@media screen and (max-width: 1024px){
			width: 70%;
		}
	}
	.gravatar {
		margin-bottom: 10px;
	    width: 150px !important;
	    height: 150px !important;
	    font-size: 150px !important;
	    border-radius: 150px;
	}
	.user-info {
		padding-left: 25px;
	}
	.user-name {
		font-size: 35px;
		margin-bottom: 10px;
	}

	/* estilo do botão conecte-se */
	.connecte-se {
		width: 101%;
		height: 150px;
    	font-size: 210%;
	}
	.qual-label {
		width: 99%;
		
		margin-bottom: 10px;
		
		span {
			-webkit-transition: all .1s ease;
			   -moz-transition: all .1s ease;
			    -ms-transition: all .1s ease;
			     -o-transition: all .1s ease;
			        transition: all .1s ease;
		}
		.active {
			font-weight: 900;
			font-size: 16px;
		}
		.span {
			margin: 0 27%;
			text-align: center;
			
		}
	}

	.acess {
		margin-top: 0;
		padding-top: 0;
		li {
			min-height: 37px;
    		padding: 0 20px;
		}
	}
	.mdl-layout__drawer-button {
		-webkit-transition: height .3s ease;
		   -moz-transition: height .3s ease;
		    -ms-transition: height .3s ease;
		     -o-transition: height .3s ease;
		        transition: height .3s ease;
		.home-open & {
			background: rgb(96,125,139);
		    margin: 0;
		    padding: 10px;
		    height: 97%;
	    	@media screen and (min-width: 1440px) {
				padding: 20px;
    			height: 95.5%;
			}
		}
	}

	.infos {
		cursor: default;
	}

	.drawer-cards {
		display: block!important;
		float: left;
		width: 90%!important;
		margin-bottom: 3%;
		line-height: 20%;
		height: -5%!important;
		
	}

	.mdl-layout__container {
		top: 0;
		left: 0;
		background-color: white;
	}

</style>

<template>
	<div>
	<div class="app_load"  v-if="!ready" transition="fade">
		<div id="p1" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
	</div>
		<div id="full" allowfullscreen="true">
			<div class="mdl-layout mdl-js-layout" :class="{ 'home-open': home }">
			  <header class="mdl-layout__header mdl-layout__header--waterfall header-top" :class="{ 'home-menu': home }" v-if="!isVideo" transition="grow"  style="position: absolute; background-color: rgba(0, 0, 0, .5);">
			    <!-- Top row, always visible -->
			    <div class="mdl-layout__header-row">
			      <!-- Title -->
			      <span class="mdl-layout-title">Hipervideo</span>
			      <div class="mdl-layout-spacer"></div>
			      <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
			                  mdl-textfield--floating-label mdl-textfield--align-right">
			        <label class="mdl-button mdl-js-button mdl-button--icon"
			               for="waterfall-exp">
			          <i class="material-icons">search</i>
			        </label>
			        <div class="mdl-textfield__expandable-holder">
			          <input class="mdl-textfield__input" type="text" name="sample"
			                 id="waterfall-exp">
			        </div>
			      </div>
			    </div>
			  </header>
			<div class="mdl-layout__drawer" :class="{'is-visible': drawer}">
			<div class="mdl-grid">
				<div class="mdl-cell mdl-cell--12-col">
					
						<!-- Card Avatar -->
  						<div class="mdl-card mdl-shadow--4dp drawer-cards">

		  					<div class="mdl-card__supporting-text">
		  						<div class="mdl-grid">
		  							<div class="mdl-cell mdl-cell--12-col">
										<button @click="connectTrello" v-if="!isConnected" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored connecte-se">
										  CONECTE-SE
										</button>
										<img :src="user.img" v-if="isConnected" class="gravatar" transition="fade">
										<div>
											<p class="user-name" v-if="isConnected" transition="fade">@{{user.nome}}</p>
									    	<p v-if="isConnected" transition="fade">{{user.email}}</p>
										</div>
		  							</div>
		  						</div>
		  					</div>
  						</div>

						<!-- Card Qualidade -->
		  				<div class="mdl-card mdl-shadow--4dp drawer-cards quality">
		  					
		  					<div class="mdl-card__title">
		  						<h4 class="mdl-card__title-text">Qualidade</h4>
		  					</div>



							<div class="mdl-card__actions">
								<div class="mdl-grid">
		  							<div class="mdl-cell mdl-cell--12-col">
										<div id="slider-wrap">
											<input class="mdl-slider mdl-js-slider" type="range" min="0" max="2" :value="qualidade" tabindex="0" step="1" @input="mudaQual">
											<input class="mdl-slider mdl-js-slider" type="range" min="360" max="1080" :value="qualidade" tabindex="360" step="360" @input="mudaQual">
										</div>
									</div>
		  							
		  							<div class="mdl-cell mdl-cell--4-col qual-label" style="text-align:left">
		  								<span :class="{ active: isBaixa }" >Baixa</span>
		  							</div>

	  								<div class="mdl-cell mdl-cell--4-col qual-label" style="text-align:center">
	  									<span :class="{ active: isMedia }" class="span" >Média</span>
	  								</div>

	  								<div class="mdl-cell mdl-cell--4-col qual-label" style="text-align:right">
	  									<span :class="{ active: isAlta }" >Alta</span>
	  								</div>
		  							
								</div>
							</div>
<!-- 
		  					<div class="mdl-card__menu">
			  					<div id="qual-info" class="icon material-icons infos">info</div>
								<div class="mdl-tooltip mdl-tooltip--left" for="qual-info">
								Selecione a qualidade<br>em que deseja ver os vídeos.
								</div>
		  					</div>
 -->
  						</div>
  						
						<!-- Card Acessibilidade -->
  						<div class="mdl-card mdl-shadow--4dp drawer-cards">

		  					<div class="mdl-card__title">
		  						<h4 class="mdl-card__title-text">Acessibilidade</h4>
		  					</div>

		  					<div class="mdl-card__actions">
		  						<div class="mdl-grid">
		  							<div class="mdl-cell mdl-cell--12-col">
							  			<ul class="demo-list-control mdl-list acess">
											<li class="mdl-list__item">
											    <span class="mdl-list__item-primary-content">
											      Libras
											    </span>
											    <span class="mdl-list__item-secondary-action">
												    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-1"  id="label-switch-1">
											    	<input type="checkbox" id="list-switch-1" class="mdl-switch__input" :checked="isLibras" @click="acessLibras"/>
											    	</label>
											    </span>
											</li>
											<li class="mdl-list__item">
											    <span class="mdl-list__item-primary-content">
											      Audio Descrição
											    </span>
											    <span class="mdl-list__item-secondary-action">
											        <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-2"  id="label-switch-2">
											        <input type="checkbox" id="list-switch-2" class="mdl-switch__input" :checked="isAudio" @click="acessAudio"/>
											        </label>
											    </span>
											</li>
										</ul>
		  							</div>
		  						</div>
		  					</div>
<!--   						
  							<div class="mdl-card__menu">
			  					<div id="acess-info" class="icon material-icons infos">info</div>
								<div class="mdl-tooltip mdl-tooltip--left" for="acess-info">
								Selecione as opções<br>de acessilibidade.
								</div>
		  					</div>
 -->
  						</div>

  						
  						<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
  						<a href="/#/home">	<i class="material-icons">chevron_left</i>	</a>
						</button>
						<span>Voltar ao início</span>
				</div>

					
			  </div>
			  </div>
			  <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button" @click="openDrawer"><i class="material-icons">menu</i></div>
			  <main class="mdl-layout__content view" :is="view" transition="fade" :class="[className]" :db="db" :database="database" :params="params" :qualidade="qualidade" :acessibilidade="acessibilidade" :ready.sync="ready" v-ref:view >

			  </main>
			  <div class="mdl-layout__obfuscator" :class="{'is-visible': drawer}" @click="openDrawer"></div>
			</div>
		</div>
		<div id="demo-snackbar-example" class="mdl-js-snackbar mdl-snackbar" aria-live="assertive" aria-atomic="true" aria-relevant="text" >
		  <div class="mdl-snackbar__text"></div>
		  <button class="mdl-snackbar__action" type="button"></button>
		</div>
	</div>
</template>

<script>
	var _ = require('underscore')
	var md5 = require('blueimp-md5')
	var $$$= require('jquery')
  var perfectScrollbar = require('perfect-scrollbar')

	module.exports = {
		el: '#app',
		data: {
			database: [],
			db: null,
			ready: false,
			view: "",
			className: "",
			qualidade: 0,
			acessibilidade: 'normal',
			home: false,
			drawer: false,
			user: {
				nome: "",
				email: "",
				img: "",
				board: "",
				connected: false
			},
			params: {
				video: null,
				route: null
			}
		},
		watch : {
			qualidade: function (qualidade) {
				document.cookie = "qualidade = " + qualidade;
			},
			acessibilidade: function (val) {
				document.cookie = "acessibilidade = " + val;
			}
		},
		computed: {
      isAlta: function() {
        return this.$data.qualidade === 2;
      },
      isMedia: function() {
        return this.$data.qualidade === 1;
      },
      isBaixa: function() {
        return this.$data.qualidade === 0;
      },
      isLibras: function() {
        return this.$data.acessibilidade === 'libras';
      },
      isAudio: function() {
        return this.$data.acessibilidade === 'audio';
      },
      isNada: function() {
        return this.$data.acessibilidade === 'normal';
      },
      isConnected: function() {
      	return this.$data.user.connected
      },
      isVideo: function() {
      	return this.$data.view === 'video-view'
      }
		},
		methods: {
			connectTrello: function () {
				var self = this
				var opt = {
					type: "popup",
					name: "hipevideo",
					scope:  { read: true, write: true, account: true },
					expiration: "never",
					success: function () {
						self.user.connected = true
						document.cookie = "user=true"
						Trello.get("/search", {query: "HP_myData"}, function (data) {
							if (data.boards.length === 0) {
								Trello.post("/boards", {
									name: "HP_myData",
									defaultLists: false,
									prefs_permissionLevel: "public",
									prefs_comments: "public"
								}, function (data) {
									self.user.board = data.id
								})
							} else {
								self.user.board = data.boards[0].id
								Trello.get("/boards/"+data.boards[0].id+"/members", function (data) {
									self.user.nome = data[0].username
									Trello.get("/members/"+self.user.nome+"/email", function (data) {
										self.user.email = data._value
										self.user.img = "https://www.gravatar.com/avatar/"+md5(data._value)+"?s=250"
									})
								})							
							}
						})
					}
				}
				Trello.authorize(opt)
			},
			openDrawer: function () {
				if (this.drawer) {
					this.drawer = false
				} else {
					this.drawer = true
				}
			},
      mudaQual: function (obj) {
      	this.qualidade = obj.srcElement.valueAsNumber
      },
      acessLibras: function (obj) {
      	if (obj.target.checked) {
      		this.acessibilidade = "libras"
      		jQuery('#label-switch-2').removeClass('is-checked')
      	} else if (!obj.target.checked) {
      		this.acessibilidade = "normal"
      	}
      },
      acessAudio: function (obj) {
      	if (obj.target.checked) {
      		this.acessibilidade = "audio"
      		jQuery('#label-switch-1').removeClass('is-checked')
      	} else if (!obj.target.checked) {
      		this.acessibilidade = "normal"
      	}
      },
      getCookie: function(cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';')
		    for(var i=0; i<ca.length; i++) {
	        var c = ca[i]
	        while (c.charAt(0)==' ') c = c.substring(1)
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length)
		    }
		    return ""
			},
      cookieQualidade: function() {
      	switch(this.getCookie('qualidade')) {
					case '':
						document.cookie = "qualidade=0"
						break
					case '2':
						this.qualidade = 2
						break
					case '1':
						this.qualidade = 1
						break
					case '0':
						this.qualidade = 0
						break
				}
      },
      cookieAcess: function() {
      	switch(this.getCookie('acessibilidade')) {
					case '':
						document.cookie = "acessibilidade=normal"
						break
					case 'libras':
						this.acessibilidade = 'libras'
						break
					case 'audio':
						this.acessibilidade = 'audio'
						break
					case 'normal':
						this.acessibilidade = 'normal'
						break
				}
      },
      cookieUser: function() {
      	switch(this.getCookie('user')) {
					case '':
						document.cookie = "user=false"
						break
					case 'true':
						this.connectTrello()
				}
      },
      cookieVolume: function() {
      	var cook = this.getCookie('volume')
      	if (cook === '') {
      		document.cookie = "volume=50"
      		return 50
      	} else {
      		return parseInt(cook)
      	}
      }
		},
		attached: function() {

			this.cookieQualidade()

			this.cookieAcess()

			this.cookieUser()

		},
		components: {
			'home-view': require('./views/home-view.vue'),
			'video-view': require('./views/video-view.vue')
		}
	}

</script>