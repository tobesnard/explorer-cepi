

//////////// Treeview

let TreeView = {}

TreeView.selecter="#treeview" // Selecteur 
TreeView.fileSelected={}

TreeView.json=[
    // Données pour la demo
    // {type:"directory",name:"Matières", opened:true, children:[
    //     {type:"file", name:"histoire.pdf", href:"histoire.pdf", size:100, modificationDate:"10/02/2023 16:38"},
    //     {type:"file", name:"géographie.pdf", href:"geographie.pdf", size:100, modificationDate:"10/02/2023 16:38"},
    //     {type:"file", name:"mathématique.pdf", href:"mathematique.pdf", size:100, modificationDate:"10/02/2023 16:38"},
    //     {type:"directory",name:"Botanique", opened:false, children:[
    //         {type:"file", name:"botanique1.pdf", href:"botanique.pdf", size:100, modificationDate:"10/02/2023 16:38"},
    //         {type:"file", name:"botanique2.pdf", href:"botanique2.pdf", selected:true, size:100, modificationDate:"10/02/2023 16:38"},
    //     ]},
    // ]},
]

TreeView.tree=function(padding=10,offset=20){
    // Creation du Dom pour le treeview
    html="<ul >"
    html+=TreeView.explore( TreeView.json )
    html+="</ul>"
    // $(this.selecter).append(html)
    $(this.selecter).html(html)
}

TreeView.refresh=function(){
    // Rafraichier le Treeview
     $.ajax({
        url: "/explorer/getTree",
        method: "GET",
        dataType : "json",
    })
    .done(function(data){
        TreeView.json=data
        TreeView.tree() // Construit l'arbre
        TreeView.toolsbar() // Ajout les raccourcis
        TreeView.addListeners() // Les evenements
        // console.log(JSON.stringify(TreeView.json))
    })
}

TreeView.addDirectory = function (e){
    // Paramètrages de la modal
    $(".modal-title").text('Ajouter un Répertoire')
    $(".modal-body").html( $("template#modal-addDirectory").html() )
    $("#modal-dimissButton").text("Annuler")
    $("#modal-allowButton").text("Créer")
    $("#dirname").attr('path', $(e).closest('.tools-box').prev().attr('pathfile') ) 
    // Requête demandant l'ajout du répertoire
    $("#modal-allowButton").off().click(function(e){
        dirname = $("#dirname").first().attr('path') + "/"+$("#dirname").val()
        console.log(dirname)
        $.ajax({
            url: "/explorer/add/directory",
            method: "PUT",
            contentType:'application/json',
            data : JSON.stringify({"dirname":dirname}),
            success : function(data){
                console.log(data)
                TreeView.refresh()
            },
            error : function(req,msg,error){
                console.log(req +" "+msg+""+error)
            }
            
        })
        $('.modal').modal('toggle');
    })
}

TreeView.addFile = function (e){
    // Paramétrage de la modal
    $(".modal-title").text('Importer un Fichier')
    $(".modal-body").html( $("template#modal-addFile").html() )
    $("#modal-dimissButton").text("Annuler")
    $("#modal-allowButton").text("Importer")
    form = $("#modal").find('form')
    form.attr('method','post')
    form.attr('action','explorer/add/file')
    form.attr('enctype','multipart/form-data')
    // Paramètre supplémentaire (pathname)
    $("#files_inputbox").attr('path', $(e).closest('.tools-box').prev().attr('pathfile') ) 
    
        // Cas du dropBox
        var myDropzone = new Dropzone("#dropZone-addFiles", {
            url: "explorer/add/file", 
            paramName: "file",
            maxFiles: 1,
            maxFilesize: 10, 
            addRemoveLinks: true,
            init: function() {
                this.on("sending", function(file, xhr, formData){
                        formData.append("path", $("#files_inputbox").attr('path'));
                        console.log(formData)
                });
            },
            complete: function(){
                $('.modal').modal('toggle');
                TreeView.refresh()
            }
        });
        // Cas de l'inputbox 
        $("#modal-allowButton").off().click(function(e){
            e.preventDefault()
            dirname = $("#files_inputbox").attr('path')  
            var fd = new FormData(formElem);
            fd.append("path", dirname);
            $.ajax({
                url: "explorer/add/file",
                type: "POST",
                data: fd,
                processData: false,  
                contentType: false,   
                success : function(data){
                    console.log(data)
                    TreeView.refresh()
                    $('.modal').modal('toggle');
                }
            });
        })
}

TreeView.delete=function (e){
    let pathfile = $(e).closest('.tools-box').prev().attr('pathfile')
    $.ajax({
        url: "/explorer/delete",
        method: "DELETE",
        contentType:'application/json',
        data : JSON.stringify({"pathfile":pathfile}),
        success : function(data){
            console.log(data)
            TreeView.refresh()
        } 
    })
}

