app.controller('CategoriesController', function($scope, CategoriesService) {
    console.log('CategoriesController...');

    $scope.categories = CategoriesService.getCategories();
});