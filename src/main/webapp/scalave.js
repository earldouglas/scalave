function scalave_println(out) {
  var output = document.getElementById('scalave_output');
  while (output.firstChild) { output.removeChild(output.firstChild); }
  var pre = document.createElement('pre');
  pre.className = 'scalave_output';
  pre.innerHTML = out;
  output.appendChild(pre);
}

function scalave_setup() {

  var scalave_src        = document.createElement('textarea');
  scalave_src.id         = 'scalave_src';
  scalave_src.name       = 'src';
  scalave_src.rows       = '8';
  scalave_src.cols       = '72';
  scalave_src.style.fontFamily = 'Courier New, monospace';
  scalave_src.style.fontSize = '10pt';

  var scalave_run        = document.createElement('button');
  scalave_run.onclick =
    function() {
      scalave_println("running...");
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      var src = encodeURIComponent(document.getElementById('scalave_src').value);
      var url = '//scalave.herokuapp.com/?jsonp=scalave_println&src=' + src;
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
  scalave_output.id      = 'scalave_output';
  scalave_output.style.paddingLeft = '12px';
  scalave_output.style.borderLeft = '1px solid #666';

  var scalave            = document.getElementById('scalave');
  scalave.appendChild(scalave_input);
  scalave.appendChild(scalave_output);

}

scalave_setup();