TreeView.addListeners=function(){
    // Les évenements sur le Treeview
    $("#treeview li").mouseover(function(e){
        $( "#treeview li" ).each(function() {
            $(this).removeClass("mouseover")
            $(this).next().hide();
          });
        $(this).addClass("mouseover")
        $(this).next().show();
        $('.more-tools').hide()
    })

    $("#treeview li").click(function(e){
        li =$($(e.target).parent('li'))
        let type = li.attr('type')
        if(type == "file" ){
            TreeView.fileSelected ={
                path: li.attr('path'),
                filename:li.attr('filename'),
                pathfile:li.attr('pathfile'),
                type:li.attr('type')
            }
        $(TreeView.selecter+" li").removeClass('li-selected')
        li.addClass('li-selected')
        console.dir(TreeView.fileSelected)
    }
    })

}

TreeView.directoryHtml=function(type, pathfile, path, filename, opened, padding=0, offset=0){
    // HTML pour une ligne dossier
    return ` <li onclick="TreeView.openclose($(this))" type="${type}"  pathfile="${pathfile}" path="${path}" filename="${filename}" >
                <span><i class="chevron fa-solid fa-circle-chevron-right ${opened ? 'folder-open' : 'folder-close'}"  style="margin-left:${padding}px;padding-left:${offset}px"></i></span>
                <span class="directory fa-solid fa-folder " ></span>
                <span class="dirname">${filename}</span>
            </li>
            <span class="tools-box tools-box-directory"></span>
            `
}

TreeView.fileHtml=function(type, pathfile, path, filename, modificationDate, padding=0, offset=0){
    // HTML pour une ligne fichier
    return `<li onclick="Viewer.openFile('${pathfile}')" type="${type}"  pathfile="${pathfile}" path="${path}" filename="${filename}" >
                <div class="filename" style="padding-left:${padding}px">
                    <span class="file fa-regular fa-file-pdf" ></span>
                    <span>${filename}</span>
                </div>
                <div class="modifDate" style="padding-left:${padding}px" >( Modifié le : ${modificationDate} )</div>
                </li>
            <span class="tools-box tools-box-file"></span>
            `
}
 
TreeView.explore=function( json ,depth=0 ){
        // Recursion pour la constructuion de l'arbre
        html=""
        for( e of json){
            if(e.type == "directory"){ 
                html+= TreeView.directoryHtml(e.type, e.pathfile, e.path, e.filename, e.opened, depth*20  )
                if(e.children ){
                    html+="<ul>"+TreeView.explore(e.children, depth+1)+"</ul>"
                }
            }else{
                for(f of e ){
                    if(f.type == "file"){ 
                        html+=TreeView.fileHtml(f.type, f.pathfile, f.path, f.filename, f.modificationDate, depth*20 )
                    }
                }
            }
       }
       return html;
}

TreeView.toolsbar=function(){
    // Ajoute les commandes (access rapide)
    let tools=`
        <div id="tools">
        <div class="btn-group group-tools" >
            <button type="button" id="btn-addDirectory"  class="btn btn-outline-warning "   onclick="TreeView.addDirectory(this)" path="" data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-folder-plus btn-font-es" ></i></button>
            <button type="button" id="btnAddFile" class="btn btn-outline-warning "          onclick="TreeView.addFile(this)" data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-file-circle-plus btn-font-es"></i></button>
            <button type="button" id="btndeletion"  class="btn btn-outline-danger"          onclick="TreeView.moreTools(this)"><i class="fa-solid fa-trash-can btn-font-es"></i></button>
        </div>
        <div class="btn-group more-tools" >
        <button type="button" id="btndeletionDefnitively"  class="btn btn-danger btn-font-es"  onclick="TreeView.delete(this)" ><span>Supprimer définitivement ?</span></button>
        </div>
        </div>
    `
    $('span.tools-box').html(tools).hide()
    $('.more-tools').hide()
}

TreeView.moreTools=function(){
    $('.more-tools').show()
}

TreeView.openclose=function(e){
     // Ouvre ou ferme un dossier
     let elmt = e.find('.chevron')
     if( elmt.hasClass("folder-open")){
         elmt.removeClass("folder-open")
         elmt.addClass("folder-close")
         e.next().next().show()
     }else{
         elmt.removeClass("folder-close")
         elmt.addClass("folder-open")
         e.next().next().hide()
     }
}



//////////////////////////////////////////////////////////////////////
/// 
/////////////////////////////////////////////////////////////////////



let Viewer = {}
Viewer.openFile = function(pdf){
    // Ouverture du fichier dans la visionneuse
    $('#embed').attr('src',`${pdf}`)
}



let Menu = {}
Viewer.regenerate = function(){
    $.ajax({
        url: "/menu/regeneration",
        method: "GET",
    })
    .done(function(data){
        TreeView.refresh()
        console.log("regeneration complete")
    })
}

$("button#regeneration").click(function(){
    Viewer.regenerate()
})





/////////// Main
$(function() {

    TreeView.refresh()

    $("#logout").click(function(e){
        document.location.href="/"
    })

    $("#dirname").keypress(function(e){
        e.preventDefault()
        if(e.which == 13) {
            alert('You pressed enter!');
        }
    })
})










