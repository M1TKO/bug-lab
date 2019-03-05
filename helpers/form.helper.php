<?php
/**
 * TODO: PHP DOCS
 */
abstract class FormHelper {
	static function isUserBot() {
		if (isset($_POST['category']) && $_POST['category'] == 'home') {
			return false;
		}

		return true;
	}
}