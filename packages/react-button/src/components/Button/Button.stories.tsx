import * as React from 'react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';
import * as classes from './Button.stories.scss';

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

const ButtonVariants = (props: ButtonProps) => (
  <Stack horizontal>
    <Button content="Hello, world" icon="O" {...props} />
    <Button primary content="Hello, world" icon="X" {...props} />
    <Button disabled content="Hello, world" icon="X" {...props} />
    <Button primary disabled content="Hello, world" icon="X" {...props} />
  </Stack>
);

export const ButtonCss = () => (
  <Stack>
    <Text>A button comes in default and `primary` flavors.</Text>
    <ButtonVariants />

    <Text>A button can appear round using the `circular` prop.</Text>
    <ButtonVariants circular />

    <Text>A button can fill the width of its container using the `fluid` prop.</Text>
    <Stack horizontal>
      <Button fluid content="Hello, world" icon="X" />
      <Button fluid primary content="Hello, world" icon="X" />
      <Button fluid disabled content="Hello, world" icon="X" />
      <Button fluid primary disabled content="Hello, world" icon="X" />
    </Stack>

    <Text>A button can contain only an icon using the `iconOnly` prop.</Text>
    <ButtonVariants iconOnly />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <ButtonVariants circular iconOnly />

    <Text>An icon button can format its Icon to appear before or after its content.</Text>
    <Stack>
      <ButtonVariants iconPosition="before" />
      <ButtonVariants iconPosition="after" />
    </Stack>

    <Text>A button can show a loading indicator using the `loading` prop.</Text>
    <ButtonVariants loading />

    <Text>A button can be sized.</Text>
    <Stack>
      <ButtonVariants size="smallest" />
      <ButtonVariants size="smaller" />
      <ButtonVariants size="small" />
      <ButtonVariants size="large" />
      <ButtonVariants size="larger" />
      <ButtonVariants size="largest" />
    </Stack>
  </Stack>
);

export const ButtonTokens = () => (
  <Stack>
    <Text>A button can be colored using inline tokens.</Text>
    <Stack>
      <Button
        icon="O"
        tokens={{
          padding: '3px 10px',
          fontSize: '12px',
          fontWeight: '600',
          contentGap: '8px',
          borderRadius: '4px',
          borderWidth: '1px',

          background: 'linear-gradient(-180deg,#34d058,#28a745 90%)',
          contentColor: 'white',
          borderColor: 'rgba(27, 31, 35, 0.2)',

          hovered: {
            background: '#269f42 linear-gradient(-180deg,#2fcb53,#269f42 90%)',
            contentColor: 'white',
            borderColor: 'rgba(27, 31, 35, .5)',
          },

          pressed: {
            background: '#279f43',
            borderColor: 'rgba(27, 31, 35, .5)',
            contentColor: 'white',
            transform: 'none',
          },
        }}
        content="Github: Open issue"
      />
      <Button
        tokens={{
          fontFamily: `"Amazon Ember", Arial, sans-serif`,
          fontSize: '13px',
          fontWeight: '400',
          borderRadius: '3px',
          padding: '0 10px',

          background: 'linear-gradient(to bottom,#f7dfa5,#f0c14b)',
          contentColor: 'rgb(17, 17, 17)',
          borderColor: 'rgb(168, 135, 52) rgb(156, 126, 49) rgb(132, 106, 41)',

          hovered: {
            background: 'linear-gradient(to bottom,#f5d78e,#eeb933)',
            contentColor: 'rgb(17, 17, 17)',
            borderColor: '#a88734 #9c7e31 #846a29',
          },

          pressed: {
            background: '#f0c14b',
            contentColor: 'rgb(17, 17, 17)',
            borderColor: '#a88734 #9c7e31 #846a29',
          },
        }}
        content="Amazon: Proceed to checkout"
      />
      <Button
        tokens={{
          borderWidth: '0px',
          padding: '7px 17px',
          borderRadius: '3px',
          fontFamily: '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '16px',
          fontWeight: '400',

          background: 'rgb(229, 9, 20)',
          contentColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 255, 255)',

          hovered: {
            background: 'rgb(255, 50, 61)',
            borderColor: '#a88734 #9c7e31 #846a29',
          },

          pressed: {
            background: 'rgb(229, 9, 20)',
            borderColor: '#a88734 #9c7e31 #846a29',
          },
        }}
        content="Netflix: Sign In"
      />
      <Button
        tokens={{
          height: '48px',
          borderWidth: '0px',
          padding: '17px 48px',
          borderRadius: '500px',
          fontFamily: 'Circular, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: '700',
          background: 'rgb(29, 185, 84) none repeat scroll 0% 0% / auto padding-box border-box',
          contentColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 255, 255)',

          hovered: {
            background: 'rgb(30, 215, 96) none repeat scroll 0% 0% / auto padding-box border-box',
            contentColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)',
          },

          pressed: {
            transform: 'none',
            background: '#1aa34a',
            contentColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)',
          },
        }}
        content="Spotify: GET PREMIUM"
      />
      <Button
        tokens={{
          height: '52px',
          background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
          contentColor: 'rgb(0, 0, 0)',
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: '2px',
          padding: '17px 48px',
          borderRadius: '500px',
          fontFamily: 'Circular, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: '700',
        }}
        content="Spotify: LEARN MORE"
      />
    </Stack>
    <Text>A tokenized button can be customized for any size or padding.</Text>
    <Stack horizontal>
      <Button
        content="I'm a small button with a large icon"
        icon="O"
        tokens={{
          height: '24px',
          fontSize: '12px',
          iconSize: '40px',
          padding: '0 8px',
          contentGap: '4px',
        }}
      />
      <Button
        content="I'm a large button with a small icon"
        icon="O"
        tokens={{
          height: '70px',
          fontSize: '24px',
          iconSize: '12px',
          padding: '0 40px',
        }}
      />
    </Stack>
  </Stack>
);
