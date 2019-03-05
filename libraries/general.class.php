<?php
/**
 * Abstract class for generic functions
 */
abstract class General {

	/**
	 * Function that appends a GET parameter to a given URL
	 * @param string $url URL that we want to append to
	 * @param string $key key of the GET parameter we want to append
	 * @param string $value value of the GET parameter we want to append
	 * @return string URL with the GET parameter appended
	 */
	static function appendGetParameter($url, $key, $value) {
		$params = array();
		$urlParts = parse_url($url);
		if (!empty($urlParts['query'])) {
			parse_str($urlParts['query'], $params);
		}

		$params[$key] = $value;
		$urlParts['query'] = http_build_query($params);

		if (empty($urlParts['scheme']) || empty($urlParts['host'])) {
			return null;
		}
		return $urlParts['scheme'] . '://' . $urlParts['host'] . $urlParts['path'] . '?' . $urlParts['query'];
	}

	/**
	 * Function that performs a header redirect to a given URL
	 * All other commands after that call will be ignored
	 * @param string $url URL that we want to redirect to
	 */
	static function redirect($url) {
		exit(header('Location: ' . $url));
	}

	/**
	 * Function that converts array to CSV file stream
	 * @param array $array array that we want to output to CSV
	 * @param string $csv filename
	 */
	static function arrayToCSV($array, $csv = 'file') {
		$quoted = sprintf('"%s"', addcslashes($csv . '.csv', '"\\'));
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename=' . $quoted);
		header('Content-Transfer-Encoding: binary');
		header('Connection: Keep-Alive');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		$outstream = fopen('php://output', 'w');
		echo "sep=,\n";
		array_walk($array, 'General::outputCSVHelper', $outstream);
		fclose($outstream);
	}

	/**
	 * Function that helps array to CSV output
	 * @param array $vals an array of values
	 * @param string $key useless parameter
	 * @param resource $filehandler file handle
	 */
	static function outputCSVHelper(&$vals, $key, $filehandler) {
		fputcsv($filehandler, $vals, ',', '"');
	}

	/**
	 * Function that generates pagination
	 * @param integer $items total amount of items
	 * @param integer $itemsPerPage items per page
	 * @param integer $currentPage current page
	 * @return string HTML of the pagination
	 */
	static function paging($items, $itemsPerPage, $currentPage) {
		$maximumPages = ceil($items / $itemsPerPage);
		if ($maximumPages <= 1) {
			return '';
		}
		$emptyPrev = false;
		$emptyNext = false;
		$pagingItems = array();
		for ($i = 0; $i < $maximumPages; $i++) {
			if ($i == 0 || $i == $maximumPages - 1) {
				$pagingItems[$i + 1] = ($i == $currentPage) ? 'active' : 'other';
			} else if ($i == $currentPage) {
				$pagingItems[$i + 1] = 'active';
			} else if (
				($i < 5 && $i > $currentPage - 2) ||
				($i > $maximumPages - 6 && $i < $currentPage + 2) ||
				($i < $currentPage && $i > $currentPage - 3) ||
				($i > $currentPage && $i < $currentPage + 3)
			) {
				$pagingItems[$i + 1] = 'other';
			} else if($i < $currentPage && !$emptyPrev) {
				$emptyPrev = true;
				$pagingItems['prev'] = 'empty';
			} else if($i > $currentPage && !$emptyNext) {
				$emptyNext = true;
				$pagingItems['next'] = 'empty';
			}
		}

		$html = '<ul class="pagination">';
		$currentURL = (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		foreach ($pagingItems as $page => $class) {
			$html .= '<li class="page-item ' . $class . '">';
			if ($class != 'empty') {
				$link = General::appendGetParameter($currentURL, 'pg', $page);
				$html .= '<a class="page-link" href="' . $link . '">' . $page . '</a>';
			} else {
				$html .= '...';
			}
			$html .= '</li>';
		}
		$html .= '</ul>';
		return $html;
	}

	/**
	 * Function that formats a number as a price
	 * @param double $price number that needs to be formatted
	 * @return string formatted number
	 */
	static function price($price) {
		return number_format(round($price, CURRENCY_ACCURACITY), CURRENCY_ACCURACITY, '.', ',');
	}

	/**
	 * Function that formats a number as a percentage
	 * @param double $percentage number that needs to be formatted
	 * @return string formatted number
	 */
	static function percentage($percentage) {
		return number_format(round($percentage, 2), 2, '.', ',');
	}

	/**
	 * Function that helps output POST parameters in the HTML
	 * Given a key if it's present in the POST array it's value will be printed
	 * If it's not present no errors will be thrown and empty string will be shown
	 * @param string $name name of the key we need to check
	 * @return string value in POST array or empty string
	 */
	static function preserved($name) {
		return isset($_POST[$name]) ? $_POST[$name] : '';
	}

	/**
	 * Function that constructs the current paging ans sort parameters
	 * @param object $instance the current controller instance
	 * @param bool $short flag if we need sorting only
	 * @return string the GET parameters
	 */
	static function getPagingAndSortParameters($instance, $short = false) {
		if ($short) {
			return '?sort=' . $instance->sort . '&asc=' . $instance->order;
		}
		return '?pg=' . ($instance->currentPage + 1) . '&sort=' . $instance->sort . '&asc=' . $instance->order;
	}

	/**
	 * Function, similar to encodeURIComponent in JavaScript
	 * @param string $string parameter to encode
	 * @return string URL encoded parameter
	 */
	static function encodeURIComponent($string) {
		$revert = array('%21' => '!', '%2A' => '*', '%27' => "'", '%28' => '(', '%29' => ')');
		return strtr(rawurlencode($string), $revert);
	}

	/**
	 * Function that copies a folder recursively
	 * @param string $from the folder that needs to be copied
	 * @param string $destination the destination where it needs to be copied
	 * @param array $skip array with files that should be skipped
	 */
	static function copyRecursive($from, $destination, $skip) {
		$dir = opendir($from);
		@mkdir($destination);
		while (false !== ($file = readdir($dir))) {
			if ($file != '.' && $file != '..') {
				if (is_dir($from . DS . $file)) {
					General::copyRecursive(
						$from . DS . $file,
						$destination . DS . $file,
						$skip
					);
				} else if (!in_array($destination . DS . $file, $skip)) {
					copy($from . DS . $file, $destination . DS . $file);
				}
			}
		}
		closedir($dir);
	}

	/**
	 * Function that appends a line to a log file
	 * @param string $logFile the name of the log file
	 * @param string $message the message to append
	 */
	static function log($logFile, $message) {
		if (LOGGING_ENABLED) {
			$text = date('d.m.Y H:i:s') . ' | ' . $_SERVER['REMOTE_ADDR'] . ': ' . $message;
			$fh = fopen(LOGS_PATH . DS . $logFile, 'a');
			if ($fh) {
				fwrite($fh, $text . "\r\n");
				fclose($fh);
			}
		}
	}

	/**
	 * TODO: phpdocs.
	 */
	static function prepareSMTP() {
		require_once dirname(__FILE__).DS.'smtp.class.php';
		require_once dirname(__FILE__).DS.'phpmailer.class.php';
		$mail = new PHPMailer();
		$mail->IsSMTP();
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = 'ssl';
		$mail->Host = 'smtp.fastmail.com';
		$mail->Username = SMTP_MAIL;
		$mail->setFrom(SMTP_MAIL, SMTP_MAIL_TITLE);
		$mail->Password = SMTP_PASS;
		$mail->CharSet = 'UTF-8';
		$mail->Port = 465;
		return $mail;
	}
}