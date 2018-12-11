function ajaxSaveNotes(userID, postID)
{

	// Force TONY MCE editor to return correct value
	tinyMCE.triggerSave();		
	
	var elementID = 'note_'+userID+'_'+postID;
	console.log("elementID = '"+elementID+"'");	
	
	
	noteContent = document.getElementById(elementID).value;
	
	console.log("noteContent = '"+noteContent+"'");
	console.log("nonce = '"+ek_notes_frontEndAjax.ajax_nonce+"'");	
	

	jQuery.ajax({
		type: 'POST',
		url: ek_notes_frontEndAjax.ajaxurl,
		data: {			
			"action": "add_ekNote",
			"noteContent": noteContent,
			"userID": userID,
			"postID": postID,
			"security": ek_notes_frontEndAjax.ajax_nonce
		},
		success: function(data){
			//console.log(data);
			var thisFeedbackDiv = "ek-notes-feedback-"+postID;
			
					
			jQuery("#"+thisFeedbackDiv).show("fast");	
			
			}
	});
	
	
	return false;		
	
}



function  ajaxToggleBookmark(userID, postID)
{
	var thisFeedbackDiv = "ek-notes-bookmark-"+postID;
	document.getElementById(thisFeedbackDiv).innerHTML = 'Saving...'
	jQuery.ajax({
		type: 'POST',
		url: ek_notes_frontEndAjax.ajaxurl,
		data: {			
			"action": "toggleBookmark",
			"userID": userID,
			"postID": postID,
			"security": ek_notes_frontEndAjax.ajax_nonce
		},
		success: function(data){
			//console.log(data);
					
			document.getElementById(thisFeedbackDiv).innerHTML = data;
			
			}
	});
	
	
	return false;	
}
