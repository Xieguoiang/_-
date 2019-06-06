function setForceDirectedLayout(lay){
    lay.infinityDistance = 10000;   
    lay.defaultElectricalCharge = 300;
    lay.defaultGravitationalMass = 11;
    lay.defaultSpringStiffness = 0.07;
    lay.defaultSpringLength = 66;
    lay.sorting = go.ForceDirectedLayout.Optimized;
}

function setTreeLayout(lay){
    lay.nodeSpacing = 30;
    lay.layerSpacing = 400;
}

function setLayeredDigraphLayout(lay){
    lay.LayerSpacing = 100;
    lay.ColumnSpacing = 100;

}
function setGridLayout(lay){
    lay.sorting = go.GridLayout.Optimized;
}
function changedLayout(type) {
    // myDiagram.layout = null
    if (type == "ForceDirectedLayout") {
        myDiagram.div = null ;
        myDiagram = GO(go.Diagram, "myDiagramDiv", 
        {
            initialAutoScale: go.Diagram.Uniform,
            "undoManager.isEnabled": true,
            // zoom to make everything fit in the viewport
            layout: GO(go.ForceDirectedLayout)
        });
        myOverview.div = null
        myOverview =
         GO(go.Overview, "myOverviewDIV",
            { observed: myDiagram });
        myDiagram.nodeTemplate = GO(go.Node, "Spot", {
            locationSpot: go.Spot.Center,
            mouseEnter: function(e, node) {
                console.log(node.data)
            },
        },
        new go.Binding("text", "text"), GO(go.Shape, "Ellipse", {
            fill: "blue",
            stroke: "skyblue",
            width: 60,
            height: 60,
            portId: "", cursor: "pointer",
            fromLinkable: true,
            toLinkable: true,
        },
        new go.Binding("fill", "VertexFill"), new go.Binding("stroke", "VertexStroke"), new go.Binding("width", "VertexWidth"), 
        new go.Binding("height", "VertexHeight")),
        GO(go.Picture, {
            name:"icon_picture",
            margin: 10,
            width: 45,
            height: 45,
            visible:false
        },
        new go.Binding("source", "iconSource"), new go.Binding("width", "iconWidth"), new go.Binding("height", "iconHeight")), {
            doubleClick: function(e, node) {
                // doubleClickNode(e,node)
            }
        },
        GO(go.TextBlock, {
            name:"icon_label",
            visible:false,
            alignment: go.Spot.Bottom,
            margin: new go.Margin( - 10, 0, 0, 0)
        },
        new go.Binding("text", "VertexText")));

        // define the Link template
        myDiagram.linkTemplate = GO(go.Link, {
            selectable: true,
            curve: go.Link.Bezier, adjusting: go.Link.Stretch,
            toShortLength: 3
        },
        GO(go.Shape, {
            strokeWidth: 1,
            stroke: "#333",
        },
        new go.Binding("strokeWidth", "EdgeWidth"), new go.Binding("stroke", "EdgeStroke")), GO(go.Shape, // the arrowhead
        {
            toArrow: "standard",
            stroke: "#333",
            name:"edge_standard",
            visible:false
        },
        new go.Binding("stroke", "arrowheadStroke")), {
            doubleClick: function(e, link) {

            }
        },
        GO(go.TextBlock, "transition", // the label text
        {
            name:"edge_label",
            text: "",
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#555555",
            margin: 4,
            editable: true,
            visible:false
        },
        new go.Binding("text", "EdgeText"), new go.Binding("stroke", "EdgeStroke"), new go.Binding("font", "EdgeFont"))

        );
        // myDiagram.startTransaction("changed Layout");
      var lay = myDiagram.layout;
      setForceDirectedLayout(lay)


    } else if (type == "sankey") {

        myDiagram.div = null;
        myDiagram = GO(go.Diagram, "myDiagramDiv", // the ID of the DIV HTML element
        {
            initialAutoScale: go.Diagram.Uniform,
            "undoManager.isEnabled": true,
            
            // "animationManager.isEnabled": false,
            layout: GO(SankeyLayout, {
                setsPortSpots: false,
                // to allow the "Side" spots on the nodes to take effect
                direction: 0,
                // rightwards
                layeringOption: go.LayeredDigraphLayout.LayerOptimalLinkLength,
                packOption: go.LayeredDigraphLayout.PackStraighten || go.LayeredDigraphLayout.PackMedian,
                layerSpacing: 150,
                // lots of space between layers, for nicer thick links
                columnSpacing: 1
            })
        });
         myOverview.div = null
        myOverview =
         GO(go.Overview, "myOverviewDIV",
            { observed: myDiagram });

        // this function provides a common style for the TextBlocks
       function textStyle() {
        return { font: "bold 12pt Segoe UI, sans-serif", stroke: "black", margin: 5 };
      }
        myDiagram.nodeTemplate =
        GO(go.Node, go.Panel.Horizontal,
          {
            locationObjectName: "SHAPE",
            locationSpot: go.Spot.MiddleLeft,
            portSpreading: go.Node.SpreadingPacked  // rather than the default go.Node.SpreadingEvenly
          },
          GO(go.TextBlock, textStyle(),
            { name: "LTEXT" },
            new go.Binding("text", "VertexText")),
          GO(go.Shape,
            {
              name: "SHAPE",
              figure: "Rectangle",
              fill: "#2E8DEF",  // default fill color
              stroke: null,
              strokeWidth: 0,
              portId: "",
              fromSpot: go.Spot.RightSide,
              toSpot: go.Spot.LeftSide,
              height: 50,
              width: 20
            },
            new go.Binding("fill", "color"))
          
        );

      

      // define the Link template
      var linkSelectionAdornmentTemplate =
        GO(go.Adornment, "Link",
          GO(go.Shape,
            { isPanelMain: true, fill: null, stroke: "rgba(0, 0, 255, 0.3)", strokeWidth: 0 })  // use selection object's strokeWidth
        );

      myDiagram.linkTemplate =
        GO(go.Link, go.Link.Bezier,
          {
            selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
            layerName: "Background",
            fromEndSegmentLength: 150, toEndSegmentLength: 150,
            adjusting: go.Link.End
          },
          GO(go.Shape, { strokeWidth: 1, stroke: "#333" },
            new go.Binding("strokeWidth", "strokeWidth")),
          GO(go.TextBlock, textStyle(),
            { name: "EdgeText" },
            new go.Binding("text", "EdgeText")),
          GO(go.Shape, { toArrow: "standard", stroke: "#333" })
        );

    } else if (type == "CircularLayout") {
        myDiagram.div = null ;
        myDiagram = GO(go.Diagram, "myDiagramDiv", 
        {
            initialAutoScale: go.Diagram.Uniform,
            "undoManager.isEnabled": true,
            // zoom to make everything fit in the viewport
            layout: GO(go.CircularLayout)
        });
         myOverview.div = null
        myOverview =
         GO(go.Overview, "myOverviewDIV",
            { observed: myDiagram });
        myDiagram.nodeTemplate = GO(go.Node, "Spot", {
            locationSpot: go.Spot.Center,
            mouseEnter: function(e, node) {

            },
        },
        new go.Binding("text", "text"), GO(go.Shape, "Ellipse", {
            fill: "blue",
            stroke: "skyblue",
            width: 70,
            height: 70,
        },
        new go.Binding("fill", "VertexFill"), new go.Binding("stroke", "VertexStroke"), new go.Binding("width", "VertexWidth"), 
        new go.Binding("height", "VertexHeight")),
        GO(go.Picture, {
            name:"icon_picture",
            margin: 10,
            width: 50,
            height: 50,
            visible:false
        },
        new go.Binding("source", "iconSource"), new go.Binding("width", "iconWidth"), new go.Binding("height", "iconHeight")), {
            doubleClick: function(e, node) {
                // doubleClickNode(e,node)
            }
        },
        GO(go.TextBlock, {
            name:"icon_label",
            visible:false,
            alignment: go.Spot.Bottom,
            margin: new go.Margin( - 10, 0, 0, 0)
        },
        new go.Binding("text", "VertexText")));

        // define the Link template
        myDiagram.linkTemplate = GO(go.Link, {
            selectable: true,
            toShortLength: 2
        },
        GO(go.Shape, {
            strokeWidth: 1,
            stroke: "#333",
        },
        new go.Binding("strokeWidth", "EdgeWidth"), new go.Binding("stroke", "EdgeStroke")), GO(go.Shape, // the arrowhead
        {
            toArrow: "standard",
            stroke: "#333",
            name:"edge_standard",
            visible:false
        },
        new go.Binding("stroke", "arrowheadStroke")), {
            doubleClick: function(e, link) {

            }
        },
        GO(go.TextBlock, "transition", // the label text
        {
            name:"edge_label",
            text: "",
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#555555",
            margin: 4,
            editable: true,
            visible:false
        },
        new go.Binding("text", "EdgeText"), new go.Binding("stroke", "EdgeStroke"), new go.Binding("font", "EdgeFont"))

        );
        myDiagram.layout.spacing = 200;
 } else if (type == "TreeLayout") {
        // var GO = go.GraphObject.make,
        myDiagram.div = null ;
        myDiagram = GO(go.Diagram, "myDiagramDiv", 
        {
            initialAutoScale: go.Diagram.Uniform,
            "undoManager.isEnabled": true,
            // zoom to make everything fit in the viewport
            layout: GO(go.TreeLayout,{
                angle:90
            })
        });
         myOverview.div = null
        myOverview =
         GO(go.Overview, "myOverviewDIV",
            { observed: myDiagram });
        myDiagram.nodeTemplate = GO(go.Node, "Spot", {
            locationSpot: go.Spot.Center,
            mouseEnter: function(e, node) {

            },
        },
        new go.Binding("text", "text"), GO(go.Shape, "Ellipse", {
            fill: "blue",
            stroke: "skyblue",
            width: 70,
            height: 70,
        },
        new go.Binding("fill", "VertexFill"), new go.Binding("stroke", "VertexStroke"), new go.Binding("width", "VertexWidth"), 
        new go.Binding("height", "VertexHeight")),
        GO(go.Picture, {
            name:"icon_picture",
            margin: 10,
            width: 50,
            height: 50,
            visible:false
        },
        new go.Binding("source", "iconSource"), new go.Binding("width", "iconWidth"), new go.Binding("height", "iconHeight")), {
            doubleClick: function(e, node) {
                // doubleClickNode(e,node)
            }
        },
        GO(go.TextBlock, {
            name:"icon_label",
            visible:false,
            alignment: go.Spot.Bottom,
            margin: new go.Margin( - 10, 0, 0, 0)
        },
        new go.Binding("text", "VertexText")));

        // define the Link template
        myDiagram.linkTemplate = GO(go.Link, {
            selectable: true,
            toShortLength: 2
        },
        GO(go.Shape, {
            strokeWidth: 1,
            stroke: "#333",
        },
        new go.Binding("strokeWidth", "EdgeWidth"), new go.Binding("stroke", "EdgeStroke")), GO(go.Shape, // the arrowhead
        {
            toArrow: "standard",
            stroke: "#333",
            name:"edge_standard",
            visible:false
        },
        new go.Binding("stroke", "arrowheadStroke")), {
            doubleClick: function(e, link) {

            }
        },
        GO(go.TextBlock, "transition", // the label text
        {
            name:"edge_label",
            text: "",
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#555555",
            margin: 4,
            editable: true,
            visible:false
        },
        new go.Binding("text", "EdgeText"), new go.Binding("stroke", "EdgeStroke"), new go.Binding("font", "EdgeFont"))

        );
        var lay = myDiagram.layout;
        setTreeLayout(lay)

    }else if(type == "GridLayout"){
        myDiagram.div = null ;
        myDiagram = GO(go.Diagram, "myDiagramDiv", 
        {
            initialAutoScale: go.Diagram.Uniform,
            "undoManager.isEnabled": true,
            // zoom to make everything fit in the viewport
            layout: GO(go.GridLayout)
        });
         myOverview.div = null
        myOverview =
         GO(go.Overview, "myOverviewDIV",
            { observed: myDiagram });
        myDiagram.nodeTemplate = GO(go.Node, "Spot", {
            locationSpot: go.Spot.Center,
            mouseEnter: function(e, node) {

            },
        },
        new go.Binding("text", "text"), GO(go.Shape, "Ellipse", {
            fill: "blue",
            stroke: "skyblue",
            width: 60,
            height: 60,
        },
        new go.Binding("fill", "VertexFill"), new go.Binding("stroke", "VertexStroke"), new go.Binding("width", "VertexWidth"), 
        new go.Binding("height", "VertexHeight")),
        GO(go.Picture, {
            name:"icon_picture",
            margin: 10,
            width: 45,
            height: 45,
            visible:false
        },
        new go.Binding("source", "iconSource"), new go.Binding("width", "iconWidth"), new go.Binding("height", "iconHeight")), {
            doubleClick: function(e, node) {
                // doubleClickNode(e,node)
            }
        },
        GO(go.TextBlock, {
            name:"icon_label",
            visible:false,
            alignment: go.Spot.Bottom,
            margin: new go.Margin( - 10, 0, 0, 0)
        },
        new go.Binding("text", "VertexText")));

        // define the Link template
        myDiagram.linkTemplate = GO(go.Link, {
            selectable: true,
            curve: go.Link.Bezier, adjusting: go.Link.Stretch,
            toShortLength: 3
        },
        GO(go.Shape, {
            strokeWidth: 1,
            stroke: "#333",
        },
        new go.Binding("strokeWidth", "EdgeWidth"), new go.Binding("stroke", "EdgeStroke")), GO(go.Shape, // the arrowhead
        {
            toArrow: "standard",
            stroke: "#333",
            name:"edge_standard",
            visible:false
        },
        new go.Binding("stroke", "arrowheadStroke")), {
            doubleClick: function(e, link) {

            }
        },
        GO(go.TextBlock, "transition", // the label text
        {
            name:"edge_label",
            text: "",
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#555555",
            margin: 4,
            editable: true,
            visible:false
        },
        new go.Binding("text", "EdgeText"), new go.Binding("stroke", "EdgeStroke"), new go.Binding("font", "EdgeFont"))

        );
        var lay = myDiagram.layout;
        setGridLayout(lay)
       
    }else if(type == "LayeredDigraphLayout"){
        myDiagram.div = null ;
        myDiagram = GO(go.Diagram, "myDiagramDiv", 
        {
            initialAutoScale: go.Diagram.Uniform,
            "undoManager.isEnabled": true,
            // zoom to make everything fit in the viewport
            layout: GO(go.LayeredDigraphLayout)
        });
         myOverview.div = null
        myOverview =
         GO(go.Overview, "myOverviewDIV",
            { observed: myDiagram });
        myDiagram.nodeTemplate = GO(go.Node, "Spot", {
            locationSpot: go.Spot.Center,
            mouseEnter: function(e, node) {

            },
        },
        new go.Binding("text", "text"), GO(go.Shape, "Ellipse", {
            fill: "blue",
            stroke: "skyblue",
            width: 60,
            height: 60,
        },
        new go.Binding("fill", "VertexFill"), new go.Binding("stroke", "VertexStroke"), new go.Binding("width", "VertexWidth"), 
        new go.Binding("height", "VertexHeight")),
        GO(go.Picture, {
            name:"icon_picture",
            margin: 10,
            width: 45,
            height: 45,
            visible:false
        },
        new go.Binding("source", "iconSource"), new go.Binding("width", "iconWidth"), new go.Binding("height", "iconHeight")), {
            doubleClick: function(e, node) {
                // doubleClickNode(e,node)
            }
        },
        GO(go.TextBlock, {
            name:"icon_label",
            visible:false,
            alignment: go.Spot.Bottom,
            margin: new go.Margin( - 10, 0, 0, 0)
        },
        new go.Binding("text", "VertexText")));

        // define the Link template
        myDiagram.linkTemplate = GO(go.Link, {
            selectable: true,
            curve: go.Link.Bezier, adjusting: go.Link.Stretch,
            toShortLength: 3
        },
        GO(go.Shape, {
            strokeWidth: 1,
            stroke: "#333",
        },
        new go.Binding("strokeWidth", "EdgeWidth"), new go.Binding("stroke", "EdgeStroke")), GO(go.Shape, // the arrowhead
        {
            toArrow: "standard",
            stroke: "#333",
            name:"edge_standard",
            visible:false
        },
        new go.Binding("stroke", "arrowheadStroke")), {
            doubleClick: function(e, link) {

            }
        },
        GO(go.TextBlock, "transition", // the label text
        {
            name:"edge_label",
            text: "",
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#555555",
            margin: 4,
            editable: true,
            visible:false
        },
        new go.Binding("text", "EdgeText"), new go.Binding("stroke", "EdgeStroke"), new go.Binding("font", "EdgeFont")));
        var lay = myDiagram.layout;
        lay.LayerSpacing = 111
        // setLayeredDigraphLayout(lay)
        
        
    }

    myDiagram.model.linkDataArray = linkArray;
    myDiagram.model.nodeDataArray = nodeArray;
    // new go.Overview("myOverviewDIV").observed =null;
    // new go.Overview("myOverviewDIV").observed = myDiagram;

    console.log(type == "sankey")
    if(!(type == "sankey")){
        myDiagram.addDiagramListener("ViewportBoundsChanged",function(e){
        
        if(myDiagram.scale > 0.5 ){
          myDiagram.nodes.each(function(node){
             var icon_picture = node.findObject("icon_picture")
             var icon_label= node.findObject("icon_label")
             icon_picture.visible = true
             icon_label.visible = true
             

          })
          myDiagram.links.each(function(node){
             var edge_label= node.findObject("edge_label")
             var edge_standard= node.findObject("edge_standard")
              edge_label.visible = true
              edge_standard.visible = true
          })
        }else if(myDiagram.scale < 0.5){
            myDiagram.nodes.each(function(node){
             var icon_picture = node.findObject("icon_picture")
             var icon_label= node.findObject("icon_label")
             icon_picture.visible = false
             icon_label.visible = false
          })
          myDiagram.links.each(function(node){
             var edge_label= node.findObject("edge_label")
             var edge_standard= node.findObject("edge_standard")
              edge_label.visible = false
              edge_standard.visible = false
          })
        }
      })
    }

}


