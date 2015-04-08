
'use strict';

class OrdersController {

    customerId: number;

    static $inject = [ '$routeParams' ];
    static id = 'demoApp.OrdersController';

    constructor( $routeParams ) {
        this.customerId = $routeParams.customerId;
    }
}

export default OrdersController;
