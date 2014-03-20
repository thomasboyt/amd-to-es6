define([
  'backbone',
  'react',
  'js/helpers/route',
  'js/helpers/mixpanel',
  'jsx!js/flows/signup/verify/view',
  'js/models/user',
  'backbone.super',
  'jquery.cookie'
], function(Backbone, React, Route, mixpanel, VerifyView, UserModel) {

  var VerifyRoute = Route.extend({
    // redacted for secrecy, ssshhh
  });

  return VerifyRoute;
});
