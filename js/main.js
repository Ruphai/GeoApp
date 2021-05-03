//import external functions and classes
//import totalDisaterStyle from '../utils/layerStyles';

// Call Function via the Onload::: DOM Event6
window.onload = init;

function init() {
  let central_position = ol.proj.transform([-100.4458825, 39.7837304], 'EPSG:4326', 'EPSG:3857');

  // MAP LAYERS:: BING LAYERS
  //=========================
  let BaseLayerStyles = [
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

  for (i = 0; i < BaseLayerStyles.length; i++) {
    baseLayers.push(
      new ol.layer.Tile({
        title: bingLabelNames[i],
        type: 'base',
        visible: true,
        preload: Infinity,
        source: new ol.source.BingMaps({
          key: 'ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp',
          imagerySet: BaseLayerStyles[i],
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
  let scaleLineControl = new ol.control.ScaleLine({ bar: true, steps: 5, className: 'ol-scale-line', units: 'metric' });

  //--Full Screen--//
  let fullScreenControl = new ol.control.FullScreen();

  //-- Central Extent --// Search for the Xtent that covers USA
  var zoomToExtentControl = new ol.control.ZoomToExtent({
    extent: [
      -13991033.6573, 3013453.4031, -7181411.6814, 6271505.2967],
    //ol.proj.transform([-125.683594,26.115986,-64.511719,48.980217], 'EPSG:4326', 'EPSG:3857') 
  });


  //-- Map Overview --//
  let overViewMap = new ol.control.OverviewMap({ collapsible: true, className: 'overview-map' });

  //--Map Attribution --//
  let attribution = new ol.control.Attribution({
    collapsible: false
  });

  //--Layer Switcher Plugin--//
  let layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: "Layers"
  });


  // LOAD GEOJSON files
  //========================

  // Administrative Boundary of the US
  let us_shape = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      //   features: (new ol.format.GeoJSON()).readFeatures(url), 
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/us_shape.geojson'
    }),
    visible: true,
    title: "US Administrative Boundary"
  });

  //SET Layer Functions.

  //https://www.canva.com/colors/color-wheel/
  totalDisaterStyle = function (feature, resolution) {
    if (feature.get('Total_Disa') < 50) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Total_Disa') < 100) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }

    else if (feature.get('Total_Disa') < 150) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }

    else if (feature.get('Total_Disa') < 200) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    } 

    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  }; //Total Disaster Layer Style

  let total_disaster_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return totalDisaterStyle(feature, resolution);
    },
    visible: true,
    title: "Disaster Layer"
  }); // Total Disaster Layer


  //FLOOD LAYER
  FloodStyle = function (feature, resolution) {
    if (feature.get('Flood') < 8) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Flood') < 16) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Flood') < 24) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Flood') < 32) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  };

  let flood_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return FloodStyle(feature, resolution);
    },
    visible: false,
    title: "Flood Layer"
  });

  //Biological LAYER
  //https://www.canva.com/colors/color-wheel
  BiologicalStyle = function (feature, resolution) {
    if (feature.get('Biological') < 3) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Biological') < 6) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Biological') < 9) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Biological') < 12) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  };

  let biological_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return BiologicalStyle(feature, resolution);
    },
    visible: false,
    title: "Biological"
  });



  //SNOW LAYER
  //https://www.canva.com/colors/color-wheel
  snowStyle = function (feature, resolution) {
    if (feature.get('Snow') < 3) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Snow') < 6) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Snow') < 9) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Snow') < 12) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  };

  let snow_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return snowStyle(feature, resolution);
    },
    visible: false,
    title: "Snow"
  });

  //SEVERE STORM LAYER
  //https://www.canva.com/colors/color-wheel
  stormStyle = function (feature, resolution) {
    if (feature.get('Storm') < 9) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Storm') < 18) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Storm') < 27) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Storm') < 36) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  };

  let storm_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return stormStyle(feature, resolution);
    },
    visible: false,
    title: "Severe Storm"
  });


  //FIRE LAYER
  //https://www.canva.com/colors/color-wheel
  FireStyle = function (feature, resolution) {
    if (feature.get('Fire') < 55) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Fire') < 110) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Fire') < 165) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Fire') < 220) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  };

  let fire_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return FireStyle(feature, resolution);
    },
    visible: false,
    title: "Fire"
  });

  //HURRICANE LAYER
  //https://www.canva.com/colors/color-wheel
  HurricaneStyle = function (feature, resolution) {
    if (feature.get('Hurricane') < 10) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Hurricane') < 20) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Hurricane') < 30) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Hurricane') < 40) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  };

  let hurricane_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return HurricaneStyle(feature, resolution);
    },
    visible: false,
    title: "Hurricane"
  });

  //TORNADO LAYER
  //https://www.canva.com/colors/color-wheel
  TornadoStyle = function (feature, resolution) {
    if (feature.get('Tornado') < 4) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fef0d9' // yellow
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Tornado') < 8) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fdcc8a' // light orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Tornado') < 12) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fc8d59' // orange
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else if (feature.get('Tornado') < 16) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e34a33' // red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
    else {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b30000' //dark red
        }),
        stroke: new ol.style.Stroke({
          width: 1,
          color: [255, 255, 255],
        })
      });
    }
  };

  let tornado_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
      return TornadoStyle(feature, resolution);
    },
    visible: false,
    title: "Tornado"
  });

  // CLICK INTERACTION



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
          title: "Vector Layers",
          combine: false,
          layers: [
            us_shape,
            flood_layer,
            biological_layer,
            snow_layer,
            storm_layer,
            fire_layer,
            hurricane_layer,
            tornado_layer,
            total_disaster_layer
          ]
        })
    ],
    //map.addControl(), 
    view: new ol.View({
      center: central_position,
      zoom: 4.5
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
      new ol.control.OverviewMap(),
      // new ol.control.ZoomSlider({
      //     className: 'zoom-slider'
      // }),
      //Adding Layer Switcher to Control
      layerSwitcher,
      attribution
    ])
  });

  // Select  interaction
  var select = new ol.interaction.Select({
    hitTolerance: 5,
    multi: true,
    condition: ol.events.condition.singleClick
  });
  map.addInteraction(select);

  // POP UP
  var popup = new ol.Overlay.PopupFeature({
    popupClass: 'default anim',
    select: select,
    canFix: true,
    template: {
      title:
        // 'nom',   // only display the name
        function (f) {
          return f.get('State_Name') + ' (' + f.get('State_Code') + ')';
        },
      attributes: // 
      {
        'Total_Disa': { title: 'Total Disasters' },
        'Tornado': { title: 'Tornado' },
        'Hurricane': { title: 'Hurricane' },
        'Fire': { title: 'Fire' },
        'Storm': { title: 'Severe Storm' },
        'Flood': { title: 'Severe Flood' },
        'Snow': { title: 'Severe Snow' },
        'Bological': { title: 'Biological Hazards' },

      }
    }
  });
  map.addOverlay(popup);

  //--Legends of the Layers--//
  //=============================

  //style function for totalDisater
  function totalDisaterLegendStyle(feature) {
    if (feature.get('Total_Disa') < 50) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Total_Disa') < 100) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Total_Disa') < 150) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Total_Disa') < 200) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for total disaster
  var totalDisasterLegend = new ol.legend.Legend({
    title: 'Total Disasters',
    style: totalDisaterLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  totalDisasterLegend.addItem({ title: '<  50   ', properties: { Total_Disa: 49 }, typeGeom: 'Point' });
  totalDisasterLegend.addItem({ title: '< 100   ', properties: { Total_Disa: 99 }, typeGeom: 'Point' });
  totalDisasterLegend.addItem({ title: '< 150   ', properties: { Total_Disa: 149 }, typeGeom: 'Point' });
  totalDisasterLegend.addItem({ title: '< 200   ', properties: { Total_Disa: 199 }, typeGeom: 'Point' });
  totalDisasterLegend.addItem({ title: '> 200   ', properties: { Total_Disa: 201 }, typeGeom: 'Point' });

  totalDistLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: totalDisasterLegend
  })

  //============================================================

  //style function for flood
  function floodLegendStyle(feature) {
    if (feature.get('Flood') < 8) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Flood') < 16) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Flood') < 24) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Flood') < 30) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for Flood
  var floodLegend = new ol.legend.Legend({
    title: 'Flood',
    style: floodLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  floodLegend.addItem({ title: '<  8    ', properties: { Flood: 7 }, typeGeom: 'Point' });
  floodLegend.addItem({ title: '< 16    ', properties: { Flood: 15 }, typeGeom: 'Point' });
  floodLegend.addItem({ title: '< 24    ', properties: { Flood: 23 }, typeGeom: 'Point' });
  floodLegend.addItem({ title: '< 32    ', properties: { Flood: 31 }, typeGeom: 'Point' });
  floodLegend.addItem({ title: '> 32    ', properties: { Flood: 33 }, typeGeom: 'Point' });

  floodLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: floodLegend
  })

  //============================================================

  //style function for Biological
  function bioLegendStyle(feature) {
    if (feature.get('Biological') < 3) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Biological') < 6) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Biological') < 9) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Biological') < 12) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for Biological
  var bioLegend = new ol.legend.Legend({
    title: 'Biological',
    style: bioLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  bioLegend.addItem({ title: '<  3    ', properties: { Biological: 2 }, typeGeom: 'Point' });
  bioLegend.addItem({ title: '<  6    ', properties: { Biological: 5 }, typeGeom: 'Point' });
  bioLegend.addItem({ title: '<  9    ', properties: { Biological: 8 }, typeGeom: 'Point' });
  bioLegend.addItem({ title: '< 12    ', properties: { Biological: 11 }, typeGeom: 'Point' });
  bioLegend.addItem({ title: '> 12    ', properties: { Biological: 13 }, typeGeom: 'Point' });

  bioLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: bioLegend
  })

  //============================================================

  //style function for Snow
  function snowLegendStyle(feature) {
    if (feature.get('Snow') < 3) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Snow') < 6) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Snow') < 9) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Snow') < 12) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for Snow
  var snowLegend = new ol.legend.Legend({
    title: 'Snow',
    style: snowLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  snowLegend.addItem({ title: '<  3    ', properties: { Snow: 2 }, typeGeom: 'Point' });
  snowLegend.addItem({ title: '<  6    ', properties: { Snow: 5 }, typeGeom: 'Point' });
  snowLegend.addItem({ title: '<  9    ', properties: { Snow: 8 }, typeGeom: 'Point' });
  snowLegend.addItem({ title: '< 12    ', properties: { Snow: 11 }, typeGeom: 'Point' });
  snowLegend.addItem({ title: '> 12    ', properties: { Snow: 13 }, typeGeom: 'Point' });

  snowLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: snowLegend
  })

  //============================================================

  //style function for Severe Storm
  function stormLegendStyle(feature) {
    if (feature.get('Storm') < 9) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Storm') < 18) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Storm') < 27) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Storm') < 36) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for Severe Storm
  var stormLegend = new ol.legend.Legend({
    title: 'Severe Storm',
    style: stormLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  stormLegend.addItem({ title: '<  9    ', properties: { Storm: 8 }, typeGeom: 'Point' });
  stormLegend.addItem({ title: '< 18    ', properties: { Storm: 17}, typeGeom: 'Point' });
  stormLegend.addItem({ title: '< 27    ', properties: { Storm: 26}, typeGeom: 'Point' });
  stormLegend.addItem({ title: '< 36    ', properties: { Storm: 35}, typeGeom: 'Point' });
  stormLegend.addItem({ title: '> 36    ', properties: { Storm: 37 }, typeGeom: 'Point' });

  stormLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: stormLegend
  })

  //============================================================

  //style function for Fire
  function fireLegendStyle(feature) {
    if (feature.get('Fire') < 55) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Fire') < 110) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Fire') < 165) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Fire') < 220) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for Fire
  var fireLegend = new ol.legend.Legend({
    title: 'Fire',
    style: fireLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  fireLegend.addItem({ title: '< 55    ', properties: { Fire: 54}, typeGeom: 'Point' });
  fireLegend.addItem({ title: '< 110   ', properties: { Fire: 109}, typeGeom: 'Point' });
  fireLegend.addItem({ title: '< 165   ', properties: { Fire: 164}, typeGeom: 'Point' });
  fireLegend.addItem({ title: '< 220   ', properties: { Fire: 219}, typeGeom: 'Point' });
  fireLegend.addItem({ title: '> 220   ', properties: { Fire: 221}, typeGeom: 'Point' });

  fireLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: fireLegend
  })

  //============================================================

  //style function for Hurricane
  function hurrLegendStyle(feature) {
    if (feature.get('Hurricane') < 10) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Hurricane') < 20) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Hurricane') < 30) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Hurricane') < 40) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for Hurricane
  var hurrLegend = new ol.legend.Legend({
    title: 'Hurricane',
    style: hurrLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  hurrLegend.addItem({ title: '< 10    ', properties: { Hurricane: 9 }, typeGeom: 'Point' });
  hurrLegend.addItem({ title: '< 20    ', properties: { Hurricane: 19}, typeGeom: 'Point' });
  hurrLegend.addItem({ title: '< 30    ', properties: { Hurricane: 29}, typeGeom: 'Point' });
  hurrLegend.addItem({ title: '< 40    ', properties: { Hurricane: 39}, typeGeom: 'Point' });
  hurrLegend.addItem({ title: '> 40    ', properties: { Hurricane: 41 }, typeGeom: 'Point' });

  hurrLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: hurrLegend
  })

  //============================================================

  //style function for Tornado
  function torLegendStyle(feature) {
    if (feature.get('Tornado') < 4) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fef0d9' // yellow                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
    else if (feature.get('Tornado') < 8) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fdcc8a' // light orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Tornado') < 12) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#fc8d59' // orange               
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    else if (feature.get('Tornado') < 16) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#e34a33' // red                
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }

    // else if ...
    else {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#b30000' //dark red                 
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 255, 255],
          })
        })
      });
    }
  };

  // Define a new legend for Tornado
  var torLegend = new ol.legend.Legend({
    title: 'Tornado',
    style: torLegendStyle,
    margin: 5,
    size: [50, 12]
  });

  torLegend.addItem({ title: '<  4    ', properties: { Tornado: 3 }, typeGeom: 'Point' });
  torLegend.addItem({ title: '<  8    ', properties: { Tornado: 7 }, typeGeom: 'Point' });
  torLegend.addItem({ title: '< 12    ', properties: { Tornado: 11 }, typeGeom: 'Point' });
  torLegend.addItem({ title: '< 16    ', properties: { Tornado: 15 }, typeGeom: 'Point' });
  torLegend.addItem({ title: '> 16    ', properties: { Tornado: 17 }, typeGeom: 'Point' });

  torLegendCtrl = new ol.control.Legend({
    collapsible: false,
    legend: torLegend
  })


  
  //add the legends according to the status of layer visibility

  map.addControl(totalDistLegendCtrl);

  //map.addEventListener('rendercomplete', onChange); //abandoned because of high CPU occupation

  //total_disaster_layer: add event listener for change of visibility
  total_disaster_layer.addEventListener('change:visible', tdChange)

  //================================================================================
  //when total_disaster_layer.visible change check if its legend should be displayed 
  function tdChange() {
    if (total_disaster_layer.getVisible() == true) {
      //totalDisasterLegend.style.display = "block";
      map.addControl(totalDistLegendCtrl);
    } else {
      //totalDisasterLegend.style.display = "none";
      map.removeControl(totalDistLegendCtrl);
    }
  };

  //================================================================================
  //flood_layer: add event listener for change of visibility
  flood_layer.addEventListener('change:visible', floodChange)

  //when flood_layer.visible change check if its legend should be displayed 
  function floodChange() {
    if (flood_layer.getVisible() == true) {
      map.addControl(floodLegendCtrl);
    } else {
      map.removeControl(floodLegendCtrl);
    }
  };
  
  //================================================================================
  //biological_layer: add event listener for change of visibility
  biological_layer.addEventListener('change:visible', bioChange)

  //when biological_layer.visible change check if its legend should be displayed 
  function bioChange() {
    if (biological_layer.getVisible() == true) {
      map.addControl(bioLegendCtrl);
    } else {
      map.removeControl(bioLegendCtrl);
    }
  };

  //================================================================================
  //snow_layer: add event listener for change of visibility
  snow_layer.addEventListener('change:visible', snowChange)

  //when snow_layer.visible change check if its legend should be displayed 
  function snowChange() {
    if (snow_layer.getVisible() == true) {
      map.addControl(snowLegendCtrl);
    } else {
      map.removeControl(snowLegendCtrl);
    }
  };

  //================================================================================
  //storm_layer: add event listener for change of visibility
  storm_layer.addEventListener('change:visible', stormChange)

  //when storm_layer.visible change check if its legend should be displayed 
  function stormChange() {
    if (storm_layer.getVisible() == true) {
      map.addControl(stormLegendCtrl);
    } else {
      map.removeControl(stormLegendCtrl);
    }
  };

  //================================================================================
  //fire_layer: add event listener for change of visibility
  fire_layer.addEventListener('change:visible', fireChange)

  //when fire_layer.visible change check if its legend should be displayed 
  function fireChange() {
    if (fire_layer.getVisible() == true) {
      map.addControl(fireLegendCtrl);
    } else {
      map.removeControl(fireLegendCtrl);
    }
  };

  //================================================================================
  //hurricane_layer: add event listener for change of visibility
  hurricane_layer.addEventListener('change:visible', hurrChange)

  //when hurricane_layer.visible change check if its legend should be displayed 
  function hurrChange() {
    if (hurricane_layer.getVisible() == true) {
      map.addControl(hurrLegendCtrl);
    } else {
      map.removeControl(hurrLegendCtrl);
    }
  };

  //================================================================================
  //tornado_layer: add event listener for change of visibility
  tornado_layer.addEventListener('change:visible', torChange)

  //when tornado_layer.visible change check if its legend should be displayed 
  function torChange() {
    if (tornado_layer.getVisible() == true) {
      map.addControl(torLegendCtrl);
    } else {
      map.removeControl(torLegendCtrl);
    }
  };

}