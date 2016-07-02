app.service('CategoriesService', function($cordovaSQLite){
    console.log('CategoriesService...');

    var categories = [];

    db.rel.find('category').then(function(data){
        for (var i = 0; i < data['categories'].length; i ++) {
            categories.push(data['categories'][i]);
        }
    });

    return {
        getCategories: function(){
            return categories;
        },
        getCategory: function(categoryId) {
            for(i = 0; i < categories.length; i++) {
                if(categories[i].id == categoryId){
                    return categories[i];
                }
            }
        }
    };
});