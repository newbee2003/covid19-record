<script>
	import {
		DataTable,
		DataTableHead,
		DataTableRow,
		DataTableCell,
		DataTableBody
	} from 'svelte-materialify';
	import { onMount } from 'svelte';
	import { initVal, makeCovid19Store } from '$lib/store.js';

	// Get Covid 19 data
	let store = makeCovid19Store();
	let covid19Data = initVal();

	onMount(async () => store.subscribe((data) => (covid19Data = data)));
	const tableKeys = [
		{name: "country", numeric: false},
		{name: "continent", numeric: false},
		{name: "cases", numeric: true},
		{name: "active", numeric: true},
		{name: "deaths", numeric: true},
	]
</script>

<div class="pa-5">
	<h1>Covid 19 Record</h1>
	<br />
	<DataTable style="width: 90%;" class="elevation-4">
		<DataTableHead>
			<DataTableRow>
				{#each tableKeys as {name, numeric}}
					<DataTableCell {numeric}>{name.replace(/^\w/, (c) => c.toUpperCase())}</DataTableCell>	
				{/each}
			</DataTableRow>
		</DataTableHead>
		<DataTableBody>
		{#each covid19Data.countries as country}
			<DataTableRow>
				{#each tableKeys as {name, numeric}}
					<DataTableCell {numeric}>{country[name]}</DataTableCell>	
				{/each}
			</DataTableRow>
		{/each}
		</DataTableBody>
	</DataTable>
</div>
