import * as React from 'react';
import { Popup } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean } from '@fluentui/react-hooks';

export const PopupBasicExample = () => {
  const [isPopupVisible, { toggle: toggleIsPopupVisible }] = useBoolean(false);
  return (
    <>
      <DefaultButton onClick={toggleIsPopupVisible} text="Show popup" />
      {isPopupVisible && (
        <Popup>
          <h2>Example Popup</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </Popup>
      )}
    </>
  );
};
