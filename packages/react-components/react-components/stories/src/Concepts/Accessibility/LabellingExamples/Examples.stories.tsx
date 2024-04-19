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
  Divider,
  makeStyles,
} from '@fluentui/react-components';
import { Send24Regular, Mic24Regular, PeopleRegular, PersonDelete24Regular } from '@fluentui/react-icons';
import { FluentWapper } from './FluentUiWrapper.stories';

const useStyles = makeStyles({
  visibleTextContainer: {
    marginTop: '10px',
    display: 'flex',
    width: '180px',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

export const ActionAvoidBad = () => (
  <FluentWapper>
    <Button aria-label="Click here to send message " size="small" icon={<Send24Regular />} />
  </FluentWapper>
);
export const ActionAvoidGood = () => (
  <FluentWapper>
    <Button aria-label="Send message" size="small" icon={<Send24Regular />} />
  </FluentWapper>
);

export const ComponentTypeAvoidBad = () => (
  <FluentWapper>
    <Button aria-label="Mute microphone button" size="small" icon={<Mic24Regular />} />
  </FluentWapper>
);
export const ComponentTypeAvoidGood = () => (
  <FluentWapper>
    <Button aria-label="Mute microphone" size="small" icon={<Mic24Regular />} />
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
        <Button aria-label="Participants" icon={<PeopleRegular />} />
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
        <Button aria-label="Participants" icon={<PeopleRegular />} />
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

export const FocusTextAvoidBad = () => {
  return (
    <FluentWapper>
      <Text tabIndex={0} block>
        With this option, notifications won't be displayed anymore . You can miss information about latest news.{' '}
      </Text>
      <Button>Submit </Button>
    </FluentWapper>
  );
};

export const FocusTextAvoidGood = () => {
  const styles = useStyles();
  return (
    <FluentWapper>
      <Text id="notificationText" block>
        With this option, notifications won't be displayed anymore . You can miss information about latest news.{' '}
      </Text>
      <Button aria-describedby="notificationText">Submit </Button>
      <Divider className={styles.divider} />
      <div id="testTitle">Summary of your order</div>
      <div role="group" aria-labelledby="testTitle">
        <Button>Buy</Button>
      </div>
    </FluentWapper>
  );
};

export const ReuseVisibleTextBad = () => {
  const styles = useStyles();
  return (
    <FluentWapper>
      <h4>Members</h4>
      <div className={styles.visibleTextContainer}>
        <Avatar />
        <span>Robert Tolbert</span>
        <Button icon={<PersonDelete24Regular />} aria-label="Remove Robert Tolbert" />
      </div>
    </FluentWapper>
  );
};

export const ReuseVisibleTextGood = () => {
  const styles = useStyles();
  return (
    <FluentWapper>
      <h4>Members</h4>
      <div className={styles.visibleTextContainer}>
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
