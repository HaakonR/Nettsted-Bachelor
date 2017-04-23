// ok
function hentTopp10PersonerTotalt() {
    const url = "http://localhost:9999/api.scibot/v1/topplister/personertotalt";
    let tabell = document.getElementById("toppPersonerTotalt");
    person(url, tabell);
}
//ok
function hentTopp10Personer2016() {
    const url = "http://localhost:9999/api.scibot/v1/topplister/personeraarlig";
    let tabell = document.getElementById("toppPersonerAarlig");
    person(url, tabell);
    /*
        $.getJSON(url, function(data) {
            for (let i = 0; i < data.length; i++) {
                let tr = document.createElement("tr");
                let tRank = document.createElement("td");
                tRank.innerHTML = i + 1;
                let tNavn = document.createElement("td");
                tNavn.innerHTML = "<a onclick='hentPerson("+data[i].cristinID+")'>"+data[i].navn
                    + "</a>";
                let tPoeng = document.createElement("td");
                tPoeng.innerHTML = data[i].poeng;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tPoeng);
                tabell.appendChild(tr);
            }
        });*/
}
// ok
function hentTopp10InstitusjonerTotalt() {
    const url = "http://localhost:9999/api.scibot/v1/topplister/institusjonertotalt";
    let tabell = document.getElementById("toppInstitusjonerTotalt");
    institusjon(url, tabell);
}

function hentTopp10Institusjoner2016() {
    const url = "http://localhost:9999/api.scibot/v1/topplister/institusjoneraarlig";
    let tabell = document.getElementById("toppInstitusjonerAarlig");
    institusjon(url, tabell);
}

function hentTopp10TidsskrifterTotaltN1() {
    // navn, issn, url, kvalitet, antallPublikasjoner
    const url = "http://localhost:9999/api.scibot/v1/topplister/publikasjonskanalerniva1totalt";
    let tabell = document.getElementById("toppPubKanalTotaltNiva1");
    tidsskrift(url, tabell);
}

function hentTopp10Tidsskrifter2016N1() {
    // samme
    const url = "http://localhost:9999/api.scibot/v1/topplister/publikasjonskanalerniva1aarlig";
    let tabell = document.getElementById("toppPubKanalAarligNiva1");
    tidsskrift(url, tabell);
}

function hentTopp10TidsskrifterTotaltN2() {
    const url = "http://localhost:9999/api.scibot/v1/topplister/publikasjonskanalerniva2totalt";
    let tabell = document.getElementById("toppPubKanalTotaltNiva2");
    tidsskrift(url, tabell);
}

function hentTopp10Tidsskrifter2016N2() {
    const url =     "http://localhost:9999/api.scibot/v1/topplister/publikasjonskanalerniva2aarlig";
    let tabell = document.getElementById("toppPubKanalAarligNiva2");
    tidsskrift(url, tabell);

}

function hentPerson(id) {
    $.getJSON("http://localhost:9999/api.scibot/v1/person/" + id, function(data) {
        sessionStorage.setItem("hukommelse", JSON.stringify(data));
        RedirectPerson();
    });
}

function hentInstitusjon(id) {
    $.getJSON("http://localhost:9999/api.scibot/v1/institusjon/" + id, function(data) {
        sessionStorage.setItem("institusjon", JSON.stringify(data));
        RedirectInstitusjon();
    });
}

function RedirectInstitusjon() {
    window.location="http://localhost:9999/prototype5/sokInstitusjon.html"
}

function tilbakeForside() {
    window.location="http://localhost:9999/prototype5/index.html";
}

function RedirectPerson() {
    window.location="http://localhost:9999/prototype5/sokPerson.html"
}

function person(url, tabell) {
    $.getJSON(url, function(data) {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let tRank = document.createElement("td");
            tRank.innerHTML = i + 1;
            let tNavn = document.createElement("td");
            tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick='hentPerson("+data[i].cristinID+")'>"
                + data[i].navn+"</a>";
            let tPoeng = document.createElement("td")
            tPoeng.innerHTML = data[i].poeng;
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tPoeng);
            tabell.appendChild(tr);
        }
    });
}

function institusjon(url, tabell) {
    $.getJSON(url, function(data) {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let tRank = document.createElement("td");
            tRank.innerHTML = i + 1;
            let tNavn = document.createElement("td");
            tNavn.innerHTML = "<a title='Klikk for å se denne institusjonen' id='btnTabell' onclick='hentInstitusjon("+data[i].cristinID+")'>"
                + data[i].navn+"</a>";
            let tPoeng = document.createElement("td")
            tPoeng.innerHTML = data[i].poeng;
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tPoeng);
            tabell.appendChild(tr);
        }
    });
}

function tidsskrift(url, tabell) {
    $.getJSON(url, function(data) {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let tRank = document.createElement("td");
            tRank.innerHTML = i + 1;
            let tNavn = document.createElement("td");
            tNavn.innerHTML =
                "<a title='Til tidsskriftet sin nettside' id='btnTabell' target='_blank' href='"+data[i].url+"'>"+data[i].navn+"</a>";
            let tPoeng = document.createElement("td");
            tPoeng.innerHTML = data[i].antallPublikasjoner;

            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tPoeng);
            tabell.appendChild(tr);
        }
    });
}

//#til-toppen knapp
var fixed = false;
$(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
        if (!fixed) {
            fixed = true;
            $('#to-top').show("slow", function() {
                $('#to-top').css({
                    position: 'fixed',
                    display: 'block',
                    color: 'black'

                });
            });
        }
    } else {
        if (fixed) {
            fixed = false;
            $('#to-top').hide("slow", function() {
                $('#to-top').css({
                    display: 'none'
                });
            });
        }
    }
});