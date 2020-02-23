export default {
  getWidth: () => 2,

  getAllCells(x, y) {
    return [
      [x, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x + 1, y]
    ];
  }
};
