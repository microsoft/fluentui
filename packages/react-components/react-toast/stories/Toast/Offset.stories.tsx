import * as React from 'react';
import { ToastPosition, Toaster, useToastController, ToastAlert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const Offset = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = (position: ToastPosition) =>
    dispatchToast(
      <ToastAlert intent="info">
        Offset: {horizontal}, {vertical}
      </ToastAlert>,
      { position },
    );
  const [horizontal, setHorizontal] = React.useState(10);
  const [vertical, setVertical] = React.useState(10);

  return (
    <>
      <Toaster toasterId={toasterId} offset={{ horizontal, vertical }} />
      <button onClick={() => notify('bottom-left')}>bottom-left</button>
      <button onClick={() => notify('bottom-right')}>bottom-right</button>
      <button onClick={() => notify('top-left')}>top-left</button>
      <button onClick={() => notify('top-right')}>top-right</button>
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
