import initJolt from "jolt-physics";
import {initPhysics, updatePhysics} from "./Physics.js"
import {initGraphics, updateControls} from "./Graphics.js"

var onUpdate;
var time;
var dynamicObjects = [];
var input;

export async function startWorld(){
    //Wait for Jolt to start first
    initJolt().then((Jolt) => {
        window.Jolt = Jolt; // global Jolt. not sure if this is necessary. Probably shouldn't be if we write code well enough
        
        initPhysics();
        initGraphics();
        initControls(); //Not camera, those are in initGraphics because they are directly handled in THREE.
        gameLoop(); //game loop

    })
}

function gameLoop(){
    requestAnimationFrame(gameLoop);

	// Don't go below 30 Hz to prevent spiral of death
    var deltaTime = clock.getDelta();
	deltaTime = Math.min(deltaTime, 1.0 / 30.0);
    if (onUpdate != null)
		onUpdate(time, deltaTime);
    //Only handle inputs if they are active 
    if(input !== null){
        handleInput(deltaTime);
    }
    
    prePhysicsUpdate();// ?????


    updateDynamicObjects();
    time += deltaTime;
    updatePhysics(deltaTime);
    updateControls(deltaTime);
    updateRenderer();
}

export function updateDynamicObjects(){
    /* dynamic objects is a module-scoped array of 
    THREE Mesh objects with the body position and rotation info*/
    let body = objThree.userData.body;
    let objThree = dynamicObjects[i];
    objThree.position.copy(wrapVec3(body.GetPosition()));
    objThree.quaternion.copy(wrapQuat(body.GetRotation()));
}

/**
 * 
 */
function handleInput(deltaTime){
    //jolt character handling. Things like sliding down slopes, desiredVelocity, gravity
    const cameraRotation = getCameraRotation();
    let forwardV = input.forwardPressed ? 1.0 : (input.backwardPressed ? -1.0 : 0.0);
    let rightV = input.rightPressed ? 1.0 : (input.leftPressed ? -1.0 : 0.0);
    const cameraBasedMovementVector = createThreeVectorApplyQuat(rightV, 0, -forwardV, cameraRotation);
    cameraBasedMovementVector.y = 0; //player can't just move upwards.
    normalizeVector(cameraBasedMovementVector); //magnitude of vector should be equal to player speed, not dependent on pitch

}

/**
 * Creates document event listeners for keyboard input controls
 */
function initControls(){ //Probably a better way to handle this with only changing the input object
    input = {
        forwardPressed: false,
        backwardPressed: false,
        leftPressed: false,
        rightPressed: false,
        jump: false,
        crouched: false,
        sprint: false,
        interact: false,
    }
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            input.forwardPressed = true;
        } else if (keyCode == 83) {
            input.backwardPressed = true;
        } else if (keyCode == 65) {
            input.leftPressed = true;
        } else if (keyCode == 68) {
            input.rightPressed = true;
        } else if (keyCode == 32) {
            input.jump = true;
        } else if (keyCode == 16) {
            input.sprint = true;
        } else if (keyCode == 17) {
            input.crouched = true;
        } else if (keyCode == 69){
            input.interact = true;
        }
    };
    function onDocumentKeyUp(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            input.forwardPressed = false;
        } else if (keyCode == 83) {
            input.backwardPressed = false;
        } else if (keyCode == 65) {
            input.leftPressed = false;
        } else if (keyCode == 68) {
            input.rightPressed = false;
        } else if (keyCode == 32) {
            input.jump = false;
        } else if (keyCode == 16) {
            input.sprint = false;
        } else if (keyCode == 17) {
            input.crouched = false;
        } else if (keyCode == 69){
            input.interact = false;
        }
    };
    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);
}