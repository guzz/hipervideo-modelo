<style lang="scss">
	.sidebar_chapter {
		position: relative;
		width: 300px;
		opacity: 0.3;
	  left: -253px;
		transition: opacity 0.5s, left 0.5s;
		&:hover {
			opacity: 1;
		}
		.sidebar.is-open & {
				left: 0;
				opacity: 1;
			}
		&.aberto {
			left: 0;
			opacity: 1;
		}
		.sidebar_chapter_title {
			background: none repeat scroll 0 0 #fff;
	    color: #555;
	    display: inline-block;
	    font-family: fonte-bold,sans-serif;
	    font-weight: 900;
	    line-height: 28px;
	    min-width: 0;
	    padding: 0 58px 0 10px;
	    position: relative;
	    width: 232px;
	    transition: all 0.5s ease 0s;
	    z-index: 2;
	    & h4 {
	    	font-family: fonte-normal,sans-serif;
		    font-size: 85%;
		    font-weight: 100;
		    margin: 0;
	    }
	    & h3 {
	    	margin: -10px 0 0;
	    	@media screen and (min-width: 1600px) {
	    		margin: -5px 0 0;
	    	}
	    }
			.sidebar.is-open & {
				min-width: 232px;
			}
		}
	}
</style>

<template>
	<div class="sidebar_chapter" id="chap">
		<div class="sidebar_chapter_title">
		<h4>CAPÍTULO {{capitulo.id}}</h4>
		<h3>{{capitulo.nome | uppercase}}</h3>
		<div :is="menu-navegacao"></div>
		</div>
	</div>
</template>

<script>

	module.exports = {
		replace: true,
		data: function(){
      return {
        capitulo: this.$parent.capitulo
      }
    },
		components: {
      'menu-navegacao': require('../components/sidebar-menu.vue')
    }
	}

</script>