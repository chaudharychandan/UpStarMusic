const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const minYearsActiveQuery = prepareYearsActiveQuery(1);
  const maxYearsActiveQuery = prepareYearsActiveQuery(-1);

  return Promise.all([minYearsActiveQuery, maxYearsActiveQuery])
    .then((years) => {
      return {
        min: years[0],
        max: years[1]
      };
    });
};

function prepareYearsActiveQuery(order) {
  return Artist
    .find({})
    .sort({ yearsActive: order })
    .limit(1)
    .then((artist) => artist[0].yearsActive)
  ;
}
