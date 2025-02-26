import Jolt from "jolt-physics";

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