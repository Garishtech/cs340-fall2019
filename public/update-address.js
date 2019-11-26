function updateAddress(id){
	$.ajax({
		url: '/address/' + id,
		type: 'PUT',
		data: $('#update-address').serialize(),
		success: function(result){
			window.location.replace("./");
		}
	})
};
