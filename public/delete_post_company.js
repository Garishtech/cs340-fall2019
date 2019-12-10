function delete_post_company(id){
	console.log(15);
	$.ajax({
		url: '/post-company/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
