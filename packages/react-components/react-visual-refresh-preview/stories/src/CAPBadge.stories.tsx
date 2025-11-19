import * as React from 'react';
import { Badge } from '@fluentui/react-components';
import { VisualRefreshExamples } from './StorybookUtil';
import { CircleRegular } from '@fluentui/react-icons';

export const CAPBadgeStory = () => {
  return (
    <VisualRefreshExamples
      examples={[
        {
          title: 'Tiny',
          render() {
            return (
              <Badge size="tiny" icon={<CircleRegular />}>
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Extra Small',
          render() {
            return (
              <Badge size="extra-small" icon={<CircleRegular />}>
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Small',
          render() {
            return (
              <Badge size="small" icon={<CircleRegular />}>
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Default/Medium',
          render() {
            return <Badge icon={<CircleRegular />}> Badge</Badge>;
          },
        },
        {
          title: 'Medium No Icon',
          render() {
            return <Badge> Badge</Badge>;
          },
        },
        {
          title: 'Large',
          render() {
            return (
              <Badge size="large" icon={<CircleRegular />}>
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Extra Large',
          render() {
            return (
              <Badge size="extra-large" icon={<CircleRegular />}>
                Badge
              </Badge>
            );
          },
        },
      ]}
    />
  );
};
