<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explorer</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />

</head>
<body style="height:920px ;background-color: #b07d7d8a;
    background-image: url(../images/bg_header.jpg);
    background-blend-mode: lighten;">




<!-- entête -->
<div  id="header" class=" container-fluid ">
    <div class="container px-0">
        <nav class="navbar navbar-light mx-0 px-0 ">
            <a class="navbar-brand" >
                <img id="logo" src="images/logo.png" class="d-inline-block align-top" >
                <span id="entreprise-animation">
                  <span id="effect"><span id="entreprise"class="content entreprise">CEPI</span></span>
                  <span id="entreprise"class="content entreprise upper"><span>CEPI</span></span>
                </span>
            </a>
            <span>
                <button id="logout" class="highlight" type="button" href="/" >Login / Logout</button>
            </span>
        </nav>  
    </div>
</div>  




<!-- navbar-->  
<div id="navigation" class="container-fluid  mb-3">
    <div class="container ">
        <nav class="navbar navbar-expand-lg  p-0">
            <div class="container-fluid p-0" style="margin-left:-12px">
                <!-- Home -->
              <a class="navbar-brand"><i class="fa-solid fa-house text-white"></i></a><span class="separator font-weight-light">|</span>
              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li class="nav-item"> <a class="nav-link active text-white" >Pharma Vitale</a></li><span class="separator font-weight-light">|</span>
                    <li class="nav-item"> <a class="nav-link active text-white" >Gestionnaire de Fichier</a></li>
                  </ul>
              </div>
            </div>
          </nav>  

          <span id="social"> 
            <a class="social-icon" href="mailto:f.vallee@cepisoft.net" > <i class="fa fa-envelope"></i> </a>
            <a class="social-icon" href="https://github.com/tobesnard/explorer-cepi"><i class="fa fa-github" aria-hidden="true"></i> </a>
            <a class="social-icon" href="https://www.facebook.com/Pharmavitale/" ><i class="fa fa-facebook" aria-hidden="true"></i> </a>
            <a class="social-icon" href="https://www.linkedin.com/company/pharmavitale"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> </a>
            <a class="social-icon" href="https://www.pharmavitale.fr/"><i class="fa fa-globe" aria-hidden="true"></i></a>
          </span>
    </div>
</div>    





<!-- Container Principale -->
<div class="container">
    <div class="row" style="min-height: 500px;">

        <!-- Explorateur -->
        <div id="card-explorer" class="card-container col-4 px-0">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Explorateur</h5>
                </div>
                <div class="card-body card-body-explorer" > 
                    <div id="treeview"></div>
                </div>
            </div>
        </div>


        <!-- Visionneuse -->
        <div id="card-viewer" class="col card-container" >
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Visionneuse PDF</h5>
                </div>
                <div class="card-body card-body-visio d-inline-flex p-2" > 
                    <embed id="embed" src="pdf/regeneration/Botanique/botanique2.pdf" width="100%"  type="application/pdf"/> 
                </div>
            </div>
        </div>


        <!-- Outils -->
        <div id="card-tools" class="col-1  px-0">
            <div class="card tools">
                <div class="card-header">
                     <h5 class="card-title">&nbsp;</h5>
                </div>
                <div class="card-body" style="background-color: #323639;"> 
                    <div class="btn-group-vertical">
                        <button type="button" class="btn rounded-circle btn-primary mb-1" ><i class="fa-solid fa-print"></i></button>
                        <button type="button" class="btn rounded-circle btn-primary mb-1 "><i class="fa-solid fa-trash-can"></i></button>
                        <button type="button" class="btn rounded-circle shadow-sm btn-primary mb-1 "><i class="fa-solid fa-folder-plus"></i></button>
                        <button type="button" class="btn rounded-circle btn-primary mb-1 "><i class="fa-solid fa-file-circle-plus"></i></button>
                        <button type="button" id="regeneration" class="btn rounded-circle shadow  btn-primary mb-1" data-toggle="tooltip" data-placement="right" title="Régénère les fichiers " style="background: var(--main-bg-color);">
                            <i class="fa-solid fa-arrows-spin" style="font-size: x-large; position: relative; top: 1px;"></i></button>        
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>




<!-- Modal -->
<div class="modal fade mt-5" id="modal" tabindex="-1" >
  <form id="formElem" class="form" action="#" method="post">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" ></h1>
        <button type="button" class="close-button" data-bs-dismiss="modal" ><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" id="modal-dimissButton" class="btn btn-secondary" data-bs-dismiss="modal"></button>
        <button type="button" id="modal-allowButton" class="btn btn-primary"></button>
      </div>
    </div>
  </div>
</form>
</div>

<!-- Add Directory -->
<template id="modal-addDirectory">
  <div class="form-floating mb-3">
    <input type="text" name="dirname" class="form-control" id="dirname"  placeholder="name@example.com">
    <label for="dirname">Nom du Répertoire</label>
  </div>
</template>


<!-- Import Files -->
<template id="modal-addFile">
    <div class="mb-3">
      <input class="form-control" type="file" id="files_inputbox"  name="file">
    </div>
    <div class="mb-2"><div class="or-separatorLigne"></div><div  class="or-separatorText">Ou</div></div>
      <div class="dropzone" id="dropZone-addFiles">
          <div class="dz-message needsclick">    
              <i class="fa-solid fa-file-arrow-up text-primary fs-3"></i>
              <div class="ms-4">
                  <h3 class="fs-5 fw-bold text-gray-900 mb-1">Glissez-déposez les fichiers ici</h3>
              </div>
          </div>
      </div>
</template>



<style>
/* STYLES A EXTERNALISE */
#entreprise-animation{
  position:absolute;
  zoom: 1.2;
  top: 0px;
}
#entreprise-animation .entreprise{
  position:absolute;
}
#entreprise-animation .effect{
  position:absolute;
}
#entreprise-animation .upper{
    margin-top: -3px;
    margin-left: 2px;
    opacity:0.9;
}
span#effet {
  text-transform: uppercase;
  border: 4px double rgba(255, 255, 255, 0.25);
  border-width: 4px 0;
  position: absolute;
  top: 18%;
  left: 50%;
  width: 40em;
  margin: 0 0 0 -20em;
}
span#effect span {
  margin: 0 auto;
  text-shadow: 0 0 13px #ed722dab, 1px 2px 3px #863d1378;
  background: url(images/animated-text-fill.png) repeat-y;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: aitf 60s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;

}


@-webkit-keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

</style>




<script type="text/javascript" src="https://kit.fontawesome.com/cf1044164a.js" crossorigin="anonymous" async></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js" integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
<script type="text/javascript" src="js/explorer.js"></script>



</body>
</html>