async function showWeatherWidget() {
    let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=KHARKIV&units=metric&appid=2693b93d77b00bae433ef314a2dd0d7d', {
        method: 'GET'
    })
    let data = await response.json();
    console.log(data);

    const wrapper = document.querySelector('.weatherWidget');
    wrapper.innerHTML = '';

    const city = document.createElement('p');
    city.textContent = data.name;
    wrapper.appendChild(city);

    const temp = document.createElement('p');
    temp.classList.add('temperature');
    temp.innerHTML = Math.round(data.main.temp).toString() + ` °C`;
    wrapper.appendChild(temp);

    let currentDate = new Date();
    let date = document.createElement('p');
    date.textContent = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}, ${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    wrapper.appendChild(date);

    const tempFeels = document.createElement('p');
    tempFeels.innerHTML = `Feels like ` + Math.round(data.main.feels_like).toString() + ` °C`;
    wrapper.appendChild(tempFeels);

    const clouds = document.createElement('p');
    clouds.textContent = `${data.weather[0].main}`;
    wrapper.appendChild(clouds);

    const weatherImg = new Image(50, 80);
    weatherImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherImg.classList.add('weather-img');
    wrapper.appendChild(weatherImg);

    const wind = document.createElement('p');
    wind.textContent = `Wind: ${data.wind.speed} km/h`;
    wrapper.appendChild(wind);

    const reloadBtn = document.createElement('p');
    reloadBtn.classList.add('icon-loop2');
    reloadBtn.addEventListener('click', showWeatherWidget);
    wrapper.appendChild(reloadBtn);
}

document.addEventListener('DOMContentLoaded', showWeatherWidget);
