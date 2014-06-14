(function() {

  window['scalave_println'] = function(elem, out) {
    var output = elem;
    while (output.firstChild) { output.removeChild(output.firstChild); }
    var pre = document.createElement('pre');
    pre.className = 'scalave_output';
    pre.style.paddingLeft = '12px';
    pre.style.borderLeft = '1px solid #666';
    pre.style.fontSize = '12px';
    pre.innerHTML = out;
    output.appendChild(pre);
  };

  var rnd = Math.random().toString(36).substring(2);

  function prefix(x) {
    return 'scalave_' + rnd + '_' + x;
  }

  window[prefix('println')] = function(out) {
    var output = document.getElementById(prefix('output'));
    scalave_println(output, out);
  };

  function unindent(x) {
    var stripped = x.replace(/^\s*\n/, '').replace(/\n\s*\n?$/,'');
    var lines = stripped.split('\n');
    var indent = 999;
    for (var i = 0; i < lines.length; i++) {
      var indents = lines[i].match(/^\s+/);
      if (indents && indents.length == 1) {
        indent = Math.min(indent, indents[0].length);
      }
    }
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(new RegExp('^\\s{' + indent + '}'), '');
    }
    return lines.join('\n');
  }

  function setup() {

    var scripts = document.getElementsByTagName('script');
    var script  = scripts[scripts.length - 1];

    var src        = document.createElement('textarea');
    src.id         = prefix('src');
    src.name       = 'src';
    src.rows       = '8';
    src.cols       = '72';
    src.style.fontFamily = 'Courier New, monospace';
    src.style.fontSize = '10pt';
    src.value      = unindent(script.text);

    var run        = document.createElement('button');
    run.onclick =
      function() {
        var output = document.getElementById(prefix('output'));
        scalave_println(output, "running...");
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var src = encodeURIComponent(document.getElementById(prefix('src')).value);
        var url = '//scalave.herokuapp.com/?jsonp=' + prefix('println') + '&src=' + src;
        script.setAttribute('src', url);
        head.appendChild(script);
        head.removeChild(script);
      };

    run.innerHTML  = 'run';

    var input_div1 = document.createElement('div');
    input_div1.appendChild(src);
    var input_div2 = document.createElement('div');
    input_div2.appendChild(run);

    var input      = document.createElement('div');
    input.style.marginBottom = '24px';
    input.appendChild(input_div1);
    input.appendChild(input_div2);

    var output     = document.createElement('div');
    output.id      = prefix('output');
    output.style.fontSize = '12px';
    output.innerHTML = '&nbsp;';

    script.parentNode.insertBefore(output, script.nextSibling);
    script.parentNode.insertBefore(input, script.nextSibling);

  }

  setup();

})();
