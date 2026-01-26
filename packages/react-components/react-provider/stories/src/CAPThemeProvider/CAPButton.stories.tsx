import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { CAPThemeExamples } from './CAPStorybookUtil';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const CAPButtonStory = () => {
  return (
    <CAPThemeExamples
      examples={[
        {
          title: 'Default',
          render() {
            return <Button icon={<CalendarMonthRegular />}>Default</Button>;
          },
        },
        {
          title: 'Primary',
          render() {
            return (
              <Button appearance="primary" icon={<CalendarMonthRegular />}>
                Primary
              </Button>
            );
          },
        },
        {
          title: 'Outline',
          render() {
            return (
              <Button appearance="outline" icon={<CalendarMonth />}>
                Outline
              </Button>
            );
          },
        },
        {
          title: 'Subtle',
          render() {
            return (
              <Button appearance="subtle" icon={<CalendarMonth />}>
                Subtle
              </Button>
            );
          },
        },
        {
          title: 'Transparent',
          render() {
            return (
              <Button appearance="transparent" icon={<CalendarMonth />}>
                Transparent
              </Button>
            );
          },
        },
        {
          title: 'Tint',
          render(variant) {
            if (variant === 'v9') {
              return 'NOT_IMPLEMENTED';
            }
            return (
              <Button appearance="tint" icon={<CalendarMonth />}>
                Tint
              </Button>
            );
          },
        },
      ]}
    />
  );
};
