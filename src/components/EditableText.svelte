<script lang="ts">
	const { onValue, onCancel, editing, defaultValue, placeholder, classes } = $props<{
		onValue: (v: string) => void;
		onCancel: () => void;
		editing: boolean;
		defaultValue?: string;
		placeholder?: string;
		classes: string;
	}>();

	let label = $state(defaultValue || '');

	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onCancel();
			return;
		}

		if (e.key === 'Enter') {
			onValue(label);
			return;
		}
	};
</script>

{#if editing}
	<input {onkeyup} bind:value={label} class="text-input" type="text" {placeholder} />
{:else}
	<span class={classes === '' ? '' : classes}> {label}</span>
{/if}
