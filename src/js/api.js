function getcurrentNodes() {
        var nodes;
        for (var nit = myDiagram.nodes; nit.next();) {
                var node = nit.value;
                if (node.isSelected) {
                        nodes = node.data
                }
        }
        return nodes
}
function getcurrentLinks() {
        var links;
        for (var nit = myDiagram.links; nit.next();) {
                var link = nit.value;
                if (link.isSelected) {
                        links = link.data
                }
        }
        return links
}
function deleteSelection(){
        myDiagram.commandHandler.deleteSelection()
}

function undo(){
        myDiagram.commandHandler.undo()
}

function decreaseZoom(){
        var currentScale = myDiagram.scale
        if(currentScale < 0.1 ) return false
        myDiagram.scale = myDiagram.scale  - 0.02

}
function increaseZoom(){
        var currentScale = myDiagram.scale
        if(currentScale > 2 ) return false
         myDiagram.scale = myDiagram.scale + 0.02
}
function selectAll(){
    myDiagram.nodes.each(function(node){
        node.isSelected = true
    })
    myDiagram.links.each(function(link){
        link.isSelected = true
    })
}
function reverseSelected(){
    myDiagram.nodes.each(function(node){
        node.isSelected = !node.isSelected
    })
    myDiagram.links.each(function(link){
        link.isSelected = !link.isSelected
    })
}

function myCallback(blob) {
      var url = window.URL.createObjectURL(blob);
      var filename = "mySVGFile.svg";

      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;

      // IE 11
      if (window.navigator.msSaveBlob !== undefined) {
        window.navigator.msSaveBlob(blob, filename);
        return;
      }

      document.body.appendChild(a);
      requestAnimationFrame(function() {
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }

    function makeSvg() {
      var svg = myDiagram.makeSvg({ scale: 1, background: "white" });
      var svgstr = new XMLSerializer().serializeToString(svg);
      var blob = new Blob([svgstr], { type: "image/svg+xml" });
      myCallback(blob);
    }
    function myCallback_img(blob) {
      var url = window.URL.createObjectURL(blob);
      var filename = "imgPng.png";

      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;

      // IE 11
      if (window.navigator.msSaveBlob !== undefined) {
        window.navigator.msSaveBlob(blob, filename);
        return;
      }

      document.body.appendChild(a);
      requestAnimationFrame(function() {
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }

    function makeBlob() {
      var blob = myDiagram.makeImageData({ background: "white", returnType: "blob",scale:1, callback: myCallback_img });
    }





























if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
         if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
           return false;   
        }           
    }       
    return true;
}
Object.defineProperty(Array.prototype, "equals", {enumerable: false});