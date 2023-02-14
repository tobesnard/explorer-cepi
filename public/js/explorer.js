

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
    $(".input-box").show();
    $(".input-box input").focus()

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
    li=$(e).closest('.tools-box').prev()   
    $("#files_inputbox").attr('path', li.attr('path') ) 
    $("#files_inputbox").attr('filename', li.attr('filename') ) 
    $("#files_inputbox").attr('pathfile', li.attr('pathfile') ) 
    $("#files_inputbox").attr('type', li.attr('type') ) 

        // Cas du dropBox
        var myDropzone = new Dropzone("#dropZone-addFiles", {
            url: "explorer/add/file", 
            paramName: "file",
            maxFiles: 1,
            acceptedFiles: ".pdf",
            maxFilesize: 10, 
            addRemoveLinks: true,
            init: function() {
                this.on("sending", function(file, xhr, formData){
                        formData.append("path", $("#files_inputbox").attr('path'))
                        formData.append("filename", $("#files_inputbox").attr('filename'))
                        formData.append("pathfile", $("#files_inputbox").attr('pathfile'))
                        formData.append("type", $("#files_inputbox").attr('type'))
                        console.log(formData)
                });
            },
            complete: function(){
                $('.modal').modal('toggle');
                TreeView.refresh()
            }
        });

        // // Cas de l'inputbox 
        // $("#modal-allowButton").off().click(function(e){
        //     e.preventDefault()
        //     // dirname = $("#files_inputbox").attr('path')  
        //     var formData = new FormData(formElem)
        //     formData.append("path", $("#files_inputbox").attr('path'))
        //     formData.append("filename", $("#files_inputbox").attr('filename'))
        //     formData.append("pathfile", $("#files_inputbox").attr('pathfile'))
        //     formData.append("type", $("#files_inputbox").attr('type'))
        //     console.log(formData)

        //     $.ajax({
        //         url: "explorer/add/file",
        //         type: "POST",
        //         data: formData,
        //         processData: false,  
        //         contentType: false,   
        //         success : function(data){
        //             console.log(data)
        //             TreeView.refresh()
        //             $('.modal').modal('toggle');
        //         }
        //     })
        // })
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
        $('.input-box').hide()
    })
   

    $("#treeview li, #treeview .filename").click(function(e){
        // Permet de griser le fichier selectionner qui est ouvert 
        li = $($(e.target).parent('li')) // car par défault
        li_filename = $(e.target).parent('.filename').parent('li') // Cas click sur nom du fichier
        if( li_filename.length != 0 ) li = li_filename

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
    }
    })

    $("input#folderInput").keypress(function(e){
        // e.preventDefault()
        if(e.which == 13) {
            path=$(e.target).closest('.tools-box').prev().attr("path")
            foldername=e.target.value
            fullFolderName=path+"/"+foldername
            $.ajax({
                url: "/explorer/add/directory",
                method: "PUT",
                contentType:'application/json',
                data : JSON.stringify({"dirname":fullFolderName}),
                success : function(data){
                    console.log(data)
                    TreeView.refresh()
                }
            })
            $(".input-box").hide();
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
                <div class="modifDate" style="padding-left:${padding}px" >Modifié le : ${modificationDate}</div>
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
        <div id="tools" >
        <div class="group-tools btn-group " >
            <button type="button" id="btn-addDirectory"  class="btn btn-outline-warning "   onclick="TreeView.box('input add directory')" path="" ><i class="fa-solid fa-folder-plus btn-font-es" ></i></button>
            <button type="button" id="btnAddFile" class="btn btn-outline-warning "          onclick="TreeView.addFile(this)" data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-file-circle-plus btn-font-es"></i></button>
            <button type="button" id="btndeletion"  class="btn btn-outline-danger"          onclick="TreeView.box('confirm deletion')"><i class="fa-solid fa-trash-can btn-font-es"></i></button>
        </div>
        <div class="more-tools btn-group " style="display:none">
            <button type="button" id="btndeletionDefnitively"  class="btn btn-danger btn-font-es"  onclick="TreeView.delete(this)" ><span>Supprimer définitivement ?</span></button>
        </div>
        <div class="input-box input-group " style="display:none">
            <span class="input-group-text" ><i class="fa-solid fa-folder-plus"></i></span>
            <input id="folderInput" type="text" class="form-control" placeholder="Nom du nouveau dossier" >
            
        </div>
        </div>
    `
    $('span.tools-box').html(tools).hide()
    $('.more-tools').hide()
}

TreeView.box=function(box){
    boxes={
        more: {selecter:".more-tools"},
        input:{selecter:".input-box"}
    }
    $.each(boxes, (i,obj)=> {  $(obj.selecter).hide() })
    switch(box){
        case 'confirm deletion':
            $( boxes.more.selecter).show()
            break
        case 'input add directory':
            $(boxes.input.selecter).show();
        break
    }
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
///  Visionneuse
/////////////////////////////////////////////////////////////////////



let Viewer = {}
Viewer.openFile = function(pdf){
    // Ouverture du fichier dans la visionneuse
    $('#embed').attr('src',`${pdf}`)
}


//////////////////////////////////////////////////////////////////////
/// Menu
/////////////////////////////////////////////////////////////////////


let Menu = {}

Menu.regenerate = function(){
    $.ajax({
        url: "/menu/regeneration",
        method: "GET",
    })
    .done(function(data){
        TreeView.refresh()
        console.log("regeneration complete")
    })
}

Menu.theme={}
Menu.theme.activated=false;
Menu.theme.change=function(){
    if(Menu.theme.activated == false){
        $('#theme-secondaire').removeAttr('disabled')
        Menu.theme.changeIcons()
        Menu.theme.activated = true;
    }else{
        $('#theme-secondaire').attr('disabled','true')
        Menu.theme.restoreIcons()
        Menu.theme.activated = false;
    }
    console.log("theme is "+Menu.theme.activated)
}
Menu.theme.changeIcons=function(){
    $('.directory').removeClass('fa-solid').addClass('fa-regular')
    $('.chevron').removeClass('fa-circle-chevron').addClass('fa-chevron-right')
    // $('.file').removeClass('fa-solid').addClass('fa-regular')
}
Menu.theme.restoreIcons=function(){
    $('.directory').removeClass('fa-regular').addClass('fa-solid')
    $('.chevron').removeClass('fa-chevron-right').addClass('fa-circle-chevron')
    // $('.file').removeClass('fa-regular').addClass('fa-solid')
}




$("button#regeneration").click(function(){
    Menu.regenerate()
})

$("button#theme").click(function(){
    Menu.theme.change()
})



/////////// Main
$(function() {

    TreeView.refresh()

    $("#logout").click(function(e){
        document.location.href="/"
    })

 //activation du theme pour déboguage
 
//  Menu.theme.changeIcons()
//  $('#theme').click()



})










