
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendFile(path.resolve('../views/index.html'));
};