import appModule from 'app.module';

'use strict';

type RouteProvider = ng.route.IRouteProvider;

export function configure( $routeProvider: RouteProvider ) {
    $routeProvider.when('/',
        {
            controller: 'demoApp.CustomersController',
            templateUrl: 'app/views/customers.html',
            controllerAs: 'vm'
        })
        .when('/orders/:customerId',
        {
            controller: 'demoApp.OrdersController',
            templateUrl: 'app/views/orders.html',
            controllerAs: 'vm'
        });

    configure.$inject = [ '$routeProvider' ];
}