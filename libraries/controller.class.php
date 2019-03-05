<?php
/**
 * Class that represents the basic controller functionality in MVC
 */
class Controller {
	/**
	 * Constructor of the controller object
	 * @param string $controller name of the controller
	 * @param string $view name of the view in the controller
	 * @param array $parameters additional parameters passed to the page
	 */
	function __construct($controller = DEFAULT_CONTROLLER, $view = DEFAULT_VIEW, $parameters = array()) {
		$this->template = DEFAULT_TEMPLATE;
		$this->description = DESCRIPTION;
		$this->keywords = KEYWORDS;
		$this->author = AUTHOR;
		$this->title = TITLE;
		$this->controller = empty($controller) ? DEFAULT_CONTROLLER : $controller;
		$this->parameters = is_array($parameters) ? $parameters : array();
		$this->view = empty($view) ? DEFAULT_VIEW : $view;
	}

	/**
	 * Function that extracts the controller details from the URL
	 * Static function used to prepare the parameters before calling the constructor
	 * @return array controller data extracted
	 */
	static function getController() {
		$urlPart = empty($_GET['url']) ? '' : $_GET['url'];
		$urlParts = explode('/', $urlPart);
		$cntUrlParts = count($urlParts);
		$parameters = array();
		if ($cntUrlParts == 1 && pathinfo($urlParts[0], PATHINFO_EXTENSION) == 'html') {
			$controller = DEFAULT_CONTROLLER;
			$view = str_replace('.html', '', $urlParts[0]);
		} else if ($cntUrlParts == 1 && !empty($urlPart)) {
			$controller = str_replace('.html', '', $urlParts[0]);
			$view = DEFAULT_VIEW;
		} else if ($cntUrlParts == 2) {
			$controller = $urlParts[0];
			$view = str_replace('.html', '', $urlParts[1]);
		} else if ($cntUrlParts > 2) {
			foreach ($urlParts as $key => $value) {
				$urlParts[$key] = str_replace('.html', '', $value);
			}
			$controller = $urlParts[0];
			$view = $urlParts[1];
			$parameters = array_slice($urlParts, 2);
		} else {
			$controller = DEFAULT_CONTROLLER;
			$view = DEFAULT_VIEW;
		}
		$view = str_replace('-', '_', $view);
		return array (
			'controller' => strtolower($controller),
			'view' => strtolower($view),
			'parameters' => $parameters
		);
	}

	/**
	 * Function that outputs the template of the view part in the MVC
	 * If the required template is not found the flow is stopped
	 */
	function view() {
		#Get local variables
		foreach ($this as $key => $value) {
			$$key = $value;
		}
		#Get the template wrapper
		$template = VIEWS_PATH . DS . 'templates' . DS . $this->template . '.html';
		if (file_exists($template)) {
			include $template;
		} else {
			echo $template . ' was not found.';
			exit;
		}
	}

	/**
	 * Function that outputs the body of the view part in the MVC
	 * If the required template is not found the flow is stopped
	 */
	function body() {
		#Get local variables
		foreach ($this as $key => $value) {
			$$key = $value;
		}
		#Get the body
		$template = VIEWS_PATH . DS . $this->controller . DS . $this->view . '.html';
		if (file_exists($template)) {
			include $template;
		} else {
			echo $template . ' was not found.';
			exit;
		}
	}

	/**
	 * Function that executes the controller flow
	 */
	function getView() {
		$functionStr = $this->view;
		call_user_func_array(
			array($this, $functionStr),
			$this->parameters
		);
	}

	/**
	 * Function caching undefine method
	 */
	function __call($name, $pars)
	{
		$this->view = '404';
	}
}