<script lang="ts">
	import { db, type TodoData } from '../mockdb.svelte';

	let { listId, todo } = $props<{ listId: string; todo: TodoData }>();
	let editing = $state(false);
	let label = $state(todo.label);

	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			editing = false;
			// editedText = list.label;
			return;
		}

		if (e.key === 'Enter') {
			editing = false;
			db.updateTodo(listId, todo.id, { ...todo, label: label });
			return;
		}
	};
</script>

<div class="item">
	{#if editing}
		<input {onkeyup} bind:value={label} class="text-input" type="text" />
	{:else}
		<div ondblclick={() => (editing = true)} role="note">
			<input
				type="checkbox"
				checked={todo.state === 'done'}
				onchange={() =>
					db.updateTodo(listId, todo.id, {
						...todo,
						state: todo.state === 'done' ? 'tbd' : 'done'
					})}
			/>
			<span class:completed={todo.state === 'done'}> {todo.label}</span>
			<button onclick={() => db.deleteTodo(listId, todo.id)}>&times;</button>
		</div>
	{/if}
</div>
