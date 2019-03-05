<?php
/*
 * TODO: PHP DOCS
 */
class SiteController extends Controller {
	function init() {
		//Basic HTTP auth
		/*
		$validPasswords = array("adh" => "office");
		$validUsers = array_keys($validPasswords);
		$user = $_SERVER['PHP_AUTH_USER'];
		$pass = $_SERVER['PHP_AUTH_PW'];
		$validated = (in_array($user, $validUsers)) && ($pass == $validPasswords[$user]);
		if (!$validated) {
			header('WWW-Authenticate: Basic realm="My Realm"');
			header('HTTP/1.0 401 Unauthorized');
			exit("Not authorized");
		}
		*/

		$this->cookieBoxKey = 'cookieBox';
		$this->cookieBoxValue = 1;
		$this->cookieBoxExdays = 90;
		$this->showCookieBox = false;
		if(empty($_COOKIE[$this->cookieBoxKey]))
		{
			$this->showCookieBox = true;
		}
	}

	/**
	 * Index - Home
	 */
	function index() {
		$this->title = 'BugLab';
	}

	/**
	 * Index - Solutions Users
	 
	function solutions_for_users() {
		$this->title = 'AdHash - Users';
	}*/

	/**
	 * Index - Solutions Publishers
	 
	function solutions_for_publishers() {
		$this->title = 'AdHash - Publishers';
	}*/

	/**
	 * Index - Solutions Advertisers
	 
	function solutions_for_advertisers() {
		$this->title = 'AdHash - Advertisers';
	}*/

	/**
	 * Index - Solutions Ad tech providers.
	 
	function solutions_for_ad_tech_providers() {
		$this->title = 'AdHash - Ad tech providers';
	}*/

	/**
	 * Header & Footer menu - Voting.
	 
	function voting() {
		$this->title = 'AdHash - Voting';
	}*/

	/**
	 * Header & Footer menu - Help.
	 */
	function help() {
		$this->title = 'AdHash - Help';
		$this->tab = !empty($_GET['tab']) ? $_GET['tab'] : 'general';
		$this->panel = !empty($_GET['panel']) ? $_GET['panel'] : 'general-adhash-commission';
	}

	/**
	 * Header & Footer menu - Careers.
	 */
	function careers($form = '') {
		$this->title = 'BugLab - Pricing';
		if (!empty($form)) {
			$this->form = $form;
			$forms = CareersModel::$forms;
			if (in_array($form, $forms)) {
				if (!empty($_POST)) {
					if (!FormHelper::isUserBot()) {
						$this->errorValidation = CareersModel::validation();
						if (!$this->errorValidation) {
							$_POST['form'] = $form;
							$emails = SiteHelper::$emails['careers'];
							$formatData = MailHelper::formatData($_POST);
							MailHelper::sendToMail($emails, $formatData);
							General::redirect(SITE_URL . '/thanks.html?f=careers');
						}
					} else {
						General::redirect(SITE_URL . '/thanks.html?f=careers');
					}
				}

				$this->view = 'careers_form';
			} else {
				General::redirect(SITE_URL . '/careers.html');
			}
		}
	}

	/**
	 * Header scroll to footer - Contact us.
	 */
	function contact_us() {
		if (!empty($_POST)) {
			$form = 'contact-us';
			if (!FormHelper::isUserBot()) {
				$_POST['form'] = $form;
				$emails = SiteHelper::$emails['contact-us'];
				$formatData = MailHelper::formatData($_POST);
				MailHelper::sendToMail($emails, $formatData);
			}

			General::redirect(SITE_URL . '/thanks.html?f=' . $form);
		}

		General::redirect(SITE_URL);
	}

	/**
	 * Header menu - Join forms.
	 */
	function join_form($form = 'advertiser') {
		$this->title = 'AdHash - Join';
		$this->form = $form;
		$this->joinForms = JoinModel::$joinForms;
		if (in_array($form, $this->joinForms)) {
			if (!empty($_POST)) {
				if (!FormHelper::isUserBot()) {
					$this->errorValidation = JoinModel::{'validation' . ucfirst($form)}();
					if (!$this->errorValidation) {
						$_POST['form'] = $form;
						$emails = SiteHelper::$emails['join-' . $form];
						$formatData = MailHelper::formatData($_POST);
						MailHelper::sendToMail($emails, $formatData);
						General::redirect(SITE_URL . '/thanks.html?f=' . $form);
					}
				} else {
					General::redirect(SITE_URL . '/thanks.html?f=' . $form);
				}
			}
		} else {
			$this->view = '404';
		}
	}

	/**
	 * Header menu - Join forms.
	 */
	function pricing() {
		$this->title = 'AdHash - Pricing';
	}

	/**
	 * Footer menu - Privacy policy.
	 */
	function privacy_policy() {
		$this->title = 'AdHash - Privacy policy';
		$this->showCookieBox = false;
		setcookie($this->cookieBoxKey, $this->cookieBoxValue, time() + ($this->cookieBoxExdays * 24 * 60 * 60), "/");
	}

	/**
	 * Thank you page after form submit.
	 */
	function thanks() {
		$this->title = 'AdHash - Thanks';
		$this->thanksFromForm = !empty($_GET['f']) ? $_GET['f'] : '';
	}

	/**
	 * External login form.
	 */
	function login() {
		$this->template = 'form';
		$this->title = 'AdHash - Log in';
	}
}