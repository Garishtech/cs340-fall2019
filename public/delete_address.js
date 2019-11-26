function delete_address(id){
	console.log(15);
	$.ajax({
		url: '/address/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
