<script>
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function handleCreate() {
        dispatch('handleCreate', {
			open: true
		});
    }
    function handleDelete() {
        dispatch('handleDelete');
    }
</script>

<div class="toolbar">
    <button on:click={handleCreate}>Create</button>
    <button on:click={handleDelete}>Delete</button>
</div>