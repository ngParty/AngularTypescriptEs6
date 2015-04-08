import appModule from 'app.module';

type Http = ng.IHttpService;
type HttpPromise = ng.IHttpPromise<any>;

export interface ICustomerService {
    getCustomers():HttpPromise;
}

class CustomersService implements ICustomerService {

    static $inject = [ '$http' ];
    static id = 'demoApp.customersService';

    constructor( private $http: Http ) {
    }

    getCustomers() {
        return this.$http.get('customers.json');
    }
}

export default CustomersService;

