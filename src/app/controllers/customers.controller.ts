import {ICustomerService} from 'services/customers.service';

'use strict';

class CustomersController {
    customers = null;

    static $inject = [ 'demoApp.customersService' ];
    static id = 'demoApp.CustomersController';

    constructor( customersFactory: ICustomerService ) {

        customersFactory.getCustomers()
            .success(( custs ) => {
                this.customers = custs;
            });

    }
}



export default CustomersController;

