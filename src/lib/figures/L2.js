export default {
  getWidth: rotate => (rotate % 2 === 0 ? 2 : 3),

  getAllCells: (x, y, rotate) => {
    if (rotate === 0) {
      return [
        [x, y],
        [x + 1, y],
        [x + 1, y + 1],
        [x + 1, y + 2]
      ];
    }

    if (rotate === 1) {
      return [
        [x + 2, y],
        [x, y + 1],
        [x + 1, y + 1],
        [x + 2, y + 1]
      ];
    }

    if (rotate === 2) {
      return [
        [x + 1, y + 2],
        [x, y],
        [x, y + 1],
        [x, y + 2]
      ];
    }

    if (rotate === 3) {
      return [
        [x, y],
        [x, y + 1],
        [x + 1, y],
        [x + 2, y]
      ];
    }

    return null;
  }
};
