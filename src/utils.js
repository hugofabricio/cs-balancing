module.exports.buildSizeEntities = function (size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
};

module.exports.mapEntities = function (arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
};

module.exports.arraySeq = function (count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
};
