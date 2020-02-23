export default {
  getWidth: rotate => (rotate % 2 === 0 ? 2 : 3),

  getAllCells: (x, y, rotate) => {
    if (rotate % 2 === 0) {
      return [
        [x, y],
        [x, y + 1],
        [x + 1, y + 2],
        [x + 1, y + 1]
      ];
    }

    return [
      [x + 1, y + 1],
      [x + 1, y],
      [x, y + 1],
      [x + 2, y]
    ];
  }
};
