function nesteFemIntern(frem){
    var idSession = JSON.parse(sessionStorage.getItem("hukommelse"));
    var id = idSession.cristinID;
    var rank = sessionStorage.getItem("rankIntern");
    var modus = document.getElementById("modus").value;
    var url = "";
    if(frem == true){
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/1/1";
    }
    else{
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/1/0";
    }
    $.getJSON(url, function(data) {
        var tabell = document.getElementById("tabellBodyTotalIr");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        sessionStorage.setItem("rankIntern", data[2].rankNytt);
        if(modus == "0" || modus == "1" || modus == "2" || modus == "3") {
            var ranking = data[2].rankNytt;
            if(ranking <= 3) {
                document.getElementById("forrigeIntern").style.display = "none";
            } else {
                document.getElementById("forrigeIntern").style.display = "inline";
            }
        }

        m = new Map();
        for(i = 0; i < data.length; i++){
            var konkurrent = data[i];
            m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
        }
        var array = [];
        for(var key of m.keys()){
            array.push(key);
        }
        array.sort(function(a,b){
            return a - b;
        });
        for(i = 0; i < array.length;i++){
            var tr = document.createElement("tr");
            var tNavn = document.createElement("td");
            var tRank = document.createElement("td");
            var tScore = document.createElement("td");
            var person = m.get(array[i]);
            tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
            tRank.innerHTML = array[i];
            tScore.innerHTML = person[1];
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tScore);
            var tabell = document.getElementById("tabellBodyTotalIr");
            tabell.appendChild(tr);
        }
    });
}

function nesteFemInternAarlig(frem){
    var idSession = JSON.parse(sessionStorage.getItem("hukommelse"));
    var id = idSession.cristinID;
    var rank = sessionStorage.getItem("rankInternAarlig");
    var modus = document.getElementById("modus").value;
    var aar = document.getElementById("aar").value;
    var url = "";
    if(frem == true){
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/1/" + aar+ "/1";
    }
    else{
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/1/" + aar +"/0";
    }
    $.getJSON(url, function(data) {
        var tabell = document.getElementById("tabellBodyAarligIr");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        sessionStorage.setItem("rankInternAarlig", data[2].rankNytt);
        if(modus == "0" || modus == "1" || modus == "2" || modus == "3") {
            var ranking = data[2].rankNytt;
            if(ranking <= 3) {
                document.getElementById("forrigeInternAarlig").style.display = "none";
            } else {
                document.getElementById("forrigeInternAarlig").style.display = "inline";
            }
        }

        m = new Map();
        for(i = 0; i < data.length; i++){
            var konkurrent = data[i];
            m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
        }
        var array = [];
        for(var key of m.keys()){
            array.push(key);
        }
        array.sort(function(a,b){
            return a - b;
        });
        for(i = 0; i < array.length;i++){
            var tr = document.createElement("tr");
            var tNavn = document.createElement("td");
            var tRank = document.createElement("td");
            var tScore = document.createElement("td");
            var person = m.get(array[i]);
            tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
            tRank.innerHTML = array[i];
            tScore.innerHTML = person[1];
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tScore);
            var tabell = document.getElementById("tabellBodyAarligIr");
            tabell.appendChild(tr);
        }
    });
}

