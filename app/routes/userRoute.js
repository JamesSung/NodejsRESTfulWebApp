'use strict';

module.exports = function(app) {
  var userCtrl = require('../controllers/userController');

  app.route('/users')
    .get(userCtrl.list_all_users)
    .put(userCtrl.update_a_user)
    .post(userCtrl.create_a_user);

  app.route('/users/:id')
    .get(userCtrl.read_a_user)
    //.put(userCtrl.update_a_user)
    .delete(userCtrl.delete_a_user);
};