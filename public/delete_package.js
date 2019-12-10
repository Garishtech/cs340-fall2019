function delete_package(id){
	$.ajax({
		url: '/package/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
