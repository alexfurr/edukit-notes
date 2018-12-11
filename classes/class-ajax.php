<?php


$INITIALIZE_EK_NOTES_AJAX = new ek_notes_AJAX();


class ek_notes_AJAX
{
	
	//~~~~~
	function __construct ()
	{
		$this->addWPActions();
	}	
	
	
	function addWPActions()
	{	
		// Add textual feedback for clicks
		add_action( 'wp_ajax_add_ekNote', array($this, 'add_ekNote' ));
		add_action( 'wp_ajax_toggleBookmark', array($this, 'toggleBookmark' ));
	}

	public function add_ekNote()
	{
		
		// Check the AJAX nonce				
		check_ajax_referer( 'ek_notes_ajax_nonce', 'security' );
		
		
		$noteContent = wp_kses_post($_POST['noteContent']);
		$userID = $_POST['userID']; 
		$postID = $_POST['postID']; 	
		
		$note = array
		(
			"noteContent"	=> $noteContent,
			"userID"		=> ekNotesUtils::validateInputNumber($userID),
			"postID"		=> ekNotesUtils::validateInputNumber($postID)
		);
		
		
		
		ekNotesDB::save($note);
	
		die();
	}
	
	public function toggleBookmark()
	{
		
		// Check the AJAX nonce				
		check_ajax_referer( 'ek_notes_ajax_nonce', 'security' );
		$userID = $_POST['userID']; 
		$postID = $_POST['postID']; 


		$isBookmarked= ekNotesDB::toggleBookmark($userID, $postID);
		
		echo ekNotesDraw::drawBookmark($isBookmarked);		
		die();
		
		
		
		
	}
	

} // End Class




?>