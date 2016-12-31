<?php


header("Access-Control-Allow-Origin: *");
$identifier=$_GET['identifier'];
$sdkappid=1400022464;
$private_key_path='./private_key';
# 这里需要写绝对路径，开发者根据自己的路径进行调整
    $command = 'F:\Github\mobile\tls\signature.exe'
    . ' ' . escapeshellarg($private_key_path)
    . ' ' . escapeshellarg($sdkappid)
    . ' ' . escapeshellarg($identifier);

    $ret = exec($command, $out, $status);
    if ($status == -1)
    {
        $Usrsig= null;
    }else{
$Usrsig=$out;
    }
    

echo $Usrsig[0];
