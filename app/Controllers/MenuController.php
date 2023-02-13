<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class MenuController extends BaseController
{
    public function index()
    {
        //
    }
    public function regeneration(){
        // Regénère le dossier public/pdf/root
        shell_exec('rm -Rf ./pdf/root/ | cp -r ./pdf/regeneration/ ./pdf/root/');
        return "regeneration complete";
    }
}
