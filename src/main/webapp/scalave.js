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

  function scalave_setup() {

    var scalave_src        = document.createElement('textarea');
    scalave_src.id         = prefix('src');
    scalave_src.name       = 'src';
    scalave_src.rows       = '8';
    scalave_src.cols       = '72';
    scalave_src.style.fontFamily = 'Courier New, monospace';
    scalave_src.style.fontSize = '10pt';

    var scalave_run        = document.createElement('button');
    scalave_run.onclick =
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

    scalave_run.innerHTML  = 'run';

    var scalave_input_div1 = document.createElement('div');
    scalave_input_div1.appendChild(scalave_src);
    var scalave_input_div2 = document.createElement('div');
    scalave_input_div2.appendChild(scalave_run);

    var scalave_input      = document.createElement('div');
    scalave_input.style.marginBottom = '24px';
    scalave_input.appendChild(scalave_input_div1);
    scalave_input.appendChild(scalave_input_div2);

    var scalave_output     = document.createElement('div');
    scalave_output.id      = prefix('output');
    scalave_output.style.fontSize = '12px';
    scalave_output.innerHTML = '&nbsp;';

    var scripts = document.getElementsByTagName('script');
    var script  = scripts[scripts.length - 1];
    script.parentNode.insertBefore(scalave_output, script.nextSibling);
    script.parentNode.insertBefore(scalave_input, script.nextSibling);

  }

  scalave_setup();

})();
