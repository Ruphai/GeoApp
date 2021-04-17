// Call Function via the Onload::: Event of the DOM
window.onload = function() {
    //Reprojection of Spatial Reference System to EPSG:4326
    let position = ol.proj.transform([13.06072, 47.78869], 'EPSG:4326', 'EPSG:3857');

    //--MAP CONTROLS--//
    //====================================================================================================//
    //--SCALE LINE CONTROL OBJECT--//
    let scaleLineControl = new ol.control.ScaleLine({bar: true, steps: 5, className: 'ol-scale-line'});
    //-- FULL SCREEN CONTROL OBJECT--//
    let fullScreenControl = new ol.control.FullScreen();

    //-- ZOOM TO EXTENT OBJECT --//
    // var zoomToExtentControl = new ol.control.ZoomToExtent({
    //     extent: [
    //       813079.7791264898,
    //       5929220.284081122,
    //       848966.9639063801,
    //       5936863.986909639 
    //     ]
    //   });

    //-- OVERVIEW CONTROL OBJECT--//
    let overViewMap = new ol.control.OverviewMap({collapsible: true, className: 'overview-map'});

    //--MAP ATTRIBUTION--//
    let attribution = new ol.control.Attribution({
        collapsible: false
    });

    //--LAYER SWITCHER PLUGIN--//
    let layerSwitcher = new ol.control.LayerSwitcher ({
      tipLabel: "Layers"
     });



    //--MAP LAYERS--BING MAPS, OPENSTREETMAPS//
      let bingRoad = new ol.layer.Tile({
        preload: Infinity,
        source: new ol.source.BingMaps({
          key: 'ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp',
          imagerySet: 'Road',
          culture: 'fr-FR'
        })
      });
      bingRoad.set('name', 'Roads');
      
      let bingAerial = new ol.layer.Tile({
        preload: Infinity,
        source: new ol.source.BingMaps({
          key: 'ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp',
          imagerySet: 'Aerial',
        })
      });
      bingAerial.set('name', 'Bings Maps Aerial');

      let bingAerialwithLabels = new ol.layer.Tile({
        preload: Infinity,
        source: new ol.source.BingMaps({
          key: 'ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp',
          imagerySet: 'AerialWithLabelsOnDemand',
        })
      });
      bingAerialwithLabels.set('name', 'Bings Maps Aerial');

      let OSM = new ol.layer.Tile({
        source: new ol.source.OSM(), 
        //opacity: 0.3,
        brightness: 0.2
      });
      OSM.set('name', 'Open Street Map')
    

    //MAP MARKERS AT THE CENTER POSITION::NAWI
    let marker = new ol.Feature({
        geometry: new ol.geom.Point(position),
        name: 'NAWI'});

    let iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          scale: 0.095,
          src: 'data/book.png',
        }),
      });

    marker.setStyle(iconStyle);

    let vectorSource = new ol.source.Vector({
        features: [marker]
      });
    
    let vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    
    vectorLayer.setZIndex(1);


   // DRAW MARKER FUNCTION
   let position1 = ol.proj.transform([13.07072, 47.7999], 'EPSG:4326', 'EPSG:3857');
   let position2 = ol.proj.transform([13.07052, 47.6699], 'EPSG:4326', 'EPSG:3857');
   let position3 = ol.proj.transform([13.05552, 47.4999], 'EPSG:4326', 'EPSG:3857');

   function drawMarker(posMarker) {
    let pMarker = new ol.Feature({
      geometry: new ol.geom.Point(posMarker),
      name: 'New Feature'});
      pMarker.setStyle(iconStyle);
      vectorSource.addFeature(pMarker);
  }
  // CALL FUNCTION
  drawMarker(position1);
  drawMarker(position2);
  drawMarker(position3);

  // GEOLOCATION
  let geolocation = new ol.Geolocation ({
    tracking: true
  });

  geolocation.on('change', function (){
    let currentPosition = ol.proj.transform (geolocation.getPosition (), 'EPSG:4326', 'EPSG:3857');
    // Use generic Marker function to indicate position on map
    drawMarker (currentPosition);
    //window.console.log(currentPosition);
    // Disable geolocation after user position is known
    geolocation.setTracking (false);
  });
  
  // BING LAYERS
  
  let styles = [
    'RoadOnDemand',
    'Aerial',
    'AerialWithLabelsOnDemand'
  ];
  let bingLabelNames = [
    "Road",
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

  //--MAP DISPLAY AND VIEW--//
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
                  vectorLayer
                ]
              })
        ],
       //map.addControl(), 
        view: new ol.View({
          center: position, 
          zoom: 16
        }),

        renderer: 'canvas', //'webgl', //dom, or canvas,
        controls: ol.control.defaults({
            attributionOptions: ({
              collapsible: true
            })
          }).extend([
            scaleLineControl,
            fullScreenControl,
            //zoomToExtentControl,
            overViewMap,
            new ol.control.ZoomSlider({
                className: 'zoom-slider'
            }),
            //Adding Layer Switcher to Control
            layerSwitcher,
            attribution
          ])
      });
};
