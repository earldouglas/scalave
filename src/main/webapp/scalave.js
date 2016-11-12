(function() {

  function println(elem, out) {
    while (elem.firstChild) { elem.removeChild(elem.firstChild); }
    var pre = document.createElement('pre');
    pre.style.paddingLeft = '12px';
    pre.style.borderLeft = '1px solid #666';
    pre.style.fontSize = '12px';
    pre.innerHTML = out;
    elem.appendChild(pre);
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

  function getOrElse(x,y) {
    return x ? x : y;
  }

  function setup() {

    var scripts = document.getElementsByTagName('script');
    var script  = scripts[scripts.length - 1];

    var src        = document.createElement('textarea');
    src.name       = 'src';
    src.rows       = getOrElse(script.getAttribute('rows'), '8');
    src.cols       = getOrElse(script.getAttribute('cols'), '72');
    src.style.fontFamily = 'Courier New, monospace';
    src.style.fontSize = '10pt';
    src.value      = unindent(script.text);

    var run        = document.createElement('button');
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
    output.style.fontSize = '12px';
    output.innerHTML = '&nbsp;';

    script.parentNode.insertBefore(output, script.nextSibling);
    script.parentNode.insertBefore(input, script.nextSibling);

    var callbackName = 'scalave_' + scripts.length;
    window[callbackName] = function(out) {
      println(output, out);
    };

    run.onclick =
      function() {
        println(output, "running...");
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var srcEnc = encodeURIComponent(src.value);
        var url = 'https://earldouglas.com/projects/scalave/?jsonp=' +
                  callbackName + '&src=' + srcEnc;
        script.setAttribute('src', url);
        head.appendChild(script);
        head.removeChild(script);
      };

  }

  setup();

})();
