///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

'use strict';

import {configure} from 'app.config';
import CustomersController from 'controllers/customers.controller';
import OrdersController from 'controllers/orders.controller';
import CustomersService from 'services/customers.service';
import * as FTBComponent from 'directives/filterTextbox.directive';

const appModule: ng.IModule = angular.module('demoApp', [
    'ngRoute',
    'ngAnimate'
])
    .config(configure)
    .controller(CustomersController.id, CustomersController)
    .controller(OrdersController.id, OrdersController)

    .directive(FTBComponent.FilterTextbox.id, FTBComponent.FilterTextbox.instance)
    .controller(FTBComponent.FilterTextboxController.id, FTBComponent.FilterTextboxController)

    .service(CustomersService.id, CustomersService);


console.log(CustomersController, CustomersService, OrdersController, FTBComponent);

export default appModule;

