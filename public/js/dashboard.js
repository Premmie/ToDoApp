window.onload = function() {
    a8();
    a9();
    a11();
    $('#1-form').submit(function(event) { 
    	event.preventDefault(); 
    	a1();
   	});
   	$('#2-form').submit(function(event) { 
    	event.preventDefault(); 
    	a2();
   	});
   	$('#3-form').submit(function(event) { 
    	event.preventDefault(); 
    	a3();
   	});
   	$('#4-form').submit(function(event) { 
    	event.preventDefault(); 
    	a4();
   	});
	$('#5-form').submit(function(event) { 
    	event.preventDefault(); 
    	a5();
   	});
   	$('#6-form').submit(function(event) { 
    	event.preventDefault(); 
    	a6();
   	});
    $('#7-form').submit(function(event) { 
    	event.preventDefault(); 
    	a7();
   	});	
	$('#8-form').submit(function(event) { 
    	event.preventDefault(); 
    	a8();
   	});
	$('#9-form').submit(function(event) { 
    	event.preventDefault(); 
    	a9();
   	});
   	$('#10-form').submit(function(event) { 
    	event.preventDefault(); 
    	a10();
   	});
	$('#11-form').submit(function(event) { 
    	event.preventDefault(); 
    	a11();
   	});
	$('#12-form').submit(function(event) { 
    	event.preventDefault(); 
    	a12();
   	});	
	$('#13-form').submit(function(event) { 
    	event.preventDefault(); 
    	a13();
   	});	
};

function a1() {
	var $id = $('#1-input').val();
	if ($id) {
		$('#1').find('.content').empty();
	 	$.get('/a21?user=' + $id, function(result) {
			if (result.length > 0) {
			$.each(result, function(index, object) {
				$('#1').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
			});
			} else {
				$('#1').find('.content').append('<p>No lists found for this user.</p>');
			}
    	}, 'json');	
	}
}

function a2() {
	var $id = $('#2-input').val();
	if ($id) {
		$('#2').find('.content').empty();
	 	$.get('/a22?id=' + $id, function(result) {
			if (result.length > 0) {
			$.each(result, function(index, object) {
				$('#2').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
			});
			} else {
				$('#2').find('.content').append('<p>No items found for this list.</p>');
			}
    	}, 'json');	
	}
}

function a2() {
	var $id = $('#2-input').val();
	if ($id) {
		$('#2').find('.content').empty();
	 	$.get('/a22?id=' + $id, function(result) {
			if (result.length > 0) {
			$.each(result, function(index, object) {
				$('#2').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
			});
			} else {
				$('#2').find('.content').append('<p>No items found for this list.</p>');
			}
    	}, 'json');	
	}
}

function a3() {
	var $id = $('#3-input').val();
	var $start = $('#3-start').val() ? $('#3-start').val() : 0;
	var $end = $('#3-end').val() ? $('#3-end').val() : 10;
	if ($id) {
		$('#3').find('.content').empty();
	 	$.get('/a23?id=' + $id + '&start=' + $start + '&end=' + $end, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#3').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#3').find('.content').append('<p>No items found for this list.</p>');
			}
    	}, 'json');	
	}
}

function a4() {
	var $id = $('#4-input').val();
	var $start = $('#4-start').val() ? $('#4-start').val() : 0;
	var $end = $('#4-end').val() ? $('#4-end').val() : 10;
	var $dateStart = $('#4-datestart').val();
	var $dateEnd = $('#4-dateend').val();
	var $priority = $('#4-priority').val() ? $('#4-priority').val() : 1;
	var $completed = $('#4-completed').prop('checked') ? 1 : 0;
	
	console.log($('#4-start').val());
	
	if ($id) {
		$('#4').find('.content').empty();
	 	$.get('/a24?id=' + $id + '&start=' + $start + '&end=' + $end + '&dateStart=' + $dateStart + '&dateEnd=' + $dateEnd + '&priority=' + $priority + '&completed=' + $completed, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#4').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#4').find('.content').append('<p>No items found.</p>');
			}
    	}, 'json');	
	}
}

function a5() {
	var $id = $('#5-input').val();
	if ($id) {
		$('#5').find('.content').empty();
	 	$.get('/a25?id=' + $id, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#5').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#5').find('.content').append('<p>No subitems found for this item.</p>');
			}
    	}, 'json');	
	}
}

function a6() {
	var $id = $('#6-input').val();
	if ($id) {
		$('#6').find('.content').empty();
	 	$.get('/a26?id=' + $id, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#6').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#6').find('.content').append('<p>No tags found for this item.</p>');
			}
    	}, 'json');	
	}
}

function a7() {
	var $id = $('#7-input').val();
	if ($id) {
		$('#7').find('.content').empty();
	 	$.get('/a27?id=' + $id, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#7').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#7').find('.content').append('<p>No lists found containing an item with this tag.</p>');
			}
    	}, 'json');	
	}
}

function a8() {
    $.get('/a28', function(result) {
   		$('#8').find('.content').empty();
    	$.each(result, function(index, object) {
    		$('#8').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
    	});
        
    }, 'json');
}

function a9() {
    $.get('/a29', function(result) {
    	var $content = $('#9').find('.content');
    	$content.empty();
    	$.each(result, function(index, object) {	 
    		$('#9').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
    	});
        
    }, 'json');
}

function a10() {
	var $id = $('#10-input').val();
	if ($id) {
		$('#10').find('.content').empty();
	 	$.get('/a210?id=' + $id, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#10').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#10').find('.content').append('<p>No items found.</p>');
			}
    	}, 'json');	
	}
}


function a11() {
    $.get('/a211', function(result) {
        var $content = $('#11').find('.content');
    	$content.empty();
    	$.each(result, function(index, object) {
    		$('#11').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
    	});
        
    }, 'json');
}

function a12() {
	var $id = $('#12-input').val();
	if ($id) {
		$('#12').find('.content').empty();
	 	$.get('/a212?id=' + $id, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#12').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#12').find('.content').append('<p>No list with this id was found.</p>');
			}
    	}, 'json');	
	}
}

function a13() {
	var $id = $('#13-input').val();
	if ($id) {
		$('#13').find('.content').empty();
	 	$.get('/a213?id=' + $id, function(result) {
			if (result.length > 0) {
				$.each(result, function(index, object) {
					$('#13').find('.content').append('<p>' + JSON.stringify(object) + '</p>');
				});
			} else {
				$('#13').find('.content').append('<p>No items found.</p>');
			}
    	}, 'json');	
	}
}
