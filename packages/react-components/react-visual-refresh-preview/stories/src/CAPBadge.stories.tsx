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
            return <Badge size="tiny" icon={<CircleRegular />} />;
          },
        },
        {
          title: 'Extra Small',
          render() {
            return <Badge size="extra-small" icon={<CircleRegular />} />;
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
        {
          title: 'Tiny Square',
          render() {
            return <Badge size="tiny" icon={<CircleRegular />} shape="square" />;
          },
        },
        {
          title: 'Extra Small Square',
          render() {
            return <Badge size="extra-small" icon={<CircleRegular />} shape="square" />;
          },
        },
        {
          title: 'Small Square',
          render() {
            return (
              <Badge size="small" icon={<CircleRegular />} shape="square">
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Default/Medium Square',
          render() {
            return (
              <Badge icon={<CircleRegular />} shape="square">
                {' '}
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Medium No Icon Square',
          render() {
            return <Badge shape="square"> Badge</Badge>;
          },
        },
        {
          title: 'Large Square',
          render() {
            return (
              <Badge size="large" icon={<CircleRegular />} shape="square">
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Extra Large Square',
          render() {
            return (
              <Badge size="extra-large" icon={<CircleRegular />} shape="square">
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Tiny Rounded',
          render() {
            return <Badge size="tiny" icon={<CircleRegular />} shape="rounded" />;
          },
        },
        {
          title: 'Extra Small Rounded ',
          render() {
            return <Badge size="extra-small" icon={<CircleRegular />} shape="rounded" />;
          },
        },
        {
          title: 'Small Rounded',
          render() {
            return (
              <Badge size="small" icon={<CircleRegular />} shape="rounded">
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Default/Medium Rounded',
          render() {
            return (
              <Badge icon={<CircleRegular />} shape="rounded">
                {' '}
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Medium No Icon Rounded',
          render() {
            return <Badge shape="rounded"> Badge</Badge>;
          },
        },
        {
          title: 'Large Rounded',
          render() {
            return (
              <Badge size="large" icon={<CircleRegular />} shape="rounded">
                Badge
              </Badge>
            );
          },
        },
        {
          title: 'Extra Large Rounded',
          render() {
            return (
              <Badge size="extra-large" icon={<CircleRegular />} shape="rounded">
                Badge
              </Badge>
            );
          },
        },
      ]}
    />
  );
};
