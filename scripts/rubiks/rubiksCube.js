import { BLUE, GREEN, ORANGE, RED, WHITE, YELLOW } from '../constants/colors';
import { Piece } from './piece';
import { KeyManager } from '../util/keyManager';
import * as THREE from 'three';

const vec = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const group = (parent, pos) => {
  const group = new THREE.Group();
  group.position.set(pos.x, pos.y, pos.z);
  parent.add(group);
  return group;
};

export class RubiksCube {
  /**
   * Create Rubiks Cube object
   * @param {THREE.Scene} parent - threejs scene
   */
  constructor(
    parent = undefined,
    window = document,
    offset = { x: -1, y: 0, z: -1 },
    rotationSpeed = Math.PI * (1 / 60)
  ) {
    this.parent = parent;
    this.pieces = this.setPieces();
    this.window = window;
    this.offset = offset;
    this.center = group(
      this.parent,
      vec(this.offset.x + 1, this.offset.y + 1, this.offset.z + 1)
    );
    this.keyManager = new KeyManager({ offset: this.offset });
    this.rotationSpeed = rotationSpeed;
    this.active = false;
    this.keyQueue = [];
    this.rotation = 0;
    this.animationFrame = 0;
  }

  setPieces() {
    let pieces = [];
    for (let x = 0.5; x <= 2.5; x++)
      for (let y = 0.5; y <= 2.5; y++)
        for (let z = 0.5; z <= 2.5; z++) {
          const piece = new Piece([
            x == 2.5 && ORANGE,
            x == 0.5 && RED,
            y == 2.5 && YELLOW,
            y == 0.5 && WHITE,
            z == 2.5 && GREEN,
            z == 0.5 && BLUE,
          ]);
          piece.position.set(x, y, z);
          this.parent.add(piece);
          pieces.push(piece);
        }
    return pieces;
  }

  // Set which axis to be rotated at and select which pieces to rotate
  setRotationAxes(
    {
      x = {
        values: [this.offset.x, this.offset.x + 1, this.offset.x + 2],
        isSelected: false,
      },
      y = {
        values: [this.offset.y, this.offset.y + 1, this.offset.y + 2],
        isSelected: false,
      },
      z = {
        values: [this.offset.z, this.offset.z + 1, this.offset.z + 2],
        isSelected: false,
      },
    },
    direction
  ) {
    return { axes: { x: x, y: y, z: z }, direction: direction };
  }

  // Select pieces according to selected axis
  rotationSetup({ axes, direction }) {
    this.pieces.forEach((piece) => {
      if (
        axes.x.values.includes(piece.position.x) &&
        axes.y.values.includes(piece.position.y) &&
        axes.z.values.includes(piece.position.z)
      ) {
        // Set piece position relative to center of cube
        piece.position.set(
          piece.position.x - (this.offset.x + 1),
          piece.position.y - (this.offset.y + 1),
          piece.position.z - (this.offset.z + 1)
        );
        this.center.add(piece);
      }
    });
    this.rotate(axes, direction);
  }

  // Rotation animation and computation
  rotate(axes, direction) {
    this.animationFrame = requestAnimationFrame(() =>
      this.rotate(axes, direction)
    );
    if (this.rotation < Math.PI * 0.5) {
      if (axes.x.isSelected) {
        this.center.rotation.x += this.rotationSpeed * direction;
      } else if (axes.y.isSelected) {
        this.center.rotation.y += this.rotationSpeed * direction;
      } else if (axes.z.isSelected) {
        this.center.rotation.z += this.rotationSpeed * direction;
      }
      this.rotation += this.rotationSpeed;
    } else {
      // Reset
      cancelAnimationFrame(this.animationFrame);
      Array.from(this.center.children).forEach((piece) => {
        piece.getWorldPosition(piece.position);
        piece.position.round();
        piece.getWorldQuaternion(piece.rotation);
        this.parent.add(piece);
      });
      this.center.rotation.set(0, 0, 0);
      this.rotation = 0;
      this.animationFrame = 0;
    }
  }

  // Pushes key into keyQueue
  pushKeyQueue(that, key) {
    if (that.keyQueue.length < 2) that.keyQueue.push(key);
  }

  // Pops key from keyQueue and executes it
  popKeyQueue() {
    if (this.keyQueue.length > 0) {
      let [axes, direction] = this.keyManager.pressed(this.keyQueue[0]);
      this.keyQueue.shift();

      if (axes == undefined || direction == undefined) return;
      this.rotationSetup(this.setRotationAxes(axes, direction));
    }
  }

  // Update to do animation
  update() {
    console.log(this.keyQueue);
    if (this.animationFrame == 0 && this.keyQueue.length > 0) {
      this.popKeyQueue();
    }
  }

  // Toggle controls on/off
  toggle() {
    if (!this.active) {
      this.window.addEventListener('keypress', (e) =>
        this.pushKeyQueue(this, e.key)
      );
    } else {
      this.window.removeEventListener('keypress', RubiksCube.pushKeyQueue);
    }
  }
}
