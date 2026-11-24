(function () {
  var questions = [
    { q: 'What does HTML stand for?', a: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language'], c: 0 },
    { q: 'Which CSS property changes the text colour?', a: ['font-style', 'color', 'text-size'], c: 1 },
    { q: 'Which JavaScript keyword declares a constant?', a: ['var', 'let', 'const'], c: 2 },
    { q: 'What does "git commit" do?', a: ['Uploads code to GitHub', 'Saves a snapshot of staged changes', 'Deletes the repository'], c: 1 },
    { q: 'Which HTML element is best for the main navigation links?', a: ['<nav>', '<div>', '<span>'], c: 0 }
  ];
  var quiz = document.getElementById('quiz'), feedback = document.getElementById('feedback');
  var actions = document.getElementById('actions'), progress = document.getElementById('progress');
  var index = 0, score = 0, answered = false;

  function button(text, cls, fn) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'btn ' + cls; b.textContent = text; b.addEventListener('click', fn);
    actions.innerHTML = ''; actions.appendChild(b);
  }

  function show() {
    var item = questions[index]; answered = false; feedback.textContent = ''; feedback.className = 'msg';
    progress.textContent = 'Question ' + (index + 1) + ' of ' + questions.length;
    quiz.innerHTML = '';
    var fs = document.createElement('fieldset'), lg = document.createElement('legend');
    lg.textContent = item.q; lg.tabIndex = -1; fs.appendChild(lg);
    item.a.forEach(function (text, i) {
      var l = document.createElement('label'), r = document.createElement('input');
      r.type = 'radio'; r.name = 'answer'; r.value = i;
      l.appendChild(r); l.appendChild(document.createTextNode(' ' + text)); fs.appendChild(l);
    });
    quiz.appendChild(fs); lg.focus();
    button('Check answer', '', check);
  }

  function check() {
    var chosen = quiz.querySelector('input:checked');
    if (!chosen) { feedback.className = 'msg bad'; feedback.textContent = 'Error: choose an answer first.'; return; }
    var item = questions[index];
    if (Number(chosen.value) === item.c) { score++; feedback.textContent = 'Correct.'; }
    else { feedback.className = 'msg bad'; feedback.textContent = 'Not quite. The answer is: ' + item.a[item.c]; }
    Array.prototype.forEach.call(quiz.querySelectorAll('input'), function (i) { i.disabled = true; });
    if (index < questions.length - 1) button('Next question', '', function () { index++; show(); });
    else button('See my score', '', finish);
  }

  function finish() {
    quiz.innerHTML = ''; progress.textContent = 'Quiz finished';
    feedback.className = 'msg'; feedback.textContent = 'You scored ' + score + ' out of ' + questions.length + '.';
    button('Try again', 'alt', function () { index = 0; score = 0; show(); });
  }
  show();
})();
