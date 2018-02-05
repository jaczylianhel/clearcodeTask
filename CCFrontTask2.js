'use strict'
//zmienna podawana do funkcji
let runes = ['El', 'Eld', 'Tir', 'Nef', 'Eth', 'Ith', 'Tal', 'Ral', 'Ort', 'Thul', 'Amn', 'Sol', 'Shael', 'Dol', 'Hel', 'Io', 'Lum', 'Ko', 'Fal', 'Lem', 'Pul', 'Um', 'Mal', 'Ist', 'Gul', 'Vex', 'Ohm', 'Lo', 'Sur', 'Ber', 'Jah', 'Cham', 'Zod'];

let power = [28, 33, 9, 7, 31, 22, 8, 25, 18, 13, 6, 10, 17, 11, 12, 20, 32, 27, 14, 26, 15, 16, 21, 4, 23, 24, 1, 2, 30, 3, 5, 29, 19];

let oppositive = ['Ort', 'Sur', 'Eth', 'Ist', 'Tir', 'Pul', 'Io', 'Um', 'El', 'Sol', 'Fal', 'Thul', 'Lem', 'Hel', "Dol", "Tal", "Gul", "Mal", "Amn", "Shael", "Ith", "Ral", "Ko", "Nef", "Lum", "Ohm", "Vex", "Cham", "Eld", " ", "Zod", "Lo", "Jah"];

let tableRune = [];
let total = [];
let tabWords = [];
let tabPowers = [];
let tabOposites = [];
let score = 0;
let newTablePower = [];
let newTableName = [];
//////////////Tworzenie klas///////////////
class Runes {
    constructor(id, name, opp, power) {
        this.id = id;
        this.name = name;
        this.opp = opp;
        this.power = power;
    }
}
class Word {
    constructor(name, power) {
        this.name = name;
        this.power = power;
    }
}




//////////////////////////////
//tworzenie tablicy asocjacyjnej z runami
///////////////////////////////
for (let i = 0; i < runes.length; i++) {
    runes[i] = new Runes(i + 1, runes[i], oppositive[i], power[i]);
}
console.log(runes);
//////////////////////////////
////sortowanie run od największej siły do najmniejszej
///////////////////////////////

let sortRunes = runes.sort(function (b, a) {

    return (a.power > b.power) ? 1 : ((b.power > a.power) ? -1 : 0);
});

//////////////////////////////
//funkcja zapisuje runy do tablic tymczasowych
///////////////////////////////
let addRunes2 = (j) => {
    tabWords.push(runes[j].name);
    tabPowers.push(runes[j].power);
    tabOposites.push(runes[j].opp);
}
//////////////////////////////
//czyszczenie tablic po skompletowaniu wyrazu
///////////////////////////////
let clearRunes = () => {
    tabWords = [];
    tabPowers = [];
    tabOposites = [];
}
//////////////////////////
//funkcja sprawdza czy runa się powtarza z już zapisanymi runami
///////////////////////////
let checkDouble = (count, name) => {
    while (count > 0) {

        if (tabOposites[count - 1] == name) {
            return count;
        }
        count--;
    }
    return count;
}
//////////////////////////////
//dodawanie skompetowanego wyrazu do tablicy
///////////////////////////////
let pushToArray = (rune, power) => {
    tableRune.push(rune);
    total.push(power);
}
//////////////////////////////
//dodawanie runy do tablicy i usuwanie jej z głównej tablicy
///////////////////////////////
let addRunes = (numberOfRune) => {
    addRunes2(numberOfRune);
    runes.splice(numberOfRune, 1);
}

