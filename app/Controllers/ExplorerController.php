<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\Files\File;

class ExplorerController extends BaseController
{

    protected $json = [];
    protected $helpers = ['form'];

    public function index()
    {
        return view('explorer');
    }

    public function getTree(){
        // Retourne un JSON de l'arborescence
        $this->json= json_encode( static::explore('./pdf/root') );
        return $this->json;
    }

    public function addDirectory(){
        // Ajoute un nouveau dossier dans public/pdf/root
        $dirname = json_decode( $this->request->getBody())->dirname;
        $pattern ='#/[\w|\s]+\.[\w|\s]+/#';
        $dirname = preg_replace($pattern, '/',$dirname);
        shell_exec("mkdir ".str_replace(' ','_', $dirname));
        return "Add directory ".$dirname;
    }

    public function addFile(){
        // Ajoute une fichier dans le dossier public/pdf/root

        $file = $this->request->getFile('file');
        if (! $file->hasMoved()) {
            $path = $this->request->getVar('path');
            if( $path != "") $file->move($path);
            else $file->move('./pdf/root');
        }
        return  "Fichier ajouté";
    } 

    public function deleteElement(){
        $pathfile = json_decode( $this->request->getBody())->pathfile;
        if( is_dir($pathfile) )shell_exec("rm -Rf '$pathfile'");
        elseif ( !unlink($pathfile) ) { return ("$pathfile ne peut être supprimer");} 
        return "Fichier supprimé ".$pathfile;
    }


    
    public static function explore($path) {
        // Parcour et contruit l'arbre
        $dir = opendir($path) or die("Erreur : le répertoire n'existe pas");;
        $resultFiles= array();
        $resultsDirs= array();
        while($file = readdir($dir)) {
            $pathfile=$path."/".$file; 
            if(($file != ".") && ($file != "..")) {
                if(file_exists($pathfile) && is_dir($pathfile)) {
                    $resultsDirs[] = [ "type"=>"directory" , "pathfile"=>$pathfile, "path"=>$path, "filename"=>$file, "children"=>static::explore($pathfile),"opened"=>false ]; 
                }
                else {
                    $resultFiles[] =["type"=>"file", "pathfile"=>$pathfile, "path"=>$path, "filename"=>$file, "modificationDate"=>date ("d/m/Y H:i", filemtime($pathfile))];
                }
            }
        }
        closedir($dir);
        array_push($resultsDirs, $resultFiles);
        return $resultsDirs;
    }

}
