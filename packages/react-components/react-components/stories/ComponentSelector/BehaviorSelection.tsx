import * as React from 'react';
import { ToggleButton, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  heading: { margin: '30px 0 10px 0' },
  behaviors: { display: 'flex', gap: '10px' },
});

const behaviorOptions = [
  {
    title: 'Choose Behavior',
    behaviors: [
      {
        id: 'interactive',
        name: 'Interactive',
      },
      {
        id: 'static',
        name: 'Static',
      },
      {
        id: 'toggle',
        name: 'Toggle',
      },
      {
        id: 'moreActions',
        name: 'Multiple actions',
      },
    ],
  },
  {
    title: 'Choose Keyboard and Screen Reader Experience',
    behaviors: [
      {
        id: 'navigationByTabKey',
        name: 'Navigation by Tab key',
      },
      {
        id: 'navigationByArrowKeys',
        name: 'Navigation by arrow keys',
      },
      {
        id: 'narratesPosition',
        name: 'Screen reader narrates position',
      },
    ],
  },
];

const getDefaultBehaviors = () => {
  const behaviors = {};
  behaviorOptions.forEach(category => {
    category.behaviors.forEach(behavior => {
      behaviors[behavior.id] = false;
    });
  });
  return behaviors;
};

export const BehaviorSelection = ({ updateBehaviorDecision }) => {
  const classes = useStyles();
  const [behaviors, setBehaviors] = React.useState<Record<string, boolean>>(getDefaultBehaviors());

  return (
    <>
      {behaviorOptions.map(category => (
        <>
          <h2 className={classes.heading}>{category.title}</h2>
          <div className={classes.behaviors}>
            {category.behaviors.map(behavior => (
              <ToggleButton
                checked={behaviors[behavior.id]}
                shape="circular"
                onClick={() => {
                  const newValue = !behaviors[behavior.id];
                  const newBehaviors = { ...behaviors };
                  newBehaviors[behavior.id] = newValue;
                  setBehaviors(newBehaviors);
                  updateBehaviorDecision(behavior.id, newValue);
                }}
              >
                {behavior.name}
              </ToggleButton>
            ))}
          </div>
        </>
      ))}
    </>
  );
};
