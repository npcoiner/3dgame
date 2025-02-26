import {initJolt} from "jolt-physics";
import {initPhysics} from "Physics.js"
import {initGraphics} from "Graphics.js"

export async function startWorld(){
    //Wait for Jolt to start first
    initJolt().then((Jolt) => {
        window.Jolt = Jolt; // global Jolt
        
        initPhysics();
        initGraphics();

    })
}