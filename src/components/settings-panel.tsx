import { FC } from 'react';

interface Props {
  message: string
}

export const SettingsPanel: FC<Props> = ({ message }) => {
  return (
    <div className='settings-panel'>
      Tests
    </div>
  );
}
