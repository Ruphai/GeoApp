//import { init } from './main';
//window.addEventListener('load', init);

//LAYER CHARTS
 // ol.style.Chart
 var animation = false;
 var styleCache = {};

 function getFeatureStyle (feature, sel) {
   var k = $("#graph").val()+"-"+ $("#color").val()+"-"+(sel?"1-":"")+feature.get("Total_Disa");

   var style = styleCache[k];
   if (!style) {
     var radius = 15;
     // area proportional to data size: s=PI*r^2
     if ($("#graph").val()!="bar") {
       radius = 8* Math.sqrt (feature.get("size") / Math.PI);
     }
     // Create chart style
     var c = $("#color").val();
     styleCache[k] = style = new ol.style.Style({
       image: new ol.style.Chart({
         type: $("#graph").val(), 
         radius: (sel?1.2:1)*radius, 
         offsetY: $("#graph").val()=='pie' ? 0 : (sel?-1.2:-1)*feature.get("radius"),
         data: feature.get("Total_Disa") || [10,30,20], 
         colors: /,/.test(c) ? c.split(",") : c,
         rotateWithView: true,
         animation: animation,
         stroke: new ol.style.Stroke({
           color: $("#color").val()!="neon" ? "#fff":"#000",
           width: 2
         }),
       })
     });
   }
   style.getImage().setAnimation(animation);
   return [style];

}

 var disasterLayers = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson', 
    }),
})

// var chart_layers = disasterLayers.features.map(function (el) {
//     return el.properties.Total_Disa, Tornado, Hurricane, Fire, Storm, Flood, Snow, Biological;
//   })

//  var disasterLayers = new ol.layer.Vector({
//     source: new ol.source.Vector({
//         format: new ol.format.GeoJSON(),
//         url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson', 
//     }),
// //    renderOrder: ol.ordering.yOrdering(),
//         style: function(f) { return getFeatureStyle(f); }, 
//     // style: function (feature, resolution) {
//     //     return totalDisaterStyle(feature, resolution);
//     // },
//     visible: true,
//     title: "Disaster Layer", 
//     // y ordering
    
// }); // Total Disaster Layer

 // Control Select 
// var select = new ol.interaction.Select({
//    style: function(f) { return getFeatureStyle(f, true); }
//  })

// map.addInteraction(select);

//  select.getFeatures().on(['add','remove'], function(e) {
//    if (e.type=="add") $("#select").html("Selection data: "+e.element.get("data").toString());
//    else $("#select").html("No selection");
//  })

//   // Animate function 
//   var listenerKey;
//   function doAnimate() {
//     if (listenerKey) return;
//     var start = new Date().getTime();
//     var duration = 1000;
//     animation = 0;
//     listenerKey = total_disaster_layer.on(['precompose', 'prerender'], function(event) {
//       var frameState = event.frameState;
//       var elapsed = frameState.time - start;
//       if (elapsed > duration) {
//         ol.Observable.unByKey(listenerKey);
//         listenerKey = null;
//         animation = false;
//       }	else {
//         animation = ol.easing.easeOut (elapsed / duration);
//         frameState.animate = true;
//       }
//       total_disaster_layer.changed();
//     });
//     // Force redraw
//     total_disaster_layer.changed();
//     //map.renderSync();
//   }

//   doAnimate()