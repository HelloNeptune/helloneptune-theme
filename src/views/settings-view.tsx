import { useContext, useState } from "react";
import { WebviewContext } from "./view-context";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import '../styles/settings.css';
import { LampCharge, LampOn } from "iconsax-react";

export const SettingsView = () => {
  const [luminosity, setLuminosity] = useState(50);
  const { callApi } = useContext(WebviewContext);

  // callApi('setGlobalLuminosity', 20)
  return (
    <div className="settings-view">
      <div className="setting-card">
        <h3>Global Luminosity</h3>
        <p>
          Set the global luminosity of the lights. This will affect all the
          lights for code colors.
        </p>

        <div className="setting-input">
          <div className="current-value luminosity">
            <LampOn
              size="24"
              color="#06b6d4"
              variant="Bulk"
            />
            <span>{luminosity}%</span>
            <LampCharge
              size="24"
              color="#06b6d4"
              variant="Bulk"
            />
          </div>
          <Slider
            value={luminosity}
            onChange={(e) => setLuminosity(e.value as number)}
            className="w-full"
          />
        </div>
      </div>

    </div>
  );
};
