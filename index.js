const axios = require('axios')

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  

 const calculate = (pincode1,pincode2, data) => {
    let latitude1 = data[pincode1].latitude;
    let longitude1 = data[pincode1].longitude;
    let latitude2 = data[pincode2].latitude;
    let longitude2 = data[pincode2].longitude
    let distance = getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2)
    return distance
 }


const getDistance = async (pincode1, pincode2) =>{
     return await axios.get('https://deepakr-28.github.io/latlong/latlong.json')
    .then(response => {
        let result = calculate(pincode1, pincode2, response.data)
        return result
    })
    .catch(error => console.log(error.response))
}




module.exports = {getDistance}