<script>
	import { enhance } from '$app/forms';
</script>
<svelte:head>
	<title>Signup</title>
	<meta name="description" content="Signup this app" />
</svelte:head>

<div class="text-column">
	<h1>Signup this app</h1>

	<div class="login-container">
		<form use:enhance method="POST">
			<input type="text" name="name" placeholder="Name" required /> <br /><br />
			<input type="email" name="email" placeholder="Email" required /> <br /><br />
			<input type="password" name="password" placeholder="Password" required /><br /><br />
			<button type="submit">signup</button>
		</form>
	</div>
</div>