function nesteFemTotal(frem){
    var url = "",
        idSession = JSON.parse(sessionStorage.getItem("hukommelse")),
        rank = sessionStorage.getItem("rankNytt"),
        id = idSession.cristinID,
        modus = document.getElementById("modus").value;
    if(frem == true){
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/0/1";
    }
    else{
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/0/0";
    }
    $.getJSON(url, function(data) {
        var tabell = document.getElementById("tabellBody");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        sessionStorage.setItem("rankNytt", data[2].rankNytt);
        if(modus == "0" || modus == "1" || modus == "2" || modus == "3") {
            var ranking = data[2].rankNytt;
            if(ranking <= 3) {
                document.getElementById("forrige").style.display = "none";
            } else {
                document.getElementById("forrige").style.display = "inline";
            }
        }

        m = new Map();
        for(i = 0; i < data.length; i++){
            var konkurrent = data[i];
            m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.akronymer,konkurrent.score,konkurrent.cristinID]);
        }
        var array = [];
        for(var key of m.keys()){
            array.push(key);
        }
        array.sort(function(a,b){
            return a - b;
        });
        for(i = 0; i < array.length;i++){
            var tr = document.createElement("tr");
            var tNavn = document.createElement("td");
            var tRank = document.createElement("td");
            var tAkronym = document.createElement("td");
            var tScore = document.createElement("td");
            var person = m.get(array[i]);
            tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[3]+")>" + person[0] + "</a>";
            tRank.innerHTML = array[i];
            tAkronym.innerHTML = person[1];
            tScore.innerHTML = person[2];
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tAkronym);
            tr.appendChild(tScore);
            var tabell = document.getElementById("tabellBody");
            tabell.appendChild(tr);
        }
    });
}

function nesteFemAarlig(frem){
    var idSession = JSON.parse(sessionStorage.getItem("hukommelse"));
    var id = idSession.cristinID;
    var rank = sessionStorage.getItem("rankAarlig");
    var modus = document.getElementById("modus").value;
    var aar = document.getElementById("aar").value;
    var url = "";
    if(frem == true){
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/0/" + aar+ "/1";
    }
    else{
        url = "http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/navigasjon/" + id + "/" + rank + "/" + modus + "/0/" + aar +"/0";
    }
    $.getJSON(url, function(data) {
        var tabell = document.getElementById("tabellAarligBody");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        sessionStorage.setItem("rankAarlig", data[2].rankNytt);
        if(modus == "0" || modus == "1" || modus == "2" || modus == "3") {
            var ranking = data[2].rankNytt;
            if(ranking <= 3) {
                document.getElementById("forrigeAarlig").style.display = "none";
            } else {
                document.getElementById("forrigeAarlig").style.display = "inline";
            }
        }

        m = new Map();
        for(i = 0; i < data.length; i++){
            var konkurrent = data[i];
            m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.akronymer,konkurrent.score,konkurrent.cristinID]);
        }
        var array = [];
        for(var key of m.keys()){
            array.push(key);
        }
        array.sort(function(a,b){
            return a - b;
        });
        for(i = 0; i < array.length;i++){
            var tr = document.createElement("tr");
            var tNavn = document.createElement("td");
            var tRank = document.createElement("td");
            var tAkronym = document.createElement("td");
            var tScore = document.createElement("td");
            var person = m.get(array[i]);
            tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[3]+")>" + person[0] + "</a>";
            tRank.innerHTML = array[i];
            tAkronym.innerHTML = person[1];
            tScore.innerHTML = person[2];
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tAkronym);
            tr.appendChild(tScore);
            var tabell = document.getElementById("tabellAarligBody");
            tabell.appendChild(tr);
        }
    });
}

