<?php
/*
 * TODO: PHP DOCS
 */
abstract class JoinModel {
	/**
	 * Join forms list.
	 */
	static $joinForms = array(
		'advertiser',
		'publisher',
		'voter',
		'user'
	);

	/**
	 * Advertiser form validation
	 */
	static function validationAdvertiser() {
		$errors = array();
		$requiredFields = array(
			'companyWebsite',
			'contactName',
			'contactNumber',
			'emailAddress',
			'country',
			'message',
			'questionSSPOrCPPlatform'
		);

		foreach ($requiredFields as $field) {
			if (empty(trim($_POST[$field]))) {
				$errors[$field] = Language::translate('form.' . $field . '.is.required');
			}
		}

		if(empty($_POST['trafficType'])) {
			$errors['trafficType'] = Language::translate('form.trafficType.is.required');
		}

		return $errors;
	}

	/**
	 * Publisher form validation
	 */
	static function validationPublisher() {
		$errors = array();
		$requiredFields = array(
			'companyWebsite',
			'contactName',
			'contactNumber',
			'emailAddress',
			'country',
			'monthlyImpressions',
			'message'
		);

		foreach ($requiredFields as $field) {
			if (empty(trim($_POST[$field]))) {
				$errors[$field] = Language::translate('form.' . $field . '.is.required');
			}
		}

		if(empty($_POST['trafficType'])) {
			$errors['trafficType'] = Language::translate('form.trafficType.is.required');
		}

		return $errors;
	}

	/**
	 * Voter form validation
	 */
	static function validationVoter() {
		$errors = array();
		$requiredFields = array(
			'name',
			'emailAddress',
			'country'
		);

		foreach ($requiredFields as $field) {
			if (empty(trim($_POST[$field]))) {
				$errors[$field] = Language::translate('form.' . $field . '.is.required');
			}
		}

		if (empty(trim($_POST['walletId']))) {
			$errors['walletId'] = Language::translate('form.walletId.is.required');
		} else if (!preg_match("/0x[0-9A-Za-z]{40}/", $_POST['walletId'])) {
			$errors['walletId'] = Language::translate('form.walletId.do.not.match');
		}

		if (empty(trim($_POST['password']))) {
			$errors['password'] = Language::translate('form.password.is.required');
		} else if (mb_strlen(trim($_POST['password'])) < 8) {
			$errors['password'] = Language::translate('form.password.is.short');
		} else if ($_POST['password'] != $_POST['confirmPassword']) {
			$errors['confirmPassword'] = Language::translate('form.confirmPassword.do.not.match');
		}

		return $errors;
	}

	/**
	 * User form validation
	 */
	static function validationUser() {
		$errors = array();
		$requiredFields = array(
			'name',
			'emailAddress',
			'country'
		);

		foreach ($requiredFields as $field) {
			if (empty(trim($_POST[$field]))) {
				$errors[$field] = Language::translate('form.' . $field . '.is.required');
			}
		}

		if (empty(trim($_POST['walletId']))) {
			$errors['walletId'] = Language::translate('form.walletId.is.required');
		} else if (!preg_match("/0x[0-9A-Za-z]{40}/", $_POST['walletId'])) {
			$errors['walletId'] = Language::translate('form.walletId.do.not.match');
		}

		if (empty(trim($_POST['password']))) {
			$errors['password'] = Language::translate('form.password.is.required');
		} else if (mb_strlen(trim($_POST['password'])) < 8) {
			$errors['password'] = Language::translate('form.password.is.short');
		} else if ($_POST['password'] != $_POST['confirmPassword']) {
			$errors['confirmPassword'] = Language::translate('form.confirmPassword.do.not.match');
		}

		return $errors;
	}
}