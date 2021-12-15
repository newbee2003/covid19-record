<script>
	import { onMount } from 'svelte';
	import { Tabs, Tab, Window, WindowItem, AppBar, MaterialApp } from 'svelte-materialify';
	import MarkdownIt from 'markdown-it';
	import Delta_B_1_617_2 from '$lib/covid19/delta.B.1.617.2.md';
	import Lamda from '$lib/covid19/lamda.md';
	import Omicron from '$lib/covid19/omicron.md';

	const md = new MarkdownIt('commonmark');

	let value = 0;
</script>

<div class="pa-5">
	<AppBar>
		<span slot="title">Covid-19 Record</span>
		<div slot="extension">
			<Tabs class="green-text" bind:value fixedTabs>
				<div slot="tabs">
					<Tab>Delta B.1.617.2</Tab>
					<Tab>Lamda</Tab>
					<Tab>Omicron</Tab>
				</div>
			</Tabs>
		</div>
	</AppBar>

	<Window {value} class="ma-4">
		<WindowItem>
			<br />
			{@html md.render(Delta_B_1_617_2)}
		</WindowItem>
		<WindowItem>
			<br />
			{@html md.render(Lamda)}
		</WindowItem>
		<WindowItem>
			<br />
			{@html md.render(Omicron)}
		</WindowItem>
	</Window>
</div>