function skiftModus() {
    var idSession = JSON.parse(sessionStorage.getItem("hukommelse"));
    var id = idSession.cristinID;
    var modus = document.getElementById("modus");

    skiftAar();

    $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/" + id + "/" + modus.value, function(data) {
        document.getElementById("scoreHeader").innerHTML = modus.options[modus.selectedIndex].innerHTML;
        document.getElementById("scoreAarligHeader").innerHTML = modus.options[modus.selectedIndex].innerHTML;
        document.getElementById("scoreInternHeader").innerHTML = modus.options[modus.selectedIndex].innerHTML;
        document.getElementById("scoreInternAarligHeader").innerHTML = modus.options[modus.selectedIndex].innerHTML;
        document.getElementById("internTabellFeil").innerHTML = "";
        document.getElementById("tabellFeil").innerHTML = "";
        var tabell = document.getElementById("tabellBody");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        var tabell = document.getElementById("tabellBodyTotalIr");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        if(data.navn == "Ingen produksjon"){
            document.getElementById("tabellFeil").innerHTML = "INGEN PRODUKSJON!";
            document.getElementById("internTabellFeil").innerHTML = "INGEN PRODUKSJON!";
        } else{
            sessionStorage.setItem("rankNytt", data.rankNytt);

            m = new Map();
            for(i = 0; i < data.konkurrenter.length; i++){
                var konkurrent = data.konkurrenter[i];
                m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.akronymer,konkurrent.score,konkurrent.cristinID]);
            }
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
                var tAkronym = document.createElement("td");
                var tScore = document.createElement("td");
                var person = m.get(array[index]);
                if(array[i] == data.rankNytt){
                    // HENT PERSON AKRONYMR HER
                    tNavn.innerHTML = data.navn;
                    tRank.innerHTML = array[i];
                }
                else{
                    tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[3]+")>" + person[0] + "</a>";
                    tRank.innerHTML = array[index];
                }
                tAkronym.innerHTML = person[1];
                tScore.innerHTML = person[2];
                index++;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tAkronym);
                tr.appendChild(tScore);
                var tabell = document.getElementById("tabellBody");
                tabell.appendChild(tr);
            }

            // INTERN TOTAL
            if(data.akronymer == "") {
                document.getElementById("internTabellFeil").innerHTML = "INGEN AKTIVE TILHØRIGHETER!";
                document.getElementById("internTabellFeil").innerHTML = "INGEN AKTIVE TILHØRIGHETER!";
            } else {
                var intern = data.intern;
                console.log("Intern rangering etter " + intern.rank);
                sessionStorage.setItem("rankIntern", intern.rank);
                if(modus.value == "0" || modus.value == "1" || modus.value == "2" || modus.value == "3") {
                    var rankTotalt = data.rankNytt,
                        rankIntern = sessionStorage.getItem("rankIntern"),
                        rankInternAarlig = sessionStorage.getItem("rankInternAarlig"),
                        rankAarlig = sessionStorage.getItem("rankAarlig");
                    console.log("Intern rangering før " + rankIntern);
                    if(rankTotalt <= 3) {
                        document.getElementById("forrige").style.display = "none";
                    } else {
                        document.getElementById("forrige").style.display = "inline";
                    }
                    if(rankIntern <= 3) {
                        document.getElementById("forrigeIntern").style.display = "none";
                    } else {
                        document.getElementById("forrigeIntern").style.display = "inline";
                    }
                    if(rankInternAarlig <= 3) {
                        document.getElementById("forrigeInternAarlig").style.display = "none";
                    } else {
                        document.getElementById("forrigeInternAarlig").style.display = "inline";
                    }
                    if(rankAarlig <= 3) {
                        document.getElementById("forrigeAarlig").style.display = "none";
                    } else {
                        document.getElementById("forrigeAarlig").style.display = "inline";
                    }
                }
                m = new Map();
                for(i = 0; i < intern.internKonkurrenter.length; i++){
                    var konkurrent = intern.internKonkurrenter[i];
                    m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
                }
                m.set(intern.rank,[data.navn, intern.score]);
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
                    if(array[i] == intern.rank){
                        // HENT PERSON AKRONYMR HER
                        tNavn.innerHTML = data.navn;
                        tRank.innerHTML = array[i];
                    }
                    else{
                        tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
                        tRank.innerHTML = array[index];
                    }
                    tScore.innerHTML = person[1];
                    index++;
                    tr.appendChild(tRank);
                    tr.appendChild(tNavn);
                    tr.appendChild(tScore);
                    var tabell = document.getElementById("tabellBodyTotalIr");
                    tabell.appendChild(tr);
                }
            }
        }
    });
}

