import appModule from 'app.module';

type NgComponent = ng.IDirective;
type Scope = ng.IScope;

export class FilterTextbox implements NgComponent {

    static instance(): ng.IDirective {
        return new FilterTextbox();
    }

    static id = 'filterTextbox';

    template = 'Search: <input type="search" ng-model="vm.filter"> {{ vm.message }}';
    restrict = 'E';
    scope = {
        filter: '='
    };
    controller = FilterTextboxController.id;
    controllerAs = FilterTextboxController.nameAs;
    bindToController = true;

    constructor() {
    }
}

export class FilterTextboxController {

    static nameAs = 'vm';
    static id = 'FilterTextboxController';

    message: string;

    constructor( private $scope: Scope ) {

        var vm = this;
        vm.message = 'Hello';

        $scope.$watch('vm.filter', ( newVal, oldVal ) => {
            if ( oldVal !== '' && newVal === '' ) {
                vm.message = 'Please enter a value';
            } else {
                vm.message = '';
            }
        });

    }
}

