//import external functions and classes
//import totalDisaterStyle from '../utils/layerStyles';

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
    let scaleLineControl = new ol.control.ScaleLine({bar: true, steps: 5, className: 'ol-scale-line', units: 'metric'});

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
              color: '#13A1EC' // Blue
          })
      });
  }
  else  if (feature.get('Total_Disa') < 100) {
    return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
}

else  if (feature.get('Total_Disa') < 150) {
  return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}

else  if (feature.get('Total_Disa') < 200) {
return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
});
}

  // else if ...
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};
      //revise this example: https://openlayers.org/en/master/examples/vector-layer.html
      //https://www.howtobuildsoftware.com/index.php/how-do/lpd/gis-geojson-openlayers-3-openlayers-35-and-geojson
      //https://opensourceconnections.com/blog/2015/07/08/visualizing-your-data-with-openlayers/

    // Total Disaster Layer
    let total_disaster_layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
      }), 
      style: function(feature, resolution) {
        return totalDisaterStyle(feature, resolution);
      },
      visible: true, 
      title: "Disaster Layer"
    });


    //FLOOD LAYER
    //https://www.canva.com/colors/color-wheel
    FloodStyle = function (feature, resolution) {
      if (feature.get('Flood') < 8) {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#13A1EC' // Blue
          })
      });
    }
    else  if (feature.get('Flood') < 16) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
  }
  else  if (feature.get('Flood') < 24) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}
else  if (feature.get('Flood') < 30) {
  return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
  });
}
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};

let flood_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
  }), 
  style: function(feature, resolution) {
    return FloodStyle(feature, resolution);
  },
  visible: true, 
  title: "Flood Layer"
});

    //Biological LAYER
    //https://www.canva.com/colors/color-wheel
    BiologicalStyle = function (feature, resolution) {
      if (feature.get('Biological') < 3) {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#13A1EC' // Blue
          })
      });
    }
    else  if (feature.get('Biological') < 6) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
  }
  else  if (feature.get('Biological') < 9) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}
else  if (feature.get('Biological') < 12) {
  return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
  });
}
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};

let biological_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
  }), 
  style: function(feature, resolution) {
    return BiologicalStyle(feature, resolution);
  },
  visible: true, 
  title: "Biological"
});



    //SNOW LAYER
    //https://www.canva.com/colors/color-wheel
    snowStyle = function (feature, resolution) {
      if (feature.get('Snow') < 3) {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#13A1EC' // Blue
          })
      });
    }
    else  if (feature.get('Snow') < 6) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
  }
  else  if (feature.get('Snow') < 9) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}
else  if (feature.get('Snow') < 12) {
  return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
  });
}
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};

let snow_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
  }), 
  style: function(feature, resolution) {
    return snowStyle(feature, resolution);
  },
  visible: true,
  title: "Snow"
});

    //SEVERE STORM LAYER
    //https://www.canva.com/colors/color-wheel
    stormStyle = function (feature, resolution) {
      if (feature.get('Severe Sto') < 9) {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#13A1EC' // Blue
          })
      });
    }
    else  if (feature.get('Severe Sto') < 18) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
  }
  else  if (feature.get('Severe Sto') < 27) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}
else  if (feature.get('Severe Sto') < 35) {
  return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
  });
}
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};

let storm_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
  }), 
  style: function(feature, resolution) {
    return stormStyle(feature, resolution);
  },
  visible: true, 
  title: "Severe Storm"
});


    //FIRE LAYER
    //https://www.canva.com/colors/color-wheel
    FireStyle = function (feature, resolution) {
      if (feature.get('Fire') < 55) {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#13A1EC' // Blue
          })
      });
    }
    else  if (feature.get('Fire') < 110) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
  }
  else  if (feature.get('Fire') < 165) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}
else  if (feature.get('Fire') < 220) {
  return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
  });
}
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};

let fire_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
  }), 
  style: function(feature, resolution) {
    return FireStyle(feature, resolution);
  },
  visible: true, 
  title: "Fire"
});

    //HURRICANE LAYER
    //https://www.canva.com/colors/color-wheel
    HurricaneStyle = function (feature, resolution) {
      if (feature.get('Hurricane') < 10) {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#13A1EC' // Blue
          })
      });
    }
    else  if (feature.get('Hurricane') < 20) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
  }
  else  if (feature.get('Hurricane') < 30) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}
else  if (feature.get('Hurricane') < 40) {
  return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
  });
}
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};

let hurricane_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
  }), 
  style: function(feature, resolution) {
    return HurricaneStyle(feature, resolution);
  },
  visible: true, 
  title: "Hurricane"
});

    //TORNADO LAYER
    //https://www.canva.com/colors/color-wheel
    TornadoStyle = function (feature, resolution) {
      if (feature.get('Tornado') < 4) {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#13A1EC' // Blue
          })
      });
    }
    else  if (feature.get('Tornado') < 8) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#CA13EC' // purple
        })
    });
  }
  else  if (feature.get('Tornado') < 12) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#EC5E13' // red
      })
  });
}
else  if (feature.get('Tornado') < 16) {
  return new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#35EC13' // green
    })
  });
}
  else {
      return new ol.style.Style({
          fill: new ol.style.Fill({
              color: '#F70810' //DEEP RED
          })
      });
  }
};

let tornado_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
  }), 
  style: function(feature, resolution) {
    return TornadoStyle(feature, resolution);
  },
  visible: true, 
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
                   total_disaster_layer, 
                   flood_layer, 
                   biological_layer, 
                   snow_layer, 
                   storm_layer,
                   fire_layer,
                   hurricane_layer
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
            new ol.control.OverviewMap(),
            // new ol.control.ZoomSlider({
            //     className: 'zoom-slider'
            // }),
            //Adding Layer Switcher to Control
            layerSwitcher,
            attribution
          ])
      });

};