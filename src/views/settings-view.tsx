import { useContext, useState } from "react";
import { WebviewContext } from "./view-context";
import { Button } from "primereact/button";

export const SettingsView = () => {
  const { callApi } = useContext(WebviewContext);

  return (
    <div>
      <Button onClick={() => callApi('setGlobalLuminosity', 20)}>Button</Button>
    </div>
  );
};
