app.service('OperationsService', function($cordovaSQLite){
    console.log('OperationsService...');

    var operations = [];

    $cordovaSQLite
        .execute(db, "SELECT * FROM operations")
        .then(function(res) {
            for(var i = 0; i < res.rows.length; i++) {
                var operation = res.rows.item(i);
                operations.push(operation);
            }
        });

    return {
        getOperations: function(){
            return operations;
        },
        getOperation: function(operationId) {
            for(i = 0; i < operations.length; i++) {
                if(operations[i].id == operationId){
                    return operations[i];
                }
            }
        }
    };
});