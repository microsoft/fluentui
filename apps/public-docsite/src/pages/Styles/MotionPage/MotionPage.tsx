import * as React from 'react';
import {
  AnimationDetail,
  AnimationDetailGrid,
  IPageSectionProps,
  Markdown,
  MarkdownHeader,
  Table,
  Video,
  MarkdownCode,
  ITableRowProps,
} from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { MotionPageProps } from './MotionPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { cdnUrl } from '../../../utilities/cdn';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/MotionPage/docs';

const PatternTable = ({ rows }: { rows: ITableRowProps[] }) => (
  <Table
    columns={[
      { title: 'Element', data: 'element' },
      { title: 'Animation', data: 'animation' },
      { title: 'Duration', data: 'duration' },
      { title: 'Timing function', data: 'timing' },
      { title: 'Delay', data: 'delay' },
    ]}
    rows={rows}
    formatter={(column, row) => row[column.data!]}
  />
);

export const MotionPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...MotionPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Animation patterns',
          editUrl: `${baseUrl}/web/MotionAnimationPatterns.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/MotionPage/docs/web/MotionAnimationPatterns.md') as string
                }
              </Markdown>

              <MarkdownHeader as="h3">Delete & Slide</MarkdownHeader>
              <p>This pattern for deleting an object from the view and how the remaining objects realign themselves.</p>
              <Video source={`${cdnUrl}/fabric-website/video/deleteslide.mp4`} />
              <PatternTable
                rows={[
                  {
                    element: 'Repositioned content',
                    animation: 'Slide',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '0 ms',
                  },
                  {
                    element: 'Exiting content',
                    animation: 'Fade out',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '50 ms',
                  },
                ]}
              />

              <MarkdownHeader as="h3">Slide & Add</MarkdownHeader>
              <p>This pattern for adding an object to a view, and how the other objects react to the new element.</p>
              <Video source={`${cdnUrl}/fabric-website/video/slideadd.mp4"`} />
              <PatternTable
                rows={[
                  {
                    element: 'Repositioned content',
                    animation: 'Slide',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '0 ms',
                  },
                  {
                    element: 'Entering content',
                    animation: 'Fade in',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '50 ms',
                  },
                ]}
              />

              <MarkdownHeader as="h3">Drill In</MarkdownHeader>
              <p>
                This pattern handles the transition from one view into another. Some elements persist, some leave the
                view, and new ones enter as well.
              </p>
              <Video source={`${cdnUrl}/fabric-website/video/drillin.mp4`} />
              <PatternTable
                rows={[
                  {
                    element: 'Exiting content',
                    animation: 'Fade out',
                    duration: '100 ms',
                    timing: 'Linear',
                    delay: '0 ms',
                  },
                  {
                    element: 'Entering content',
                    animation: 'Scale down in',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '100 ms',
                  },
                ]}
              />

              <MarkdownHeader as="h3">Drill In with Continuity</MarkdownHeader>
              <p>
                This pattern handles the transition from one view into another. Some elements persist, some leave the
                view, and new ones enter as well.
              </p>
              <Video source={`${cdnUrl}/fabric-website/video/drillinwithcontinuity.mp4`} />
              <PatternTable
                rows={[
                  {
                    element: 'Exiting content',
                    animation: 'Fade out',
                    duration: '100 ms',
                    timing: 'Linear',
                    delay: '0 ms',
                  },
                  {
                    element: 'Repositioned content',
                    animation: 'Slide',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '0 ms',
                  },
                  {
                    element: 'Entering content',
                    animation: 'Scale down in',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '100 ms',
                  },
                ]}
              />

              <MarkdownHeader as="h3">Tabs & Pivots</MarkdownHeader>
              <p>
                This pattern describes the transition from selecting one tab to another. Includes the selection state
                that travels across the tab set. Also describes the tab content coming in and out as well.
              </p>
              <Video source={`${cdnUrl}/fabric-website/video/tabspivots.mp4`} />
              <PatternTable
                rows={[
                  {
                    element: 'Underline (active indicator)',
                    animation: 'Slide',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '0 ms',
                  },
                  {
                    element: 'Exiting ribbon content',
                    animation: 'Slide out',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '0 ms',
                  },
                  {
                    element: 'Entering ribbon content',
                    animation: 'Slide in',
                    duration: '300 ms',
                    timing: 'Decelerate',
                    delay: '100 ms',
                  },
                ]}
              />
            </>
          ),
        },

        {
          sectionName: 'Basic animations',
          editUrl: `${baseUrl}/web/MotionBasicAnimations.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/MotionPage/docs/web/MotionBasicAnimations.md') as string
                }
              </Markdown>

              <MarkdownHeader as="h3">Fade</MarkdownHeader>
              <p>
                The most basic and fundamental animation for adding and removing objects. Use fades as the default
                choice.
              </p>
              <AnimationDetailGrid>
                <AnimationDetail
                  animation="Fade in"
                  coreClass="ms-motion-fadeIn"
                  reactVariable="MotionAnimations.fadeIn"
                />
                <AnimationDetail
                  animation="Fade out"
                  coreClass="ms-motion-fadeOut"
                  reactVariable="MotionAnimations.fadeOut"
                />
              </AnimationDetailGrid>

              <MarkdownHeader as="h3">Scale</MarkdownHeader>
              <p>
                A more dramatic animation than fading, scaling draws the eye and implies a sense of depth. Use these
                animations sparingly where more emphasis is needed.
              </p>
              <AnimationDetailGrid>
                <AnimationDetail
                  animation="Scale down in"
                  coreClass="ms-motion-scaleDownIn"
                  reactVariable="MotionAnimations.scaleDownIn"
                />
                <AnimationDetail
                  animation="Scale down out"
                  coreClass="ms-motion-scaleDownOut"
                  reactVariable="MotionAnimations.scaleDownOut"
                />
              </AnimationDetailGrid>

              <MarkdownHeader as="h3">Slide</MarkdownHeader>
              <p>
                Use sliding animations for when there is an obvious directionality to the entrance and exit of an
                object. These animations help users build a mental model of where the object can be found when it isn’t
                visible.
              </p>
              <AnimationDetailGrid>
                <AnimationDetail
                  animation="Slide up in"
                  coreClass="ms-motion-slideUpIn"
                  reactVariable="MotionAnimations.slideUpIn"
                />
                <AnimationDetail
                  animation="Slide up out"
                  coreClass="ms-motion-slideUpOut"
                  reactVariable="MotionAnimations.slideUpOut"
                />
                <AnimationDetail
                  animation="Slide right in"
                  coreClass="ms-motion-slideRightIn"
                  reactVariable="MotionAnimations.slideRightIn"
                />
                <AnimationDetail
                  animation="Slide right out"
                  coreClass="ms-motion-slideRightOut"
                  reactVariable="MotionAnimations.slideRightOut"
                />
                <AnimationDetail
                  animation="Slide down in"
                  coreClass="ms-motion-slideDownIn"
                  reactVariable="MotionAnimations.slideDownIn"
                />
                <AnimationDetail
                  animation="Slide down out"
                  coreClass="ms-motion-slideDownOut"
                  reactVariable="MotionAnimations.slideDownOut"
                />
                <AnimationDetail
                  animation="Slide left in"
                  coreClass="ms-motion-slideLeftIn"
                  reactVariable="MotionAnimations.slideLeftIn"
                />
                <AnimationDetail
                  animation="Slide left out"
                  coreClass="ms-motion-slideLeftOut"
                  reactVariable="MotionAnimations.slideLeftOut"
                />
              </AnimationDetailGrid>
            </>
          ),
        },

        {
          sectionName: 'Durations',
          content: (
            <Table
              columns={[
                {
                  title: 'Duration',
                  data: 'duration',
                  percentWidth: 25,
                },
                {
                  title: 'Core variable',
                  data: 'core',
                },
                {
                  title: 'React variable',
                  data: 'react',
                },
              ]}
              rows={[
                {
                  duration: '100ms',
                  core: '$ms-motion-duration-1',
                  react: 'MotionDurations.duration1',
                },
                {
                  duration: '200ms',
                  core: '$ms-motion-duration-2',
                  react: 'MotionDurations.duration2',
                },
                {
                  duration: '300ms',
                  core: '$ms-motion-duration-3',
                  react: 'MotionDurations.duration3',
                },
                {
                  duration: '400ms',
                  core: '$ms-motion-duration-4',
                  react: 'MotionDurations.duration4',
                },
              ]}
              formatter={(column, row) =>
                column.data === 'duration' ? row[column.data] : <MarkdownCode>{row[column.data!]}</MarkdownCode>
              }
            />
          ),
        },

        {
          sectionName: 'Timing functions',
          content: (
            <Table
              columns={[
                { title: 'Name', data: 'name' },
                { title: 'Value', data: 'value' },
                { title: 'Core variable', data: 'core' },
                { title: 'React variable', data: 'react' },
              ]}
              rows={[
                {
                  name: 'Linear',
                  value: 'cubic-bezier(0, 0, 1, 1)',
                  core: '$ms-motion-timing-linear',
                  react: 'MotionTimings.linear',
                },
                {
                  name: 'Standard',
                  value: 'cubic-bezier(0.8, 0, 0.2, 1)',
                  core: '$ms-motion-timing-standard',
                  react: 'MotionTimings.standard',
                },
                {
                  name: 'Accelerate',
                  value: 'cubic-bezier(0.9, 0.1, 1, 0.2)',
                  core: '$ms-motion-timing-accelerate',
                  react: 'MotionTimings.accelerate',
                },
                {
                  name: 'Decelerate',
                  value: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
                  core: '$ms-motion-timing-decelerate',
                  react: 'MotionTimings.decelerate',
                },
              ]}
              formatter={(column, row) =>
                column.data === 'name' ? row[column.data] : <MarkdownCode>{row[column.data!]}</MarkdownCode>
              }
            />
          ),
        },
      ];

    default:
      return [
        {
          sectionName: 'Coming Soon',
          content: 'Coming Soon',
        },
      ];
  }
}
