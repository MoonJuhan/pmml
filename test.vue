<template>
<p>
	{{name}} world!
	</p>
</template>

<script>
module.exports = {
	data: function () {
		return {
			name: 'hello'
		}
	}
}
</script>

<style scoped>
	p {
		font-size: 2em;
		text-align: center;
	}
</style>