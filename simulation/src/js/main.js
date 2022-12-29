var mto = 0.5;

var eqn;
var poles = [], roots = [];
function changepage() {
  var x = document.getElementById("pagechanger").value;
  if (x == 1)
    document.getElementById("sm1").click();
  else
    document.getElementById("sm2").click();
}
function addval() {
  var nums, dens;
  var a = document.getElementById("numa").value;
  var b = document.getElementById("numb").value;
  var c = document.getElementById("numc").value;
  var p = document.getElementById("dena").value;
  var q = document.getElementById("denb").value;
  var r = document.getElementById("denc").value;
  roots = [];
  poles = [];
  var x1, y1;
  var ni = 0, di = 0;
  a1 = parseInt(a);
  b1 = parseInt(b);
  c1 = parseInt(c);
  a2 = parseInt(p);
  b2 = parseInt(q);
  c2 = parseInt(r);
  lc = 1;
  document.getElementById("line1").setAttribute("style", "color:blue");
  document.getElementById("chartcont").setAttribute("style", "display:none");
  document.getElementById("chartcont1").setAttribute("style", "display:none;");
  for (let i = 1; i < 5; i++) {
    let out = "out" + i;
    let ln = "line" + (i + 1);
    document.getElementById(ln).setAttribute("Style", "color:black");
    document.getElementById(out).setAttribute("style", "display:none");
  }
  if (a1 == 0 && a2 != 0 && b1 != 0 && c1 != 0)
    mto = 1;
  else if (a1 != 0 && a2 == 0) {
    mto = 0;
    alert("Not a proper transfer function \nthe order of denominator should be greater than order of numerator");
  }
  else if (c1 != 0 && (b2 != 0 || a2 != 0)) { mto = 1; }
  else if (a2 == 0 && b2 == 0) {
    mto = 0;
    alert("Not a proper transfer function \ndenominator cannot be a constant ");
  }
  else if (a1 == 0 && b1 == 0 && c1 == 0) {
    mto = 0;
    alert("Not a proper transfer function \nplease provide some value for numerator as numerator cannot be zero");
  }
  else if (a2 == 0 && b2 == 0 && c2 == 0) {
    mto = 0;
    alert("Not a proper transfer function \nplease provide some value for denominator as denominator cannot be zero  ");
  }

  if (mto) {
    document.getElementById("matwork").title = "";
    document.getElementById("mrun").disabled = false;
    document.getElementById("matwork").setAttribute("style", "opacity:1");
    /*document.getElementById("mrun").setAttribute("style","background-color:dodgerblue");
    document.getElementById("mrun").style.color="whitesmoke";
    document.getElementById("mrun").style.cursor="pointer";*/
    document.getElementById("mrun").classList.remove("mrundisabled", "mrunenabled");
    document.getElementById("mrun").classList.add("mrunenabled");
    document.getElementById("matwork").classList.remove('mat');
    if (a1 != 0) {
      nums = a1;
      numd = discriminant(a1, b1, c1);
      if (numd > 0) {
        x1 = (-1 * b1 - Math.sqrt(numd)) / 2 / a1;

        x1 = Math.round(x1 * 100) / 100;
        //x1=x1.toFixed(2);
        //x1=parseInt(x1);
        roots.push({ x: x1, y: 0 });
        x1 = (-1 * b1 + Math.sqrt(numd)) / 2 / a1;
        x1 = Math.round(x1 * 100) / 100;
        /*x1=x1.toFixed(2);
        x1=parseInt(x1);*/
        roots.push({ x: x1, y: 0 });
      }
      else if (numd == 0) {
        x1 = (-1 * b1 - Math.sqrt(numd)) / 2 / a1;
        x1 = Math.round(x1 * 100) / 100;
        /*x1=x1.toFixed(2);
        x1=parseInt(x1);*/
        roots.push({ x: x1, y: 0 });
      }
      else {
        x1 = (-1 * b1 / (2 * a1));
        x1 = Math.round(x1 * 100) / 100;
        /*x1=x1.toFixed(2);
        x1=parseInt(x1);*/
        y1 = (Math.sqrt(-1 * numd) / 2 / a1)
        y1 = Math.round(y1 * 100) / 100;
        /* y1=y1.toFixed(2);
         y1=parseInt(y1);*/
        roots.push({ x: x1, y: y1 });
        roots.push({ x: x1, y: -1 * y1 });
        ni = 1;
      }
    }
    else {
      if (b1 != 0) {
        nums = b1;
        let temp = -1 * c1 / b1;
        roots.push({ x: temp, y: 0 });
      }
      else
        nums = c1;
    }
    if (a2 != 0) {
      dens = a2;
      dend = discriminant(a2, b2, c2);
      if (dend > 0) {
        x1 = (-1 * b2 - Math.sqrt(dend)) / 2 / a2;
        x1 = Math.round(x1 * 100) / 100;
        /*x1=x1.toFixed(2);
        x1=parseInt(x1);*/
        poles.push({ x: x1, y: 0 });
        x1 = (-1 * b2 + Math.sqrt(dend)) / 2 / a2;
        x1 = Math.round(x1 * 100) / 100;
        /* x1=x1.toFixed(2);
         x1=parseInt(x1);*/
        poles.push({ x: x1, y: 0 });
      }
      else if (dend == 0) {
        x1 = (-1 * b2 - Math.sqrt(dend)) / 2 / a2;
        x1 = Math.round(x1 * 100) / 100;
        /*x1=x1.toFixed(2);
        x1=parseInt(x1);*/
        poles.push({ x: x1, y: 0 });
      }
      else {
        x1 = (-1 * b2 / (2 * a2));
        x1 = Math.round(x1 * 100) / 100;
        /* x1=x1.toFixed(2);
         x1=parseInt(x1);*/
        y1 = (Math.sqrt(-1 * dend) / 2 / a2);
        y1 = Math.round(y1 * 100) / 100;
        /* y1=y1.toFixed(2);
         y1=parseInt(y1);*/
        poles.push({ x: x1, y: y1 });
        poles.push({ x: x1, y: -1 * y1 });
        di = 1;
      }
    }
    else {
      if (b2 != 0) {
        dens = b2;
        let temp = -1 * c2 / b2;
        poles.push({ x: temp, y: 0 });
      }
      else
        dens = c2;
    }
    var numerator = "$${\\frac{";
    if (a != 0)
      numerator = numerator + a + "s^2";
    if (b != 0)
      if (a != 0)
        numerator = numerator + " + " + b + "s";
      else
        numerator = numerator + b + "s";
    if (c != 0)
      if (a != 0 || b != 0)
        numerator = numerator + " + " + c + "}";
      else
        numerator = numerator + c + "}";
    var denominator = "{";
    if (p != 0)
      denominator = denominator + p + "s^2";
    if (q != 0)
      if (p != 0)
        denominator = denominator + " + " + q + "s";
      else
        denominator = denominator + q + "s";
    if (r != 0)
      if (p != 0 || q != 0)
        denominator = denominator + " + " + r;
      else
        denominator = denominator + r;
    denominator = denominator + "}}$$";
    eqn = numerator + denominator;

    document.getElementById("generated_eqn").innerHTML = eqn;

    var output;

    output = "&emsp;&emsp;&emsp;" + a + " " + b + " " + c;
    document.getElementById("output1").innerHTML = output;
    output = "&emsp;&emsp;&emsp;" + p + " " + q + " " + r;
    document.getElementById("output2").innerHTML = output;
    output = "g = <br>" + eqn;
    document.getElementById("out3").innerHTML = output;
    var j, k;
    output = "Z(zeroes) = <br><br>";
    for (j = 0; j < roots.length; j++) {
      if (ni != 1)
        output = output + "&emsp;&emsp;   " + roots[j].x + "<br><br>";
      else {
        output = output + "&emsp;&emsp;   " + roots[j].x + "&emsp; + &emsp;" + roots[j].y + "&emsp; i" + "<br><br>";
      }
    }
    output = output + "P(poles) = <br><br>";
    for (j = 0; j < poles.length; j++) {
      if (di != 1)
        output = output + "&emsp;&emsp;   " + poles[j].x + "<br><br>";
      else {
        output = output + "&emsp;&emsp;   " + poles[j].x + "&emsp; + &emsp;" + poles[j].y + "&emsp; i" + "<br><br>";
      }
    }
    ni = 0;
    di = 0;
    var k;
    k = nums / dens;
    output = output + "K(Gain) =<br><br> &emsp;" + k.toFixed(2) + "<br><br>";
    document.getElementById("line1values").innerHTML = a + " " + b + " " + c;
    document.getElementById("line2values").innerHTML = p + " " + q + " " + r;
    document.getElementById("out4").innerHTML = output;
    var ms = window.matchMedia("(max-width:950px)");
    cwidth(ms);
    ms.addListener(cwidth);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "generated_eqn"]);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out3"]);
  }
  else {
    mto = 1;
    document.getElementById("generated_eqn").innerHTML = "$${\\frac{as^2 + bs + c}{ps^2 + qs + r} }$$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "generated_eqn"]);
    document.getElementById("mrun").disabled = true;
    document.getElementById("mrun").classList.remove('mrunenabled', 'mrundisabled');
    document.getElementById("mrun").classList.add('mrundisabled');
    document.getElementById("matwork").classList.add('mat');
    document.getElementById("matwork").setAttribute("style", "opacity:0.5");
    document.getElementById("matwork").title = "Please enter the values of coeffecients of the equation first";
  }
};

