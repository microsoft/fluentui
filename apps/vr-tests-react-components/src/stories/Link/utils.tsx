import * as React from 'react';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Steps } from 'storywright';

const useInvertedBackgroundStyles = makeStyles({
  root: {
    ...shorthands.padding('14px'),
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
});

export const InvertedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const styles = useInvertedBackgroundStyles();
  return (
    <div className={styles.root}>
      <BackgroundAppearanceProvider value="inverted">{children}</BackgroundAppearanceProvider>
    </div>
  );
};

export const steps = new Steps()
  .snapshot('default')
  .hover('.fui-Link')
  .snapshot('hover')
  // This needs to be added so that the focus outline is shown correctly
  .executeScript("document.getElementsByClassName('fui-Link')[0].setAttribute('data-fui-focus-visible', '')")
  .focus('.fui-Link')
  .snapshot('focused')
  .executeScript("document.getElementsByClassName('fui-Link')[0].removeAttribute('data-fui-focus-visible')")
  .mouseDown('.fui-Link')
  .snapshot('pressed')
  .mouseUp('.fui-Link')
  .end();

// Disabled stories use steps without focus so they do not error out on the focused step.
export const disabledUnfocusableSteps = new Steps()
  .snapshot('default')
  .hover('.fui-Link')
  .snapshot('hover')
  .mouseDown('.fui-Link')
  .snapshot('pressed')
  .mouseUp('.fui-Link')
  .end();
