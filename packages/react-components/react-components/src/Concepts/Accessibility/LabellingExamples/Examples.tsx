import * as React from 'react';

import {
  Button,
  Tab,
  TabList,
  Menu,
  MenuTrigger,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  Avatar,
  Text,
  Checkbox,
  // makeStyles,
  // RendererProvider,
  // FluentProvider,
} from '@fluentui/react-components';
import { Send24Regular, Mic24Regular, PeopleRegular, PersonDelete24Regular } from '@fluentui/react-icons';
import { FluentWapper } from './FluentUiWrapper';
// import { createDOMRenderer } from '@griffel/react';

// const useStyles = makeStyles({
//   container: {
//     marginTop: '10px',
//     display: 'flex',
//     width: '180px',
//     justifyContent: 'space-between',
//   },
// });
// const styles = useStyles();

export const ActionAvoidBad = () => (
  <FluentWapper>
    <Button aria-label="Click here to send message " size="small" icon={<Send24Regular />}></Button>
  </FluentWapper>
);
export const ActionAvoidGood = () => (
  <FluentWapper>
    <Button aria-label="Send message" size="small" icon={<Send24Regular />}></Button>
  </FluentWapper>
);

export const ComponentTypeAvoidBad = () => (
  <FluentWapper>
    <Button aria-label="Mute microphone button" size="small" icon={<Mic24Regular />}></Button>
  </FluentWapper>
);
export const ComponentTypeAvoidGood = () => (
  <FluentWapper>
    <Button aria-label="Mute microphone" size="small" icon={<Mic24Regular />}></Button>
  </FluentWapper>
);

export const StateAvoidBad = () => (
  <FluentWapper>
    <TabList defaultSelectedValue="Files">
      <Tab value="Chat">Chat</Tab>
      <Tab value="Files" aria-label="Files tab is active">
        Files
      </Tab>
      <Tab value="Activity">Activity</Tab>
    </TabList>
  </FluentWapper>
);

export const StateAvoidGood = () => (
  <FluentWapper>
    <TabList defaultSelectedValue="Files">
      <Tab value="Chat">Chat</Tab>
      <Tab value="Files">Files</Tab>
      <Tab value="Activity">Activity</Tab>
    </TabList>
  </FluentWapper>
);

export const CustomPositionAvoidBad = () => (
  <FluentWapper>
    <Menu>
      <MenuTrigger>
        <MenuButton>Profile</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem role="listitem" aria-label="Account settings..., first item of four">
            Account settings...
          </MenuItem>
          <MenuItem role="listitem" aria-label="Change status message..., second item of four">
            Change status message...
          </MenuItem>
          <MenuItem role="listitem" aria-label="Help, third item of four">
            Help
          </MenuItem>
          <MenuItem role="listitem" aria-label="Sign out, fourth item of four">
            Sign out
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </FluentWapper>
);

export const CustomPositionAvoidGood = () => (
  <FluentWapper>
    <Menu>
      <MenuTrigger>
        <MenuButton>Profile</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Account settings...</MenuItem>
          <MenuItem>Change status message...</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </FluentWapper>
);

export const TextRepeatAvoidBad = () => (
  <FluentWapper>
    <Menu>
      <MenuTrigger>
        <Button aria-label="Participants" icon={<PeopleRegular />}></Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem aria-label="Meeting participant Robert Tolbert" icon={<Avatar />}>
            Robert Tolbert
          </MenuItem>
          <MenuItem aria-label="Meeting participant Celeste Burton" icon={<Avatar />}>
            Celeste Burton
          </MenuItem>
          <MenuItem aria-label="Meeting participant Cecil Folk" icon={<Avatar />}>
            Cecil Folk
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </FluentWapper>
);

export const TextRepeatAvoidGood = () => (
  <FluentWapper>
    <Menu>
      <MenuTrigger>
        <Button aria-label="Participants" icon={<PeopleRegular />}></Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList aria-label="Meeting participants" aria-labelledby={undefined}>
          <MenuItem aria-label="Robert Tolbert" icon={<Avatar />}>
            Robert Tolbert
          </MenuItem>
          <MenuItem aria-label="Celeste Burton" icon={<Avatar />}>
            Celeste Burton
          </MenuItem>
          <MenuItem aria-label="Cecil Folk" icon={<Avatar />}>
            Cecil Folk
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </FluentWapper>
);

export const FocusTextAvoidBad = () => (
  <FluentWapper>
    <Text tabIndex={0} block>
      With this option, notifications won't be displayed anymore . You can miss information about latest news.{' '}
    </Text>
    <Checkbox label="Display notification" />
  </FluentWapper>
);

export const FocusTextAvoidGood = () => (
  <FluentWapper>
    <Text id="notificationText" block>
      With this option, notifications won't be displayed anymore. You can miss information about latest news.
    </Text>
    <Checkbox label="Display notification" aria-describedby="notificationText" />
  </FluentWapper>
);

export const ReuseVisibleTextBad = () => {
  // const targetDocument = document;
  // const renderer = React.useMemo(() => createDOMRenderer(targetDocument), [targetDocument]);

  return (
    // <RendererProvider renderer={renderer} targetDocument={targetDocument}>
    //   <FluentProvider targetDocument={targetDocument}>
    <FluentWapper>
      <h4>Members</h4>
      {/* <div className={styles.container}> */}
      <div>
        <Avatar />
        <span>Robert Tolbert</span>
        <Button icon={<PersonDelete24Regular />} aria-label="Remove Robert Tolbert" />
      </div>
    </FluentWapper>
  );
  {
    /* </FluentProvider>
    </RendererProvider> */
  }
};

export const ReuseVisibleTextGood = () => {
  return (
    <FluentWapper>
      <h4>Members</h4>
      {/* <div className={styles.container}> */}
      <div>
        <Avatar />
        <span id="userNameId">Robert Tolbert</span>
        <Button
          icon={<PersonDelete24Regular />}
          aria-label="Remove"
          id="removeButtonId"
          aria-labelledby="removeButtonId userNameId"
        />
      </div>
    </FluentWapper>
  );
};
