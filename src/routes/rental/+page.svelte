<script>
	import { alt } from '$lib/constants.js';
	import Toolbar from './Toolbar.svelte';
	import Dialog from './Dialog.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	$: rentalData = data.datas[0];
	let open = false;
	let checked = [];
	let editObj = {
		name: "",
		address: "",
		image: "",
		flag: "Save",
		id: ""
	};
	function handleOpenDialog(event) {
		open = event.detail.open;
	}
	function handleCloseDialog(event) {
		open = event.detail.open;
	}
	function handlerCheckbox(event) {
		if (event.target.checked) {
			checked.push(event.target.id)
		} else {
			let indexChecked = checked.indexOf(event.target.id);
			checked.splice(indexChecked, 1);
		}
	}
	function handlerEdit(event) {
		let trs = event.target.parentNode.parentNode.childNodes;
		editObj = {
			name: trs[2].innerText,
			address: trs[4].innerText,
			image: trs[6].children[0].currentSrc,
			flag: "Update",
			id: event.target.id
		}
		open = true;
		console.log(editObj,23);
	}
	async function handleDeleteData() {
		let checks = new FormData();
		checks.append('data', checked);
		const response = await fetch('?/delete', {method: 'POST', body: checks});
		const json = await response.json();
		location.reload();
	}
</script>

<svelte:head>
	<title>Rental</title>
	<meta name="description" content="Rental this app" />
</svelte:head>

<div class="text-column">
	<h1>Rental CRUD</h1>

	<Toolbar on:handleCreate={handleOpenDialog} on:handleDelete={handleDeleteData} />
	{#key editObj}
		{#if open}
			<Dialog on:handleClose={handleCloseDialog} editObj={editObj} />
		{/if}
	{/key}
	<table>
		<tr>
			<th>No</th>
			<th>Name</th>
			<th>Location</th>
			<th>Property</th>
			<th>C</th>
			<th>Edit</th>
		</tr>
		<tbody>
			{#key rentalData}
				{#each rentalData as rows, i}
					<tr>
						<td>{i+1}</td>
						<td>{rows.name}</td>
						<td>{rows.address}</td>
						<td><img src={rows.image} width=100 style:margin="10px auto" style:display="block" alt={alt}></td>
						<td><input type="checkbox" id={rows._id} on:click={handlerCheckbox} /></td>
						<td><button id={rows._id} on:click={handlerEdit}>Edit</button></td>
					</tr>
				{/each}
			{/key}
		</tbody>
	</table>
</div>

<style>
	table {
		width: 700px;
	}
	table, tbody, tr, td, th {
		border: solid 1px;
		border-collapse: collapse;
	}
</style>