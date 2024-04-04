<script lang="ts">
	import type { ListData } from '../mockdb.svelte';
	import DeleteIcon from './DeleteIcon.svelte';
	import EditIcon from './EditIcon.svelte';
	import RightArrowIcon from './RightArrowIcon.svelte';
	import { db } from '../mockdb.svelte';
	import { goto } from '$app/navigation';

	let { list } = $props<{ list: ListData }>();
	const percentage = `${(100 * list.todos.filter(({ state }) => state === 'done').length) / list.todos.length || 0}%`;
	let editing = $state(false);
	let editedText = $state(list.label);

	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			editing = false;
			editedText = list.label;
			return;
		}

		if (e.key === 'Enter') {
			editing = false;
			db.updateListLabel(list.id, editedText);
			return;
		}
	};
</script>

<div class="list">
	<div class="list-title">
		{#if editing}
			<input {onkeyup} bind:value={editedText} class="text-input" type="text" />
		{:else}
			<span class="title">{list.label}</span>
		{/if}
		<div>
			<button class="btn" onclick={() => (editing = true)}><EditIcon /></button>
			<button class="btn" onclick={() => goto(`lists/${list.id}`)}><RightArrowIcon /></button>
			<button class="btn" onclick={() => db.deleteList(list.id)}><DeleteIcon /></button>
		</div>
	</div>

	<div class="bar">
		<span class="percentage" style:width={percentage}>
			<span class="tooltip">{percentage}</span>
		</span>
	</div>
</div>
