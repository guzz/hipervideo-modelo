<style lang="scss">

</style>

<template>
	<div>
		<div v-for="graf in conteudo.graficos" class="mdl-grid">
			<div class="mdl-cell mdl-cell--12-col">{{{graf.texto | marked}}}</div>
			<div class="mdl-cell mdl-cell--12-col" :is="graf.tipo" :graf="graf" v-ref:graf></div>
		</div>
	</div>
</template>

<script>

	var $$$ = require('jquery')
	var _ = require('underscore')
	var marked = require('marked')

	module.exports = {

		replace: true,
		props: ['conteudo'],
		data: function(){
			return {
				
			}
		},

		ready: function(){
			
		},

		attached: function(){

		},

		methods: {

		},
		filters: {
			'marked': marked
		},
		components: {
			'dashboard': require('../components/content-databars-dashboard.vue')
		}
	}

</script>