import {scene, controls} from "./Graphics_old.js";
import * as THREE from "three";

export function addPlayer(){
    const geometry = new THREE.CapsuleGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const player = new THREE.Mesh( geometry, material );
    
    player.position.set(5,0,0);
    controls.target.copy(player.position);
    scene.add(player);
}