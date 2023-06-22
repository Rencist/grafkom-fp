import * as THREE from 'three';
import { BLUE, RED, YELLOW } from './constants/colors';
import { Piece } from './rubiks/piece';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RubiksCube } from './rubiks/rubiksCube';

// Get three container
const container = document.getElementById('three');

// Initialize scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 4, 5);

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x212a3e);
container.appendChild(renderer.domElement);

// Add camera controller
const controller = new OrbitControls(camera, renderer.domElement);
controller.target.set(1, 1, 1);

// Add world axis
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Add onResize listener
window.addEventListener(
  'resize',
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

const cube = new RubiksCube(scene);

// Main loop
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
