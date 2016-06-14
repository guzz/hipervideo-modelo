<style lang="scss">

</style>

<template>
	<div>
		{{{fields.excerpt | marked}}}
	</div>
</template>

<script>

	var marked = require('marked')

	module.exports = {
		replace: true,
		props: ['fields'],
		filters: {
			marked: function(value) {
      	return marked(value)
      }
		}
	}

</script>