export default (func) => {
  const cache = new Map();
  return function (arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = func.call(document, arg);
    cache.set(arg, result);
    return result;
  };
};
