<style lang="scss">

</style>

<template>
	<div id="text">
		{{{fields.excerpt | marked}}}
	</div>
</template>

<script>

	var marked = require('marked')
	var $$$ = require('jquery')

	module.exports = {
		replace: true,
		props: ['fields'],
		attached: function() {
			var self = this
			$$$('#text a').on('click', function(e) {
				e.preventDefault()
				self.$parent.$parent.link = e.currentTarget.href
				self.$parent.$parent.videoPause()
			})
		},
		beforeDestroy: function() {
			$$$('#text a').off('click', function(e) {
				e.preventDefault()
				self.$parent.$parent.link = e.currentTarget.href
				self.$parent.$parent.videoPause()
			})
		},
		filters: {
			marked: function(value) {
      	return marked(value)
      }
		}
	}

</script>