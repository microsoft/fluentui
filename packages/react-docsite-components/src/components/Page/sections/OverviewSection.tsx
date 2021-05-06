import * as React from 'react';
import { Markdown } from '../../Markdown/index';
import { IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';
import { hiddenContentStyle } from '@fluentui/react/lib/Styling';

export const OverviewSection: React.FunctionComponent<IPageSectionPropsWithSectionName> = props => {
  const { className, content: overview, sectionName, readableSectionName = sectionName, style, id } = props;

  return (
    <div className={className} style={style}>
      <div id={id} tabIndex={-1}>
        {/* This heading isn't shown but must be programmatically focusable for simulating jumping to an anchor */}
        <h2 className={styles.subHeading} style={hiddenContentStyle as React.CSSProperties}>
          {readableSectionName}
        </h2>
      </div>
      <div className={styles.content}>
        <Markdown>{overview}</Markdown>
      </div>
    </div>
  );
};
