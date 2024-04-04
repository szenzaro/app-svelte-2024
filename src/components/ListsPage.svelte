<script lang="ts">
	import List from './List.svelte';
	import { db } from '../mockdb.svelte';

	let text = $state('');

	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			text = '';
			return;
		}

		if (e.key === 'Enter') {
			db.addList(text);
			text = '';
			return;
		}
	};
</script>

<h1>SAW TODO</h1>
<div class="container">
	<input type="text" {onkeyup} bind:value={text} class="text-input" placeholder="Inserisci lista..." />
	{#each db.getLists() as list}
		<List {list} />	
	{/each}
</div>
