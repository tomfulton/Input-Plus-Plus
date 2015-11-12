var app = angular.module("umbraco");

app.controller("EpiphanyIconPickerController", [
    '$scope', 'iconHelper', '$q', '$timeout', function($scope, iconHelper, $q, $timeout) {

        $scope.icons = [];

        iconHelper.getIcons().then(function(icons) {
            $scope.icons = icons;
        });

        var collectedIcons = undefined;

        // add our font awesome icons. Direct rip-off of the iconHelper code here!
        $scope.getFontAwesomeIcons = function() {
            var deferred = $q.defer();
            $timeout(function () {
                if (collectedIcons) {
                    // return that instead
                } else {
                    collectedIcons = [];
                    var c = ".fa-";
                    var util = ['fa-lg', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-4x', 'fa-5x', 'fa-fw', 'fa-ul', 'fa-li', 'fa-li.fa-lg', 'fa-border', 'fa-spin', 'fa-rotate-90', 'fa-rotate-180', 'fa-rotate-270', 'fa-flip-horizontal', 'fa-flip-vertical', 'fa-stack', 'fa-stack-1x', 'fa-stack-2x', 'fa-inverse'];

                    for (var i = document.styleSheets.length - 1; i >= 0; i--) {
                        var classes = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
                        if (classes !== null) {
                            for (var x = 0; x < classes.length; x++) {

                                var cur = classes[x];

                                if (cur.selectorText && cur.selectorText.indexOf(c) === 0) {
                                    var s = cur.selectorText.substring(1);
                                    var hasSpace = s.indexOf(" ");
                                    if (hasSpace > 0) {
                                        s = s.substring(0, hasSpace);
                                    }

                                    var hasPseudo = s.indexOf(":");
                                    if (hasPseudo > 0) {
                                        s = s.substring(0, hasPseudo);
                                    }

                                    var hasComma = s.indexOf(',');
                                    if (hasComma > 0) {
                                        s = s.substring(0, hasComma);
                                    }
                                }

                                if (typeof s === 'undefined') continue;

                                // skip our utility font awesome classes
                                if (_.contains(util, s)) continue;

                                if (collectedIcons.indexOf(s) < 0) {
                                    collectedIcons.push(s);
                                }
                            }
                        }
                    }
                    //$scope.collectedIcons = _.unique($scope.collectedIcons);
                }

                deferred.resolve(collectedIcons);
            }, 100);

            return deferred.promise;
        };

        // load the additional icons
        $scope.getFontAwesomeIcons().then(function (icons) {
            
            window.angular.forEach(icons, function (icon) {
                icon = 'fa ' + icon;
                if ($scope.icons.indexOf(icon) == -1) $scope.icons.push(icon);
            });
        });


        $scope.submitClass = function (icon) {
            if ($scope.color) {
                $scope.submit(icon + " " + $scope.color);
            } else {
                $scope.submit(icon);
            }
        };
    }
]);