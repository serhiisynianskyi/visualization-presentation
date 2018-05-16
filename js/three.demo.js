"use strict";
window.onload = function() {
	let canvas = document.getElementById('three-demo'),
		scene, camera, renderer, light, controls, rotationCoefficient = 0;

	function initScene() {
		renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true });
		camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.position.set(200, 100, 100);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
		renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);
		renderer.gammaInput = renderer.gammaOutput = true;
		renderer.toneMapping = THREE.LinearToneMapping;
		renderer.setClearColor(0xffffff, 0);
		scene = new THREE.Scene();
	}

	function rendering() {
		requestAnimationFrame(rendering);
		renderer.render(scene, camera);
		animate(scene);
	}

	function addLights() {
		let light = new THREE.DirectionalLight(0xdfebff, 1),
			lightDistance = 400;
		light.position.set(200, 300, -250);
		light.castShadow = true;
		light.shadow.mapSize.width = 512;
		light.shadow.mapSize.height = 512;
		light.shadow.camera.left = -lightDistance;
		light.shadow.camera.right = lightDistance;
		light.shadow.camera.top = lightDistance;
		light.shadow.camera.bottom = -lightDistance;
		light.shadow.camera.far = 800;
		scene.add(new THREE.AmbientLight(0xffffff, 1));
		scene.add(light);
	}

	function animate(scene) {
		scene.children[2].position.x = Math.sin(rotationCoefficient * 1) * 50;
		scene.children[2].position.z = Math.cos(rotationCoefficient * 1) * 50;
		scene.children[2].rotation.z += 0.1;
		scene.children[2].rotation.y += 0.05;
		rotationCoefficient += Math.PI / 180 * 2;
	}

	let sceneObjects = {
		cube: {
			geometry: new THREE.CubeGeometry(30, 30, 30, 10, 10, 10),
			material: new THREE.MeshStandardMaterial({
				emissive: 0.2,
				metalness: 0.9,
				color: 0xff2233
			}),
			position: [30, 30, 10]
		},
		sphere: {
			geometry: new THREE.SphereGeometry(10, 32, 32),
			material: new THREE.MeshStandardMaterial({
				emissive: 0.1,
				metalness: 0.73,
				color: 0x008888
			}),
			position: [0, 20, 0]
		},
		plane: {
			geometry: new THREE.PlaneGeometry(200, 200, 2).applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2)),
			material: new THREE.MeshStandardMaterial({
				emissive: 0.6,
				color: 0x333333
			}),
			position: [0, 0, 0]
		}
	}

	function createMesh(element) {
		let elementMesh = new THREE.Mesh(element.geometry, element.material);
		elementMesh.castShadow = true;
		elementMesh.receiveShadow = true;
		elementMesh.position.set(...element.position)
		return elementMesh;
	}

	function createElements(objects, scene) {
		for (let mesh in objects) {
			scene.add(createMesh(objects[mesh]));
		}
	}

	initScene();
	addLights();
	createElements(sceneObjects,scene);
	rendering();

	controls = new THREE.OrbitControls(camera);
};