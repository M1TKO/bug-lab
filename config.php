<?php

defined('DS') OR define('DS', DIRECTORY_SEPARATOR);

define('SITE_URL', 'http://bug-lab.net');

define('DEFAULT_CONTROLLER', 'site');
define('DEFAULT_TEMPLATE', 'site');
define('DEFAULT_VIEW', 'index');

define('DESCRIPTION', 'Run Visual tests automatically with every release');
define('KEYWORDS', 'visual, automation, testing, qa, quality, devops, tool, app, assurance, tests, selenium, appium, pixel, perfect, ios, iphone, android, windows, compare, versions, browsers, OSs, operating systems, locations, resolutions, devices, cross-device, cross-browser, test, pricing');
define('AUTHOR', 'BugLab Inc.');
define('TITLE', 'BugLab');
define('VERSION', '0.10');

define('DB_NAME', 'adhash');
define('DB_HOST', 'localhost');
define('DB_USERNAME', '');
define('DB_PASSWORD', '');

define('SMTP_MAIL', '');
define('SMTP_PASS', '');
define('SMTP_MAIL_TITLE', 'BugLab Support - Do not reply');

define('CURRENCY_ACCURACITY', 2);

define('ROOT_FOLDER', dirname(__FILE__));
define('LOGS_PATH', dirname(__FILE__) . DS . 'logs');
define('LANGUAGES_PATH', dirname(__FILE__) . DS . 'languages');
define('IMAGES_PATH', dirname(__FILE__) . DS . 'static' . DS . 'images');
define('VIEWS_PATH', dirname(__FILE__) . DS . 'views');
define('COMMON_FOLDER', dirname(__FILE__) . DS . 'views' . DS . 'common');

error_reporting(-1);

#Define autoloader for models
function autoload($className) {
	#Libraries support
	if ($className == 'Controller' || $className == 'Database' || $className == 'General' || $className == 'Language') {
		include dirname(__FILE__) . DS . 'libraries' . DS . strtolower($className) . '.class.php';
		return;
	}
	#Helpers support
	if (strpos($className, 'Helper') !== false) {
		$className = str_replace('helper', '', strtolower($className));
		if (file_exists(dirname(__FILE__) . DS . 'helpers' . DS . $className . '.helper.php')) {
			include dirname(__FILE__) . DS . 'helpers' . DS . $className . '.helper.php';
		}
		return;
	}
	#Models support
	$className = str_replace('model', '', strtolower($className));
	if (file_exists(dirname(__FILE__) . DS . 'models' . DS . $className . '.class.php')) {
		include dirname(__FILE__) . DS . 'models' . DS . $className . '.class.php';
	}
}
spl_autoload_register('autoload');