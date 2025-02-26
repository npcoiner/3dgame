import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const canvas = document.querySelector("#game-canvas");
const clock = new THREE.Clock();
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader(); 
export const scene = new THREE.Scene();
let camera;
export let controls;
let renderer;

let guiParams = {
    firstPerson: false,
};


export function initGraphics(){
    
    initRenderer();
    window.addEventListener("resize", () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
    })
    initCamera();
    initGUI();
    renderer.setAnimationLoop(animate); //set game loop

    // const geometry = new THREE.CapsuleGeometry();
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const player = new THREE.Mesh( geometry, material );
    // player.position.set(0,0,0);
    // controls.target.copy(player.position);
    // scene.add(player);
}



function initGUI(){
	const gui = new GUI();
	gui.add( guiParams, 'firstPerson' ).onChange( firstPerson => {
		if (firstPerson){
			controls.maxPolarAngle = Math.PI;
			controls.minDistance = 1e-4;
			controls.maxDistance = 1e-4;
		}else{
			controls.maxPolarAngle = Math.PI / 2;
			controls.minDistance = 10;
			controls.maxDistance = 10;
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
	
}

function animate(){
    

	renderer.render(scene, camera);
	controls.update();
}

function initCamera(){
	camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,2000);
	camera.position.set(10,0,0);
	initCameraControls(camera, canvas );
	scene.add(camera);
}

function initCameraControls(){
	controls = new OrbitControls( camera, canvas );
	controls.enableDamping = true;
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.maxDistance = 10;
	controls.maxPolarAngle = Math.PI / 2;
	controls.minDistance = 10;
}