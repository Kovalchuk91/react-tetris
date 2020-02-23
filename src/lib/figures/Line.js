export default {
  getWidth: rotate => (rotate % 2 === 0 ? 1 : 4),

  getAllCells: (x, y, rotate) => {
    if (rotate % 2 === 0) {
      return [
        [x, y],
        [x, y + 1],
        [x, y + 2],
        [x, y + 3]
      ];
    }

    return [
      [x, y],
      [x + 1, y],
      [x + 2, y],
      [x + 3, y]
    ];
  }
};
