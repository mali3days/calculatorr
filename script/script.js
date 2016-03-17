function turnOn() {
    soundClick();
    switchOn = true;
    mirrorDisplay();
    output.value = "0";
    storage = "";
    buf = "";
}

function turnOff() {
        switchOn = false;
        soundclick = false;
        output.value = "";
        storage = "";
        buf = "";
        noteDisplay();
        mirrorDisplay();
}

function soundClick() {
    if (soundclick) {
        beep.play();
    }
}

function muteOrPlay() {
    if (switchOn == true) {
        soundclick = soundclick != true;
        noteDisplay();
    }
}

function mirrorDisplay() {
    if (switchOn == true) {
        mirror.classList.remove("nondisplay");
        mirror.classList.add("display");
        output.classList.add("shadowOn");
    }  else {
        mirror.classList.remove("display");
        mirror.classList.add("nondisplay");
        output.classList.remove("shadowOn");
    }
}

function noteDisplay() {
    if (switchOn == true) {
        if(note.classList.contains("nondisplay")) {
            note.classList.remove("nondisplay");
            note.classList.add("display");
        } else {
            note.classList.remove("display");
            note.classList.add("nondisplay");
        }
    } else {
        note.classList.remove("display");
        note.classList.add("nondisplay");
    }
}


function numPressed() {
    soundClick();
    if(switchOn) {
        try {
            if(buf.length < maxD) {
                buf += this.value;
                storage += this.value;
                output.value = buf;
            }
        }
        catch (maxD){
            output.value = buf;
        }
    }
}

function toEqual() {
    soundClick();
    if(switchOn) {
        try {
            if (catchError(storage, output)) {
                storage = "";
                output.value = 0;
            } else {
                output.value = (+(eval(storage)).toPrecision(dotLength));
                storage = output.value;
            }
        } catch (Error) {
            storage = "";
            buf = "";
            output.value = "Error";
        }
    }
}

function toPlus() {
    soundClick();
    if(switchOn) {
        try {
            if(catchError(storage, output)) {
                output.value = storage =  "+";
            } else {
                storage = eval(storage) + "+";
                outputValue();
                buf = "";
            }
        } catch (doublePlus) {
            outputValue();
        }
    }
}

function toMinus() {
    soundClick();
    if(switchOn) {
        try {
            if(catchError(storage, output)) {
                output.value = storage =  "-";
            } else {
                storage = eval(storage) + "-";
                outputValue();
                buf = "";
            }
        } catch (doubleMinus) {
            outputValue();
        }
    }
}

function toMultiply() {
    soundClick();
    if(switchOn) {
        try {
            if(catchError(storage, output)) {
                output.value = storage =  0;
            } else {
                storage = eval(storage) + "*";
                outputValue();
                buf = "";
            }
        } catch (doubleMultiply) {
            outputValue();
        }
    }
}

function toDivide() {
    soundClick();
    if (switchOn) {
        try {
            if (catchError(storage, output)) {
                output.value = storage = 0;
            } else {
                storage = eval(storage) + "/";
                outputValue();
                buf = "";
            }
        } catch (doubleMultiply) {
            outputValue();
        }
    }
}

function getSqrt() {
    soundClick();
    if (switchOn) {
        if(storage[0] === "-"  || isNaN(output.value)) {
            output.value = "Error";
            storage = "";
            buf = "";

        } else {
            output.value = eval(Math.sqrt(+storage));
            storage = output.value;
            buf = "";
        }
    }
}

function getSqr() {
    soundClick();
    if(switchOn) {
        if(catchError(storage, output)) {
            output.value = storage =  "0";
        } else {
            storage = eval(parseFloat(storage)) * eval(parseFloat(storage)) ;
            outputValue();
            buf = "";
        }
    }
}

function catchError(stor, outp) {
    if( stor == "undefined"
        ||  stor == ""
        ||  isNaN(stor) && typeof(stor) !== "string"
        || isNaN(outp.value)) {
        return true;
    }
}

function outputValue() {
    output.value = parseFloat(storage);
}

function toDot() {
    soundClick();
    if (switchOn) {
        if (buf == "") {
            output.value = ".";
            storage += ".";
            buf += "0.";
        } else if (buf.match(/^\d*\.\d*$/)) {
            console.log("В числе может быть только одна точка");
        } else {
            storage += ".";
            buf += ".";
            output.value += ".";
        }
    }
}