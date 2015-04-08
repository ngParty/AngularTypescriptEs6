///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

'use strict';

//import angular from 'angular';
import appModule from 'app.module';

angular.element(document).ready(function () {
    angular.bootstrap(document, [ appModule.name ], {
        //strictDi: true
    });
});