import * as React from 'react';
import { CompoundButton, CompoundButtonProps } from '@fluentui/react-button';
import * as classes from '../Button.stories.scss';

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

const CompoundButtonExamples = (props: CompoundButtonProps) => (
  <Stack horizontal>
    <CompoundButton {...props} icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} primary icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} primary disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} ghost icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} ghost disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} transparent icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} transparent disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  </Stack>
);

export const CompoundButtons = () => (
  <Stack>
    <Text>A CompoundButton comes in default and `primary` flavors.</Text>
    <CompoundButtonExamples />

    <Text>A CompoundButton can appear round using the `circular` prop.</Text>
    <CompoundButtonExamples circular />

    <Text>A CompoundButton can fill the width of its container using the `fluid` prop.</Text>
    <CompoundButtonExamples fluid />

    <Text>A CompoundButton can contain only an icon using the `iconOnly` prop.</Text>
    <CompoundButtonExamples iconOnly />

    <Text>A CompoundButton can be both `circular` and `iconOnly`.</Text>
    <CompoundButtonExamples circular iconOnly />

    <Text>An icon CompoundButton can format its Icon to appear before or after its content.</Text>
    <Stack>
      <CompoundButtonExamples iconPosition="before" />
      <CompoundButtonExamples iconPosition="after" />
    </Stack>

    <Text>A CompoundButton can show a loading indicator using the `loading` prop.</Text>
    <CompoundButtonExamples loading />

    <Text>A CompoundButton can be sized.</Text>
    <Stack>
      <CompoundButtonExamples size="smallest" />
      <CompoundButtonExamples size="smaller" />
      <CompoundButtonExamples size="small" />
      <CompoundButtonExamples size="large" />
      <CompoundButtonExamples size="larger" />
      <CompoundButtonExamples size="largest" />
    </Stack>
  </Stack>
);
