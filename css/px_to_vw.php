<?php

	$mFile = '';
	$mf = fopen('m_common.css', 'r');
	while(!feof($mf)) {
		$mFile = $mFile . fgets($mf);
	}

	$res = '';

	$globalArr = explode(' ', trim(preg_replace('/\s\s+/', ' ', $mFile)));

	for ($i = 0; $i < count($globalArr); $i++) {
		if(substr($globalArr[$i], -2) == 'px'){
			$globalArr[$i] = (((float) substr($globalArr[$i], 0, -2))*14.95/120).'vmin'; /* 15.9925 */
		}

		if (substr($globalArr[$i], -3) == 'px;') {
			$globalArr[$i] = (((float) substr($globalArr[$i], 0, -3))*14.95/120).'vmin;'; /* 15.9925 */
		}
	}

	for ($i = 0; $i < count($globalArr); $i++) {
		$res .= $globalArr[$i] . ' ';
	}

	$fp = fopen("m_common.css", "w");
	fwrite($fp, $res);
	fclose($fp);

	echo "Done.";