import { useContext, useEffect, useState } from "react";
import { WebviewContext } from "./view-context";
import { Slider } from "primereact/slider";
import { LampCharge, LampOn } from "iconsax-react";
import { useDebounce } from "../hooks/use-debounce";
import '../styles/settings.css';

export const SettingsView = () => {
  const [uiLuminosity, setUiLuminosity] = useState(50);
  const [codeThemeLuminosity, setCodeThemeLuminosity] = useState(50);

  const { callApi } = useContext(WebviewContext);

  const applyUiLimo = useDebounce((newLuminosity: number) => {
    callApi('setUiLuminosity', newLuminosity);
  }, 500);

  const applyThemeGlobalLimo = useDebounce((newLuminosity: number) => {
    callApi('setTokenLuminosity', newLuminosity);
  }, 500);

  return (
    <div className="settings-view">
      <div className="setting-card">
        <h3>Theme Code Luminosity</h3>
        <p>
          Set luminosity of the theme code color tokens.
        </p>

        <div className="setting-input">
          <div className="current-value luminosity">
            <LampOn
              size="24"
              color="#06b6d4"
              variant="Bulk"
            />
            <span>{codeThemeLuminosity}%</span>
            <LampCharge
              size="24"
              color="#06b6d4"
              variant="Bulk"
            />
          </div>
          <Slider
            className="w-full"
            value={codeThemeLuminosity}
            onChange={(e) => {
              setCodeThemeLuminosity(e.value as number);
              applyThemeGlobalLimo(e.value);
            }}
          />
        </div>
      </div>
      <div className="setting-card">
        <h3>Ui Luminosity</h3>
        <p>
          Set luminosity of the UI colors. This will affect for all UI related colors
        </p>

        <div className="setting-input">
          <div className="current-value luminosity">
            <LampOn
              size="24"
              color="#06b6d4"
              variant="Bulk"
            />
            <span>{uiLuminosity}%</span>
            <LampCharge
              size="24"
              color="#06b6d4"
              variant="Bulk"
            />
          </div>
          <Slider
            className="w-full"
            value={uiLuminosity}
            onChange={(e) => {
              setUiLuminosity(e.value as number);
              applyUiLimo(e.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
