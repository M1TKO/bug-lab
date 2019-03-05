<?php
/*
 * TODO: PHP DOCS
 */
abstract class CareersModel {
	/**
	 * Careers forms list.
	 */
	static $forms = array(
		'senior-php-developer',
		'senior-designer',
		'quality-assurance-engineer',
		'devops-engineer',
		'senior-system-administrator',
		'data-analyst'
	);

	/**
	 * Careers form validation
	 */
	static function validation() {
		$errors = array();
		$requiredFields = array(
			'name',
			'contactNumber',
			'emailAddress',
			'message'
		);

		foreach ($requiredFields as $field) {
			if (empty(trim($_POST[$field]))) {
				$errors[$field] = Language::translate('form.' . $field . '.is.required');
			}
		}

		return $errors;
	}
}