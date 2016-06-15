function addRecord() {
    var sum = $("#sum").val();
    var category = $("#category").val();
    var description = $("#description").val();

    $.mobile.changePage($("#list-page"));
    $("#todo-list").append("<li><h3>" + sum + "</h3><p>" + category + "</p>" + "<p>" + description + "</p>" + "</li>");
    $("#todo-list").listview('refresh');
};