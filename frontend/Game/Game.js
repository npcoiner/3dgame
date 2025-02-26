import {doFunny} from "./Jolt/JoltPhysics.js";
import {initGraphics} from "./Graphics.js"
import {addPlayer} from "./Player.js"
import initJolt from "jolt-physics";


export function startGame(){
	//The physics renderer needs to be ready before we can do anything else... I guess.
	doFunny().then(() => {
		//initGraphics();

		//addPlayer();
		
	});
	
}





