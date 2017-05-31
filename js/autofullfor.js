var lastClicked = 0,
    personer = [],
    indekser = [],
    flag = false,
    sokeOrd = "",
    sok = [];

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
        } $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/?navn=" + sokeOrd, function(data) {
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
            //$( "#inputSok" ).autocomplete( "option", "source", personer );
        }).error(function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 404) {
                personer = [];
                indekser = [];
            }
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
    $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/" + sok, function(data) {
        sessionStorage.setItem("hukommelse", JSON.stringify(data));
        RedirectPerson();
    }).error(function(jqXHR, textStatus, errorThrown) {
        if(jqXHR.status == 404) {
            personer = [];
            indekser = [];
        } else {
            document.getElementById('top').style.opacity = "1";
            document.getElementById('loader').style.display = "none";
        }
    });
}

function showLoader() {
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
            document.getElementById("outputInstitusjon").innerHTML="Ingen resultat";
        } else {
            document.getElementById("outputInstitusjon").innerHTML="Oops, her har det skjedd en feil...";
        }
    });

}

$('#searchIcon').on('click', function(e) {
    hentPersoner();

});

$('#inputSok').on('keyup', function(e) {
    if (e.keyCode === 13) {
        var output, x;
        output = document.getElementById("output");
        x = document.getElementById("inputSok").value;
        if(x === "") {
            output.innerHTML = "Skriv inn et navn!";
        } else {
            hentPersoner();
        }
    } else if(e.keyCode === 40) {
    } else if(e.keyCode === 38) {
    } else {
        hent();
    }
});
