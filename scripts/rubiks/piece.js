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

export class Piece extends THREE.Group {
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

  /**
   * Create new piece
   * @param {colors[]} colors - list of colors in piece
   */
  constructor(colors) {
    super();
    this.sides = {
      xPositive: this.addSide(
        colors.includes(ORANGE) ? ORANGE : BLACK,
        [0.5, 0, 0],
        [0, 0.5 * Math.PI, 0]
      ),
      xNegative: this.addSide(
        colors.includes(RED) ? RED : BLACK,
        [-0.5, 0, 0],
        [0, 0.5 * Math.PI, 0]
      ),
      yPositive: this.addSide(
        colors.includes(YELLOW) ? YELLOW : BLACK,
        [0, 0.5, 0],
        [0.5 * Math.PI, 0, 0]
      ),
      yNegative: this.addSide(
        colors.includes(WHITE) ? WHITE : BLACK,
        [0, -0.5, 0],
        [0.5 * Math.PI, 0, 0]
      ),
      zPositive: this.addSide(
        colors.includes(GREEN) ? GREEN : BLACK,
        [0, 0, 0.5],
        [0, 0, 0]
      ),
      zNegative: this.addSide(
        colors.includes(BLUE) ? BLUE : BLACK,
        [0, 0, -0.5],
        [0, 0, 0]
      ),
    };
  }
}
