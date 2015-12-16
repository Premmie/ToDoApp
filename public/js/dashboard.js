window.onload = function() {
    loadData();
};

function loadData() {
    $.get('/a28', function(result) {
        $('#8').find('.content').append(result);
    }, 'json');
}
