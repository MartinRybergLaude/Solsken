import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import cx from "classnames";

import Container from "~/components/Container";
import Icon from "~/components/Icon";
import LoadingWrapper from "~/components/LoadingWrapper";
import { useWeather } from "~/contexts/WeatherContext";

import GraphSwitcher from "../../../../components/GraphSwitcher";
import SettingsModal from "./partials/SettingsModal";
import SmallWeatherInfo from "./partials/SmallWeatherInfo";
import styles from "./TodayCard.module.css";
function TodayCard() {
  const [showSettings, setShowSettings] = useState(false);

  const { weather, error, loading, refresh } = useWeather();

  useEffect(() => {
    if (!showSettings) {
      refresh();
    }
  }, [showSettings]);

  const day = weather?.formatted.days[0];
  const current = day?.hours[0];
  const city = weather?.formatted.city;
  return (
    <>
      <div className={cx(styles.root)}>
        <Container className={styles.weatherWrapper}>
          <div className={styles.location}>
            <Icon
              IconComponent={FiSettings}
              color="primary"
              className={styles.burger}
              onClick={() => setShowSettings(!showSettings)}
            />
            <LoadingWrapper loading={loading} error={error}>
              <h1>{city || ""}</h1>
            </LoadingWrapper>
            <div className={styles.fakeIcon} />
          </div>
          <LoadingWrapper
            loading={loading}
            error={error}
            contentClassName={styles.temperatureWrapper}
          >
            <div className={styles.temperature}>
              <h2>{current?.tempr || "N/A"}</h2>
              <h3>{current?.text || "N/A"}</h3>
            </div>
            <SmallWeatherInfo currentHour={current} />
          </LoadingWrapper>
          <LoadingWrapper
            loading={loading}
            error={error}
            className={styles.weatherContainer}
            showIcons
          >
            <SmallWeatherInfo currentHour={current} />
          </LoadingWrapper>
        </Container>
        <LoadingWrapper
          loading={loading}
          error={error}
          className={cx(styles.fullWidth, styles.graphWrapper)}
          contentClassName={cx(styles.fullWidth, styles.fullHeight)}
        >
          <GraphSwitcher hours={weather?.formatted.chartHours} />
        </LoadingWrapper>
      </div>
      <SettingsModal isOpen={showSettings} setOpen={setShowSettings} />
    </>
  );
}
export default TodayCard;
