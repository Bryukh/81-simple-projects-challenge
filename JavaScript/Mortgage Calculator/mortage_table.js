(function main(){
    var divTable = document.getElementById("results"),
        bCalculate = document.getElementById("calculate-btn"),
        fInput = document.getElementById("input-form");



    function checkOrSet(field, defaultValue) {
        if (!field.value || isNaN(field.value) || parseFloat(field.value) < 0) {
            field.value = defaultValue;
        }
    }

    function createTd(text, isHead) {
        var td = document.createElement(isHead ? "th" : "td");
        td.innerHTML = text;
        return td;
    }

    function round(number, digits) {
        digits = digits || 2;
        var exp = Math.pow(10, digits);
        return Math.round(number * exp) / exp;
    }

    function refreshTable(where) {
        while (where.firstChild) {
            where.firstChild.remove();
        }
        var table = document.createElement("table");
        divTable.appendChild(table);
        return table;
    }

    bCalculate.onclick = function(e){
        var tResult = refreshTable(divTable);
        tResult.className = "center";

        var iRate = fInput.rate,
            iDuration = fInput.duration,
            iSum = fInput.sum;
        checkOrSet(iRate, 10);
        checkOrSet(iDuration, 60);
        checkOrSet(iSum, 100000);
        iDuration.value = parseInt(iDuration.value);
        var rate = iRate.value,
            duration = iDuration.value,
            totalSum = iSum.value,
            monthlyPay = Math.round(100 * totalSum / duration) / 100,
            evenRow = false;

        var trHead = document.createElement("tr");
            th = createTd();

        trHead.appendChild(createTd("Months #", true));
        trHead.appendChild(createTd("Monthly Pay", true));
        trHead.appendChild(createTd("Acquittance", true));
        trHead.appendChild(createTd("Rate Payment", true));
        trHead.appendChild(createTd("Loan Remain", true));

        tResult.appendChild(trHead);
        for (var i = 0; i < duration; i++) {
            var tr = document.createElement("tr");
            tr.className = evenRow ? "even-row" : "odd-row";
            evenRow = !evenRow;
            var ratePay = round(rate * totalSum / 1200);
            if (totalSum < monthlyPay) {
                monthlyPay = totalSum;
                totalSum = 0;
            }
            else {
                totalSum = round(totalSum - monthlyPay);
            }
            tr.appendChild(createTd(i + 1));
            tr.appendChild(createTd(round(monthlyPay + ratePay)));
            tr.appendChild(createTd(monthlyPay));
            tr.appendChild(createTd(ratePay));

            tr.appendChild(createTd(totalSum));
            tResult.appendChild(tr);
        }
    };

})();
