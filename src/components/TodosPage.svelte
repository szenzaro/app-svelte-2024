<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '../mockdb.svelte';
	import Todo from './Todo.svelte';
	import LeftArrowIcon from './LeftArrowIcon.svelte';

	let { listId } = $props<{ listId: string }>();

	let todos = $derived(db.getLists().filter(({ id }) => id === listId)[0]?.todos ?? []);
	let editedText = $state('');
	let list = $state(db.getList(listId));

	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			editedText = '';
			return;
		}

		if (e.key === 'Enter') {
			db.addTodo(listId, editedText);
			editedText = '';
			return;
		}
	};
</script>

<header>
	<h1>SAW TODO</h1>
	<h2>{list?.label}</h2>
	<button class="btn" onclick={() => goto('/')}>
		<LeftArrowIcon />
	</button>
</header>
<div class="container">
	<input
		type="text"
		{onkeyup}
		bind:value={editedText}
		class="text-input"
		placeholder="Inserisci todo..."
	/>

	<section class="todos">
		<ul>
			{#each todos as todo}
				<Todo {todo} {listId} />
			{/each}
		</ul>
	</section>
</div>
