<?php
session_start();
set_time_limit(30);

define('DS', DIRECTORY_SEPARATOR);
include dirname(__FILE__) . DS . 'config.php';
include dirname(__FILE__) . DS . 'libraries' . DS . 'controller.class.php';
include dirname(__FILE__) . DS . 'libraries' . DS . 'database.class.php';
include dirname(__FILE__) . DS . 'libraries' . DS . 'general.class.php';

Language::load('en');

#Connect to the database
Database::getInstance()->connect();

#Get the controller
$controllerData = Controller::getController();
if (!file_exists(dirname(__FILE__) . DS . 'controllers' . DS . $controllerData['controller'] . '.controller.php')) {
	$controllerData['controller'] = DEFAULT_CONTROLLER;
	$controllerData['view'] = '404';
}
include dirname(__FILE__) . DS . 'controllers' . DS . $controllerData['controller'] . '.controller.php';
$classString = ucfirst($controllerData['controller']) . 'Controller';
$controller = new $classString (
	$controllerData['controller'],
	$controllerData['view'],
	$controllerData['parameters']
);

#Call the current page - init, template and view
if (method_exists($controller, 'init')) {
	$controller->init();
}
$controller->getView();
$controller->view();