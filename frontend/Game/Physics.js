import Jolt from "jolt-physics";
import initJolt from "jolt-physics";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'

// Graphics variables
var container, stats;
var camera, controls, scene, renderer;

// Timers
var clock = new THREE.Clock();
var time = 0;

// Physics variables
var joltInterface;
var physicsSystem;
var bodyInterface;

// List of objects spawned
var dynamicObjects = [];

// The update function
var onExampleUpdate;

const DegreesToRadians = (deg) => deg * (Math.PI / 180.0);
const wrapVec3 = (v) => new THREE.Vector3(v.GetX(), v.GetY(), v.GetZ());
const unwrapVec3 = (v) => new Jolt.Vec3(v.x, v.y, v.z);
const wrapRVec3 = wrapVec3;
const unwrapRVec3 = (v) => new Jolt.RVec3(v.x, v.y, v.z);
const wrapQuat = (q) => new THREE.Quaternion(q.GetX(), q.GetY(), q.GetZ(), q.GetW());
const unwrapQuat = (q) => new Jolt.Quat(q.x, q.y, q.z, q.w);

// Object layers
const LAYER_NON_MOVING = 0;
const LAYER_MOVING = 1;
const NUM_OBJECT_LAYERS = 2;

export function initPhysics(){
    
    
    const settings = new Jolt.JoltSettings();
    settings.mMaxWorkerThreads = 3; // Limit the number of worker threads to 3
    setupCollisionFiltering(settings);
    joltInterface = new Jolt.JoltInterface(settings);
    Jolt.destroy(settings); //C++ conventions, no GC on wasm? 
    physicsSystem = jolt.GetPhysicsSystem();
    bodyInterface = physicsSystem.GetBodyInterface();
}

export function updatePhysics(deltaTime){
    // When running below 55 Hz, do 2 steps instead of 1
	var numSteps = deltaTime > 1.0 / 55.0 ? 2 : 1;

	// Step the physics world
	joltInterface.Step(deltaTime, numSteps);
}

//Update objects based on transforms
