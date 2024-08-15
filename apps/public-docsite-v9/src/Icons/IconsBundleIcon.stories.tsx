import {
  AccessTimeFilled,
  AccessTimeRegular,
  bundleIcon,
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { Body1Stronger, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import * as React from 'react';

import description from './IconsBundleIcon.stories.md';

const useClasses = makeStyles({
  container: {
    ...shorthands.padding('10px'),
    ...shorthands.border('2px', 'solid', tokens.colorBrandStroke1),
    boxSizing: 'border-box',
    width: '200px',
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,

    fontSize: '32px',
    ':hover': {
      [`& .${iconFilledClassName}`]: {
        display: 'block',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },
  description: {
    display: 'block',
    width: '200px',
    boxSizing: 'border-box',
    backgroundColor: tokens.colorBrandStroke1,
    color: tokens.colorNeutralForegroundOnBrand,

    ...shorthands.padding('4px'),
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
  },
});

const AccessTime = bundleIcon(AccessTimeFilled, AccessTimeRegular);

export const BundleIcon = () => {
  const classes = useClasses();

  return (
    <>
      <div className={classes.description}>
        <Body1Stronger>Hover a box below</Body1Stronger>
      </div>
      <div className={classes.container}>
        <AccessTime aria-label="An AccessTime icon" />
      </div>
    </>
  );
};

BundleIcon.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
