import * as THREE from 'three';
import {
  BLACK,
  BLUE,
  GREEN,
  ORANGE,
  RED,
  WHITE,
  YELLOW,
} from '../constants/colors';
import { ROTATION } from '../constants/display';

export class Piece extends THREE.Group {
  /**
   * Create new piece
   * @param {colors[]} colors - list of colors in piece
   */
  constructor(colors) {
    super();
    this.addSide(
      colors.includes(ORANGE) ? ORANGE : BLACK,
      [0.5, 0, 0],
      [0, ROTATION, 0]
    );
    this.addSide(
      colors.includes(RED) ? RED : BLACK,
      [-0.5, 0, 0],
      [0, ROTATION, 0]
    );
    this.addSide(
      colors.includes(YELLOW) ? YELLOW : BLACK,
      [0, 0.5, 0],
      [ROTATION, 0, 0]
    );
    this.addSide(
      colors.includes(WHITE) ? WHITE : BLACK,
      [0, -0.5, 0],
      [ROTATION, 0, 0]
    );
    this.addSide(
      colors.includes(GREEN) ? GREEN : BLACK,
      [0, 0, 0.5],
      [0, 0, 0]
    );
    this.addSide(colors.includes(BLUE) ? BLUE : BLACK, [0, 0, -0.5], [0, 0, 0]);
  }

  // Add one side of piece
  addSide(color, position, rotation) {
    const sideGeometry = new THREE.PlaneGeometry(1, 1);
    const sideMaterial = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });

    const side = new THREE.Mesh(sideGeometry, sideMaterial);
    side.rotation.set(...rotation);
    side.position.set(...position);

    const wireframeGeometry = new THREE.EdgesGeometry(side.geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: BLACK });
    const wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );
    side.add(wireframe);

    this.add(side);
  }
}
