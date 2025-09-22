import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';
import BlurRadiusDescription from './BlurRadius.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  card: {
    width: '200px',
    height: '150px',
    padding: '20px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase300,
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
});

const blurRadiusOptions = [
  { label: 'Small (5px)', value: '5px' },
  { label: 'Medium (20px)', value: '20px' },
  { label: 'Large (50px)', value: '50px' },
  { label: 'Extra Large (100px)', value: '100px' },
];

export const Radius = (): JSXElement => {
  const classes = useClasses();
  const [visibleStates, setVisibleStates] = React.useState<boolean[]>(blurRadiusOptions.map(() => true));

  const toggleAll = () => {
    setVisibleStates(prev => prev.map(state => !state));
  };

  const toggleSingle = (index: number) => {
    setVisibleStates(prev => prev.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <>
      <div className={classes.controls}>
        <Button onClick={toggleAll}>Toggle All</Button>
      </div>

      <div className={classes.container}>
        {blurRadiusOptions.map((option, index) => (
          <div key={option.value} className={classes.example}>
            <h4>{option.label}</h4>
            <Button onClick={() => toggleSingle(index)}>{visibleStates[index] ? 'Hide' : 'Show'}</Button>
            <Blur visible={visibleStates[index]} fromRadius={option.value}>
              <div className={classes.card}>
                <div>
                  Blur radius: {option.value}
                  <br />
                  Sample content with various text and elements.
                </div>
              </div>
            </Blur>
          </div>
        ))}
      </div>
    </>
  );
};

Radius.parameters = {
  docs: {
    description: {
      story: BlurRadiusDescription,
    },
  },
};
