angular.module("umbraco").controller("EpiphanyInputPlusPlusController", ['$scope', 'assetsService', function ($scope, assetsService) {

    // use our custom configuration controller
    $scope.config = $scope.model.config.settings;



    $scope.additionalClasses = $scope.model.config.additionalClasses && $scope.model.config.additionalClasses.length
        ? $scope.model.config.additionalClasses
        : 'input-xxlarge';

    $scope.getContainerClasses = function () {
        var classes = [];

        if ($scope.model.config.prepend && $scope.model.config.prepend.length) {
            classes.push('input-prepend');
        }

        if ($scope.model.config.append && $scope.model.config.append.length) {
            classes.push('input-append');
        }

        return classes;
    };

    assetsService.loadCss("/App_Plugins/InputPlusPlus/css/epiphany.input-plus-plus.css");
    assetsService.loadCss('//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css');

}]);