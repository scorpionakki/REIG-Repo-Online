<?php
require_once './vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;


$serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/reig-1538140691138-b1740dd7e2f5.json');

$firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    // The following line is optional if the project id in your credentials file
    // is identical to the subdomain of your Firebase project. If you need it,
    // make sure to replace the URL with the URL of your project.
    ->withDatabaseUri('https://reig-1538140691138.firebaseio.com/')
    ->create();

$database = $firebase->getDatabase();
$database->getReference('users/testing_reig/details/email')->set('New name');
?>