$("#myDiagramDiv").height($(window).height()-$(".nav_header").height())
 console.log( $(".nav_header").height() ,$("#myDiagramDiv").height())

    var GO = go.GraphObject.make
     myDiagram =
          GO(go.Diagram, "myDiagramDiv",  
            {
              initialAutoScale: go.Diagram.Uniform,
              "undoManager.isEnabled": true,  
              layout: GO(go.ForceDirectedLayout)
            });

    var myOverview =
    GO(go.Overview, "myOverviewDIV",
      { observed: myDiagram });
    changedLayout("ForceDirectedLayout")
    // new go.Overview("myOverviewDIV").observed = myDiagram;
        
  
    
      window.oncontextmenu=function(e){
           
            if(!getcurrentNodes()) return;
            e.preventDefault();
            var menu=document.querySelector("#menu");
            menu.style.left=e.clientX+'px';
            menu.style.top=e.clientY+'px';
            menu.style.width='125px';
            menu.style.height='125px';
            
      }
      window.onclick=function(e){
              document.querySelector('#menu').style.height=0;
      }



    
      myPalette = new go.Palette("myPaletteDiv");

      myPalette.nodeTemplate  = 
          GO(go.Node, "Spot",
            { 
              // background: "#44CCFF",
              locationSpot:go.Spot.Center
             },
          GO(go.Shape, "Ellipse",
            {
              fill: "blue",
            stroke: "skyblue",
              width:40,
              height:40,
            }),
          GO(go.Picture,
             {  margin: new go.Margin(0, 0, 0, 0),width: 24, height: 24 },
              new go.Binding("source","iconSource")),
          GO(go.TextBlock,
            "",  // 初始化默认文本
            {  alignment:go.Spot.Bottom , stroke: "#000", height:20,font: "bold 14px sans-serif" },
            new go.Binding("text","VertexText").makeTwoWay()),
          
        );

      
      
      myPalette.model.nodeDataArray =
            [ 
              { VertexText: "x", iconSource: "../img/client.png" },
              { VertexText: "xx",  iconSource: "../img/company.png" },
            //  { /* 空节点数据 */  }
            ];