function skiftAar() {
    var idSession = JSON.parse(sessionStorage.getItem("hukommelse"));
    var id = idSession.cristinID;
    var aar = document.getElementById("aar").value;
    document.getElementById("internAarligLabel").innerHTML = "Internt år: " + aar;
    document.getElementById("aarligLabel").innerHTML = "År: " + aar;
    document.getElementById("aarligInternTabellFeil").innerHTML = "";
    document.getElementById("aarligTabellFeil").innerHTML = "";
    var modus = document.getElementById("modus").value;

    $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/" + id + "/" + modus + "/" + aar, function(data) {
        var tabell = document.getElementById("tabellAarligBody");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        var tabell = document.getElementById("tabellBodyAarligIr");
        while (tabell.hasChildNodes()) {
            tabell.removeChild(tabell.lastChild);
        }
        if(data[0].navn == "Ingen produksjon") {
            document.getElementById("aarligTabellFeil").innerHTML = "INGEN PRODUKSJON I DETTE ÅRET!";
            document.getElementById("aarligInternTabellFeil").innerHTML = "INGEN PRODUKSJON I DETTE ÅRET!";
            document.getElementById("forrigeAarlig").style.display = "none";
            document.getElementById("nesteAarlig").style.display = "none";
            document.getElementById("forrigeInternAarlig").style.display = "none";
            document.getElementById("nesteInternAarlig").style.display = "none";
        } else {
            document.getElementById("nesteAarlig").style.display = "inline";
            document.getElementById("nesteInternAarlig").style.display = "inline";
            sessionStorage.setItem("rankAarlig", data[0].rank);
            m = new Map();
            for(i = 0; i < data[0].konkurrenter.length; i++){
                var konkurrent = data[0].konkurrenter[i];
                m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.akronymer,konkurrent.score,konkurrent.cristinID]);
            }
            m.set(data[0].rank,[data[0].navn, data[0].akronymer, data[0].score]);
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
                var tAkronym = document.createElement("td");
                var tScore = document.createElement("td");
                var person = m.get(array[index]);
                if(array[i] == data[0].rank){
                    // HENT PERSON AKRONYMR HER
                    tNavn.innerHTML = data[0].navn;
                    tRank.innerHTML = array[i];
                }
                else{
                    tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[3]+")>" + person[0] + "</a>";
                    tRank.innerHTML = array[index];
                }
                tAkronym.innerHTML = person[1];
                tScore.innerHTML = person[2];
                index++;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tAkronym);
                tr.appendChild(tScore);
                var tabell = document.getElementById("tabellAarligBody");
                tabell.appendChild(tr);
            }
            sessionStorage.setItem("rankInternAarlig", data[1].rank);

            if(modus == "0" || modus == "1" || modus == "2" || modus == "3") {
                var rankAarlig = sessionStorage.getItem("rankAarlig"),
                    rankInternAarlig = sessionStorage.getItem("rankInternAarlig");
                console.log(rankAarlig);
                console.log(rankInternAarlig);
                if(rankAarlig <= 3) {
                    document.getElementById("forrigeAarlig").style.display = "none";
                } else {
                    document.getElementById("forrigeAarlig").style.display = "inline";
                }
                if(rankInternAarlig <= 3) {
                    document.getElementById("forrigeInternAarlig").style.display = "none";
                } else {
                    document.getElementById("forrigeInternAarlig").style.display = "inline";
                }
            }

            m = new Map();
            for(i = 0; i < data[1].konkurrenter.length; i++){
                var konkurrent = data[1].konkurrenter[i];
                m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
            }
            m.set(data[1].rank,[data[1].navn, data[1].score]);
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
                if(array[i] == data[1].rank){
                    // HENT PERSON AKRONYMR HER
                    tNavn.innerHTML = data[1].navn;
                    tRank.innerHTML = array[i];
                }
                else{
                    tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
                    tRank.innerHTML = array[index];
                }
                tScore.innerHTML = person[1];
                index++;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tScore);
                var tabell = document.getElementById("tabellBodyAarligIr");
                tabell.appendChild(tr);
            }
        }
    });

}

