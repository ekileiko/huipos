app.service('OperationsService', function($cordovaSQLite){
    console.log('OperationsService...');

    var operations = [];

    db.rel.find('operation').then(function(data){
        for (var i = 0; i < data['operations'].length; i ++) {
            operations.push(data['operations'][i]);
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