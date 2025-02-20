import * as THREE from "three";
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';


let renderer,player;
let guiParams = {
	firstPerson: false,
};
const clock = new THREE.Clock();
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader(); 
const canvas = document.querySelector("#game-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,2000);
const controls = new OrbitControls( camera, canvas );


/**
 * Uses three.js WebGL compatability tracker to get compatibility with WebGL.
 * @returns bool
 */
export function checkWebGLCompatibility(){
	if ( WebGL.isWebGL2Available() ) {
		return true;
	} else {
		return false;
	}
}

function initGUI(){
	const gui = new GUI();
	gui.add( guiParams, 'firstPerson' ).onChange( v => {
		if ( ! v ) {
			camera
				.position
				.sub( controls.target )
				.normalize()
				.multiplyScalar( 10 )
				.add( controls.target );
		}
	} ); 
	gui.open();
}	

function initRenderer(){
	const rendererParams = {
		canvas : canvas,
		antialias : true,
		powerPreference : "high-performance",
	}
	renderer = new THREE.WebGLRenderer(rendererParams);
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop(animate);
}

function animate(){
	renderer.render(scene, camera);
	controls.update();

	if ( guiParams.firstPerson ) {

		controls.maxPolarAngle = Math.PI;
		controls.minDistance = 1e-4;
		controls.maxDistance = 1e-4;

	} else {

		controls.maxPolarAngle = Math.PI / 2;
		controls.minDistance = 2;
		controls.maxDistance = 20;

	}
	//updateCamera(camera,player);
}

function updateCamera(camera, player){
	camera.position.sub( controls.target );
	controls.target.copy( player.position );
	camera.position.add( player.position );
}

export function startGame(){
	initGUI();
    initRenderer();
	
	const geometry = new THREE.CapsuleGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	player = new THREE.Mesh( geometry, material );
	player.position.set(0,0,0);
	controls.target.copy(player.position);
	camera.position.set(10,0,0);
	
	scene.add(player);
	scene.add(camera);
}

