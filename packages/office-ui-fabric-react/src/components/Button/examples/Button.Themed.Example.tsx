import * as React from 'react';
import { mergeCss } from '@uifabric/merge-styles';
import { Provider } from './Provider';
import { FluentTheme } from './fluent/FluentTheme';
import { FluentButton } from './fluent/FluentButton';

const oddRedBorder = mergeCss({ border: '10px solid red' });

export const ButtonThemedExample: React.FunctionComponent<{}> = props => {
  const onClick = React.useCallback(() => console.log('clicked button'), []);

  return (
    <Provider theme={FluentTheme}>
      <div>
        <div>
          <FluentButton onClick={onClick}>A standard fluent button</FluentButton>
        </div>

        <div>
          <FluentButton onClick={onClick} className={oddRedBorder}>
            Fluent Button with an odd red border
          </FluentButton>
        </div>
      </div>
    </Provider>
  );
};
