import * as React from 'react';
import { CompoundButton } from './CompoundButton';
import { CompoundButtonProps } from './CompoundButton.types';
import * as classes from '../Button/Button.stories.scss';

/**
 * Temporary Stack until there's one in its own package.
 */
const Stack = (props: React.PropsWithChildren<{ horizontal?: boolean }>) => {
  const { horizontal, ...rest } = props;

  return <div {...rest} className={horizontal ? classes.hStack : classes.vStack} />;
};

/**
 * Temporary Text until there's one in its own package.
 */
// eslint-disable-next-line jsx-a11y/heading-has-content -- content passed via children
const Text = (props: React.PropsWithChildren<{}>) => <h2 {...props} className={classes.text} />;

const CompoundButtonVariants = (props: CompoundButtonProps) => (
  <Stack horizontal>
    <CompoundButton {...props} icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} primary icon="X" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} disabled icon="X" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} primary disabled icon="X" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} ghost icon="X" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} ghost disabled icon="X" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  </Stack>
);

export const CompoundButtons = () => (
  <Stack>
    <Text>A CompoundButton comes in default and `primary` flavors.</Text>
    <CompoundButtonVariants />

    <Text>A CompoundButton can appear round using the `circular` prop.</Text>
    <CompoundButtonVariants circular />

    <Text>A CompoundButton can fill the width of its container using the `fluid` prop.</Text>
    <Stack horizontal>
      <CompoundButton fluid icon="X" secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
      <CompoundButton fluid primary icon="X" secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
      <CompoundButton fluid disabled icon="X" secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
      <CompoundButton fluid primary disabled icon="X" secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
      <CompoundButton fluid ghost icon="X" secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
      <CompoundButton fluid ghost disabled icon="X" secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
    </Stack>

    <Text>A CompoundButton can contain only an icon using the `iconOnly` prop.</Text>
    <CompoundButtonVariants iconOnly />

    <Text>A CompoundButton can be both `circular` and `iconOnly`.</Text>
    <CompoundButtonVariants circular iconOnly />

    <Text>An icon CompoundButton can format its Icon to appear before or after its content.</Text>
    <Stack>
      <CompoundButtonVariants iconPosition="before" />
      <CompoundButtonVariants iconPosition="after" />
    </Stack>

    <Text>A CompoundButton can show a loading indicator using the `loading` prop.</Text>
    <CompoundButtonVariants loading />

    <Text>A CompoundButton can be sized.</Text>
    <Stack>
      <CompoundButtonVariants size="smallest" />
      <CompoundButtonVariants size="smaller" />
      <CompoundButtonVariants size="small" />
      <CompoundButtonVariants size="large" />
      <CompoundButtonVariants size="larger" />
      <CompoundButtonVariants size="largest" />
    </Stack>
  </Stack>
);
