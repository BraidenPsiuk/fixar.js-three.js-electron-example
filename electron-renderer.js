import * as THREE from './node_modules/three/build/three.module.js';
import * as FIXAR from './node_modules/fixar/fixar.js';

const viewport = new FIXAR.Viewport({
    ar: 16/9,
    wrapperColor: '#000000'
}); viewport.init();

const scene = new THREE.Scene(); // Define our scene
const camera = new THREE.PerspectiveCamera(75, viewport.wrapper.clientWidth / viewport.wrapper.clientHeight, 0.1, 100); // Define our camera
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); // Define our renderer, enable alpha (sets the background to whatever color the canvas element's "background-color" property is) and antialiasing

viewport.registerComponents("THREE", camera, renderer); // Tell FIXAR we want to use three.js as our main rendering library (aka "THREE" mode), and pass in the camera and renderer we just created

const geometry = new THREE.BoxGeometry(); // Define the geometry for our cube
const material = new THREE.MeshBasicMaterial( { color: "#00FF00" } ); // Define the material for our cube
const cube = new THREE.Mesh( geometry, material ); // Create our cube using our geometry and material
scene.add( cube ); // Add the cube to our scene
camera.position.z = 3; // Move our camera back 3 units so it doesn't intersect with the midpoint of our cube

viewport.resize(); // Resize once at the beginning
viewport.autoResize(); // Tell FIXAR to resize our viewport every time the user resizes the main Electron window

const animate = ()=> {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // viewport.setWrapperColor('#'+Math.random().toString(16).substr(2,6));

    renderer.render( scene, camera );

    requestAnimationFrame(animate);
};  animate(); // Define the animate() function and call it immediately