function fjernData1(id) {
    var temp = document.getElementById(id);
    var tempParent = temp.parentNode;
    tempParent.parentNode.removeChild(tempParent);
}

function fjernData2(id) {
    var temp = document.getElementById(id);
    temp.parentNode.removeChild(temp);
}

//Henter inn json objektet
function hentPerson() {
    var data = JSON.parse(sessionStorage.getItem("hukommelse"));
    var personNavn = "";
    if(data == null){
        personNavn = "UGYLDIG PERSONID";
    }
    else{
        personNavn = "Søkeresultat: " + " " + data.navn;
    }
    document.getElementById("personTag").innerHTML = personNavn;

    if(data.status == "Null forskning!"){
        fjernData1("poeng");
        fjernData1("poengNytt");
        fjernData1("rank");
        fjernData1("rankNytt");
        fjernData1("kroner");
        fjernData2("modus");
        fjernData2("visningLabel");
        fjernData2("norgesRank");
        fjernData2("internRank");
        fjernData2("infoCircle");
        fjernData2("footer");
        document.getElementById("status").innerHTML = data.status;
    } else{
        if (typeof data.rankNytt !== 'undefined'){
            sessionStorage.setItem("rankNytt", data.rankNytt);
        }

        if (typeof data.aarlig.rank !== 'undefined'){
            sessionStorage.setItem("rankAarlig", data.aarlig.rank);
        }
        if (typeof data.intern !== 'undefined'){
            sessionStorage.setItem("rankIntern", data.intern.rank);
        }
        if (typeof data.internAarlig !== 'undefined'){
            sessionStorage.setItem("rankInternAarlig", data.internAarlig.rank);
        }
        document.getElementById("poeng").innerHTML = "Publikasjonspoeng gammelt tellekantsystem: " + data.poeng;
        document.getElementById("poengNytt").innerHTML = "Publikasjonspoeng: " + data.poengNytt;
        document.getElementById("kroner").innerHTML = "Publikasjonsverdi: " + Math.round(data.kroner).toLocaleString() + " kroner!";
        document.getElementById("rankNytt").innerHTML = "Norgesrangering: " + data.rankNytt +".";
        document.getElementById("rank").innerHTML = "Norgesrangering gammelt tellekantsystem: " + data.rank +".";
        document.getElementById("status").innerHTML = data.status;

        var institusjonsAkronym = data.akronymer;
        var indexKomma = institusjonsAkronym.indexOf(",");
        if(indexKomma == -1){
            document.getElementById("internRankingNavn").innerHTML = "Intern rangering for: " + institusjonsAkronym;
        }
        else{
            institusjonsAkronym = institusjonsAkronym.substring(0, indexKomma);
            document.getElementById("internRankingNavn").innerHTML = "Intern rangering for: " + institusjonsAkronym;
        }

        m = new Map();
        for(i = 0; i < data.konkurrenter.length; i++){
            var konkurrent = data.konkurrenter[i];
            m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.akronymer,konkurrent.score,konkurrent.cristinID]);
        }
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
            var tAkronym = document.createElement("td");
            var tScore = document.createElement("td");
            var person = m.get(array[index]);
            if(array[i] == data.rankNytt){
                // HENT PERSON AKRONYMR HER
                tNavn.innerHTML = data.navn;
                tRank.innerHTML = array[i];
            }
            else{
                tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[3]+")>" + person[0] + "</a>";
                tRank.innerHTML = array[index];
            }
            tAkronym.innerHTML = person[1];
            tScore.innerHTML = person[2];
            index++;
            tr.appendChild(tRank);
            tr.appendChild(tNavn);
            tr.appendChild(tAkronym);
            tr.appendChild(tScore);
            var tabell = document.getElementById("tabellBody");
            tabell.appendChild(tr);
        }

        /*if(data.rankNytt == 1 || data.rankNytt == 2 || data.rankNytt == 3){
            document.getElementById("forrigeIntern").style.display = "none";
            document.getElementById("forrigeInternAarlig").style.display = "none";
            document.getElementById("forrige").style.display = "none";
            document.getElementById("forrigeAarlig").style.display = "none";

        }*/
        if(modus.value == "0" || modus.value == "1" || modus.value == "2" || modus.value == "3") {
            var rankTotalt = data.rankNytt,
                rankIntern = sessionStorage.getItem("rankIntern"),
                rankInternAarlig = sessionStorage.getItem("rankInternAarlig"),
                rankAarlig = sessionStorage.getItem("rankAarlig");
            if(rankTotalt <= 3) {
                document.getElementById("forrige").style.display = "none";
            } else {
                document.getElementById("forrige").style.display = "inline";
            }
            if(rankIntern <= 3) {
                document.getElementById("forrigeIntern").style.display = "none";
            } else {
                document.getElementById("forrigeIntern").style.display = "inline";
            }
            if(rankInternAarlig <= 3) {
                document.getElementById("forrigeInternAarlig").style.display = "none";
            } else {
                document.getElementById("forrigeInternAarlig").style.display = "inline";
            }
            if(rankAarlig <= 3) {
                document.getElementById("forrigeAarlig").style.display = "none";
            } else {
                document.getElementById("forrigeAarlig").style.display = "inline";
            }
        }

        var aarlig = data.aarlig;
        if(aarlig.navn == "Ingen produksjon"){
            document.getElementById("aarligTabellFeil").innerHTML = "INGEN PRODUKSJON I DETTE ÅRET!";
            document.getElementById("nesteAarlig").style.display = "none";
            document.getElementById("forrigeAarlig").style.display = "none";
        }
        else{
            m = new Map();
            for(i = 0; i < aarlig.konkurrenter.length; i++){
                var konkurrent = aarlig.konkurrenter[i];
                m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.akronymer,konkurrent.score,konkurrent.cristinID]);
            }
            m.set(aarlig.rank,[aarlig.navn, data.akronymer, aarlig.score]);
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
                var tAkronym = document.createElement("td");
                var tScore = document.createElement("td");
                var person = m.get(array[index]);
                if(array[i] == aarlig.rank){
                    // HENT PERSON AKRONYMR HER
                    tNavn.innerHTML = aarlig.navn;
                    tRank.innerHTML = array[i];
                }
                else{
                    tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[3]+")>" + person[0] + "</a>";
                    tRank.innerHTML = array[index];
                }
                tAkronym.innerHTML = person[1];
                tScore.innerHTML = person[2];
                index++;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tAkronym);
                tr.appendChild(tScore);
                var tabell = document.getElementById("tabellAarligBody");
                tabell.appendChild(tr);
            }

        }

        if(data.akronymer == ""){
            document.getElementById("internTabellFeil").innerHTML = "INGEN AKTIVE TILHØRIGHETER!";
            document.getElementById("forrigeIntern").style.display = "none";
            document.getElementById("nesteIntern").style.display = "none"; document.getElementById("aarligInternTabellFeil").innerHTML = "INGEN AKTIVE TILHØRIGHETER!";
            document.getElementById("forrigeInternAarlig").style.display = "none";
            document.getElementById("nesteInternAarlig").style.display = "none";
        } else {
            var intern = data.intern;

            m = new Map();
            for(i = 0; i < intern.internKonkurrenter.length; i++){
                var konkurrent = intern.internKonkurrenter[i];
                m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
            }
            m.set(intern.rank,[data.navn, intern.score]);
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
                if(array[i] == intern.rank){
                    // HENT PERSON AKRONYMR HER
                    tNavn.innerHTML = data.navn;
                    tRank.innerHTML = array[i];
                }
                else{
                    tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
                    tRank.innerHTML = array[index];
                }
                tScore.innerHTML = person[1];
                index++;
                tr.appendChild(tRank);
                tr.appendChild(tNavn);
                tr.appendChild(tScore);
                var tabell = document.getElementById("tabellBodyTotalIr");
                tabell.appendChild(tr);
            }

            var internAarlig = data.internAarlig;
            if(internAarlig.navn == "Ingen produksjon"){
                document.getElementById("aarligInternTabellFeil").innerHTML = "INGEN PRODUKSJON I DETTE ÅRET!";
                document.getElementById("forrigeInternAarlig").style.display = "none";
                document.getElementById("nesteInternAarlig").style.display = "none";
            } else{

                m = new Map();
                for(i = 0; i < internAarlig.konkurrenter.length; i++){
                    var konkurrent = internAarlig.konkurrenter[i];
                    m.set(konkurrent.rankNytt,[konkurrent.navn,konkurrent.score,konkurrent.cristinID]);
                }
                m.set(internAarlig.rank,[internAarlig.navn, internAarlig.score]);
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
                    if(array[i] == internAarlig.rank){
                        // HENT PERSON AKRONYMR HER
                        tNavn.innerHTML = internAarlig.navn;
                        tRank.innerHTML = array[i];
                    }
                    else{
                        tNavn.innerHTML = "<a title='Klikk for å se denne personen' id='btnTabell' onclick=tabellSok("+person[2]+")>" + person[0] + "</a>";
                        tRank.innerHTML = array[index];
                    }
                    tScore.innerHTML = person[1];
                    index++;
                    tr.appendChild(tRank);
                    tr.appendChild(tNavn);
                    tr.appendChild(tScore);
                    var tabell = document.getElementById("tabellBodyAarligIr");
                    tabell.appendChild(tr);
                }
            }
        }
    }
    // assosiasjoner
    var asListe = document.getElementById("assosiasjoner");
    if(!data.assosiasjoner.length == 0){
        var placeholder = document.getElementById("placeHolderTilhorighet");
        placeholder.parentNode.removeChild(placeholder);
    }
    for(i = 0; i < data.assosiasjoner.length; i++){
        var li = document.createElement("li");
        var tilhorighet = data.assosiasjoner[i];
        li.innerHTML = tilhorighet;
        asListe.appendChild(li);
    }
    //Tidligere assosiasjoner
    var asListe = document.getElementById("gamleAssosiasjoner");
    if(!data.tidligereAssosiasjoner.length == 0){
        var placeholder = document.getElementById("placeHolderTidligereTilhorighet");
        placeholder.parentNode.removeChild(placeholder);
    }
    for(i = 0; i < data.tidligereAssosiasjoner.length; i++){
        var li = document.createElement("li");
        li.className = "tidligereTil";
        li.title = "Tidligere tilhørigheter";
        var tilhorighet = data.tidligereAssosiasjoner[i];
        li.innerHTML = tilhorighet;
        asListe.appendChild(li);
    }
}

function Redirect() {
    window.location="http://forskningsindeksen.vlab.cs.hioa.no/sokPerson.html";
}

function tabellSok(id){
    $.getJSON("http://forskningsindeksen.vlab.cs.hioa.no:9999/api.forskningsindeksen/v1/person/" + id, function(data) {
        sessionStorage.setItem("hukommelse", JSON.stringify(data));
        Redirect();
    });

}

//#til-toppen knapp
var fixed = false;
$(document).scroll(function() {
    var scroller = $(this).scrollTop();
    if (scroller >= 250 && scroller <= 860) {
        $('#toppen').css({
            color: '#FF4C3B'
        });
        if (!fixed) {
            fixed = true;
            $('#toppen').show("slow", function() {
                $('#toppen').css({
                    position: 'fixed',
                    display: 'block',
                    color: '#FF4C3B'
                });
            });
        }
    } else if(scroller >= 860){
        $('#toppen').css({
            color: '#FF4C3B'
        });
    } else {
        if (fixed) {
            fixed = false;
            $('#toppen').hide("slow", function() {
                $('#toppen').css({
                    display: 'none'
                });
            });
        }
    }
});
