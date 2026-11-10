import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';
import BlurOpacityDescription from './BlurOpacity.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    padding: '20px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  card: {
    width: '250px',
    height: '180px',
    padding: '20px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    textAlign: 'center',
    backgroundImage: `
      linear-gradient(45deg, ${tokens.colorNeutralBackground3} 25%, transparent 25%, transparent 75%, ${tokens.colorNeutralBackground3} 75%),
      linear-gradient(45deg, ${tokens.colorNeutralBackground3} 25%, transparent 25%, transparent 75%, ${tokens.colorNeutralBackground3} 75%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
  },
});

export const Opacity = (): JSXElement => {
  const classes = useClasses();
  const [withOpacityVisible, setWithOpacityVisible] = React.useState<boolean>(true);
  const [withoutOpacityVisible, setWithoutOpacityVisible] = React.useState<boolean>(true);

  const toggleBoth = () => {
    setWithOpacityVisible(prev => !prev);
    setWithoutOpacityVisible(prev => !prev);
  };

  return (
    <>
      <div className={classes.controls}>
        <Button onClick={toggleBoth}>Toggle Both</Button>
      </div>

      <div className={classes.container}>
        <div className={classes.example}>
          <Button onClick={() => setWithOpacityVisible(prev => !prev)}>{withOpacityVisible ? 'Hide' : 'Show'}</Button>
          <Blur visible={withOpacityVisible} animateOpacity={true}>
            <div className={classes.card}>
              <div>
                This content blurs and fades
                <br />
                <br />
                <strong>animateOpacity: true</strong>
              </div>
            </div>
          </Blur>
        </div>

        <div className={classes.example}>
          <Button onClick={() => setWithoutOpacityVisible(prev => !prev)}>
            {withoutOpacityVisible ? 'Hide' : 'Show'}
          </Button>
          <Blur visible={withoutOpacityVisible} animateOpacity={false}>
            <div className={classes.card}>
              <div>
                This content only blurs
                <br />
                <br />
                <strong>animateOpacity: false</strong>
              </div>
            </div>
          </Blur>
        </div>
      </div>
    </>
  );
};

Opacity.parameters = {
  docs: {
    description: {
      story: BlurOpacityDescription,
    },
  },
};
