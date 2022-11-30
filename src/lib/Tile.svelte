<script>
	export let tile;
</script>

<div class="tile">
	{tile.id}
	<div id="middle" />
	{#if tile.paths}
		{#each tile.paths as path, i}
			{#if path}
				<div class="paths" id={`path-${i}`} />
			{/if}
		{/each}
	{/if}
</div>

<style>
	.tile {
		width: 50px;
		height: 50px;
		background-color: brown;
		margin: 2px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}
	#middle {
		grid-column: 2;
		grid-row: 2;
		background-color: burlywood;
	}
	.paths {
		background-color: burlywood;
	}
	#path-0 {
		grid-column: 3;
		grid-row: 2;
	}
	#path-1 {
		grid-column: 2;
		grid-row: 3;
	}
	#path-2 {
		grid-column: 1;
		grid-row: 2;
	}
	#path-3 {
		grid-column: 2;
		grid-row: 1;
	}
</style>
