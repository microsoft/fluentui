import * as React from 'react';
import { Table } from '../../../components/Table/Table';
import {
  IPageSectionProps,
  CodeSnippet,
  MarkdownHeader,
  Markdown,
  MarkdownLink,
} from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { LayoutPageProps } from './LayoutPage.doc';
import * as styles from './LayoutPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const visibilityData = require('../../../data/layout-visibility.json');
const breakpointsData = require('../../../data/responsive-breakpoints.json');

export const LayoutPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...LayoutPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Breakpoints',
          content: (
            <>
              <p>The grid and utilities use this common set of six breakpoints.</p>
              <Table content={breakpointsData} />
            </>
          ),
        },
        {
          sectionName: 'Grid',
          content: (
            <>
              <p>
                Fabric Core comes with a mobile-first, 12-column, responsive grid that you can use to create flexible
                layouts for a variety of screen sizes and device types.
              </p>
              <p>
                <strong>Note that this grid is only available via Fabric Core CSS.</strong> If you're not using Fabric
                Core, Fluent UI React's <MarkdownLink href="#/controls/web/stack">Stack</MarkdownLink> can cover some of
                the same use cases, or you can use{' '}
                <MarkdownLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout">
                  CSS grid
                </MarkdownLink>
                .
              </p>
              <div
                className="ms-Grid"
                aria-label="Example Fabric Core grid where every row has a different number of columns."
              >
                <div className="ms-Grid-row" aria-label="Example of 12 equal columns using the grid">
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm1 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>1</div>
                  </div>
                </div>
                <div className="ms-Grid-row" aria-label="Example of 6 equal columns using the grid">
                  <div className={'ms-Grid-col ms-sm2 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>2</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm2 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>2</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm2 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>2</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm2 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>2</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm2 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>2</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm2 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>2</div>
                  </div>
                </div>
                <div className="ms-Grid-row" aria-label="Example of 4 equal columns using the grid">
                  <div className={'ms-Grid-col ms-sm3 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>3</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm3 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>3</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm3 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>3</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm3 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>3</div>
                  </div>
                </div>
                <div className="ms-Grid-row" aria-label="Example of 3 equal columns using the grid">
                  <div className={'ms-Grid-col ms-sm4 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>4</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm4 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>4</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm4 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>4</div>
                  </div>
                </div>
                <div className="ms-Grid-row" aria-label="Example of 2 equal columns using the grid">
                  <div className={'ms-Grid-col ms-sm6 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>6</div>
                  </div>
                  <div className={'ms-Grid-col ms-sm6 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>6</div>
                  </div>
                </div>
                <div className="ms-Grid-row" aria-label="Example of 1 equal column using the grid">
                  <div className={'ms-Grid-col ms-sm12 ' + styles.demoBlockCol}>
                    <div className={styles.demoBlock}>12</div>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          sectionName: 'Implementation',
          content: (
            <>
              <Markdown enableRenderHtmlBlock>
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/LayoutPage/docs/web/LayoutGridImplementation.md') as string
                }
              </Markdown>

              <MarkdownHeader as="h4">Visibility</MarkdownHeader>
              <p>
                Some designs call for certain content to be shown or hidden depending on the screen size. You can
                achieve this using Fabric Core's responsive visibility classes. These allow you to show or hide content
                at a specific screen size, or across a whole range of sizes.
              </p>
              <Table content={visibilityData} responsive={true} />

              <CodeSnippet language="html">
                {`<div class="ms-Grid-col ms-sm12 ms-hiddenXxlUp">Visible on smaller screens</div>
<div class="ms-Grid-col ms-sm12 ms-hiddenXlDown">Visible on larger screens</div>`}
              </CodeSnippet>
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-hiddenXxlUp">
                    <div className={styles.demoBlock}>Visible on smaller screens</div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-hiddenXlDown">
                    <div className={styles.demoBlock}>Visible on larger screens</div>
                  </div>
                </div>
              </div>
            </>
          ),
        },
      ];
  }
}
