import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';
import BlurDurationDescription from './BlurDuration.stories.md';

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
    height: '120px',
    padding: '20px',
    border: `${tokens.strokeWidthThinner} solid ${tokens.colorNeutralStroke1}`,
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

const durationOptions = [
  { label: 'Fast (200ms)', duration: 200, exitDuration: 200 },
  { label: 'Normal (500ms)', duration: 500, exitDuration: 500 },
  { label: 'Slow (1000ms)', duration: 1000, exitDuration: 1000 },
  { label: 'Mixed (200ms enter, 800ms exit)', duration: 200, exitDuration: 800 },
];

export const Duration = () => {
  const classes = useClasses();
  const [visibleStates, setVisibleStates] = React.useState<boolean[]>(durationOptions.map(() => true));

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
        {durationOptions.map((option, index) => (
          <div key={option.label} className={classes.example}>
            <h4>{option.label}</h4>
            <Button onClick={() => toggleSingle(index)}>{visibleStates[index] ? 'Hide' : 'Show'}</Button>
            <Blur visible={visibleStates[index]} duration={option.duration} exitDuration={option.exitDuration}>
              <div className={classes.card}>
                <div>
                  Enter: {option.duration}ms
                  <br />
                  Exit: {option.exitDuration}ms
                </div>
              </div>
            </Blur>
          </div>
        ))}
      </div>
    </>
  );
};

Duration.parameters = {
  docs: {
    description: {
      story: BlurDurationDescription,
    },
  },
};
