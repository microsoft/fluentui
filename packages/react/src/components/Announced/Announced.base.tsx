import * as React from 'react';
import { DelayedRender, classNamesFunction, getNativeProps, divProperties } from '../../Utilities';
import type { IAnnouncedProps, IAnnouncedStyles } from './Announced.types';

const getClassNames = classNamesFunction<{}, IAnnouncedStyles>();

/**
 * {@docCategory Announced}
 */
export class AnnouncedBase extends React.Component<IAnnouncedProps> {
  public static defaultProps: Partial<IAnnouncedProps> = {
    'aria-live': 'polite',
  };

  public render(): JSX.Element {
    const { message, styles, as: Root = 'div', className } = this.props;

    const classNames = getClassNames(styles, { className });

    return (
      <Root role="status" className={classNames.root} {...getNativeProps(this.props, divProperties, ['className'])}>
        <DelayedRender>
          <div className={classNames.screenReaderText}>{message}</div>
        </DelayedRender>
      </Root>
    );
  }
}
