const { fsFeatures, csFeatures } = require('../../../model/data.js');

// GET "user/products/precision-irrigation"
const precisionIrrigation = function (req, res) {
  res.render('user/products/precisionIrrigation', {
    toRender: res.locals.toRender,
  });
};

// GET "user/products/crop-suggestion"
const cropSuggestion = function (req, res) {
  res.locals.toRender['csFeatures'] = csFeatures;

  res.render('user/products/cropSuggestion', {
    toRender: res.locals.toRender,
  });
};

// GET "user/products/fertilizer-suggestion"
const fertilizerSuggestion = function (req, res) {
  res.locals.toRender['fsFeatures'] = fsFeatures;

  res.render('user/products/fertilizerSuggestion', {
    toRender: res.locals.toRender,
  });
};

exports.productRoutes = {
  precisionIrrigation,
  cropSuggestion,
  fertilizerSuggestion,
};
