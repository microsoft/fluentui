import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { SpinButton, SpinButtonProps } from '@fluentui/react-spinbutton';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

const cropTo = '.testWrapper';

storiesOf('SpinButton Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => <Screener steps={new Steps().snapshot('rest', { cropTo }).end()}>{story()}</Screener>)
  .addStory(
    'Variations',
    () => {
      const appearances: SpinButtonProps['appearance'][] = ['filledDarker', 'filledLighter', 'outline', 'underline'];
      const sizes: SpinButtonProps['size'][] = ['small', 'medium'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 10 }}>
          {appearances.map(appearance => (
            <div key={appearance}>
              <h5>{appearance}</h5>
              <SpinButton value={10} appearance={appearance} />
            </div>
          ))}
          {sizes.map(size => (
            <div key={size}>
              <h5>{size}</h5>
              <SpinButton value={10} size={size} />
            </div>
          ))}

          <div>
            <h5>Display value</h5>
            <SpinButton value={10} displayValue="$10.00" />
          </div>
          <div>
            <h5>Disabled</h5>
            <SpinButton value={10} disabled />
          </div>
          <div>
            <h5>At min bound</h5>
            <SpinButton value={10} min={10} />
          </div>
          <div>
            <h5>At max bound</h5>
            <SpinButton value={10} max={10} />
          </div>
        </div>
      );
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );
