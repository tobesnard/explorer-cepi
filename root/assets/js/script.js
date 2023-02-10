

//////////// treeview
let TreeView = {}
TreeView.selecter="#treeview"

TreeView.json=[
    {"type":"directory","name":"Matières", "opened":true, "children":[
        {"type":"file", "name":"histoire.pdf", "href":"histoire.pdf"},
        {"type":"file", "name":"géographie.pdf", "href":"geographie.pdf"},
        {"type":"file", "name":"mathématique.pdf", "href":"mathematique.pdf"},
        {"type":"directory","name":"Botanique", "opened":false, "children":[
            {"type":"file", "name":"botanique1.pdf", "href":"botanique.pdf"},
            {"type":"file", "name":"botanique2.pdf", "href":"botanique2.pdf", "selected":true},
        ]},
    ]},
]

TreeView.refresh=function(){
    let html = ""
    let depth = -1
    let paddingLeft = 10
    let offset =20
    let explore=function( json ){
        depth += 1
        if(Array.isArray(json) &&  json.length >0 ){
            html += '<ul>'
            json.forEach(e => {
                if( !Array.isArray(e) ){ 
                    let _html
                    if(e.type=="directory"){

                        _html=`<li onclick="openclose($(this))" type="${e.type}">
                            <span><i class="chevron fa-solid fa-circle-chevron-right ${e.opened ? 'folder-open' : 'folder-close'}"  style="margin-left:${depth*paddingLeft}px;padding-left:${offset}px"></i></span>
                            <span class="fa-solid fa-folder directory" ></span>
                            <span >${e.name}</span>
                        </li><span class="tools-box"></span>`
                    }
                    if(e.type=="file"){
                        _html=`<li onclick="showFile('${e.href}')" type="${e.type}"  ">
                            <span class="fa-regular fa-file-pdf file" style="padding-left:${depth*paddingLeft+offset}px"></span>
                            <span>${e.name}</span>
                        </li><span class="tools-box"></span>`
                    }
                    html += _html
                }
                if(e.children){ explore(e)}
                
            })
            html += '</ul>'
        }
        else{ if(json.children){ explore(json.children) } }

    }
    explore(this.json)
    $(this.selecter).append(html)

    // Ajoute les commandes (access rapide)
    let tools=`
        <div class="btn-group group-tools" >
            <button type="button" id="btnAddDir"  class="btn btn-outline-warning " onclick="addDir(this)"  data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-folder-plus btn-font-es" ></i></button>
            <button type="button" id="btnAddFile" class="btn btn-outline-warning " onclick="addFile(this)" data-bs-toggle="modal" data-bs-target="#modal" " ><i class="fa-solid fa-file-circle-plus btn-font-es"></i></button>
            <button type="button" id="btnDelDir"  class="btn btn-outline-danger "  onclick="delDir(this)"><i class="fa-solid fa-trash-can btn-font-es"></i></button>
        </div>
    `
    $('span.tools-box').html(tools)
    $('span.tools-box').hide()

}









/// Fonctions

// Ouvre le fichier
function showFile(pdf){
    $('#embed').attr('src',`assets/pdf/${pdf}`)
}
// Toogle arborescence
function openclose(e){
    let elmt = e.find('.chevron')
    if( elmt.hasClass("folder-open")){
        console.log("opened")
        elmt.removeClass("folder-open")
        elmt.addClass("folder-close")
        e.next().next().show()
    }else{
        console.log("closed")
        elmt.removeClass("folder-close")
        elmt.addClass("folder-open")
        e.next().next().hide()
    }
}
function delDir(e){
    let li = $(e).parents('.tools-box').prev()
    let toolsBox = $(e).parents('.tools-box')
    let type = li.attr('type')
    if(type == "file"){
        li.hide()
        toolsBox.hide()

    }
    if(type == "directory"){
        li.hide()
        toolsBox.hide()
        li.next().next().hide()
    }

}

function addDir(e){
    console.log(' modal add dir ' )
    $(".modal-title").text('Ajouter un Répertoire')
    $(".modal-body").html( $("template#modal-addDirectory").html() )
    $("#modal-dimissButton").text("Annuler")
    $("#modal-allowButton").text("Créer")
    $("#modal").find('form').attr('action','')
}
function addFile(e){
    console.log(' modal add file ' )
    $(".modal-title").text('Importer un Fichier')
    $(".modal-body").html( $("template#modal-addFile").html() )
    $("#modal-dimissButton").text("Annuler")
    $("#modal-allowButton").text("Importer")
    $("#modal").find('form').attr('action','')
    var myDropzone = new Dropzone("#dropZone-addFiles", {
        url: "https://keenthemes.com/scripts/void.php", 
        paramName: "file", // The name that will be used to transfer the file
        maxFiles: 10,
        maxFilesize: 10, // MB
        addRemoveLinks: true,
        accept: function(file, done) {
            if (file.name == "wow.jpg") {
                done("Naha, you don't.");
            } else {
                done();
            }
        }
    });
}



/////////// Main
$(function() {

    TreeView.refresh()

    $("#treeview li").mouseover(function(e){
        $( "#treeview li" ).each(function() {
            $( this ).removeClass("mouseover")
            $(this).next().hide();
          });
        $(this).addClass("mouseover")
        $(this).next().show();
    })

    //Les modals
    // const myModal = document.getElementById('addDir')
    // const myInput = document.getElementById('myInput')

    // myModal.addEventListener('shown.bs.modal', () => {
    //  myInput.focus()
    // })

    // Dev modal
    // $("#btnAddDir").click()
    $("#btnAddFile").click()

    
})










