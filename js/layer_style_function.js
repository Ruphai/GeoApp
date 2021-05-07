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

var total_disaster_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'https://raw.githubusercontent.com/Ruphai/GeoApp/main/data/DisastersByStates_US.geojson'
    }),
    style: function (feature, resolution) {
        return totalDisaterStyle(feature, resolution);
    },
    visible: true,
    title: "Disaster Layer", 
    // y ordering
    //renderOrder: ol.ordering.yOrdering(),
    //style: function(f) { return getFeatureStyle(f); }
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

var flood_layer = new ol.layer.Vector({
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

var biological_layer = new ol.layer.Vector({
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

var snow_layer = new ol.layer.Vector({
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

var storm_layer = new ol.layer.Vector({
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

var fire_layer = new ol.layer.Vector({
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

var hurricane_layer = new ol.layer.Vector({
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

var tornado_layer = new ol.layer.Vector({
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