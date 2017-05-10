
function hentInstitusjon() {
    var data = JSON.parse(sessionStorage.getItem("institusjon"));
    var institusjonsNavn = "";
    if(data == null){
        institusjonsNavn = "Ugyldig institusjon";
    }
    else{
        institusjonsNavn = data.navn;
    }
    document.getElementById("institusjonsTag").innerHTML = "Institusjon: " +  institusjonsNavn;
    document.getElementById("poeng").innerHTML = "Publikasjonspoeng gammelt tellekantsystem: " + data.poeng;
    document.getElementById("poengNytt").innerHTML = "Publikasjonspoeng: " + data.poengNytt;
    document.getElementById("kroner").innerHTML = "Publikasjonsverdi: " + Math.round(data.kroner).toLocaleString() + " kroner!";
    document.getElementById("rank").innerHTML = "Norgesrangering gammelt tellekantsystem: " + data.rank +".";
    document.getElementById("rankNytt").innerHTML = "Norgesrangering: " + data.rankNytt +".";

    var personRank = data.rank;
    var konkurrent1 = data.konkurrenter[0];
    var konkurrent2 = data.konkurrenter[1];
    var konkurrent3 = data.konkurrenter[2];
    var konkurrent4 = data.konkurrenter[3];
    m = new Map();
    m.set(konkurrent1.rankNytt,[konkurrent1.navn,konkurrent1.cristinID, konkurrent1.score]);
    m.set(konkurrent2.rankNytt,[konkurrent2.navn,konkurrent2.cristinID, konkurrent2.score]);
    m.set(konkurrent3.rankNytt,[konkurrent3.navn,konkurrent3.cristinID, konkurrent3.score]);
    m.set(konkurrent4.rankNytt,[konkurrent4.navn,konkurrent4.cristinID, konkurrent4.score]);
    m.set(data.rankNytt,[data.navn, data.akronymer, data.poengNytt]);
    var array = [];
    for(var key of m.keys()){
        array.push(key);
    }
    array.sort(function(a,b){
        return a - b;
    });
    var index = 0;
    for(i = 0; i < array.length;i++){
        var tr = document.createElement("tr");
        var tNavn = document.createElement("td");
        var tRank = document.createElement("td");
        var tScore = document.createElement("td");
        var person = m.get(array[index]);
        if(array[i] == data.rankNytt){
            // HENT PERSON AKRONYMR HER
            tNavn.innerHTML = data.navn;
            tRank.innerHTML = array[i];
        }
        else{
            tNavn.innerHTML = "<a title='Klikk for å se denne institusjonen' id='btnTabell' onclick=tabellSok("+person[1]+")>" + person[0] + "</a>";
            tRank.innerHTML = array[index];
        }
        tScore.innerHTML = person[2];
        index++;
        tr.appendChild(tRank);
        tr.appendChild(tNavn);
        tr.appendChild(tScore);
        var tabell = document.getElementById("tabellBody");
        tabell.appendChild(tr);
    }

    var aarlig = data.aarlig;
    if(aarlig.navn == "Ingen produksjon"){
        document.getElementById("aarligTabellFeil").innerHTML = "INGEN PRODUKSJON I DETTE ÅRET!";
    }
    else{
        m = new Map();
        for(i = 0; i < aarlig.konkurrenter.length; i++){
            var konkurrent = aarlig.konkurrenter[i];
            m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
        }
        m.set(aarlig.rank,[aarlig.navn, aarlig.score]);
        var array = [];
        for(var key of m.keys()){
            array.push(key);
        }
        array.sort(function(a,b){
            return a - b;
        });
        var index = 0;
        for(i = 0; i < array.length;i++){
            var tr = document.createElement("tr");
            var tNavn = document.createElement("td");
            var tRank = document.createElement("td");
            var tScore = document.createElement("td");
            var person = m.get(array[index]);
            if(array[i] == aarlig.rank){
                // HENT PERSON AKRONYMR HER
                tNavn.innerHTML = aarlig.navn;
                tRank.innerHTML = array[i];
            }
            else{
                tNavn.innerHTML = "<a title='Klikk for å se denne institusjonen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
                tRank.innerHTML = array[index];
            }
            tScore.innerHTML = person[1];
            index++;
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tScore);
            var tabell = document.getElementById("tabellAarligBody");
            tabell.appendChild(tr);
        }

    }
}

