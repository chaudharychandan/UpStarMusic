const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const minAgeQuery = prepareAgeQuery(1);
  const maxAgeQuery = prepareAgeQuery(-1);

  return Promise.all([minAgeQuery, maxAgeQuery])
    .then((ages) => {
      return {
        min: ages[0],
        max: ages[1]
      };
    });
};

function prepareAgeQuery(order) {
  return Artist
    .find({})
    .sort({ age: order })
    .limit(1)
    .then((artist) => artist[0].age)
  ;
}
