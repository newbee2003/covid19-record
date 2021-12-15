<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import vertexShader from '$lib/shaders/vertex.glsl';
	import fragmentShader from '$lib/shaders/fragment.glsl';
	import atmosphereVertexShader from '$lib/shaders/atmosphereVertex.glsl';
	import atmosphereFragmentShader from '$lib/shaders/atmosphereFragment.glsl';
	import { initVal, makeCovid19Store } from '$lib/store.js';

	// Get Covid 19 data
	let store = makeCovid19Store();
	let covid19Data = initVal();

	// Constant value
	const DEGREE_TO_RADIAN = Math.PI / 180;

	let el;
	let mouse = { x: 0.0, y: 0.0 };
	let targetRotation = { x: 0.5, y: 0.2 };
	let mouseOld = { x: 0.0, y: 0.0 };
	let targetRotationOld = { x: 0.5, y: 0.2 };
	let slowingFactor = 0.9;
	let innerWidth, innerHeight;

	// Setup grab for the globe
	const glHandleMouseMove = (e) => {
		mouse.x = e.clientX - innerWidth / 2;
		mouse.y = e.clientY - innerHeight / 2;
		targetRotation.x = (mouseOld.x - mouse.x) * 0.00025;
		targetRotation.y = (mouseOld.y - mouse.y) * 0.00025;
	};

	const glHandleMouseDown = (e) => {
		e.preventDefault();
		addEventListener('mousemove', glHandleMouseMove, false);
		addEventListener('mouseup', glHandleMouseUp, false);
		addEventListener('mouseout', glHandleMouseOut, false);

		mouseOld.x = e.clientX - innerWidth / 2;
		mouseOld.y = e.clientY - innerHeight / 2;
		targetRotationOld = targetRotation;
	};

	const glHandleMouseUp = (e) => {
		removeEventListener('mousemove', glHandleMouseMove, false);
		removeEventListener('mouseup', glHandleMouseUp, false);
		removeEventListener('mouseout', glHandleMouseOut, false);
	};

	const glHandleMouseOut = (e) => {
		removeEventListener('mousemove', glHandleMouseMove, false);
		removeEventListener('mouseup', glHandleMouseUp, false);
		removeEventListener('mouseout', glHandleMouseOut, false);
	};

	// Convert 3d coord to threejs globe's position
	const coordinateToPosition = (lat, lng, radius) => {
		const phi = lat * DEGREE_TO_RADIAN;
		const theta = -lng * DEGREE_TO_RADIAN;

		return new THREE.Vector3(
			radius * Math.cos(phi) * Math.cos(theta),
			radius * Math.sin(phi),
			radius * Math.cos(phi) * Math.sin(theta)
		);
	};

	// Create the globle
	const glGeometry = new THREE.SphereGeometry(100, 50, 50);
	const gl = new THREE.Mesh();
	gl.geometry = glGeometry;

	$: for (let country of covid19Data.countries) {
		// get the position of the cube
		let position = coordinateToPosition(country.countryInfo.lat, country.countryInfo.long, 100);

		let casesPercentage = country.cases / covid19Data.all.cases;

		let covid19DataColor =
			casesPercentage >= 0.075 ? 0xff1744 : casesPercentage > 0.01 ? 0xff8f00 : 0xffb300;

		// Create the cube that represent the covid19's case
		let cube = new THREE.Mesh(
			new THREE.BoxGeometry(
				1,
				1,
				30 + (country.cases / covid19Data.all.cases) * 100 * 15,
				1,
				1,
				1
			)
		);
		cube.material.color.setHex(covid19DataColor);

		// set position for the cube
		cube.position.x = position.x;
		cube.position.y = position.y;
		cube.position.z = position.z;
		cube.lookAt(new THREE.Vector3(0, 0, 0));

		// Merge with the main model
		gl.add(cube);
	}

	// Create the atmosphere
	const atmosphereGeometry = new THREE.SphereGeometry(100, 50, 50);
	const atmosphereMaterial = new THREE.ShaderMaterial({
		vertexShader: atmosphereVertexShader,
		fragmentShader: atmosphereFragmentShader,
		blending: THREE.AdditiveBlending,
		side: THREE.BackSide
	});
	const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
	atmosphere.scale.set(1.02, 1.02, 1.02);

	let renderer;

	const rotateAroundWorldAxis = (obj, axis, radians) => {
		const rotationMatrix = new THREE.Matrix4();
		rotationMatrix.makeRotationAxis(axis.normalize(), radians);
		rotationMatrix.multiply(obj.matrix);

		obj.matrix = rotationMatrix;
		obj.rotation.setFromRotationMatrix(obj.matrix);
	};

	onMount(async () => {
		store.subscribe((data) => (covid19Data = data));

		// Setting up animations frame on cross browsers way
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = (() =>
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				((callback, element) => window.setTimeout(callback, 1000 / 60)))();
		}
		// Setting innerWidth and innerHeight
		innerWidth = window.innerWidth;
		innerHeight = window.innerHeight;

		// Create scene
		const scene = new THREE.Scene();

		// Create camera
		const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);

		// Create group
		const group = new THREE.Group();

		// init texture
		const glTexture = new THREE.TextureLoader().load('/img/globe.webp');
		gl.material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				globeTexture: {
					value: glTexture
				}
			}
		});

		group.add(gl);

		scene.add(atmosphere);
		scene.add(group);
		camera.position.z = 300;

		const animate = () => {
			window.requestAnimationFrame(animate);

			rotateAroundWorldAxis(gl, new THREE.Vector3(0, 1, 0), targetRotation.x);
			rotateAroundWorldAxis(gl, new THREE.Vector3(1, 0, 0), targetRotation.y);
			targetRotation.y *= 1 - slowingFactor;
			targetRotation.x *= 1 - slowingFactor;

			renderer.render(scene, camera);
		};

		const resize = () => {
			renderer.setSize(innerWidth, innerHeight);
			camera.aspect = innerWidth / innerHeight;
			camera.updateProjectionMatrix();
		};

		const createScene = (el) => {
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: el });
			renderer.setClearColor(0xffffff, 0);
			resize();
			animate();
		};

		createScene(el);

		window.addEventListener('resize', resize);
	});
</script>

<div>
	<canvas bind:this={el} on:mousedown={glHandleMouseDown} />
</div>

<style>
	div {
		background: radial-gradient(circle, #263238 26%, #212121 100%);
	}
</style>
