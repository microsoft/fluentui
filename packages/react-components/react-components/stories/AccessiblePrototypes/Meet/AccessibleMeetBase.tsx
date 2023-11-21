import * as React from 'react';
import { RecentMeetingsStitchedTreeGridRowNavigationRenderer } from './AccessibleMeetStitchedGridsRowNavigationRenderer';
import {
  UpcomingMeetingsGridRowNavigationRenderer,
  RecentMeetingsTreeGridRowNavigationRenderer,
} from './AccessibleMeetGridsRowNavigationRenderer';
import {
  UpcomingMeetingsGridFirstCellNavigationRenderer,
  RecentMeetingsTreeGridFirstCellNavigationRenderer,
} from './AccessibleMeetGridsFirstCellNavigationRenderer';
import {
  UpcomingMeetingsGridCellNavigationRenderer,
  RecentMeetingsTreeGridCellNavigationRenderer,
} from './AccessibleMeetGridsCellNavigationRenderer';
import { UpcomingMeetingsListRenderer, RecentMeetingsTreeListRenderer } from './AccessibleMeetListsRenderer';

import {
  Button,
  SplitButton,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  TabList,
  Tab,
  Field,
  Input,
} from '@fluentui/react-components';

type PrototypeVariant =
  | 'stitchedGridsRowNavigation'
  | 'gridsRowNavigation'
  | 'gridsCellNavigation'
  | 'gridsFirstCellNavigation'
  | 'lists';

export const categoriesTitles: Record<string, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  lastWeek: 'Last week',
};

const dateLocale = 'en-US';
const nowDate = new Date('2023-10-01 12:30');

type MeetingProperty = 'includingContent' | 'transcript' | 'recorded' | 'mentionsOfYou' | 'missed';
type Meeting = {
  title: string;
  startDate: string;
  endDate: string;
  properties?: MeetingProperty[];
  tasksCount?: number;
};

const meetings: Meeting[] = [
  // Upcoming meetings
  {
    title: 'Weekly summary #3',
    startDate: '2023-10-06 14:30',
    endDate: '2023-10-06 15:30',
  },
  {
    title: 'Mandatory  training #2',
    startDate: '2023-10-03 14:30',
    endDate: '2023-10-03 15:30',
  },
  {
    title: 'Meeting with manager',
    startDate: '2023-10-03 8:00',
    endDate: '2023-10-03 9:00',
  },

  // Recent meetings
  {
    title: 'Monthly townhall',
    startDate: '2023-10-01 10:00',
    endDate: '2023-10-01 11:00',
    properties: ['includingContent', 'recorded', 'mentionsOfYou'],
  },
  {
    title: 'Planning for next quarter',
    startDate: '2023-10-01 11:00',
    endDate: '2023-10-01 12:00',
    properties: ['recorded'],
  },
  {
    title: 'Weekly summary #2',
    startDate: '2023-09-29 14:30',
    endDate: '2023-09-29 15:30',
    properties: ['includingContent', 'recorded'],
    tasksCount: 4,
  },
  {
    title: 'Mandatory training #1',
    startDate: '2023-09-29 9:00',
    endDate: '2023-09-29 10:00',
    properties: ['includingContent', 'recorded', 'mentionsOfYou'],
  },
  {
    title: 'Meeting with John',
    startDate: '2023-09-28 10:15',
    endDate: '2023-09-28 11:15',
    properties: ['transcript', 'includingContent', 'missed'],
    tasksCount: 2,
  },
  {
    title: 'Weekly summary #1',
    startDate: '2023-09-22 14:30',
    endDate: '2023-09-22 15:30',
    properties: ['includingContent', 'missed', 'recorded', 'mentionsOfYou'],
  },
  {
    title: 'Meeting with Kate',
    startDate: '2023-09-22 13:30',
    endDate: '2023-09-22 14:15',
    properties: ['includingContent', 'transcript'],
  },
  {
    title: 'All hands meeting #1',
    startDate: '2023-09-19 15:00',
    endDate: '2023-09-19 16:00',
    properties: ['recorded', 'missed'],
  },
  {
    title: 'Presentation about TreeGrid',
    startDate: '2023-09-19 14:00',
    endDate: '2023-09-19 15:00',
    properties: ['includingContent', 'recorded', 'transcript'],
  },
  {
    title: 'Meeting with George',
    startDate: '2023-09-19 10:00',
    endDate: '2023-09-19 10:30',
    properties: ['includingContent'],
    tasksCount: 1,
  },
];

export type UpcomingMeeting = {
  title: string;
  titleWithDateAndTime: string;
};

export type RecentCategory = {
  id: string;
  title: string;
  expanded: boolean;
  columns: string[];
};

