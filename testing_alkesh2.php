<?php

namespace Kreait;

use Kreait\Firebase\Database;

class Firebase{
    private $database;

    public function __construct(Database $database, Auth $auth, Storage $storage, RemoteConfig $remoteConfig, Messaging $messaging)
    {
        $this->database = $database;
    
    }

    public function getDatabase(): Database
    {
        return $this->database;
    }
}

// class Users {
//     protected $database;
//     protected $dbname = 'users_php';

//     public function __construct(){
//         $acc = ServiceAccount::fromJsonFile(__DIR__.'/reig-1538140691138-b1740dd7e2f5.json');
//         $firebase = (new Factory)->withServiceAccount($acc)->create();

//         $this->database = $firebase->getDatabase();        
//     }

//     public function get($username){
//         if(empty($username) || !isset($username)){
//             return FALSE;
//         }
//         if($this->database->getReference('users/')->getSnapshot()->hasChild($username)){
//             return $this->database->getReference('users/')->getChild($username)->getValue();
//         }
//         else
//         {
//             return FALSE;
//         }
//     }

//     public function insert($data){
//         if(empty($data) || !isset($data)){
//             return FALSE;
//         }
//         // foreach($data as $key => $value)
//         // {
//         //     $this->database->getReference()->getChild($this->dbname)->getChild($key).set($data);
//         // }
//         $this->database->getReference('users/testing_reig/details/email').set($data);

//         return TRUE;
//     }

//     public function delete($username){
//         if(empty($username) || !isset($username)){
//             return FALSE;
//         }
//         if($this->database->getReference('users/')->getSnapshot()->hasChild($username)){
//             $this->database->getReference('users/')->getChild($username)->remove();
//             return TRUE;
//         }
//         else
//         {
//             return FALSE;
//         }
//     }
// }

// $users =  new Users();
// $users->insert('php@gmail.com');
?>