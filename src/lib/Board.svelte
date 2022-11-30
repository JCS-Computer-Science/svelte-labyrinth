<script>
	// @ts-nocheck

	import Tile from "./Tile.svelte";
	import { quintInOut, linear } from "svelte/easing";
	import { flip } from "svelte/animate";
	import { crossfade, fade } from "svelte/transition";
	const [send, receive] = crossfade({
		duration: 600,
		easing: linear,
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform =
				style.transform === "none" ? "" : style.transform;
			console.log(params);
			let appear;
			if (params.rowStart) {
				appear = (t) =>
					`transform: ${transform}  translateX(${(1 - t) * -54}px)`;
			} else if (params.rowEnd) {
				appear = (t) =>
					`transform: ${transform}  translateX(${(1 - t) * 54}px);`;
			} else if (params.colStart) {
				appear = (t) =>
					`transform: ${transform}  translateY(${(1 - t) * -54}px);`;
			} else if (params.colEnd) {
				appear = (t) =>
					`transform: ${transform}  translateY(${(1 - t) * 54}px);`;
			} else {
				appear = (t) => `opacity: ${t}`;
			}

			return {
				duration: 600,
				easing: linear,
				css: appear,
			};
		},
	});

	export let board;
	export let looseTile;
</script>

<div class="cols">
	{#each board as column, i}
		<div class="col">
			<div class="choice" />
			{#each column as tile, j (tile.id)}
				<div
					in:receive={{
						key: tile.id,
						rowStart: i == 0,
						rowEnd: i == board.length - 1,
						colStart: j == 0,
						colEnd: j == column.length - 1,
					}}
					out:send={{
						key: tile.id,
						rowStart: i == 0,
						rowEnd: i == board.length - 1,
						colStart: j == 0,
						colEnd: j == column.length - 1,
					}}
					animate:flip
				>
					<Tile {tile} />
				</div>
			{/each}
			<div class="choice" />
		</div>
	{/each}
</div>

{#key looseTile.id}
	<Tile tile={looseTile} />
{/key}

<style>
	.cols {
		display: flex;
	}
	.col {
		display: flex;
		flex-direction: column;
	}
	.choice {
		width: 50px;
		height: 50px;
		margin: 2px;
		background-color: rgb(199, 199, 199);
	}
</style>
