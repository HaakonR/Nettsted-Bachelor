var lastClicked = 0,
    personer = [],
    indekser = [],
    flag = false,
    sokeOrd = "",
    sok = [],
    t = [];

$(function() {
    $( "#inputSok" ).autocomplete({
        minLength: 5,
        source: [],
        select: function( event, ui ) {flag = true;},
        close: function( event, ui ) {flag = false;},
    });
});

function hent() {
    var now = new Date();
    if(now - lastClicked > 100){
        lastClicked = now;
        sokeOrd = document.getElementById("inputSok").value;
        if(sokeOrd.length < 5 || flag) {
            return;
        }
        $.getJSON("http://localhost:9999/api.forskningsindeksen/v1/person/?navn=" + sokeOrd, function(data) {
            personer = [];
            indekser = [];
            $(data).each(function(i) {
                personer.push(data[i].navn + " | " + data[i].akronymer);
                indekser.push(data[i].cristinID);
            });
            $("#inputSok").autocomplete({ 
                source: function(request, response) {
                    var liste = $.ui.autocomplete.filter(personer, request.term);
                    response(liste.slice(0, 10));
                }
            });
            //$( "#inputSok" ).autocomplete( "option", "source", personer );
        });
    }
}

function hentPersoner(){
    showLoader();
    sokeOrd = document.getElementById("inputSok").value;
    document.getElementById("inputSok").value = "";
    sok = indekser[personer.indexOf(sokeOrd)];
    if(sok === undefined) {
        document.getElementById('top').style.opacity = "1";
        document.getElementById('loader').style.display = "none";
    }
    $.getJSON("http://localhost:9999/api.forskningsindeksen/v1/person/" + sok, function(data) {
        console.log(data);
        sessionStorage.setItem("hukommelse", JSON.stringify(data));
        RedirectPerson();
    });
}

function showLoader() {
    document.getElementById('main').style.backgroundColor = "#8C0606";
    document.getElementById('top').style.opacity = "0.1";
    document.getElementById('loader').style.display = "block";

}

function RedirectPerson() { 
    window.location="http://localhost:9999/prototype5/sokPerson.html"
}

function RedirectInstitusjon() {
    window.location="http://localhost:9999/prototype5/sokInstitusjon.html"
}

function hentInstitusjoner(){
    console.log(document.getElementById("institusjon").value);
    showLoader();
    var sokeOrdInstitusjon = document.getElementById("institusjon").value;
    $.getJSON("http://localhost:9999/api.forskningsindeksen/v1/institusjon/" + sokeOrdInstitusjon, function(data) {
        sessionStorage.setItem("institusjon", JSON.stringify(data));
        RedirectInstitusjon();
    });
}

$('#searchIcon').on('click', function(e) {
    hentPersoner(); 
});

$('#inputSok').on('keyup', function(e) {
    if (e.keyCode === 13) {
        hentPersoner();
    } else if(e.keyCode === 40) {

    } else if(e.keyCode === 38) {
    } else {
        hent();
    }
});
