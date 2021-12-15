<script>
	import {
		NavigationDrawer,
		List,
		ListItem,
		Avatar,
		Divider,
		Icon,
		MaterialApp
	} from 'svelte-materialify';
	import { mdiViewDashboard, mdiEarth, mdiAccountGroup, mdiVirus } from '@mdi/js';

	import { elasticOut } from 'svelte/easing';

	let mini = true;
	const mouseenter = () => (mini = false);
	const mouseleave = () => (mini = true);
</script>

<svelte:head>
	<title>Covid-19 Record</title>
</svelte:head>

<MaterialApp theme="dark">
	<div class="d-block" on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
		<NavigationDrawer
			class="navbar"
			{mini}
			absolute
			left
			inOpts={{ easing: elasticOut, duration: 500 }}
		>
			<ListItem>
				<span slot="prepend">
					<Icon path={mdiVirus} />
				</span>
				COVID-19 RECORD
			</ListItem>
			<Divider />
			<List dense nav>
				<a href="/">
					<ListItem>
						<span slot="prepend">
							<Icon path={mdiViewDashboard} />
						</span>
						Stats
					</ListItem>
				</a>
				<a href="/stats-3d">
					<ListItem>
						<span slot="prepend">
							<Icon path={mdiEarth} />
						</span>
						Stats 3D
					</ListItem>
				</a>
				<a href="/covid19">
					<ListItem>
						<span slot="prepend">
							<Icon path={mdiVirus} />
						</span>
						Covid-19
					</ListItem>
				</a>
				<!--
				<a href="/vaccines">
					<ListItem>
						<span slot="prepend">
							<Icon>
								<svg
									class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
									focusable="false"
									viewBox="0 0 24 24"
									aria-hidden="true"
									data-testid="VaccinesIcon"
									tabindex="-1"
									title="Vaccines"
									width="24"
									height="24"
									><path
										d="M11 5.5H8V4h.5c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1H6v1.5H3c-.55 0-1 .45-1 1s.45 1 1 1V15c0 1.1.9 2 2 2h1v4l2 1.5V17h1c1.1 0 2-.9 2-2V7.5c.55 0 1-.45 1-1s-.45-1-1-1zM9 9H7.25c-.41 0-.75.34-.75.75s.34.75.75.75H9V12H7.25c-.41 0-.75.34-.75.75s.34.75.75.75H9V15H5V7.5h4V9zm10.5 1.5V10c.55 0 1-.45 1-1s-.45-1-1-1h-5c-.55 0-1 .45-1 1s.45 1 1 1v.5c0 .5-1.5 1.16-1.5 3V20c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6.5c0-1.84-1.5-2.5-1.5-3zm-3 0V10h1v.5c0 1.6 1.5 2 1.5 3v.5h-4v-.5c0-1 1.5-1.4 1.5-3zM15 20v-1.5h4V20h-4z"
									/></svg
								>
							</Icon>
						</span>
						Vaccines
					</ListItem>
				</a>
				-->
			</List>
		</NavigationDrawer>
	</div>
	<div>
		<slot />
	</div>
</MaterialApp>
