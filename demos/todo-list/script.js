(function () {
  var form = document.getElementById('form'), input = document.getElementById('task');
  var list = document.getElementById('list'), status = document.getElementById('status');
  var empty = document.getElementById('empty'), tasks = [];
  try { tasks = JSON.parse(localStorage.getItem('tasks') || '[]'); } catch (e) { tasks = []; }

  function save() { try { localStorage.setItem('tasks', JSON.stringify(tasks)); } catch (e) {} }
  function say(text, bad) { status.textContent = text; status.className = 'msg' + (bad ? ' bad' : ''); }

  function render() {
    list.innerHTML = '';
    tasks.forEach(function (t, i) {
      var li = document.createElement('li');
      var box = document.createElement('input');
      box.type = 'checkbox'; box.id = 't' + i; box.checked = t.done;
      var label = document.createElement('label');
      label.htmlFor = box.id; label.textContent = t.text;
      if (t.done) label.className = 'done';
      var del = document.createElement('button');
      del.type = 'button'; del.className = 'btn alt'; del.textContent = 'Delete';
      del.setAttribute('aria-label', 'Delete task: ' + t.text);
      box.addEventListener('change', function () { t.done = box.checked; save(); render(); box.focus && document.getElementById('t' + i).focus(); });
      del.addEventListener('click', function () {
        tasks.splice(i, 1); save(); render(); say('Deleted: ' + t.text); input.focus();
      });
      li.appendChild(box); li.appendChild(label); li.appendChild(del); list.appendChild(li);
    });
    empty.hidden = tasks.length > 0;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) { say('Error: type a task before adding it.', true); input.focus(); return; }
    tasks.push({ text: text, done: false });
    save(); render(); say('Added: ' + text);
    input.value = ''; input.focus();
  });
  render();
})();
