var valueCurrency = document.getElementById("InputValue");
var animation = document.getElementById("Animation");
var l1 = document.getElementById("l1");
var l2 = document.getElementById("l2");
var l3 = document.getElementById("l3");
var l4 = document.getElementById("l4");
var l5 = document.getElementById("l5");
var v1;
var v2;
var v3;

valueCurrency.value = parseFloat(1).toFixed(2);

document.querySelector('.textDropdown1').value = "R$ - Real";
document.querySelector('.textDropdown2').value = "$ - Dólar";
document.querySelector('.spanCurrency').textContent = "R$ ";

let dropdown = document.querySelector('.dropdown')
dropdown.onclick = function () {
    dropdown.classList.toggle('active');
}

let dropdown2 = document.querySelector('.dropdown2')
dropdown2.onclick = function () {
    dropdown2.classList.toggle('active');
}

function show(anything) {
    if (document.querySelector('.textDropdown2').value == anything) {
        document.querySelector('.textDropdown2').value = document.querySelector('.textDropdown1').value;
        document.querySelector('.textDropdown1').value = anything;

        if (anything == "R$ - Real") {
            document.querySelector('.spanCurrency').textContent = "R$ ";
        }
        if (anything == "$ - Dólar") {
            document.querySelector('.spanCurrency').textContent = "$ ";
        }
        if (anything == "€ - Euro") {
            document.querySelector('.spanCurrency').textContent = "€ ";
        }

    } else {
        document.querySelector('.textDropdown1').value = anything;

        if (anything == "R$ - Real") {
            document.querySelector('.spanCurrency').textContent = "R$ ";
        }
        if (anything == "$ - Dólar") {
            document.querySelector('.spanCurrency').textContent = "$ ";
        }
        if (anything == "€ - Euro") {
            document.querySelector('.spanCurrency').textContent = "€ ";
        }
    }
    InformValue();
}

function show2(anything) {
    if (document.querySelector('.textDropdown1').value == anything) {
        document.querySelector('.textDropdown1').value = document.querySelector('.textDropdown2').value;
        document.querySelector('.textDropdown2').value = anything;

        if (anything == "R$ - Real") {
            document.querySelector('.spanCurrency').textContent = "R$ ";
        }
        if (anything == "$ - Dólar") {
            document.querySelector('.spanCurrency').textContent = "$ ";
        }
        if (anything == "€ - Euro") {
            document.querySelector('.spanCurrency').textContent = "€ ";
        }
    } else {
        document.querySelector('.textDropdown2').value = anything;
    }

    InformValue();
}

function exchangeValue() {
    var t1 = document.querySelector('.textDropdown1').value;
    var t2 = document.querySelector('.textDropdown2').value;
    document.querySelector('.textDropdown1').value = t2;
    document.querySelector('.textDropdown2').value = t1;
    InformValue();
}

valueCurrency.addEventListener("keydown", function () {
    InformValue();
});

InformValue();

function InformValue() {
    if (valueCurrency.value == "" || valueCurrency.value == "e") {
        l1.textContent = "Informe um valor valido";
    } else {
        animation.style.display = 'flex';

        if (document.querySelector('.textDropdown1').value == "R$ - Real") {
            v1 = "BRL";
        }
        if (document.querySelector('.textDropdown1').value == "$ - Dólar") {
            v1 = "USD";
        }
        if (document.querySelector('.textDropdown1').value == "€ - Euro") {
            v1 = "EUR";
        }

        if (document.querySelector('.textDropdown2').value == "R$ - Real") {
            v2 = "BRL";
        }
        if (document.querySelector('.textDropdown2').value == "$ - Dólar") {
            v2 = "USD";
        }
        if (document.querySelector('.textDropdown2').value == "€ - Euro") {
            v2 = "EUR";
        }

        v3 = v1 + v2
        var url = "https://economia.awesomeapi.com.br/json/last/" + v1 + "-" + v2;

        fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                registerValue(data);
            })
            .catch((error) => {});
    }
}

function registerValue(data) {
    var initialMessage = data[v3].name;
    var de = "";
    var para = " ";
    var messageSize = initialMessage.length;

    for (var i = 0; i < messageSize; i++) {
        if (initialMessage[i] == "/") {
            var ax = i + 1;
            i = 1000;
            for (ax; ax < messageSize; ax++) {
                para = para + initialMessage[ax];
            }
        } else {
            de = de + initialMessage[i];
        }
    }

    var purchase = data[v3].bid;
    var sale = data[v3].ask;
    var averageValue = 0.00;
    var average = 0.00;

    average = purchase + sale / 2;
    average = parseFloat(average).toFixed(2);
    averageValue = parseFloat(valueCurrency.value * average).toFixed(2);

    var currentHours = new Date();
    var hours = String(currentHours.getHours()).length == 1 ? String("0" + currentHours.getHours()) : String(
        currentHours.getHours());
    var minutes = String(currentHours.getMinutes()).length == 1 ? String("0" + currentHours.getMinutes()) : String(
        currentHours.getMinutes());
    var seconds = String(currentHours.getSeconds()).length == 1 ? String("0" + currentHours.getSeconds()) : String(
        currentHours.getSeconds());
    var day = String(currentHours.getDate()).length == 1 ? String("0" + currentHours.getDate()) : String(currentHours.getDate());
    var year = String(currentHours.getFullYear());

    var currentMonth = currentHours.getMonth();
    var month = new Array(12);
    month[0] = 'Janeiro';
    month[1] = 'Fevereiro';
    month[2] = 'Março';
    month[3] = 'Abril';
    month[4] = 'Maio';
    month[5] = 'Junho';
    month[6] = 'Julho';
    month[7] = 'Agosto';
    month[8] = 'Setembro';
    month[9] = 'Outubro';
    month[10] = 'Novembro';
    month[11] = 'Dezembro';
    currentMonth = (month[currentMonth]);

    l1.textContent = parseFloat(valueCurrency.value).toFixed(2) + " " + de + " = ";
    l2.textContent = averageValue + " " + para;
    l3.textContent = "1 " + v1 + " = " + average + " " + v2;
    l4.textContent = "Conversão de " + de + " para " + para;
    l5.textContent = "Última atualização " + day + " de " + currentMonth + " de " + year + "; " + hours + " : " + minutes + " : " + seconds;

    animation.style.display = 'none';
}