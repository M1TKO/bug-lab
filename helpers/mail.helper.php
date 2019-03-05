<?php
/**
 * TODO: PHP DOCS
 */
abstract class MailHelper {
	static function sendToMail($emails, $data, $subject = 'New notification email') {
		$mail = General::prepareSMTP();

		foreach ($emails as $email) {
			$mail->addAddress($email);
		}

		foreach ($_FILES as $file) {
			if (is_array($file['name'])) {
				foreach ($file['name'] as $key => $value) {
					$mail->AddAttachment($file['tmp_name'][$key], $file['name'][$key]);
				}
			} else {
				$mail->AddAttachment($file['tmp_name'], $file['name']);
			}
		}

		$mail->Subject = $subject;
		$mail->msgHTML($data);
		$mail->Send();
	}

	static function formatData($data) {
		$date = date('d/m/Y');
		$time = date('H:i:s');
		$post = '<p><b>Form</b>: ' . $data['form'] . '</p>';

		foreach ($data as $key => $value) {
			if (in_array($key, array('form', 'category', 'confirmPassword'))) {
				continue;
			}

			$post .= '<b>' . Language::translate('form.' . $key) . '</b>:';
			if (is_array($value)) {
				$post .= '<br />';
				foreach ($value as $subKey => $subValue) {
					$post .= '<span style="margin-top: 2px; margin-left: 10px;">';
					$post .= '<b>' . Language::translate('form.' . $key . '.' . $subKey) . '</b> - ';
					$post .= htmlspecialchars($subValue) . '</span><br />';
				}
				$post .= '<br />';
			} else {
				if ($key == 'country') {
					$value = isset(CountriesHelper::$countries[$value]) ? CountriesHelper::$countries[$value] : $value;
				}
				if ($key == 'password') {
					$value = '******';
				}
				$post .= '<pre style="margin-top: 2px; margin-left: 10px;">' . htmlspecialchars($value) . '</pre><br />';
			}
		}

		$data = "<p>You have recieved a new message from the AdHash system.</p><hr />";
		$data .= "{$post}<hr /><p>This message was sent on {$date} at {$time}</p>";
		return $data;
	}
}