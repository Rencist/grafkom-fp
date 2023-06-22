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
        }
  }
}
