import * as React from 'react';
import { classNamesFunction, IStyle, Overlay } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean } from '@fluentui/react-hooks';

interface IOverlayExampleStyles {
  root: IStyle;
}

const exampleStyles: IOverlayExampleStyles = {
  root: [
    'OverlayExample-content',
    {
      background: 'blue',
      bottom: '0',
      color: 'white',
      left: '0',
      padding: '10px',
      position: 'absolute',
      right: '0',
    },
  ],
};

const getClassNames = classNamesFunction<{}, IOverlayExampleStyles>();
const classNames = getClassNames(exampleStyles, {});

export const OverlayLightExample: React.FunctionComponent = () => {
  const [isOverlayVisible, { toggle: toggleIsOverlayVisible }] = useBoolean(false);
  return (
    <>
      <DefaultButton onClick={toggleIsOverlayVisible} text="Show the overlay" />
      {isOverlayVisible && (
        <Overlay onClick={toggleIsOverlayVisible}>
          <div className={classNames.root}>
            <p>I am content within the overlay.</p>
          </div>
        </Overlay>
      )}
    </>
  );
};
