<script lang="ts">
	import { login } from '../auth';
	import { onDestroy } from 'svelte';
	import { providerStore } from '../store';

	let isLoggedIn: boolean = false;
	let address: string | null = null;
	let jsonData: string | null = null;

	function getJsonData(): string | null {
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key && key.startsWith('oidc.user:https://auth.immutable.com')) {
				isLoggedIn = true;
				const fullData = sessionStorage.getItem(key);
				if (fullData) {
					const parsedData = JSON.parse(fullData);
					return JSON.stringify(parsedData.profile, null, 2);
				}
				break;
			}
		}
		return null;
	}

	const unsubscribe = providerStore.subscribe(async (provider) => {
		if (provider) {
			isLoggedIn = true;
			jsonData = getJsonData();
			try {
				address = await provider.getAddress();
			} catch (e) {
				console.error(e);
			}
		}
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="container">
	{#if isLoggedIn}
		<pre>{@html JSON.stringify(JSON.parse(jsonData), null, 2)}</pre>
	{:else}
		<button on:click={login}>
			Sign In with
			<img
				src="https://assets-global.website-files.com/62535c6262b90afd768b9b26/62536a8f8dc259548c11d1a9_immutable-logo.svg"
				class="logo"
				alt="IMX logo"
			/>
		</button>
	{/if}
</div>

<style>
	button {
		color: #0d0d0d;
		background-image: linear-gradient(137deg, #f191fa, #83e3f0);
		min-width: 140px;
		background-color: #0d0d0d;
		border: 0 #0d0d0d;
		border-radius: 48px;
		margin-left: 0;
		margin-right: 0;
		padding: 12px 24px;
		font-weight: 500;
		text-decoration: none;
		display: flex;
		align-items: center;
	}
	pre {
		color: white;
	}
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		max-width: 80%;
		margin: auto;
	}
	.logo {
		max-height: 24pt;
		margin-left: 8px;
	}
</style>