function discriminant(a, b, c) {
  return b * b - 4 * a * c;
};


function showval() {
  genval("numa", "la");
  genval("numb", "lb");
  genval("numc", "lc");
  genval("dena", "lp");
  genval("denb", "lq");
  genval("denc", "lr");
};

function genval(idofinput, idofspan) {
  var x;
  x = document.getElementById(idofinput).value;
  //var x1 = x.toFixed(2);
  document.getElementById(idofspan).innerHTML = x;
};

var lc = 1;

function runprog(i) {
  lc = lc + 1;
  if (lc <= 5)
    highlightline(lc);
  else {
    document.getElementById("line5").setAttribute("style", "color:black;");
    document.getElementById("mrun").disabled = true;
    var ms = window.matchMedia("screen and (max-width:950px)");
    console.log(ms);
    widthcheck(ms);
    ms.addListener(widthcheck);
    document.getElementById("mrun").disabled = true;
    document.getElementById("mrun").classList.remove("mrunenabled");
    document.getElementById("mrun").classList.add("mrundisabled");
  }
};

function cwidth(ms) {
  if (ms.matches)
    var chartplot = document.getElementById("chartmine").getContext("2d");
  else
    var chartplot = document.getElementById("myChart").getContext("2d");
  if (window.ch != undefined)
    window.ch.destroy();

  window.ch = new Chart(chartplot, {
    type: "scatter",
    data: {
      datasets: [{
        pointStyle: 'cross',
        rotation: 45,
        borderWidth: 1,
        borderColor: "rgb(0,0,255)",
        pointRadius: 6,
        data: poles,
        label: "Poles"
      },
      {
        pointStyle: 'circle',
        pointRadius: 6,
        pointBackgroundColor: "rgb(0,255,0)",
        data: roots,
        label: "Zeroes"
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        },

      },
      scales: {

        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Imaginary Axis"
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Real Axis"
            }
          }
        ],
      }
    }
  });
}
function widthcheck(ms) {
  if (ms.matches)
    document.getElementById("chartcont").setAttribute("style", "display:block;");
  else
    document.getElementById("chartcont1").setAttribute("style", "display:block;");
}

