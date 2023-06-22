import { BLUE, GREEN, ORANGE, RED, WHITE, YELLOW } from '../constants/colors';
import { Piece } from './piece';

export class RubiksCube {
  /**
   * Create Rubiks Cube object
   * @param {THREE.Scene} parent - threejs scene
   */
  constructor(parent) {
    this.parent = parent;
    this.setPieces();
  }

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
          this.parent.add(piece);
        }
  }
}
