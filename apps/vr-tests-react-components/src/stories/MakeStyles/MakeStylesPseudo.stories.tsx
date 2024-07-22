import { shorthands, makeStyles } from '@griffel/react';
import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { withStoryWrightSteps } from '../../utilities';

const useFocusStylesA = makeStyles({
  root: {
    ...shorthands.border('3px', 'solid', 'blue'),
    ...shorthands.padding('10px'),

    ':focus': {
      color: 'red',
    },
    ':hover': {
      color: 'blue',
    },
  },
});
const useFocusStylesB = makeStyles({
  root: {
    ...shorthands.border('3px', 'solid', 'orange'),
    ...shorthands.padding('10px'),

    ':hover': {
      color: 'orange',
    },
    ':focus': {
      color: 'green',
    },
  },
});

const BoxWithPseudo: React.FC = () => {
  const classesA = useFocusStylesA();
  const classesB = useFocusStylesB();

  return (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <p>When element is focused & hovered - border color & text color should match</p>

      <div className={classesA.root} id="boxA" tabIndex={0}>
        A focusable element
      </div>
      <div className={classesB.root} id="boxB" tabIndex={0}>
        A focusable element
      </div>
    </div>
  );
};

export default {
  title: 'MakeStyles (pseudo)',

  decorators: [
    (storyFn, context) => (
      <div className="testWrapper" style={{ width: '300px' }}>
        {storyFn(context)}
      </div>
    ),
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('normal', { cropTo: '.testWrapper' })
          .focus('#boxA')
          .snapshot('boxA, focus', { cropTo: '.testWrapper' })
          .hover('#boxA')
          .snapshot('boxA, focus+hover', { cropTo: '.testWrapper' })
          .focus('#boxB')
          .hover('#boxB')
          .snapshot('boxB, focus+hover', { cropTo: '.testWrapper' })
          .end(),
      }),
  ],
} satisfies Meta<'div'>;

export const InsertionIsOrdered = () => <BoxWithPseudo />;
InsertionIsOrdered.storyName = 'insertion is ordered';
