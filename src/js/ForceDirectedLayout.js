var obj = {};
obj.layout = function() {
      myDiagram.startTransaction("changed Layout");
      var lay = myDiagram.layout;

      var maxIter = document.getElementById("maxIter").value;
      maxIter = parseInt(maxIter, 10);
      lay.maxIterations = maxIter;

      var epsilon = document.getElementById("epsilon").value;
      epsilon = parseFloat(epsilon, 10);
      lay.epsilonDistance = epsilon;

      var infinity = document.getElementById("infinity").value;
      infinity = parseFloat(infinity, 10);
      lay.infinityDistance = infinity;

      var arrangement = document.getElementById("arrangement").value;
      var arrangementSpacing = new go.Size();
      arrangement = arrangement.split(" ", 2);
      arrangementSpacing.width = parseFloat(arrangement[0], 10);
      arrangementSpacing.height = parseFloat(arrangement[1], 10);
      lay.arrangementSpacing = arrangementSpacing;

      var charge = document.getElementById("charge").value;
      charge = parseFloat(charge, 10);
      lay.defaultElectricalCharge = charge;

      var mass = document.getElementById("mass").value;
      mass = parseFloat(mass, 10);
      lay.defaultGravitationalMass = mass;

      var stiffness = document.getElementById("stiffness").value;
      stiffness = parseFloat(stiffness, 10);
      lay.defaultSpringStiffness = stiffness;

      var length = document.getElementById("length").value;
      length = parseFloat(length, 10);
      lay.defaultSpringLength = length;

      myDiagram.commitTransaction("changed Layout");
    }