import { KEY } from '../constants/key';

export class KeyManager {
  pressed(key) {
    switch (key) {
      case KEY.R:
        return [{ x: [1] }, -1];
      case KEY.R_PRIME:
        return [{ x: [1] }, 1];
      case KEY.L:
        return [{ x: [-1] }, 1];
      case KEY.L_PRIME:
        return [{ x: [-1] }, -1];
      case KEY.U:
        return [{ y: [1] }, -1];
      case KEY.U_PRIME:
        return [{ y: [1] }, 1];
      case KEY.D:
        return [{ y: [-1] }, 1];
      case KEY.D_PRIME:
        return [{ y: [-1] }, -1];
      case KEY.F:
        return [{ z: [1] }, -1];
      case KEY.F_PRIME:
        return [{ z: [1] }, 1];
      case KEY.B:
        return [{ z: [-1] }, 1];
      case KEY.B_PRIME:
        return [{ z: [-1] }, -1];
      case KEY.M:
        return [{ x: [0] }, -1];
      case KEY.M_PRIME:
        return [{ x: [0] }, 1];
      case KEY.S:
        return [{ z: [0] }, -1];
      case KEY.S_PRIME:
        return [{ z: [0] }, 1];
      case KEY.E:
        return [{ y: [0] }, -1];
      case KEY.E_PRIME:
        return [{ y: [0] }, 1];
      case KEY.X:
        return [{ x: [-1, 0, 1] }, -1];
      case KEY.X_PRIME:
        return [{ x: [-1, 0, 1] }, 1];
      case KEY.Y:
        return [{ y: [-1, 0, 1] }, -1];
      case KEY.Y_PRIME:
        return [{ y: [-1, 0, 1] }, 1];
      case KEY.Z:
        return [{ z: [-1, 0, 1] }, -1];
      case KEY.Z_PRIME:
        return [{ z: [-1, 0, 1] }, 1];
      default:
        return [];
    }
  }
}
