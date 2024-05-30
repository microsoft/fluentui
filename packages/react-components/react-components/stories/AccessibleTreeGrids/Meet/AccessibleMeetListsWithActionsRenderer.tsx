import * as React from 'react';
import { MeetingProperty, UpcomingMeeting, RecentCategory, RecentMeetings } from './AccessibleMeetBase';

import { Tree, TreeItem, TreeItemLayout, TreeItemProps } from '@fluentui/react-components/unstable';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

interface UpcomingMeetingRsvpSubmenuProps {
  children: React.ReactElement;
}
const UpcomingMeetingRsvpSubmenu: React.FC<UpcomingMeetingRsvpSubmenuProps> = ({ children }) => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>{children}</MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Respond to occurrence</MenuItem>
          <MenuItem>Respond to series</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

interface UpcomingMeetingMoreOptionsSubmenuProps {
  children: React.ReactElement;
}
const UpcomingMeetingMoreOptionsSubmenu: React.FC<UpcomingMeetingMoreOptionsSubmenuProps> = ({ children }) => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>{children}</MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>View meeting details</MenuItem>
          <MenuItem>Copy meeting link</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const UpcomingMeetingTreeItem: React.FC<TreeItemProps> = ({ children, ...props }) => {
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layoutChildren, subtree] = React.Children.toArray(children);

  return (
    <Menu positioning="below-end" openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <TreeItem aria-description="has actions" {...focusTargetAttribute} {...props}>
          <TreeItemLayout
            actions={
              <>
                <Button>View details</Button>
                <UpcomingMeetingRsvpSubmenu>
                  <MenuButton>RSVP</MenuButton>
                </UpcomingMeetingRsvpSubmenu>
                <Button>Chat with participants</Button>
                <UpcomingMeetingMoreOptionsSubmenu>
                  <MenuButton>More options</MenuButton>
                </UpcomingMeetingMoreOptionsSubmenu>
              </>
            }
          >
            {layoutChildren}
          </TreeItemLayout>
          {subtree}
        </TreeItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>View details</MenuItem>
          <UpcomingMeetingRsvpSubmenu>
            <MenuItem>RSVP</MenuItem>
          </UpcomingMeetingRsvpSubmenu>
          <MenuItem>Chat with participants</MenuItem>
          <UpcomingMeetingMoreOptionsSubmenu>
            <MenuItem>More options</MenuItem>
          </UpcomingMeetingMoreOptionsSubmenu>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

interface UpcomingMeetingsListWithActionsRendererProps {
  threeUpcomingMeetings: UpcomingMeeting[];
}
export const UpcomingMeetingsListWithActionsRenderer: React.FC<UpcomingMeetingsListWithActionsRendererProps> = ({
  threeUpcomingMeetings,
}) => {
  const threeUpcomingMeetingsItems = React.useMemo(
    () =>
      threeUpcomingMeetings.map(meeting => ({
        title: meeting.titleWithDateAndTime,
      })),
    [threeUpcomingMeetings],
  );

  return (
    <Tree aria-label="Upcoming meetings">
      {threeUpcomingMeetingsItems.map((meeting, index) => (
        <UpcomingMeetingTreeItem key={index} itemType="leaf">
          <TreeItemLayout>{meeting.title}</TreeItemLayout>
        </UpcomingMeetingTreeItem>
      ))}
    </Tree>
  );
};

const RecentMeetingHeaderTreeItem: React.FC<TreeItemProps> = ({ children, ...props }) => {
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layoutChildren, subtree] = React.Children.toArray(children);

  return (
    <Menu positioning="below-end" openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <TreeItem aria-description="has actions" {...focusTargetAttribute} {...props}>
          <TreeItemLayout
            actions={
              <>
                <Button>Header action</Button>
              </>
            }
          >
            {layoutChildren}
          </TreeItemLayout>
          {subtree}
        </TreeItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Header action</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
interface RecentMeetingHeaderTreeItemProps extends TreeItemProps {
  properties?: MeetingProperty[];
  tasksCount?: number;
}
const RecentMeetingTreeItem: React.FC<RecentMeetingHeaderTreeItemProps> = ({
  children,
  properties,
  tasksCount,
  ...props
}) => {
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layoutChildren, subtree] = React.Children.toArray(children);

  return (
    <Menu positioning="below-end" openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <TreeItem aria-description="has actions" {...focusTargetAttribute} {...props}>
          <TreeItemLayout
            actions={
              <>
                <Button>Chat with participants</Button>
                <Button>View recap</Button>
                {properties?.includes('includingContent') && <Button>Agenda and notes</Button>}
                {tasksCount && <Button>{`${tasksCount} tasks`}</Button>}
                {properties?.includes('transcript') && <Button>Transcript</Button>}
              </>
            }
          >
            {layoutChildren}
          </TreeItemLayout>
          {subtree}
        </TreeItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Chat with participants</MenuItem>
          <MenuItem>View recap</MenuItem>
          {properties?.includes('includingContent') && <MenuItem>Agenda and notes</MenuItem>}
          {tasksCount && <MenuItem>{`${tasksCount} tasks`}</MenuItem>}
          {properties?.includes('transcript') && <MenuItem>Transcript</MenuItem>}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

interface RecentMeetingsTreeWithActionsRendererProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const RecentMeetingsTreeWithActionsRenderer: React.FC<RecentMeetingsTreeWithActionsRendererProps> = ({
  recentCategories,
  recentMeetings,
}) => {
  return (
    <Tree aria-label="All meetings" aria-describedby="lastMeetings-hint">
      {recentCategories.map(category => (
        <RecentMeetingHeaderTreeItem key={category.id} itemType="branch">
          <TreeItemLayout>{category.title}</TreeItemLayout>
          <Tree>
            {recentMeetings[category.id].map(meeting => (
              <RecentMeetingTreeItem
                key={meeting.id}
                itemType="leaf"
                properties={meeting.properties}
                tasksCount={meeting.tasksCount}
              >
                <TreeItemLayout>{meeting.titleWithTime}</TreeItemLayout>
              </RecentMeetingTreeItem>
            ))}
          </Tree>
        </RecentMeetingHeaderTreeItem>
      ))}
    </Tree>
  );
};
