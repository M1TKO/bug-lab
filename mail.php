<?php
define('DS', DIRECTORY_SEPARATOR);
require_once '.' . DS . 'libraries' . DS . 'smtp.class.php';
require_once '.' . DS . 'libraries' . DS . 'phpmailer.class.php';

#Sending emails example
$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = 'smtp.fastmail.com';
$mail->Username = 'support@adhash.org';
$mail->setFrom('support@adhash.org', 'AdHash');
$mail->Password = '38nbwyz64x9jak6h';
$mail->CharSet = 'UTF-8';
$mail->Port = 465;
$mail->addAddress('wyand@abv.bg');
$mail->Subject = 'Create Your AdTrader Account';
$mail->msgHTML('<b>Test</b>');
$mail->Send();
exit('Done');

#Rearing emails example
$inbox = imap_open(
	'{imap.fastmail.com:993/imap/ssl}INBOX',
	'support@adhash.org',
	'38nbwyz64x9jak6h'
) or die('Cannot connect to mail: ' . imap_last_error());

$max_emails = 50;
$emails = imap_search($inbox,'ALL'); #ALL or NEW
print_r($emails);
imap_close($inbox);