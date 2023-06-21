import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.5
);

camera.position.set(5, 4, 5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(10);
axesHelper.position.set(-0.5, -0.5, -0.5);
scene.add(axesHelper);

function newCube(parent, color, x, y, z) {
  // Cube
  const cubeMat = new THREE.MeshBasicMaterial({
    color: color,
  });
  const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(cubeGeo, cubeMat);

  // Wireframe
  const wfGeo = new THREE.EdgesGeometry(cube.geometry);
  const wfMat = new THREE.LineBasicMaterial({
    color: 0x000000,
  });
  const wireframe = new THREE.LineSegments(wfGeo, wfMat);
  cube.add(wireframe);
  cube.position.set(x, y, z);
  parent.add(cube);
  return cube;
}

const center = {
  orange: newCube(scene, 0xffa500, 0, 1, 1),
  white: newCube(scene, 0xffffff, 1, 0, 1),
  green: newCube(scene, 0x00ff00, 1, 1, 0),
  red: newCube(scene, 0xff0000, 2, 1, 1),
  yellow: newCube(scene, 0xffff00, 1, 2, 1),
  blue: newCube(scene, 0x0000ff, 1, 1, 2),
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

export { center };
