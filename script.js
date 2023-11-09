const input = document.getElementById("input-name");
const btn = document.getElementById("submit-btn");
const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const cityCondition = document.getElementById("city-condition");
const icon = document.getElementById("icon");
const loader = document.getElementById("loader");
btn.addEventListener('click', async () => {

    if(input.value != '')
    {
        loader.style.display = 'block';
        const data = await getCityData(input.value);
        loader.style.display = 'none';
        if (data.error) {
            cityName.innerHTML = data.error.message;
            cityTime.innerHTML = '';
            cityTemp.innerHTML = '';
            cityCondition.innerHTML = '';
            icon.src = '';
        }
        else {
            cityName.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
            const dt = new Date(data.location.localtime);
            cityTime.innerHTML = `${dt.getHours()}:${dt.getMinutes()}`;
            cityTemp.innerHTML = `${data.current.temp_c} °`;
            cityCondition.innerHTML = data.current.condition.text;
            icon.src = `https:${data.current.condition.icon}`;
        }

        
    }
    else {
        cityName.innerHTML = "Please Enter Name of the city above..."
    }
    


})

async function getCityData(city) {
    cityName.innerHTML = '';
    cityTime.innerHTML = '';
    cityTemp.innerHTML = '';
    cityCondition.innerHTML = '';
    icon.src = '';
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=572600794dac4b7c822153005230811&q=${city}&aqi=no`);
    const dt = await data.json();

    return dt;

}

window.addEventListener('load', (e)=> {
    const successCallback =  async (position) => {
            loader.style.display = 'block';
            const data = await getCityData(`${position.coords.latitude}, ${position.coords.longitude}`);
            loader.style.display = 'none';
            if (data.error) {
                cityName.innerHTML = data.error.message;
                cityTime.innerHTML = '';
                cityTemp.innerHTML = '';
                cityCondition.innerHTML = '';
                icon.src = '';
            }
            else {
                cityName.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
                const dt = new Date(data.location.localtime);
                cityTime.innerHTML = `${dt.getHours()}:${dt.getMinutes()}`;
                cityTemp.innerHTML = `${data.current.temp_c} °`;
                cityCondition.innerHTML = data.current.condition.text;
                icon.src = `https:${data.current.condition.icon}`;
            }
      };
      
      const errorCallback = (error) => {
        console.log(`Error is: ${error}`);
      };
      
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
})




