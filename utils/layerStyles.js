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

export default totalDisaterStyle;