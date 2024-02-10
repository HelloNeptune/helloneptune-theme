import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  message: string
}

export const SettingsPanel: FC<Props> = ({ message }) => {
  const [lumo, setLumo] = useState(50);
  const ref = useRef(null);

  const onButtonClick = () => {
    console.log('basıldım');
  }

  useEffect(() => {
    console.log('ref.current', ref.current);
  }, []);

  return (
    <div className='settings-panel'>
      <Slider value={lumo} onChange={(e) => setLumo(e.value as number)} />
      <Button ref={ref} onClick={onButtonClick}>Test</Button>
    </div>
  );
}
