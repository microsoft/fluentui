import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerProps,
  Button,
  Label,
  RadioGroup,
  Radio,
  useId,
  tokens,
  makeStyles,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  main: {
    display: 'grid',
    justifyContent: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

type DrawerSizeStory = Required<DrawerProps>['size'];

export const Size = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('size-label');

  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState<DrawerSizeStory>('small');

  const labelMap: Record<DrawerSizeStory, string> = {
    small: 'Small (Default)',
    medium: 'Medium',
    large: 'Large',
    full: 'Full',
  };

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        size={size}
        {...restoreFocusSourceAttributes}
        position="end"
        open={open}
        onOpenChange={(_, state) => setOpen(state.open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            {labelMap[size]} size
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.main}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Size</Label>
          <RadioGroup
            value={size}
            onChange={(_, data) => setSize(data.value as DrawerSizeStory)}
            aria-labelledby={labelId}
          >
            {Object.keys(labelMap).map(key => (
              <Radio key={key} value={key} label={labelMap[key as DrawerSizeStory]} />
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'The `size` prop controls the width of the drawer. The default is `small`.',
    },
  },
};