export type RecentMeetings = Record<
  string,
  {
    id: string;
    title: string;
    titleWithTime: string;
    properties?: string[];
    tasksCount?: number;
    revealed: boolean;
  }[]
>;

const getFormattedTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // The hour 0 should be 12
  minutes = minutes.padStart(2, '0');
  const time = `${hours}:${minutes} ${ampm}`;
  return time;
};

interface AccessibleMeetBaseProps {
  variant: PrototypeVariant;
}
export const AccessibleMeetBase: React.FC<AccessibleMeetBaseProps> = ({ variant }) => {
  const recentCategoriesRef = React.useRef<RecentCategory[]>([]);

  const threeUpcomingMeetings = React.useMemo(() => {
    let upcomingMeetings = meetings.filter(meeting => {
      const meetingEndDate = new Date(meeting.endDate);
      return meetingEndDate > nowDate;
    });
    upcomingMeetings = upcomingMeetings.slice(-3, 3);

    return upcomingMeetings.map(meeting => {
      const meetingStartDate = new Date(meeting.startDate);
      const meetingEndDate = new Date(meeting.endDate);
      const dayOfWeekOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
      const dayOfWeek = new Intl.DateTimeFormat(dateLocale, dayOfWeekOptions).format(meetingStartDate);
      const month = new Intl.DateTimeFormat(dateLocale, monthOptions).format(meetingStartDate);
      const dayOfMonth = meetingStartDate.getDate();
      const year = meetingStartDate.getFullYear();
      const startTime = getFormattedTime(meetingStartDate);
      const endTime = getFormattedTime(meetingEndDate);
      const titleWithDateAndTime = `${meeting.title}, ${dayOfWeek}, ${month} ${dayOfMonth}, ${year}, ${startTime} to ${endTime}`;
      return {
        title: meeting.title,
        titleWithDateAndTime,
      };
    });
  }, []);

  const recentMeetings = React.useMemo(() => {
    const result: RecentMeetings = {
      'category-today': [],
      'category-yesterday': [],
      'category-lastWeek': [],
    };
    meetings.forEach((meeting, index) => {
      const meetingStartDate = new Date(meeting.startDate);
      const meetingEndDate = new Date(meeting.endDate);
      const meetingEndDateStr = meetingEndDate.toISOString().split('T')[0];
      const todayStartDateStr = nowDate.toISOString().split('T')[0];
      const isTodayUntilNow = meetingEndDate < nowDate && meetingEndDateStr === todayStartDateStr;
      const yesterdayStartDate = new Date(todayStartDateStr);
      yesterdayStartDate.setDate(yesterdayStartDate.getDate() - 1);
      const beforeWeekStartDate = new Date(nowDate);
      beforeWeekStartDate.setDate(nowDate.getDate() - 7);
      const startTime = getFormattedTime(meetingStartDate);
      const endTime = getFormattedTime(meetingEndDate);

      // Create the recent meeting
      const recentMeeting = {
        ...meeting,
        id: `recentMeeting${index}`,
        titleWithTime: `${meeting.title}, ${startTime} to ${endTime}`,
        revealed: true,
      };

      // Categorize the recent meeting
      if (isTodayUntilNow) {
        result['category-today'].push(recentMeeting);
      } else if (meetingEndDate < nowDate && meetingEndDate >= yesterdayStartDate) {
        result['category-yesterday'].push(recentMeeting);
      } else if (meetingEndDate < nowDate && meetingEndDate >= beforeWeekStartDate) {
        result['category-lastWeek'].push(recentMeeting);
      } else if (meetingEndDate < nowDate) {
        const dayOfWeekOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
        const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
        const dayOfWeek = new Intl.DateTimeFormat(dateLocale, dayOfWeekOptions).format(meetingStartDate);
        const dayOfMonth = meetingStartDate.getDate();
        const month = new Intl.DateTimeFormat(dateLocale, monthOptions).format(meetingStartDate);
        const categoryTitle = `${dayOfWeek}, ${month} ${dayOfMonth}`;
        const categoryId = `category-${meetingEndDateStr}`;
        if (categoryId in result) {
          result[categoryId].push(recentMeeting);
        } else {
          recentCategoriesRef.current.push({
            id: categoryId,
            title: categoryTitle,
            expanded: false,
            columns: [],
          });
          result[categoryId] = [recentMeeting];
        }
      }
    });

    // Insert relative-date categories into the recentCategories list in a right order if they contain at least one meeting
    ['lastWeek', 'yesterday', 'today'].forEach(categoryName => {
      const categoryId = `category-${categoryName}`;
      if (result[categoryId].length > 0) {
        recentCategoriesRef.current.unshift({
          id: categoryId,
          title: categoriesTitles[categoryName],
          expanded: false,
          columns: [],
        });
      }
    });

    // Determine the number of columns for each category
    const excludedProperties = ['missed', 'recorded', 'mentionsOfYou'];
    recentCategoriesRef.current.forEach(category => {
      result[category.id].forEach(meeting => {
        if (meeting.tasksCount && !category.columns.includes('tasks')) {
          category.columns.push('tasks');
        }
        if (!meeting.properties) {
          return;
        }
        meeting.properties.forEach(property => {
          if (!excludedProperties.includes(property) && !category.columns.includes(property)) {
            category.columns.push(property);
          }
        });
      });
    });

    return result;
  }, [recentCategoriesRef]);

  return (
    <>
      {variant === 'stitchedGridsRowNavigation' && <h1>Accessible Meet Using Stitched Grids Row Navigation</h1>}

      {variant === 'gridsRowNavigation' && <h1>Accessible Meet Using Grids Row Navigation</h1>}

      {variant === 'gridsFirstCellNavigation' && <h1>Accessible Meet Using Grids First Cell Navigation</h1>}

      {variant === 'gridsCellNavigation' && <h1>Accessible Meet Using Grids Cell Navigation</h1>}

      {variant === 'lists' && <h1>Accessible Meet Using List</h1>}

      <div>
        <Toolbar>
          <ToolbarButton>Join with an ID</ToolbarButton>
          <ToolbarButton>Meet now</ToolbarButton>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              {triggerProps => (
                <SplitButton menuButton={{ ...triggerProps, 'aria-label': 'Schedule a different type meeting' }}>
                  Schedule a new meeting
                </SplitButton>
              )}
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Schedule meeting</MenuItem>
                <MenuItem>Webinar Host interactive event with registration</MenuItem>
                <MenuItem>Town hall Produce event for large audience</MenuItem>
                <MenuItem>Virtual appointment Guests join on web and enter via tailored lobby</MenuItem>
                <MenuItem>Controlled-content meeting Apply extra meeting content controls</MenuItem>
                <MenuItem>Live event Produce live event</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </Toolbar>

        <h2>Up next</h2>
        <Button>Open my calendar</Button>
        <Button disabledFocusable={true}>Previous meetings</Button>
        <Button>Next meetings</Button>

        {variant === 'stitchedGridsRowNavigation' && (
          <UpcomingMeetingsGridRowNavigationRenderer threeUpcomingMeetings={threeUpcomingMeetings} />
        )}

        {variant === 'gridsRowNavigation' && (
          <UpcomingMeetingsGridRowNavigationRenderer threeUpcomingMeetings={threeUpcomingMeetings} />
        )}

        {variant === 'gridsFirstCellNavigation' && (
          <UpcomingMeetingsGridFirstCellNavigationRenderer threeUpcomingMeetings={threeUpcomingMeetings} />
        )}

        {variant === 'gridsCellNavigation' && (
          <UpcomingMeetingsGridCellNavigationRenderer threeUpcomingMeetings={threeUpcomingMeetings} />
        )}

        {variant === 'lists' && <UpcomingMeetingsListRenderer threeUpcomingMeetings={threeUpcomingMeetings} />}

        <h2>Recent</h2>
        <div id="lastMeetings-hint" style={{ display: 'none' }}>
          Includes all your meetings in the last 30 days.
        </div>

        <TabList>
          <Tab value="all">All Meetings</Tab>
          <Tab value="includingContent">Meetings including content</Tab>
          <Tab value="missed">Meetings you missed</Tab>
          <Tab value="recorded">Recorded Meetings</Tab>
          <Tab value="mentionsOfYou">Mentions of you</Tab>
        </TabList>
        <Field label="Filter by keyword">
          <Input />
        </Field>

        {variant === 'stitchedGridsRowNavigation' && (
          <RecentMeetingsStitchedTreeGridRowNavigationRenderer
            recentCategories={recentCategoriesRef.current}
            recentMeetings={recentMeetings}
          />
        )}

        {variant === 'gridsRowNavigation' && (
          <RecentMeetingsTreeGridRowNavigationRenderer
            recentCategories={recentCategoriesRef.current}
            recentMeetings={recentMeetings}
          />
        )}

        {variant === 'gridsFirstCellNavigation' && (
          <RecentMeetingsTreeGridFirstCellNavigationRenderer
            recentCategories={recentCategoriesRef.current}
            recentMeetings={recentMeetings}
          />
        )}

        {variant === 'gridsCellNavigation' && (
          <RecentMeetingsTreeGridCellNavigationRenderer
            recentCategories={recentCategoriesRef.current}
            recentMeetings={recentMeetings}
          />
        )}

        {variant === 'lists' && (
          <RecentMeetingsTreeListRenderer
            recentCategories={recentCategoriesRef.current}
            recentMeetings={recentMeetings}
          />
        )}
      </div>
    </>
  );
};
