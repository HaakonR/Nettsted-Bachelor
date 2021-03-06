var lastClicked = 0,
    personer = [],
    indekser = [],
    flag = false,
    flag2 = false,
    sokeOrd = "",
    sok = [];

$(function() {

    $("#inputSok").val("");
    $( "#inputSok" ).autocomplete({
        minLength: 6,
        source: [],
        select: function( event, ui ) {flag = true;},
        close: function( event, ui ) {flag = false;},

    });
});

function hent() {
    sokeOrd = document.getElementById("inputSok").value;
    if(sokeOrd.length < 6 || flag) {
        return;
    } else {
        $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/?navn=" + sokeOrd, function(data) {
            personer = [];
            indekser = [];
            $(data).each(function(i) {
                personer.push(data[i].navn + " | " + data[i].akronymer);
                indekser.push(data[i].cristinID);
            });
            $("#inputSok").autocomplete({
                source: function(request, response) {
                    response(personer.slice(0,10), request.term.slice);
                }
            });
        });
    }
}

function hentPersoner(id){
    /*sokeOrd = document.getElementById("inputSok").value;
    sok = indekser[personer.indexOf(sokeOrd)];*/
    flag2 = true;
    showLoader();
    document.getElementById("inputSok").value = "";
    if(id === undefined) {
        document.getElementById('top').style.opacity = "1";
        document.getElementById('loader').style.display = "none";
    }
    $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/" + id, function(data) {
        sessionStorage.setItem("hukommelse", JSON.stringify(data));
        RedirectPerson();
    }).error(function(jqXHR) {
        document.getElementById('top').style.opacity = "1";
        document.getElementById('loader').style.display = "none";
        if(jqXHR.status == "404") {

        } else {

        }
    });
}

function showLoader() {
    $(".navbar-collapse").collapse("hide");
    $(".navbar-toggle").removeClass("active");
    document.getElementById('main').style.backgroundColor = "#8C0606";
    document.getElementById('top').style.opacity = "0.1";
    document.getElementById('loader').style.display = "block";
}

function RedirectPerson() {
    window.location="http://forskningsindeksen.vlab.cs.hioa.no/sokPerson.html";
}

function RedirectInstitusjon() {
    window.location="http://forskningsindeksen.vlab.cs.hioa.no/sokInstitusjon.html";
}

function hentInstitusjoner(){
    showLoader();
    var sokeOrdInstitusjon = document.getElementById("institusjon").value;
    $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/institusjon/" + sokeOrdInstitusjon, function(data) {
        sessionStorage.setItem("institusjon", JSON.stringify(data));
        RedirectInstitusjon();
    }).error(function(jqXHR, textStatus, errorThrown) {
        if(jqXHR.status == 404) {
            //Not found
        } else {

        }
    });
}

$( "#inputSok" ).on( "autocompleteselect", function( event, ui ) {
    var id = indekser[personer.indexOf(ui.item.value)];
    hentPersoner(id);
});

$('#searchIcon').on('click', function(e) {
    hentManuellPerson();
});

$('#inputSok').on('keyup', function(e) {
    if (e.keyCode === 13) {
        if(flag == false && flag2 == false){
            $(".ui-autocomplete").css({ display: "none" });
            hentManuellPerson();
        }
    } else if(e.keyCode === 40) {
    } else if(e.keyCode === 38) {
    } else {
        hent();
    }
});

function hentManuellPerson() {
    var inputstreng = document.getElementById("inputSok").value;
    if (inputstreng.length == 0) return;
    
    showLoader();
    $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/sok?navn=" + inputstreng, function(data){
        sessionStorage.setItem("hukommelse",JSON.stringify(data));
        RedirectPerson();
    }).error(function(jqXHR) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("top").style.opacity = "1";
    });
}
