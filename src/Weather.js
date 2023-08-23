import { useState } from "react";
import styles from "./Weather.module.scss";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  async function weatherData(location) {
    console.log("loading");

    const result = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6664f2ed3cd9439597d90102231608&q=${location}&aqi=no&days=6`
    );
    if (!result.ok) {
      setLocation("");
      throw new Error("Place not found");
    }
    const data = await result.json();
    setWeather(data);
    console.log(weather);
  }

  function handleSubmit(e) {
    e.preventDefault();
    weatherData(location);
  }
  console.log(weather);
  return (
    <>
      <main className={styles.main}>
        <h1>🌞</h1>
        <form
          action="Submit"
          className={styles.searchBar}
          onSubmit={handleSubmit}
        >
          <label htmlFor="city" />
          <input
            className={styles.roundInput}
            type="text"
            id="city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </form>
        <div className={styles.card}>
          {!weather ? <p className={styles.loading}>loading...</p> : null}
          {weather ? (
            <>
              <h1 className={styles.h1}>{weather.location.name}</h1>
              <p className={styles.p}>
                Chance of rain{" "}
                {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
              </p>
              <img
                src={weather.forecast.forecastday[0].day.condition.icon}
                alt="Weather data by WeatherAPI.com"
                border="0"
              ></img>
              <h1 className={styles.h1}>{weather.current.temp_c}&deg;C</h1>

              <div className={styles.maxMin}>
                <p className={styles.p}>
                  {weather.forecast.forecastday[0].day.maxtemp_c}&deg;C
                </p>
                <p className={styles.p}>
                  {weather.forecast.forecastday[0].day.mintemp_c}&deg;C
                </p>
              </div>

              <div className={styles.forecast}>
                {weather.forecast.forecastday.map((date) => {
                  if (date.date !== weather.forecast.forecastday[0].date) {
                    console.log("not today");
                    const newDate = new Date(date.date);
                    const d = new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                    }).format(newDate);
                    return (
                      <>
                        <div key={d} className={styles.miniForecast}>
                          <h2>{d}</h2>
                          <img
                            src={date.day.condition.icon}
                            alt="Weather data by WeatherAPI.com"
                            border="0"
                          ></img>
                          <h2>{date.day.avgtemp_c}&deg;C</h2>
                        </div>
                      </>
                    );
                  }
                  return null;
                })}
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
