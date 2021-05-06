import { init } from './main';
window.addEventListener('load', init);

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

 // Control Select 
 var select = new ol.interaction.Select({
   style: function(f) { return getFeatureStyle(f, true); }
 });

 //map.addInteraction(select);

 select.getFeatures().on(['add','remove'], function(e) {
   if (e.type=="add") $("#select").html("Selection data: "+e.element.get("data").toString());
   else $("#select").html("No selection");
 })



  // Animate function 
  var listenerKey;
  function doAnimate() {
    if (listenerKey) return;
    var start = new Date().getTime();
    var duration = 1000;
    animation = 0;
    listenerKey = vector.on(['precompose', 'prerender'], function(event) {
      var frameState = event.frameState;
      var elapsed = frameState.time - start;
      if (elapsed > duration) {
        ol.Observable.unByKey(listenerKey);
        listenerKey = null;
        animation = false;
      }	else {
        animation = ol.easing.easeOut (elapsed / duration);
        frameState.animate = true;
      }
      vector.changed();
    });
    // Force redraw
    vector.changed();
    //map.renderSync();
  }

  doAnimate();

