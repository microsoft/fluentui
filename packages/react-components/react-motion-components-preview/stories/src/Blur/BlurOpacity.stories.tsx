import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';
import BlurOpacityDescription from './BlurOpacity.stories.md';

import styles from './BlurOpacity.module.css';

const useClasses = () => styles;

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
