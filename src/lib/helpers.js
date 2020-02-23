export const arrayRandom = array => {
  return array[Math.floor(Math.random() * array.length)];
};

export const memoize = func => {
  const memoized = {};

  return arg => {
    if (!memoized.hasOwnProperty(arg)) {
      memoized[arg] = func(arg);
    }

    return memoized[arg];
  };
};

export const createKeysArray = memoize(length => {
  const array = [];

  for (let i = 0; i < length; i += 1) {
    array.push(i);
  }

  return array;
});
