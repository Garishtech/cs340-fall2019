function delete_address_to_post(aid, pcid){
	$.ajax({
		url: '/address-to-post/aid/' + aid + '/pcid/' + pcid,
		type : 'DELETE',
		success: function(result){
			if(result.responseText != undefined)
				alert(result.responseText);
			else
				window.location.reload(true);

		}
	})

};
