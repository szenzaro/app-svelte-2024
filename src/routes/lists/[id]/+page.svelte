<script lang="ts">
	import TodosPage from '../../../components/TodosPage.svelte';
	export let data: { id: string };
</script>
<TodosPage listId={data.id} />
