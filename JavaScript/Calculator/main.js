function Calculator (screen) {
    var screenValue, prevValue, isNew, opMem, error,
        exp = Math.pow(10, 8);

    var refresh = function() {
        screen.value = Math.round(Number(screenValue) * exp) / exp;
    }

    this.reset = function() {
        screenValue = "0";
        prevValue = 0;
        isNew = true;
        opMem = undefined;
        refresh();
    }

    this.numberButton = function(n) {
        if (!n && screenValue === "0") {return};
        screenValue = isNew ? String(n) : screenValue + String(n);
        isNew = false;
        refresh();
    }

    this.dotButton = function() {
        screenValue += ".";
        isNew = false;
        refresh();
    }

    this.percenteButton = function() {
        screenValue = Number(screenValue) / 100;
        refresh();
    }

    this.plusMinusButton = function() {
        screenValue = screenValue[0] === "-" ? screenValue.substring(1) : "-" + screenValue;
        refresh();
    }

    this.operateButton = function(operator) {
        if (opMem) {
            this.equalButton();
        }
        opMem = operator;
        isNew = true;
        prevValue = Number(screenValue);
    }

    this.equalButton = function() {
        if (opMem) {
            var nCurrent = Number(screenValue),
                temp = nCurrent;

            switch (opMem) {
                case "+":
                    nCurrent = prevValue + nCurrent;
                    break;
                case "-":
                    nCurrent = prevValue - nCurrent;
                    break;
                case "*":
                    nCurrent = prevValue * nCurrent;
                    break;
                case "/":
                    if (!Number(screenValue)) {

                        error = true;
                        nCurrent = 0;
                        opMem = undefined;
                    }
                    else {
                        nCurrent = prevValue / nCurrent;
                    }
                    break;
            }
            screenValue = error ? "ERROR" : nCurrent;
            prevValue = temp;
            error = false;
            isNew = true;
        }
        refresh();

    }
}

(function() {
    function bindButton(id, func) {
        document.getElementById(id).addEventListener("click", func);
    }

    var calculator = new Calculator(document.getElementById("screen"));
    calculator.reset();

    // number binds
    for (var n = 0; n < 10; n++) {
        bindButton("b" + n, function(value){
            return function() {
                calculator.numberButton(value);
            }
        }(n));
    }
    // AC
    bindButton("bAC", calculator.reset);
    // Dot
    bindButton("bDot", calculator.dotButton);
    // Percente
    bindButton("bPercent", calculator.percenteButton);
    // PlusMinus
    bindButton("bPlusMinus", calculator.plusMinusButton);
    //operators
    bindButton("bPlus", function(){calculator.operateButton("+")});
    bindButton("bMinus", function(){calculator.operateButton("-")});
    bindButton("bMult", function(){calculator.operateButton("*")});
    bindButton("bDiv", function(){calculator.operateButton("/")});

    bindButton("bRes", calculator.equalButton);


}())
