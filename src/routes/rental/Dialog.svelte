<script>
  import { enhance } from "$app/forms";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let editObj = {};
  let name = editObj.name;
  let location = editObj.address;
  let base64Image = editObj.image;
  let flag = editObj.flag;
  let rid = editObj.id;
  function handleClose() {
    dispatch("handleClose", {
      open: false,
    });
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      base64Image = "" + event.target.result;
    };
    reader.readAsDataURL(file);
  };
</script>

<div class="dialog">
  <button class="close" on:click={handleClose}>X</button>
  <form use:enhance method="POST" action="?/createRental">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Name"
      bind:value={name}
    /> <br /><br />
    <input
      type="text"
      name="location"
      id="location"
      placeholder="Location"
      bind:value={location}
    /> <br /><br />
    <input
      type="file"
      name="property"
      id="property"
      on:change={handleFileUpload}
    /> <br /><br />
    <input type="hidden" name="propertyImage" bind:value={base64Image} />
    <input type="hidden" name="flag" bind:value={flag}>
    <input type="hidden" name="id" bind:value={rid}>
    <button type="submit">Save</button>
  </form>
</div>

<style>
  .dialog {
    width: 500px;
    height: 150px;
    border: solid 1px;
    display: block;
    margin: 15px auto;
  }
  .close {
    float: right;
  }
</style>
