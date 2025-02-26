import * as THREE from "three"
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

export function initGraphics() {
    
    const rendererParams = {
        canvas: document.querySelectorAll("game-canvas"),
        antialias: true,
        powerPreference
    }
    renderer = new THREE.WebGLRenderer(rendererParams);
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', onWindowResize, false);

}