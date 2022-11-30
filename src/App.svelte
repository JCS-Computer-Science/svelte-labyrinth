<script>
	import Board from "./lib/Board.svelte";
	import Tile from "./lib/Tile.svelte";
	import { generateBoard, getTile } from "./lib/tilePool";

	function rotate(clockwise) {
		if (clockwise) {
			looseTile.paths.unshift(looseTile.paths.pop());
			looseTile = looseTile;
		} else {
			looseTile.paths.push(looseTile.paths.shift());
			looseTile = looseTile;
		}
	}
	let board = generateBoard();
	let looseTile = getTile();

	function slideRow(row, isRight) {
		if (isRight) {
			let temp = board[0][row];
			board[0][row] = looseTile;
			for (let i = 1; i < board.length; i++) {
				let temp2 = board[i][row];
				board[i][row] = temp;
				temp = temp2;
			}
			looseTile = temp;
		} else {
			let temp = board.at(-1)[row];
			board.at(-1)[row] = looseTile;
			for (let i = board.length - 2; i >= 0; i--) {
				let temp2 = board[i][row];
				board[i][row] = temp;
				temp = temp2;
			}
			looseTile = temp;
		}
	}
	function slideCol(col, isDown) {
		if (isDown) {
			board[col].unshift(looseTile);
			looseTile = board[col].pop();
		} else {
			board[col].push(looseTile);
			looseTile = board[col].shift();
		}
		board = board;
	}
</script>

<!-- <Tile paths={looseTile.paths} id={looseTile.id} /> -->
<button on:click={() => rotate(true)}>Rotate</button>
<button on:click={() => rotate(false)}>Rotate</button>

<div class="ui">
	{#if board}
		<Board {board} {looseTile} />
	{/if}
</div>
<button on:click={() => slideCol(1, false)}>Test Column</button>
<button on:click={() => slideRow(1, true)}>Test Row</button>

<style>
	.ui {
		display: flex;
		justify-content: space-evenly;
	}
</style>
