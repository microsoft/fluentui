import * as React from 'react';
import { ToastPosition, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const Offset = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = (position: ToastPosition) =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="info">
          Offset: {horizontal}, {vertical}
        </ToastTitle>
      </Toast>,
      { position },
    );
  const [horizontal, setHorizontal] = React.useState(10);
  const [vertical, setVertical] = React.useState(10);

  return (
    <>
      <Toaster toasterId={toasterId} offset={{ horizontal, vertical }} />
      <button onClick={() => notify('bottom-start')}>bottom-start</button>
      <button onClick={() => notify('bottom-end')}>bottom-end</button>
      <button onClick={() => notify('top-start')}>top-start</button>
      <button onClick={() => notify('top-end')}>top-end</button>
      <div>
        <label htmlFor="horizntal">horizontal</label>
        <input id="horizontal" type="number" value={horizontal} onChange={e => setHorizontal(Number(e.target.value))} />
      </div>
      <div>
        <label htmlFor="vertical">vertical</label>
        <input id="vertical" type="number" value={vertical} onChange={e => setVertical(Number(e.target.value))} />
      </div>
    </>
  );
};
