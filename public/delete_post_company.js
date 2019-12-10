function delete_post_company(id){
	$.ajax({
		url: '/post-company/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
