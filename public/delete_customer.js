function delete_customer(id){
	$.ajax({
		url: '/customer/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
