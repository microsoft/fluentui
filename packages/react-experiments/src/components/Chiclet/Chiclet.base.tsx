import * as React from 'react';
import { ChicletCard } from './ChicletCard';
import { ChicletXsmall } from './ChicletXsmall';
import { ChicletSize } from './Chiclet.types';
import type { IChicletProps } from './Chiclet.types';
import type { IChicletCardProps } from './ChicletCard.types';
import type { JSXElement } from '@fluentui/utilities';

export class ChicletBase extends React.Component<IChicletProps, {}> {
  public render(): JSXElement {
    const props: IChicletCardProps = this.props;
    switch (this.props.size) {
      case ChicletSize.medium:
        return <ChicletCard {...props} />;
      case ChicletSize.xSmall:
        return <ChicletXsmall {...props} />;
      default:
        return <ChicletCard {...props} />;
    }
  }
}
