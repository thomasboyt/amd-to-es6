import Backbone from 'backbone';
import React from 'react';
import Route from 'js/helpers/route';
import mixpanel from 'js/helpers/mixpanel';
import VerifyView from 'jsx!js/flows/signup/verify/view';
import UserModel from 'js/models/user';
import 'backbone.super';
import 'jquery.cookie';

var VerifyRoute = Route.extend({
  // redacted for secrecy, ssshhh
});

export default VerifyRoute;