function highlightline(l) {
  var ln = "line" + l;
  var out = "out" + (l - 1);
  document.getElementById(ln).setAttribute("style", "color:blue;");
  document.getElementById(out).setAttribute("style", "display:block;");
  if (lc != 1)
    ln = "line" + (l - 1);
  document.getElementById(ln).setAttribute("style", "color:black;");
};

var menu_score = 0;
function dispmenu(val) {
  val.classList.toggle("change");
  menu_score = menu_score + 1;
  if (menu_score == 1) {
    document.getElementById("navbar").setAttribute("style", "display:block");
    document.getElementById("simulation-cont").setAttribute("style", "opacity:0.5");
    if (mto != 1)
      document.getElementById("matwork").setAttribute("style", "opacity:1");
    menu_score = -1;
    document.body.style.backgroundColor = "black";
  }
  else {
    if (mto != 1)
      document.getElementById("matwork").setAttribute("style", "opacity:0.5");
    document.body.style.backgroundColor = "white";
    document.getElementById("simulation-cont").setAttribute("style", "opacity:01");
    document.getElementById("navbar").setAttribute("style", "display:none");
  }
}

function myFunction(show) {
  let x = document.getElementById("show");
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
  }
}
function myFunction1(show1) {
  let x = document.getElementById("show1");
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
  }
}
function myFunction2(show2) {
  let x = document.getElementById("show2");
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
  }
}
function myFunction3(show3) {
  let x = document.getElementById("show3");
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
  }
}