/* script.js - contact form: validates in the browser, then sends the message through Formspree
   (messages arrive by email). Only runs on contact.html. */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var summary = document.getElementById('error-summary');
  var success = document.getElementById('success-message');
  var fields = ['name', 'email', 'subject', 'message'];
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Returns an error message for a field, or '' if it is valid.
  function check(id) {
    var value = form.elements[id].value.trim();
    var label = { name: 'name', email: 'email address', subject: 'subject', message: 'message' }[id];
    if (!value) return 'Enter your ' + label + '.';
    if (id === 'email' && !emailPattern.test(value)) return 'Enter an email address like name@example.com.';
    if (id === 'message' && value.length < 10) return 'Write at least 10 characters in your message.';
    return '';
  }

  function show(id, msg) {
    var input = form.elements[id];
    var out = document.getElementById(id + '-error');
    out.textContent = msg ? 'Error: ' + msg : '';
    if (msg) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  // Validate a field when the user leaves it, so errors appear early.
  fields.forEach(function (id) {
    form.elements[id].addEventListener('blur', function () { show(id, check(id)); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    success.textContent = '';
    var problems = [];
    fields.forEach(function (id) {
      var msg = check(id);
      show(id, msg);
      if (msg) problems.push({ id: id, msg: msg });
    });

    if (problems.length) {
      // Summary with links to each problem field; focus moves to it for screen readers.
      summary.innerHTML = '<h2>' + (problems.length === 1 ? 'There is 1 problem' : 'There are ' + problems.length + ' problems') + ' with your message</h2><ul></ul>';
      problems.forEach(function (p) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + p.id;
        a.textContent = p.msg;
        li.appendChild(a);
        summary.querySelector('ul').appendChild(li);
      });
      summary.focus();
      return;
    }

    summary.innerHTML = '';
    var name = form.elements.name.value.trim();
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    fetch('https://formspree.io/f/maeolopz', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        success.textContent = 'Thank you, ' + name + '. Your message was sent.';
        form.reset();
      } else {
        summary.textContent = 'Sorry, your message could not be sent. Please email me at danvanthsubash@gmail.com.';
        summary.focus();
      }
    }).catch(function () {
      summary.textContent = 'Sorry, there was a network problem. Please email me at danvanthsubash@gmail.com.';
      summary.focus();
    }).then(function () { button.disabled = false; });
  });
})();
