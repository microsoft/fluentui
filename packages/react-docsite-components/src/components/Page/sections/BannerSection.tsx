import * as React from 'react';
import * as styles from '../Page.module.scss';
import { css, hiddenContentStyle } from '@fluentui/react';
import { IBanner, IPageSectionPropsWithSectionName } from '../Page.types';
import { Markdown } from '../../Markdown/index';

export const BannerSection: React.FunctionComponent<IPageSectionPropsWithSectionName & IBanner> = props => {
  const { className, title = props.sectionName, content, style, id } = props;
  return (
    <div className={css(styles.banner, className)} style={style}>
      <div id={id} tabIndex={-1}>
        {/* This heading isn't shown but must be programmatically focusable for simulating jumping to an anchor */}
        <h2 className={styles.subHeading} style={hiddenContentStyle as React.CSSProperties}>
          <Markdown>{title}</Markdown>
        </h2>
      </div>
      <div className={styles.content}>
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};
