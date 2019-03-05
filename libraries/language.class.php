<?php
/**
 * TODO: JSDOCS
 */
abstract class Language
{
	private static $translations = array();
	private static $lg = 0;

	private static $languages = array(
		'EN' => 0
	);

	public static function translate($res) {
		if (empty(self::$translations[$res])) {
			return $res;
		}
		return self::$translations[$res];
	}

	public static function changeLanguage($newLg) {
		if (isset(self::$languages[$newLg])) {
			self::$lg = self::$languages[$newLg];
		}
	}

	public static function load($pack) {
		$handle = fopen(LANGUAGES_PATH . DS . $pack . '.json', 'r');
		$fileSize = filesize(LANGUAGES_PATH . DS . $pack . '.json');
		$popular = json_decode(fread($handle, $fileSize));
		self::$translations += (array)$popular;
		fclose($handle);
	}
}