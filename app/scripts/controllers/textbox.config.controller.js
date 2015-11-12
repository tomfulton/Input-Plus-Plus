angular.module("umbraco").controller("EpiphanyInputPlusPlusConfigController", [
    '$scope', 'assetsService', 'dialogService', function($scope, assetsService, dialogService) {

        $scope.sizes = [
            {
                label: 'Mini',
                cls: 'input-mini',
            },
            {
                label: 'Small',
                cls: 'input-small'
            },
            {
                label: 'Medium',
                cls: 'input-medium'
            },
            {
                label: 'Large',
                cls: 'input-large'
            },
            {
                label: 'X-Large',
                cls: 'input-xlarge'
            },
            {
                label: 'XX-Large',
                cls: 'input-xxlarge'
            },

        ];
        

        if (typeof $scope.model.value !== 'object') {
            $scope.model.value = {};
        }

        $scope.$watch('model.value.fontAwesome', function() {
            if ($scope.model.value.fontAwesome)
                assetsService.loadCss('//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css');
        });

        $scope.getPrepend = function() {
            if ($scope.model.prepend) return $scope.model.prepend;
            return "&nbsp;";
        }

        $scope.getAppend = function() {
            if ($scope.model.append) return $scope.model.append;
            return "&nbsp;";
        }

        $scope.getAdditionalClasses = function() {
            var classes = [];
            if ($scope.model.size) {
                classes.push($scope.model.size.cls);
                console.log($scope.model.size.cls);
            }

            return classes.join(' ');
        }

        $scope.pickIcon = function(textboxPart) {
            dialogService.open({
                template: '/App_Plugins/Epiphany.InputPlusPlus/views/iconpicker.dialog.html',
                callback: function (data) {

                    // if data is a string, its an icon class. If it's an object, it's custom
                    if (typeof (data) === 'object') {
                        $scope.model.prepend = data.text;
                    } else {
                        if (textboxPart == 'prepend') {
                            $scope.model.prepend = '<i class="' + data + '"></i>';
                        } else if (textboxPart == 'append') {
                            $scope.model.append = '<i class="' + data + '"></i>';
                        }
                    }
                }
            });
        };

        assetsService.loadCss('/App_Plugins/Epiphany.InputPlusPlus/css/epiphany.input-plus-plus.css');
    }
]);