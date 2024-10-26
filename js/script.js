const resetBtn = document.getElementById('reset');
const alert = document.getElementById('alert');
let tipSelect = 0;

function tipCalculator(tip) {
    let bill = parseFloat(document.getElementById('bill').value);
    let person = document.getElementById('number_people').value;
    if(bill && person && tipSelect){
        if(bill > 0 && person > 0){
            document.getElementById('error_zero').style.display = 'none';
            let totalTip = bill * (tip/100);
            let result = totalTip + (bill);
            document.getElementById('totalBillTip').innerText = `$${result.toFixed(2)}`;
            document.getElementById('totalTip').innerText = `$${totalTip.toFixed(2)}`;
            let tipPerPeson = totalTip / person;
            document.getElementById('tipPerPerson').innerText = `$${tipPerPeson.toFixed(2)}`;
            resetBtn.disabled = false;
        }else{
            if(person == 0){
                document.getElementById('number_people').value = 0;
                document.getElementById('error_zero').style.display = 'block';
                document.getElementById('error_title').innerText = `The value cannot be zero.`;
                showAlert();
            }
        }        
    }else{
        document.getElementById('error_title').innerText = `Missing data to perform the calculation.`;
        showAlert();
    }
}

document.querySelectorAll('.tip').forEach(function(boton) {
    boton.addEventListener('click', function() {
        let tip = parseFloat(boton.getAttribute('tip'));
        tipSelect = tip;
        tipCalculator(tip);
        document.querySelectorAll('.tip').forEach(function(btn) {
            btn.classList.remove('active');
        });
        if(!boton.classList.value.includes('active')){
            boton.classList.add('active');
        }
    });
});

document.getElementById('bill').addEventListener('input', function () {
    tipCalculator(tipSelect);
});

document.getElementById('number_people').addEventListener('input', function () {
   tipCalculator(tipSelect);
});

document.getElementById('custom').addEventListener('input', function () {
    let customTip = document.getElementById('custom').value;
    if(customTip > 0 && customTip < 100){
        tipSelect = customTip;
        tipCalculator(customTip);        
    }else{
        document.getElementById('error_title').innerText = `The value is incorrect.`;
        showAlert();
    }
});

function showAlert(){
    alert.classList.remove('close-alert');
    alert.classList.add('show-alert');
}

function closeAlert(){
    alert.classList.remove('show-alert');
    alert.classList.add('close-alert');
}

resetBtn.addEventListener('click', function() {
    document.getElementById('error_zero').style.display = 'none';
    document.getElementById('totalTip').innerText = `$0.00`;
    document.getElementById('tipPerPerson').innerText = `$0.00`;
    document.getElementById('totalBillTip').innerText = `$0.00`;
    document.getElementById('bill').value = '';
    document.getElementById('number_people').value= '';
    document.getElementById('custom').value= '';
    resetBtn.disabled = true;
});

