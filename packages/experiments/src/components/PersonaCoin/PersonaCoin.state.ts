import { ImageLoadState } from 'office-ui-fabric-react';
import { IPersonaCoinProps, IPersonaCoinViewProps } from './PersonaCoin.types';
import { BaseState } from '../../utilities/BaseState';

export type IPersonaCoinState = Pick<IPersonaCoinViewProps, 'isPictureLoaded' | 'onPhotoLoadingStateChange'>;

export class PersonaCoinState extends BaseState<IPersonaCoinProps, IPersonaCoinViewProps, IPersonaCoinState> {
  constructor(props: PersonaCoinState['props']) {
    super(props, {
      controlledProps: ['isPictureLoaded']
    });

    this.state = {
      isPictureLoaded: false,
      onPhotoLoadingStateChange: this._onPhotoLoadingStateChange
    };
  }

  private _onPhotoLoadingStateChange = (newImageLoadState: ImageLoadState): void => {
    if (this.props.onPhotoLoadingStateChange) {
      this.props.onPhotoLoadingStateChange(newImageLoadState);
    }

    this.setState({
      isPictureLoaded: newImageLoadState === ImageLoadState.loaded
    });
  };
}
