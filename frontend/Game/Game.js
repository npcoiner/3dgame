import {doFunny} from "./Jolt/JoltPhysics.js";
import {initGraphics} from "./Graphics.js"
import {addPlayer} from "./Player.js"
import initJolt from "jolt-physics";
import {startWorld} from "./World.js"

export function startGame(){
	//The physics renderer needs to be ready before we can do anything else... I guess.
	doFunny().then(() => {
	});

	//Eventually swap to our own cleanedup setup
	// startWorld().then(() => {
		
	// });
	
}





