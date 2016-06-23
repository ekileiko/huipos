app.service('CategoriesService', function($cordovaSQLite){
    console.log('CategoriesService...');

    var categories = [];

    $cordovaSQLite
        .execute(db, "SELECT * FROM categories")
        .then(function(res) {
            for(var i = 0; i < res.rows.length; i++) {
                var category = res.rows.item(i);
                categories.push(category);
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