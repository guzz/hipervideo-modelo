(function(){
	var _ = require('underscore')
	var Vue = require('vue')
	var Router = require('director').Router
	var app = new Vue(require('./app.vue'))
	var VueTouch = require('vue-touch')
	Vue.config.debug = true
	Vue.use(VueTouch)

	// ROUTES

	var routes = {
		'/home' : {
			'/:id': {
				on: function(id) {
					var ids = []
					for (var i = 0; i < app.$data.database.length; i++) {
						ids.push(app.$data.database[i].headers.id)
					}
					var validation = _.indexOf(ids, id)

					if(validation !== -1) {
						ga('send', 'pageview', '/home/'+id)
						app.$data.home = true
						if(app.$refs.view){
							app.$refs.view.fechar()
							app.$refs.view.home = true
							app.$refs.view.hiperHome(id)
						} else {
							app.$once('home-view-ready',function(){
								app.$refs.view.fechar()
								app.$refs.view.home = true
								app.$refs.view.hiperHome(id)
							})
						}
					} else {
						router.notfound()
					}
				}
			},
			on: function () {
				app.$data.className = 'is-home'
				ga('send', 'pageview', '/home')
				if (app.$data.home === true) {
					app.$refs.view.fechar()
					app.$refs.view.home = false
					app.$data.home = false
				}
				Vue.nextTick(function () {
					app.$data.view = 'home-view'
				})
			}
		},
		'/:id': {
			'/info/:info': {
				on: function(id,info){
					ga('send', 'event', 'EventoInfo', 'open', id + '::info-' + info)
					Vue.nextTick(function () {
						if(app.$refs.view){
							app.$refs.view.infoOpen(parseInt(info))
						} else {
							app.$once('video-view-ready',function(){
								app.$refs.view.infoOpen(parseInt(info))
							})
						}
					})
				}
			},
			on: function (id) {
				var ids = []
				for (var i = 0; i < app.$data.database.length; i++) {
					ids.push(app.$data.database[i].headers.id)
				}
				// console.log(ids)
				var validation = _.indexOf(ids, id)

				var self = this
				var last_route = app.$data.params.route
				var cur_route = app.$data.params.route = self.getRoute()

				if (app.$data.view === 'video-view' && app.$data.params.video === id && validation !== -1) {
					ga('send', 'event', 'EventoInfo', 'close', id + '::info-' + last_route)
					
					// conditions
					var last_is_info = last_route.length > 1 && last_route[1] == 'info';
					var current_is_info = cur_route.length > 1 && cur_route[1] == 'info';

					if(last_is_info && !current_is_info){
						app.$refs.view.infoClose()
					}

					return // prevent transition on the same id

				} else if(validation === -1){
					console.log('not-found')
					router.notfound()
				}

				// force transition

				app.$data.view = ''

				Vue.nextTick(function () {
					// console.log('video-view')
					ga('send', 'pageview', '/'+id)
					app.$data.home = false
					app.$data.db = app.$data.database[validation]
					app.$data.view = 'video-view'
					app.$data.params.video = id
					app.$data.className = 'is-video'
				})
				
			}
		}
	}
	var getData = function (desc) {
		return JSON.parse(desc)
	}
	var getHeaders = function (hip) {
		var head_card = _.findWhere(hip, { "name": "headers" })
		var headers = getData(head_card.desc)
		headers.card = head_card.id
		return headers
	}
	var getElement = function (hip, element) {
		var c = _.pluck(hip, "name")
		var ind = []
		var elements = []
		for (var i = 0; i < c.length; i++) {
			if (c[i].split("-")[0] === element) {
				ind.push(i)
			}
		}
		for (var i = 0; i < ind.length; i++) {
			var el = getData(hip[ind[i]].desc)
			el.card = hip[ind[i]].id
			el.id = parseInt(hip[ind[i]].name.split("-")[1])
			elements.push(el)
		}
		return elements
	}
	var getHiper = function (board) {
		Trello.get("/boards/"+board+"/lists", function(hipervideos) {
			// console.log('trello api')
			getCards(0, hipervideos)
		})
	}
	var getCards = function (n, lists) {
		// console.log(n)
		Trello.get("/lists/"+lists[n].id+"/cards", function(hip) {
			// console.log(n + " - cards")
			var head = _.findWhere(hip, { "name": "headers" })
			getAttach(n, hip, head, lists)
		})
	}
	var getAttach = function (n, hip, head, lists) {
		Trello.get("/cards/"+head.id+"/attachments", function(attach) {
			// console.log(n + " - attachs")
			var headers = getHeaders(hip)
			if (attach.length !== 0) {
				headers.capa = attach[0].url
				if (attach.length > 1) {
					headers.img = attach[1].url
				} else {
					headers.img = attach[0].url
				}
			}
			var plugins = getElement(hip, "plugins")
			var eventos = getElement(hip, "eventos")
			var cartelas = getElement(hip, "cartelas")
			var obj = {
				headers: headers,
				plugins: plugins,
				eventos: eventos,
				cartelas: cartelas
			}
			app.$data.database.push(obj)
			// console.log(n)
			if (n === lists.length - 1) {
				init()
			} else if (n < lists.length-1) {
				getCards(n+1, lists)
			}
		})
	}

	getHiper('O62BDMJt')

	var router = new Router(routes)

	// init()
	// ROUTER INIT
	
	function init(){
		console.log("init")
		router 
			.configure({
				recurse: 'forward',
				notfound: function () {
					router.setRoute('/home')
				}
			})
			.init('/')
	}

})()
