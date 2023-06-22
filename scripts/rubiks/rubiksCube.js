import * as THREE from 'three';
import { BLUE, GREEN, ORANGE, RED, WHITE, YELLOW } from '../constants/colors';
import { REFRESH_RATE, ROTATION } from '../constants/display';
import { KeyManager } from '../util/keyManager';
import { Piece } from './piece';

export class RubiksCube {
  /**
   * Create Rubiks Cube object
   * @param {THREE.Scene} parent - threejs scene
   * @param {Window} window - js window
   */
  constructor(parent, window) {
    this.parent = parent;
    this.pieces = [];
    this.setPieces();

    this.center = new THREE.Group();
    this.parent.add(this.center);

    this.rotationSpeed = Math.PI / REFRESH_RATE;
    this.animationFrame = 0;
    this.rotation = 0;

    this.keyQueue = [];
    this.keyManager = new KeyManager();
    window.addEventListener('keypress', (e) => this.pushKeyQueue(e.key));
  }

  // Add pieces to threejs scene
  setPieces() {
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const piece = new Piece([
            x == 1 && ORANGE,
            x == -1 && RED,
            y == 1 && YELLOW,
            y == -1 && WHITE,
            z == 1 && GREEN,
            z == -1 && BLUE,
          ]);
          piece.position.set(x, y, z);
          this.pieces.push(piece);
          this.parent.add(piece);
        }
  }

  // rotate on axes and direction
  rotate(axes, direction) {
    this.pieces.forEach((piece) => {
      if (axes.x && axes.x.includes(piece.position.x)) this.center.add(piece);
      if (axes.y && axes.y.includes(piece.position.y)) this.center.add(piece);
      if (axes.z && axes.z.includes(piece.position.z)) this.center.add(piece);
    });
    this.doRotate(axes, direction);
  }

  // actual rotation
  doRotate(axes, direction) {
    this.animationFrame = requestAnimationFrame(() =>
      this.doRotate(axes, direction)
    );

    if (this.rotation < ROTATION) {
      if (axes.x) this.center.rotation.x += direction * this.rotationSpeed;
      if (axes.y) this.center.rotation.y += direction * this.rotationSpeed;
      if (axes.z) this.center.rotation.z += direction * this.rotationSpeed;
      this.rotation += this.rotationSpeed;
    } else {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
      this.rotation = 0;

      Array.from(this.center.children).forEach((piece) => {
        piece.getWorldPosition(piece.position);
        piece.position.round();
        piece.getWorldQuaternion(piece.rotation);
        this.parent.add(piece);
      });
      this.center.rotation.set(0, 0, 0);
    }
  }

  pushKeyQueue(key) {
    if (this.keyQueue.length < 2) this.keyQueue.push(key);
  }

  popKeyQueue() {
    const [axes, direction] = this.keyManager.pressed(this.keyQueue.shift());
    if (axes) this.rotate(axes, direction);
  }

  update() {
    if (this.animationFrame == 0 && this.keyQueue.length > 0)
      this.popKeyQueue();
  }
}
