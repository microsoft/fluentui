import * as React from 'react';
import { ToggleButton, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  heading: { margin: '30px 0 10px 0' },
  behaviors: { display: 'flex', gap: '10px' },
});

const getDefaultBehaviors = behaviorOptions => {
  const behaviors = {};
  behaviorOptions.forEach(category => {
    category.behaviors.forEach(behavior => {
      behaviors[behavior.id] = false;
    });
  });
  return behaviors;
};

export const BehaviorSelection = ({ behaviorOptions, updateBehaviorDecision }) => {
  const classes = useStyles();
  const [behaviors, setBehaviors] = React.useState<Record<string, boolean>>(getDefaultBehaviors(behaviorOptions));

  return (
    <>
      {behaviorOptions.map(category => (
        <React.Fragment key={category.id}>
          <h2 className={classes.heading}>{category.title}</h2>
          <div className={classes.behaviors}>
            {category.behaviors.map(behavior => (
              <ToggleButton
                key={behavior.id}
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
        </React.Fragment>
      ))}
    </>
  );
};
