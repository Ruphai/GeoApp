// Call Function via the Onload::: DOM Event6
window.onload = init;

function init() {
  let central_position = ol.proj.transform([-100.4458825, 39.7837304 ], 'EPSG:4326', 'EPSG:3857');
 
  // MAP LAYERS:: BING LAYERS
  //=========================
  let styles = [
    'RoadOnDemand',
    'Aerial',
    'AerialWithLabelsOnDemand'
  ];

  let bingLabelNames = [
    "Roads",
    "Aerial",
    "Aerials with Labels"
  ];

  let baseLayers = [];
  let i;
  
  for (i = 0; i < styles.length; i++) {
    baseLayers.push(
      new ol.layer.Tile({
        title: bingLabelNames[i],
        type: 'base',
        visible: true,
        preload: Infinity,
        source: new ol.source.BingMaps({
          key: 'ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp',
          imagerySet: styles[i],
        }),
      })
      );
    }
    
    baseLayers.push(
      new ol.layer.Tile({
        title: 'OpenStreetMap', 
        type: 'base',
        visible: true, 
        preload: Infinity,
        source: new ol.source.OSM()
      })
    );


    //--MAP CONTROLS--//
    //===============================
    //--Scale Line Control-//
    let scaleLineControl = new ol.control.ScaleLine({bar: true, steps: 5, className: 'ol-scale-line'});

    //--Full Screen--//
    let fullScreenControl = new ol.control.FullScreen();

    //-- Central Extent --// Search for the Xtent that covers USA
    var zoomToExtentControl = new ol.control.ZoomToExtent({
        extent: [
          -13991033.6573,3013453.4031,-7181411.6814,6271505.2967],
          //ol.proj.transform([-125.683594,26.115986,-64.511719,48.980217], 'EPSG:4326', 'EPSG:3857') 
      });


    //-- Map Overview --//
    let overViewMap = new ol.control.OverviewMap({collapsible: true, className: 'overview-map'});

    //--Map Attribution --//
    let attribution = new ol.control.Attribution({
        collapsible: false
    });


    //--Layer Switcher Plugin--//
    let layerSwitcher = new ol.control.LayerSwitcher ({
      tipLabel: "Layers"
     }); 


  

    // LOAD GEOJSON files
    //========================

    // Administrative Boundary of the US
    let us_shape = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        //features: (new ol.format.GeoJSON()).readFeatures(url), 
        url: './data/us_shape.geojson'
      }), 
      visible: true, 
      title: "US Administrative Boundary"
    });

    // Disaster Layer
    let disaster_layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: "data/DisastersByStates_US.geojson"
      }), 
      visible: true, 
      title: "Disaster Layer"
    });

    

    //--MAP DISPLAY AND VIEW--//
    //=============================

    let map = new ol.Map({
        target: 'map',
        layers: [
          //Layer Groups for the basemaps and overlays
          new ol.layer.Group(
            {
              title: "Base Maps",
              layers: baseLayers
            }), 
             new ol.layer.Group(
               {
                 title: "Overlays", 
                 combine: false, 
                 layers: [
                   us_shape,
                   disaster_layer
                 ]
               })
        ],
       //map.addControl(), 
        view: new ol.View({
          center: central_position, 
          zoom: 5
        }),

        renderer: 'canvas', //'webgl', //dom, or canvas,
        controls: ol.control.defaults({
            attributionOptions: ({
              collapsible: true
            })
          }).extend([
            scaleLineControl,
            fullScreenControl,
            zoomToExtentControl,
            overViewMap,
            // new ol.control.ZoomSlider({
            //     className: 'zoom-slider'
            // }),
            //Adding Layer Switcher to Control
            layerSwitcher,
            attribution
          ])
      });

};