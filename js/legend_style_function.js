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
