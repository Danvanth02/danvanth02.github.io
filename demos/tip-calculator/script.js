(function () {
  var form = document.getElementById('form'), error = document.getElementById('error');
  var line = document.getElementById('line'), each = document.getElementById('each');
  function money(n) { return '\u20B9' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bill = parseFloat(document.getElementById('bill').value);
    var tip = parseFloat(document.getElementById('tip').value);
    var people = parseInt(document.getElementById('people').value, 10);
    error.textContent = '';
    if (!(bill > 0)) { error.textContent = 'Error: enter a bill amount greater than 0.'; document.getElementById('bill').focus(); return; }
    if (!(people >= 1)) { error.textContent = 'Error: enter at least 1 person.'; document.getElementById('people').focus(); return; }
    var tipAmount = bill * tip / 100, total = bill + tipAmount;
    line.textContent = 'Tip ' + money(tipAmount) + ', total ' + money(total) + '. Each person pays:';
    each.textContent = money(total / people);
  });
})();
