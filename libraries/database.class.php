<?php
/*
 * TODO: PHP DOCS
 */
class Database {
	private static $instance;
	private $connection;

	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new Database();
		}
		return self::$instance;
	}

	private function __construct() {
		#Singleton private constructor
	}

	public function connect() {
		@$this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
		if ($this->connection->connect_error) {
			@$this->connection = new mysqli(DB_HOST, 'root', '', DB_NAME);
			if (!$this->connection) {
				exit('Connection error: ' . $this->connection->connect_error);
			}
		}
	}

	public function select($statementSql, $typeList = '', $params = array(), $silent = false) {
		$statement = $this->connection->prepare($statementSql);
		if (empty($statement)) {
			if (!$silent) {
				exit(
					'Database::select - prepare with parameters (' .
					$statementSql . ') cannot be completed! Reason:' . $this->connection->error
				);
			}
			return null;
		}
		$references = array();
        foreach ($params as $key => $value) {
            $references[$key] = &$params[$key];
		}
		$fullParamList = array_merge(array($typeList), $references);
		@call_user_func_array(array($statement, 'bind_param'), $fullParamList);
		$statement->execute();
		if (empty($statement) || !empty($statement->error)) {
			if (!$silent) {
				exit(
					'Database::select - execute with parameters (' .
					$statementSql . ', ' . $typeList . ', ' . json_encode($params) .
					') cannot be completed'
				);
			}
			return null;
		}
		$result = $statement->get_result();
		$statement->close();
		if ($result->num_rows > 0) {
			return $result->fetch_assoc();
		}
		return null;
	}

	public function selectMany($statementSql, $typeList = '', $params = array(), $silent = false) {
		$results = array();
		$statement = $this->connection->prepare($statementSql);
		if (empty($statement)) {
			if (!$silent) {
				exit(
					'Database::selectMany - prepare with parameters (' .
					$statementSql . ') cannot be completed! Reason:' . $this->connection->error
				);
			}
			return null;
		}
		$references = array();
        foreach ($params as $key => $value) {
            $references[$key] = &$params[$key];
		}
		$fullParamList = array_merge(array($typeList), $references);
		@call_user_func_array(array($statement, 'bind_param'), $fullParamList);
		$statement->execute();
		if (empty($statement) || !empty($statement->error)) {
			if (!$silent) {
				exit(
					'Database::selectMany - execute with parameters (' .
					$statementSql . ', ' . $typeList . ', ' . json_encode($params) .
					') cannot be completed'
				);
			}
			return null;
		}
		$result = $statement->get_result();
		$statement->close();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$results[] = $row;
			}
			return $results;
		}
		return null;
	}

	public function executePreparedStatement($statementSql, $typeList, $params, $silent = false) {
		$statement = $this->connection->prepare($statementSql);
		if (empty($statement)) {
			if (!$silent) {
				exit(
					'Database::executePreparedStatement - prepare with parameters (' .
					$statementSql . ') cannot be completed! Reason:' . $this->connection->error
				);
			}
			return false;
		}
		$references = array();
        foreach ($params as $key => $value) {
            $references[$key] = &$params[$key];
		}
		$fullParamList = array_merge(array($typeList), $references);
		@call_user_func_array(array($statement, 'bind_param'), $fullParamList);
		$statement->execute();
		if (empty($statement) || !empty($statement->error)) {
			if (!$silent) {
				exit(
					'Database::executePreparedStatement - execute with parameters (' .
					$statementSql . ', ' . $typeList . ', ' . json_encode($params) .
					') cannot be completed'
				);
			}
			return false;
		}
		$statement->close();
		return true;
	}
}