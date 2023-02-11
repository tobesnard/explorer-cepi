

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page de Login</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

    
    <script type="text/javascript" src="https://kit.fontawesome.com/cf1044164a.js" crossorigin="anonymous" async></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js" integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</head>
<body>

    <div id="login-body-content" class="container-fluid">
       
        <div id="profils">
            <button  class="profil  highlight highlightProfil" > <img style="background-image: url(https://i.pravatar.cc/80?img=70); "></img></button>
            <button  class="profil  highlight highlightProfil" > <img style="background-image: url(https://i.pravatar.cc/80?img=53); "></img></button>
            <button  class="profil  highlight highlightProfil" > <img style="background-image: url(https://i.pravatar.cc/80?img=42); "></img></button>
        </div>

        <div id="reset" class="mb-3"><button ><i class="fa-solid fa-rotate-left"></i></button></div>

        <form id="logins" action="/login" method="get">
            <div class="form-floating mb-1">
                <input type="text" class="form-control " id="login" placeholder="&nbsp;">
                <label for="login">Identifiant</label>
            </div>
            <div class="form-floating mb-2">
                <input type="password" class="form-control " id="Password" placeholder="&nbsp;">
                <label for="Password">Mot de Passe</label>
            </div>
            <button type="submit" class="btn btn-primary mb-3">Se connecter</button>
        </form>
        
    </div>
    

    
    <script type="text/javascript" src="js/login.js"></script>
</body>
</html>


