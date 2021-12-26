import React, { useCallback, useEffect, useState } from "react";
import Leftbar from "../../components/Leftbar/Leftbar";
import styles from "./Settings.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeBackground, changeColor } from "../../features/theme";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Settings() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(theme.background === "dark-theme");

  const handleBackgroundChange = useCallback(
    (value) => {
      dispatch(changeBackground(value));
    },
    [dispatch]
  );
  useEffect(() => {
    const background = isDark ? "dark-theme" : "light-theme";
    handleBackgroundChange(background);
  }, [isDark, handleBackgroundChange]);
  const handleColorChange = (value) => {
    dispatch(changeColor(value));
  };
  return (
    <div className={`${styles.settings} container`}>
      <Leftbar active="settings" />
      <div className={styles.middle}>
        <div className={styles.theme}>
          <h2>Customize Theme</h2>
          <div className={styles.color}>
            <h3>Color</h3>
            <div className={styles.chooseColor}>
              <span
                className={`color1 ${
                  theme.color === "color1" && styles.activeColor
                }`}
                onClick={() => handleColorChange("color1")}
              ></span>
              <span
                className={`color2 ${
                  theme.color === "color2" && styles.activeColor
                }`}
                onClick={() => handleColorChange("color2")}
              ></span>
              <span
                className={`color3 ${
                  theme.color === "color3" && styles.activeColor
                }`}
                onClick={() => handleColorChange("color3")}
              ></span>
              <span
                className={`color4 ${
                  theme.color === "color4" && styles.activeColor
                }`}
                onClick={() => handleColorChange("color4")}
              ></span>
              <span
                className={`color5 ${
                  theme.color === "color5" && styles.activeColor
                }`}
                onClick={() => handleColorChange("color5")}
              ></span>
            </div>
          </div>
          <div className={styles.background}>
            <h3 className={styles.backgroundTitle}>Background</h3>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDark}
                    color="default"
                    onChange={() => setIsDark(!isDark)}
                  />
                }
                label={isDark ? "Dark" : "Light"}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
