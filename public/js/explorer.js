

//////////// Treeview

let TreeView = {}

TreeView.selecter="#treeview"

TreeView.json=[
    {type:"directory",name:"Matières", opened:true, children:[
        {type:"file", name:"histoire.pdf", href:"histoire.pdf", size:100, modificationDate:"10/02/2023 16:38"},
        {type:"file", name:"géographie.pdf", href:"geographie.pdf", size:100, modificationDate:"10/02/2023 16:38"},
        {type:"file", name:"mathématique.pdf", href:"mathematique.pdf", size:100, modificationDate:"10/02/2023 16:38"},
        {type:"directory",name:"Botanique", opened:false, children:[
            {type:"file", name:"botanique1.pdf", href:"botanique.pdf", size:100, modificationDate:"10/02/2023 16:38"},
            {type:"file", name:"botanique2.pdf", href:"botanique2.pdf", selected:true, size:100, modificationDate:"10/02/2023 16:38"},
        ]},
    ]},
]

TreeView.refresh=function(){
    TreeView.tree()
    TreeView.toolsbar()
}

TreeView.tree=function(padding=10,offset=20){
    // Contruit l'arborescence 
    let html=""
    let depth = -1
    let explore=function( json ){
        depth += 1
        if( Array.isArray(json) &&  json.length > 0 ){
            html += '<ul>'
            json.forEach(e => {
                if( !Array.isArray(e) ){ 
                    let _html
                    if(e.type=="directory"){
                        _html=` <li onclick="openOrCloseDirectory($(this))" type="${e.type}">
                                    <span><i class="chevron fa-solid fa-circle-chevron-right ${e.opened ? 'folder-open' : 'folder-close'}"  style="margin-left:${depth*padding}px;padding-left:${offset}px"></i></span>
                                    <span class="directory fa-solid fa-folder " ></span>
                                    <span class="dirname">${e.name}</span>
                                </li>
                                <span class="tools-box tools-box-directory"></span>
                                `
                    }
                    if(e.type=="file"){
                        _html=`<li onclick="openFile('${e.href}')" type="${e.type}"  ">
                                    <div class="filename" style="padding-left:${depth*padding+offset}px">
                                        <span class="file fa-regular fa-file-pdf" ></span>
                                        <span>${e.name}</span>
                                    </div>
                                    <div class="modifDate" style="padding-left:${depth*padding+offset}px" >( Modifié le : ${e.modificationDate} )</div>
                                </li>
                                <span class="tools-box tools-box-file"></span>
                                `
                    }
                    html += _html
                }
                if(e.children){ explore(e) }
            })
            html += '</ul>'
        }
        else{ if(json.children){ explore(json.children) } }

    }
    explore(this.json)
    $(this.selecter).append(html)
}

TreeView.toolsbar=function(){
    // Ajoute les commandes (access rapide)
    let tools=`
        <div class="btn-group group-tools" >
            <button type="button" id="btn-addDirectory"  class="btn btn-outline-warning "   onclick="addDirectory(this)"  data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-folder-plus btn-font-es" ></i></button>
            <button type="button" id="btnAddFile" class="btn btn-outline-warning "          onclick="addFile(this)" data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-file-circle-plus btn-font-es"></i></button>
            <button type="button" id="btndeletion"  class="btn btn-outline-danger"          onclick="showConfirmDeletion(this)"><i class="fa-solid fa-trash-can btn-font-es"></i></button>
        </div>
        <div class="btn-group more-tools" >
        <button type="button" id="btndeletionDefnitively"  class="btn btn-danger btn-font-es"  onclick="deletion(this)" ><span>Supprimer définitivement ?</span></button>
        </div>
    `

    $('span.tools-box').html(tools).hide()
    $('.more-tools').hide()
}



//////////////////////////////////////////////////////////////////////
///
/////////////////////////////////////////////////////////////////////

// Ouverture du fichier
function openFile(pdf){
    $('#embed').attr('src',`pdf/${pdf}`)
}
// Ouvre ou ferme un dossier
function openOrCloseDirectory(e){
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

function deletion(e){
    let li = $(e).parents('.tools-box').prev()
    li.hide()
    if( li.attr('type') == "directory"){
        li.next().next().hide()
    }
    $(e).parents('.tools-box').hide()

}

function addDirectory(e){
    $(".modal-title").text('Ajouter un Répertoire')
    $(".modal-body").html( $("template#modal-addDirectory").html() )
    $("#modal-dimissButton").text("Annuler")
    $("#modal-allowButton").text("Créer")
    $("#modal").find('form').attr('action','')
}


function addFile(e){
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

function showConfirmDeletion(){
    $('.more-tools').show()
}



/////////// Main
$(function() {

    TreeView.refresh()

    $("#treeview li").mouseover(function(e){
        $( "#treeview li" ).each(function() {
            $(this).removeClass("mouseover")
            $(this).next().hide();
          });
        $(this).addClass("mouseover")
        $(this).next().show();
        $('.more-tools').hide()
    })

    $("#logout").click(function(e){
        document.location.href="/"
    })

})










