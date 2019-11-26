function delete_customer(id){
	console.log(15);
	$.ajax({
		url: '/customer/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
