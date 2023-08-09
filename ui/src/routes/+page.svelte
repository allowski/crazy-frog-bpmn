<script>
	import Canvas from './components/Canvas.svelte';
	let render = false;
</script>

<svelte:head>
	<title>Home 1</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h4>Test</h4>
	<Canvas></Canvas>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
