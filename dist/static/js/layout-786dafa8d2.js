function SankeyLayout(){go.LayeredDigraphLayout.call(this)}function getAutoHeightForNode(t){for(var e=0,a=t.findLinksInto();a.next();){e+=a.value.computeThickness()}var o=0;for(a=t.findLinksOutOf();a.next();){o+=a.value.computeThickness()}var n=Math.max(e,o);return n<10&&(n=10),n}function layout(){myDiagram.startTransaction("changed Layout");myDiagram.layout;myDiagram.commitTransaction("changed Layout")}go.Diagram.inherit(SankeyLayout,go.LayeredDigraphLayout),SankeyLayout.prototype.createNetwork=function(){return this.diagram.nodes.each(function(t){var e=getAutoHeightForNode(t),a="bold "+Math.max(12,Math.round(e/8))+"pt Segoe UI, sans-serif",o=t.findObject("SHAPE"),n=t.findObject("TEXT"),r=t.findObject("LTEXT");o&&(o.height=e),n&&(n.font=a),r&&(r.font=a)}),go.LayeredDigraphLayout.prototype.createNetwork.call(this)},SankeyLayout.prototype.nodeMinColumnSpace=function(t,e){if(null!==t.node)return go.LayeredDigraphLayout.prototype.nodeMinColumnSpace.call(this,t,e);if(1<=t.edgesCount){for(var a=1,o=t.edges;o.next();){var n=o.value;if(null!=n.link){var r=n.link.computeThickness();a<r&&(a=r);break}}return Math.ceil(a/this.columnSpacing)}return 1},SankeyLayout.prototype.assignLayers=function(){go.LayeredDigraphLayout.prototype.assignLayers.call(this);for(var t=this.maxLayer,e=this.network.vertexes.iterator;e.next();){var a=e.value;a.node;0==a.destinationVertexes.count&&(a.layer=0),0==a.sourceVertexes.count&&(a.layer=t)}},SankeyLayout.prototype.commitLayout=function(){go.LayeredDigraphLayout.prototype.commitLayout.call(this);for(var t=this.network.edges.iterator;t.next();){var e=t.value.link;e&&e.curve===go.Link.Bezier&&e.invalidateRoute()}};