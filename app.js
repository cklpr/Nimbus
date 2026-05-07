// --- SVG ICON LIBRARY (No Emojis) ---
const svgs = {
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    rain: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line></svg>`,
    storm: `<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>`,
    snow: `<svg viewBox="0 0 24 24" fill="none" stroke="#e0f2fe" stroke-width="2"><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line></svg>`,
    drop: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
    
    // Outfit Icons
    shirt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.38 3.46L16 2a8.5 8.5 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>`,
    jacket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 10h12v12H6z"></path><path d="M6 10l3-8 3 3 3-3 3 8"></path><line x1="12" y1="10" x2="12" y2="22"></line></svg>`,
    coat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10h16v12H4z"></path><path d="M4 10l4-8 4 3 4-3 4 8"></path><line x1="12" y1="10" x2="12" y2="22"></line><line x1="8" y1="10" x2="8" y2="22"></line><line x1="16" y1="10" x2="16" y2="22"></line></svg>`,
    umbrella: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v10"></path><path d="M12 22a2 2 0 0 1-2-2"></path><path d="M22 12A10 10 0 0 0 2 12h20z"></path></svg>`,
    glasses: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="15" r="4"></circle><circle cx="18" cy="15" r="4"></circle><path d="M14 15a2 2 0 0 0-4 0"></path><path d="M2.5 13L5 7c.7-1.4 1.4-2 3-2h8c1.6 0 2.3.6 3 2l2.5 6"></path></svg>`
};

// --- CONFIGURATION & STATE ---
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";

const weatherMap = {
    0: { desc: "Clear Sky", icon: "sun", nightIcon: "moon", theme: "clear" },
    1: { desc: "Mainly Clear", icon: "sun", nightIcon: "moon", theme: "clear" },
    2: { desc: "Partly Cloudy", icon: "cloud", nightIcon: "cloud", theme: "clouds" },
    3: { desc: "Overcast", icon: "cloud", nightIcon: "cloud", theme: "clouds" },
    45: { desc: "Fog", icon: "cloud", nightIcon: "cloud", theme: "clouds" },
    48: { desc: "Depositing Rime Fog", icon: "cloud", nightIcon: "cloud", theme: "clouds" },
    51: { desc: "Light Drizzle", icon: "rain", nightIcon: "rain", theme: "rain" },
    53: { desc: "Moderate Drizzle", icon: "rain", nightIcon: "rain", theme: "rain" },
    55: { desc: "Dense Drizzle", icon: "rain", nightIcon: "rain", theme: "rain" },
    61: { desc: "Slight Rain", icon: "rain", nightIcon: "rain", theme: "rain" },
    63: { desc: "Moderate Rain", icon: "rain", nightIcon: "rain", theme: "rain" },
    65: { desc: "Heavy Rain", icon: "rain", nightIcon: "rain", theme: "rain" },
    71: { desc: "Slight Snow", icon: "snow", nightIcon: "snow", theme: "clouds" },
    73: { desc: "Moderate Snow", icon: "snow", nightIcon: "snow", theme: "clouds" },
    75: { desc: "Heavy Snow", icon: "snow", nightIcon: "snow", theme: "clouds" },
    95: { desc: "Thunderstorm", icon: "storm", nightIcon: "storm", theme: "storm" },
    96: { desc: "Thunderstorm + Hail", icon: "storm", nightIcon: "storm", theme: "storm" },
    99: { desc: "Heavy Thunderstorm", icon: "storm", nightIcon: "storm", theme: "storm" }
};

let appState = { lat: null, lon: null, city: "Detecting...", data: null, soundEnabled: false, audio: null };

// --- DOM ELEMENTS ---
const els = {
    app: document.getElementById('app'), loader: document.getElementById('loader'), footer: document.getElementById('footer'),
    searchInput: document.getElementById('searchInput'), locationBtn: document.getElementById('locationBtn'),
    navLocationText: document.getElementById('navLocationText'), cityName: document.getElementById('cityName'),
    currentDateTime: document.getElementById('currentDateTime'), currentTemp: document.getElementById('currentTemp'),
    currentIconLarge: document.getElementById('currentIconLarge'), weatherDesc: document.getElementById('weatherDesc'),
    highTemp: document.getElementById('highTemp'), lowTemp: document.getElementById('lowTemp'), feelsLike: document.getElementById('feelsLike'),
    dailyContainer: document.getElementById('dailyContainer'), hourlyContainer: document.getElementById('hourlyContainer'),
    outfitMainIcon: document.getElementById('outfitMainIcon'), outfitMainText: document.getElementById('outfitMainText'), outfitList: document.getElementById('outfitList'),
    detailHumidity: document.getElementById('detailHumidity'), detailWind: document.getElementById('detailWind'), detailPressure: document.getElementById('detailPressure'),
    detailUV: document.getElementById('detailUV'), detailVisibility: document.getElementById('detailVisibility'), detailClouds: document.getElementById('detailClouds'),
    sunriseTime: document.getElementById('sunriseTime'), sunsetTime: document.getElementById('sunsetTime'),
    speakBtn: document.getElementById('speakBtn'), soundBtn: document.getElementById('soundBtn'), soundText: document.getElementById('soundText')
};

// --- INIT ---
async function init() {
    setupListeners();
    const savedCity = localStorage.getItem('nim_city');
    const savedLat = localStorage.getItem('nim_lat');
    const savedLon = localStorage.getItem('nim_lon');

    if (savedLat && savedLon && savedCity) {
        appState.lat = savedLat; appState.lon = savedLon; appState.city = savedCity;
        await fetchWeather();
    } else {
        getLocation();
    }
}

// --- LOCATION ---
function getLocation() {
    els.navLocationText.innerText = "Locating...";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (pos) => { appState.lat = pos.coords.latitude; appState.lon = pos.coords.longitude; appState.city = "Current Location"; await fetchWeather(); },
            () => { searchCity("New York"); }
        );
    } else { searchCity("New York"); }
}

async function searchCity(query) {
    els.loader.classList.remove('hidden'); els.app.classList.add('hidden'); els.footer.classList.add('hidden');
    try {
        const res = await fetch(`${GEO_API}?name=${query}&count=1&language=en&format=json`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            const loc = data.results[0];
            appState.lat = loc.latitude; appState.lon = loc.longitude; appState.city = `${loc.name}, ${loc.country || ''}`;
            localStorage.setItem('nim_city', appState.city); localStorage.setItem('nim_lat', loc.latitude); localStorage.setItem('nim_lon', loc.longitude);
            await fetchWeather();
        } else { alert("Location not found."); els.loader.classList.add('hidden'); els.app.classList.remove('hidden'); els.footer.classList.remove('hidden');}
    } catch (err) { console.error(err); }
}

// --- WEATHER FETCH ---
async function fetchWeather() {
    els.loader.classList.remove('hidden'); els.app.classList.add('hidden'); els.footer.classList.add('hidden');
    try {
        const params = new URLSearchParams({
            latitude: appState.lat, longitude: appState.lon,
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m",
            hourly: "temperature_2m,weather_code,precipitation_probability,visibility",
            daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max",
            timezone: "auto"
        });
        const res = await fetch(`${WEATHER_API}?${params}`);
        appState.data = await res.json();
        renderUI();
    } catch (e) { console.error("API Error", e); }
    els.loader.classList.add('hidden'); els.app.classList.remove('hidden'); els.footer.classList.remove('hidden');
}

// --- RENDER UI ---
function renderUI() {
    const cur = appState.data.current; const daily = appState.data.daily;
    const wInfo = weatherMap[cur.weather_code] || weatherMap[0];
    const isDay = cur.is_day;
    
    // Theme
    document.body.className = `theme-${isDay ? wInfo.theme : (wInfo.theme === 'clear' ? 'clear-night' : wInfo.theme)}`;

    // Top Header
    els.navLocationText.innerText = "Active";
    els.cityName.innerText = appState.city;
    
    const now = new Date();
    els.currentDateTime.innerText = now.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'short', year:'numeric'}) + " • " + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    // Current Card
    els.currentTemp.innerText = Math.round(cur.temperature_2m);
    els.currentIconLarge.innerHTML = isDay ? svgs[wInfo.icon] : svgs[wInfo.nightIcon];
    els.weatherDesc.innerText = wInfo.desc;
    els.highTemp.innerText = `${Math.round(daily.temperature_2m_max[0])}°`;
    els.lowTemp.innerText = `${Math.round(daily.temperature_2m_min[0])}°`;
    els.feelsLike.innerText = `${Math.round(cur.apparent_temperature)}°`;

    // Details Grid
    els.detailHumidity.innerText = `${cur.relative_humidity_2m}%`;
    els.detailWind.innerText = `${cur.wind_speed_10m} km/h`;
    els.detailPressure.innerText = `${Math.round(cur.surface_pressure)} hPa`;
    els.detailUV.innerText = daily.uv_index_max[0] ? Math.round(daily.uv_index_max[0]) : "0";
    els.detailVisibility.innerText = appState.data.hourly.visibility[0] ? `${(appState.data.hourly.visibility[0]/1000).toFixed(1)} km` : "N/A";
    els.detailClouds.innerText = `${cur.cloud_cover}%`;

    // Sun Times
    const sunriseObj = new Date(daily.sunrise[0]); const sunsetObj = new Date(daily.sunset[0]);
    els.sunriseTime.innerText = sunriseObj.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
    els.sunsetTime.innerText = sunsetObj.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});

    renderHourly();
    renderDaily();
    renderOutfit(cur.temperature_2m, cur.precipitation, cur.wind_speed_10m, daily.uv_index_max[0]);
}

function renderHourly() {
    const hourly = appState.data.hourly;
    els.hourlyContainer.innerHTML = '';
    
    let curIdx = hourly.time.findIndex(t => new Date(t) > new Date());
    if(curIdx === -1) curIdx = 0;

    for(let i = curIdx; i < curIdx + 24; i += 2) {
        if(i >= hourly.time.length) break;
        const tObj = new Date(hourly.time[i]);
        const wInfo = weatherMap[hourly.weather_code[i]] || weatherMap[0];
        const isDayH = tObj.getHours() > 6 && tObj.getHours() < 18; // approximation
        
        els.hourlyContainer.innerHTML += `
            <div class="hourly-item">
                <span class="sub-text">${tObj.toLocaleTimeString([], {hour: 'numeric'})}</span>
                ${isDayH ? svgs[wInfo.icon] : svgs[wInfo.nightIcon]}
                <span class="hourly-temp">${Math.round(hourly.temperature_2m[i])}°</span>
                <span class="hourly-precip">${svgs.drop} ${hourly.precipitation_probability[i]}%</span>
            </div>
        `;
    }
}

function renderDaily() {
    const daily = appState.data.daily;
    els.dailyContainer.innerHTML = '';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for(let i = 1; i <= 7; i++) {
        if(i >= daily.time.length) break;
        const dObj = new Date(daily.time[i]);
        const wInfo = weatherMap[daily.weather_code[i]] || weatherMap[0];
        
        els.dailyContainer.innerHTML += `
            <div class="daily-item">
                <span class="day-name">${days[dObj.getDay()]}, ${dObj.getDate()} ${dObj.toLocaleString('default', {month:'short'})}</span>
                <div class="daily-icon-wrapper">${svgs[wInfo.icon]}</div>
                <div class="daily-temps">
                    <span class="sub-text">${Math.round(daily.temperature_2m_min[i])}°</span>
                    <span style="font-weight:500">${Math.round(daily.temperature_2m_max[i])}°</span>
                </div>
            </div>
        `;
    }
}

function renderOutfit(temp, rain, wind, uv) {
    let mainIcon = 'shirt', mainText = "Comfortable weather. Light layers recommended.";
    let tips = [];

    if (rain > 0) {
        mainIcon = 'umbrella'; mainText = "Rain expected. Stay dry.";
        tips.push({ i: 'umbrella', t: "Carry an umbrella" }, { i: 'jacket', t: "Waterproof jacket advised" });
    } else if (temp <= 5) {
        mainIcon = 'coat'; mainText = "Freezing temperatures. Bundle up securely.";
        tips.push({ i: 'coat', t: "Heavy winter coat" }, { i: 'glasses', t: "Gloves and scarf" }); // reusing glasses icon conceptually or text
    } else if (temp <= 18) {
        mainIcon = 'jacket'; mainText = "Chilly atmosphere. A solid jacket is ideal.";
        tips.push({ i: 'jacket', t: "Wear a light jacket or sweater" }, { i: 'shirt', t: "Layered clothing" });
    } else {
        mainIcon = 'shirt'; mainText = "Warm weather conditions. Keep it light.";
        tips.push({ i: 'shirt', t: "Wear light, breathable fabrics" });
        if(uv > 5) tips.push({ i: 'glasses', t: "Sunglasses recommended" }, { i: 'sun', t: "Apply sunscreen" });
    }

    els.outfitMainIcon.innerHTML = svgs[mainIcon];
    els.outfitMainText.innerText = mainText;
    
    els.outfitList.innerHTML = tips.map(tip => `
        <li>
            <div style="width:16px; height:16px; color:var(--accent)">${svgs[tip.i] || svgs.shirt}</div>
            ${tip.t}
        </li>
    `).join('');
}

// --- ACTIONS ---
function narrate() {
    if(!('speechSynthesis' in window)) return alert("Voice not supported");
    window.speechSynthesis.cancel();
    const c = appState.data.current;
    const desc = (weatherMap[c.weather_code] || weatherMap[0]).desc;
    const text = `Current weather in ${appState.city.split(',')[0]} is ${desc} at ${Math.round(c.temperature_2m)} degrees Celsius. ${els.outfitMainText.innerText}`;
    
    const u = new SpeechSynthesisUtterance(text);
    els.speakBtn.classList.add('active');
    u.onend = () => els.speakBtn.classList.remove('active');
    window.speechSynthesis.speak(u);
}

function toggleSound() {
    appState.soundEnabled = !appState.soundEnabled;
    if(appState.soundEnabled) {
        els.soundBtn.classList.add('active');
        els.soundText.innerText = "Ambience On";
        // Dummy audio trigger (Browser blocks without real files, keeping logic structural)
        if(!appState.audio) appState.audio = new Audio('https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg');
        appState.audio.loop = true; appState.audio.volume = 0.2;
        appState.audio.play().catch(()=>{});
    } else {
        els.soundBtn.classList.remove('active');
        els.soundText.innerText = "Enable Ambience";
        if(appState.audio) appState.audio.pause();
    }
}

// --- LISTENERS ---
function setupListeners() {
    els.locationBtn.addEventListener('click', getLocation);
    els.searchInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter' && e.target.value.trim()) {
            searchCity(e.target.value.trim());
            e.target.value = ''; e.target.blur();
        }
    });
    els.speakBtn.addEventListener('click', narrate);
    els.soundBtn.addEventListener('click', toggleSound);
}

document.addEventListener('DOMContentLoaded', init);