//////////////////////////////
//dodawanie skompletowanego wyrazu do tablicy oraz czyszczenie tablic tymczasowych
///////////////////////////////
let makeWord = (word, power) => {
    pushToArray(word, power);
    clearRunes();

}
//////////////////////////////
//GŁÓWNA FUNKCJA
///////////////////////////////
let mainFunction = (number) => {
    let flagOppDetect = 0;
    var i = 1;
    var k = -1;
    while (runes.length != 0) {
        if (i == number + 1) {
            k = 0;
            i = 0;
            flagOppDetect = 0;
            makeWord(tabWords, tabPowers);
            if (runes.length < number) {
                break;
            }
        } else {
            k++; //k=0 flagDetect = 0
            if (flagOppDetect != 0) {
                if (checkDouble(tabWords.length, runes[flagOppDetect].name) == 0) {
                    addRunes(flagOppDetect);
                } else {
                    flagOppDetect++;
                    if (flagOppDetect + runes.length < number) {
                        console.log('Mało run do wytworzenia słowa');
                        break;
                    }
                    i--;
                }
            } else {;
                if (checkDouble(k, runes[0].name) == 0) {
                    addRunes(flagOppDetect);
                } else {
                    flagOppDetect++;
                    i--;
                }
                if (runes.length == 0) {
                    makeWord(tabWords, tabPowers);
                }
            }
        }
        i++;
    }
}
//////////////////////////////
//sumowanie siły run minus liczba run
///////////////////////////////
let countPower = () => {
    for (let i = 0; i < total.length; i++) {
        for (let j = 0; j < total[i].length; j++) {
            score += total[i][j];
        }
        score = score - total[i].length
        newTablePower.push(score);
        score = 0;
    }
}
//////////////////////////////
//tworzenie słowa z '-'
///////////////////////////////
let writeWord = () => {
    for (let i = 0; i < tableRune.length; i++) {
        newTableName.push(tableRune[i].join('-'));
    }
}
//////////////////////////////
//kompletowanie słowa i mocy oraz wyświetlenie całości
///////////////////////////////
let writeComplete = () => {
    if (newTableName.length > 10) {
        newTableName.length = 10;
    }
    for (let i = 0; i < newTableName.length; i++) {
        newTableName[i] = new Word(newTableName[i], newTablePower[i]);
    }
    console.log(newTableName);
}
//////////////////////////////
//moduły do wykonania
///////////////////////////////
let generateWord = (num) => {
    mainFunction(num);
    countPower();
    writeWord();
    writeComplete();
}

let generateRunicWords = num => {
    generateWord(num);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////SECOND TASK////////////////////////////////////////////////
let tmparr = [];
let sRunicWord = [];
let tmp;
let newPower = 0;
let isOpp = false;

//////////////////////////////
//czyszczenie tymczasowych tablic
///////////////////////////////
let clearTmp = () => {
    tmparr = [];
    tmp = "";
}

//////////////////////////////
//tworzenie tablicy z runami
///////////////////////////////
let changeWordIntoArr = (word) => {
    for (let i = 0; i < word.length; i++) {
        if (word[i] != '-') {
            tmparr.push(word[i]);
        } else {
            putRunestoArr();
            clearTmp();
        }
    }
    putRunestoArr();
}

//////////////////////////////
//laczenie liter i dodawanie runy do tablicy
///////////////////////////////
let putRunestoArr = () => {
    tmp = tmparr.join("");
    sRunicWord.push(tmp);
}

//////////////////////////////
//warunek, kiedy podano za krótki wyraz
///////////////////////////////
let enterShortWord = () => {
    if (sRunicWord == "") {
        console.log('Input cannot be empty');
    } else {
        console.log("Enter min 2 runes separated '-'");
    }
}

//////////////////////////////
//warunek, kiedy podano wlasciwy wyraz
///////////////////////////////
let enterRightWord = (i) => {
    for (let j = 0; j < runes.length; j++) {
        if (sRunicWord[i] == runes[j].name) {
            newPower += runes[j].power;
        }
    }
}
//////////////////////////////
//zamiana runy na pierwsza wielka i pozostale male litery
///////////////////////////////
let changeToUpperCase = () => {
    for (let i = 0; i < sRunicWord.length; i++) {
        sRunicWord[i] = sRunicWord[i].charAt(0).toUpperCase() + sRunicWord[i].substr(1).toLowerCase();
    }
}
//////////////////////////////
//funkcja zwracająca wynik lub error
///////////////////////////////
let countPower2 = () => {
    changeToUpperCase();
    for (let i = 0; i < sRunicWord.length; i++) {
        if (sRunicWord.length < 2) {
            enterShortWord();
        } else {
            enterRightWord(i);
        }
    }
    newPower -= sRunicWord.length;
}

let checkRunesOpp = () => {
    for (let i = 0; i < sRunicWord.length; i++) {
        for (let j = 0; j < runes.length; j++) {
            if (sRunicWord[i] == runes[j].name) {
                for (let k = 0; k < sRunicWord.length; k++) {
                    if (runes[j].opp == sRunicWord[k]) {
                        console.log("Wrong rune: " + sRunicWord[k]);
                        isOpp = true;
                    }
                }
            }
        }
    }
}

let measuringRunicWords = (runicWord) => {

    changeWordIntoArr(runicWord);
    countPower2();
    checkRunesOpp();
    (isOpp) ? console.log("Change runes"): console.log(newPower);

}
let checkRunicWord = runicWord => {
    measuringRunicWords(runicWord);
}
////////////////////////////////////////////////////
//////////////////WYTYCZNE ZADANIA//////////////////
////////////////////////////////////////////////////
checkRunicWord('El-Eld-Sur'); //////////////////
generateRunicWords(4); /////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