function skiftModus() {
    var idSession = JSON.parse(sessionStorage.getItem("institusjon"));
    var id = idSession.cristinID;
    var modus = document.getElementById("modus");

    skiftAar();

    $.getJSON("http://localhost:9999/api.forskningsindeksen/v1/institusjon/" + id + "/" + modus.value, function(data) {
        document.getElementById("scoreHeader").innerHTML = modus.options[modus.selectedIndex].innerHTML;
        document.getElementById("scoreAarligHeader").innerHTML = modus.options[modus.selectedIndex].innerHTML;
        document.getElementById("tabellFeil").innerHTML = "";
        var tabell = document.getElementById("tabellBody");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        if(data.navn == "Ingen produksjon"){
            document.getElementById("tabellFeil").innerHTML = "INGEN PRODUKSJON!";
        } else{
            m = new Map();
            for(i = 0; i < data.konkurrenter.length; i++){
                var konkurrent = data.konkurrenter[i];
                m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
            }
            m.set(data.rankNytt,[data.navn, data.poengNytt]);
            var array = [];
            for(var key of m.keys()){
                array.push(key);
            }
            array.sort(function(a,b){
                return a - b;
            });
            var index = 0;
            for(i = 0; i < array.length;i++){
                var tr = document.createElement("tr");
                var tNavn = document.createElement("td");
                var tRank = document.createElement("td");
                var tScore = document.createElement("td");
                var person = m.get(array[index]);
                if(array[i] == data.rankNytt){
                    // HENT PERSON AKRONYMR HER
                    tNavn.innerHTML = data.navn;
                    tRank.innerHTML = array[i];
                }
                else{
                    tNavn.innerHTML = "<a title='Klikk for å se denne institusjonen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
                    tRank.innerHTML = array[index];
                }
                tScore.innerHTML = person[1];
                index++;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tScore);
                var tabell = document.getElementById("tabellBody");
                tabell.appendChild(tr);
            }
        }
    });

}

function skiftAar() {
    var idSession = JSON.parse(sessionStorage.getItem("institusjon"));
    var id = idSession.cristinID;
    var aar = document.getElementById("aar").value;
    document.getElementById("aarligLabel").innerHTML = "År: " + aar;
    document.getElementById("aarligTabellFeil").innerHTML = "";
    var modus = document.getElementById("modus").value;

    $.getJSON("http://localhost:9999/api.forskningsindeksen/v1/institusjon/" + id + "/" + modus + "/" + aar, function(data) {
        var tabell = document.getElementById("tabellAarligBody");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        if(data[0].navn == "Ingen produksjon"){
            document.getElementById("aarligTabellFeil").innerHTML = "INGEN PRODUKSJON I DETTE ÅRET!";
        }
        else{
            m = new Map();
            for(i = 0; i < data[0].konkurrenter.length; i++){
                var konkurrent = data[0].konkurrenter[i];
                m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
            }
            m.set(data[0].rank,[data[0].navn, data[0].score]);
            var array = [];
            for(var key of m.keys()){
                array.push(key);
            }
            array.sort(function(a,b){
                return a - b;
            });
            var index = 0;
            for(i = 0; i < array.length;i++){
                var tr = document.createElement("tr");
                var tNavn = document.createElement("td");
                var tRank = document.createElement("td");
                var tScore = document.createElement("td");
                var person = m.get(array[index]);
                if(array[i] == data[0].rank){
                    // HENT PERSON AKRONYMR HER
                    tNavn.innerHTML = data[0].navn;
                    tRank.innerHTML = array[i];
                }
                else{
                    tNavn.innerHTML = "<a title='Klikk for å se denne institusjonen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
                    tRank.innerHTML = array[index];
                }
                tScore.innerHTML = person[1];
                index++;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tScore);
                var tabell = document.getElementById("tabellAarligBody");
                tabell.appendChild(tr);
            }
        }
    });

}

function Redirect() {
    window.location="http://localhost:9999/prototype5/sokInstitusjon.html";
}

function tilbakeForside() {  
    window.location="http://localhost:9999/prototype5/index.html";
}

function tabellSok(id){
    $.getJSON("http://localhost:9999/api.forskningsindeksen/v1/institusjon/" + id, function(data) {
        sessionStorage.setItem("institusjon", JSON.stringify(data));
        Redirect();
    });
}

//#til-toppen knapp
var fixed = false;
$(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
        if (!fixed) {
            fixed = true;
            // $('#to-top').css({position:'fixed', display:'block'});
            $('#to-top').show("slow", function() {
                $('#to-top').css({
                    position: 'fixed',
                    display: 'block'
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