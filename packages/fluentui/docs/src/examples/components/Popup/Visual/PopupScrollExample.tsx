import * as React from 'react';
import { Button, Popup, buttonClassName, Ref, Box } from '@fluentui/react-northstar';

const LoremParagraph = () => (
  <p>
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. v This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. v This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. v This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. v This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. v This example is powered by Fluent UI, check our docs and GitHub.
    This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our
    docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent
    UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub. This example is
    powered by Fluent UI, check our docs and GitHub. This example is powered by Fluent UI, check our docs and GitHub.
  </p>
);

const PopupWithTrapFocus = () => {
  return (
    <Popup
      trigger={<Button content="Show popup" title="Show popup with focus" />}
      content={<Button content="Click me!" />}
      trapFocus={{
        firstFocusableSelector: `.${buttonClassName}`,
      }}
    />
  );
};

const ControlledPopupWithFocus = () => {
  const buttonToFocus = React.useRef<HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open && buttonToFocus.current) {
      buttonToFocus.current.focus();
    }
  }, [open, buttonToFocus]);

  return (
    <Popup
      trigger={<Button content="Show controlled popup" title="Show controlled popup" />}
      open={open}
      onOpenChange={(e, { open }) => {
        setOpen(open);
      }}
      content={
        <Ref innerRef={buttonToFocus}>
          <Button content="Click me!" />
        </Ref>
      }
      trapFocus={{
        disableFirstFocus: true,
      }}
    />
  );
};

const InlineControlledPopupWithFocus = () => {
  const buttonToFocus = React.useRef<HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open && buttonToFocus.current) {
      buttonToFocus.current.focus();
    }
  }, [open, buttonToFocus]);

  return (
    <Popup
      trigger={<Button content="Show controlled popup" title="Show controlled popup inline" />}
      open={open}
      inline
      onOpenChange={(e, { open }) => {
        setOpen(open);
      }}
      content={
        <Ref innerRef={buttonToFocus}>
          <Button content="Click me!" />
        </Ref>
      }
      trapFocus={{
        disableFirstFocus: true,
      }}
    />
  );
};

const PopupScrollExample = () => (
  <Box
    styles={{
      height: '500px',
      overflow: 'scroll',
    }}
  >
    <LoremParagraph />
    <LoremParagraph />
    <LoremParagraph />
    <PopupWithTrapFocus />
    <ControlledPopupWithFocus />
    <InlineControlledPopupWithFocus />
    <LoremParagraph />
    <LoremParagraph />
    <LoremParagraph />
  </Box>
);

export default PopupScrollExample;
