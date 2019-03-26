import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as React from 'react';

import { LoadingType, IDetailPanelLoadingProps } from '../DetailPanel.types';
import { detailPanelLoadingStyles } from '../DetailPanel.styles';

const loading: React.SFC<IDetailPanelLoadingProps> = (props: IDetailPanelLoadingProps): JSX.Element | null => {
  const css = detailPanelLoadingStyles;
  const _renderSpinner = (overlay: boolean) => {
    const spinner = (
      <div className={css.spinner}>
        <Spinner size={SpinnerSize.large} label={props.message} />
      </div>
    );
    if (overlay) {
      return (
        <Overlay className={css.overlay} isDarkThemed={false}>
          {spinner}
        </Overlay>
      );
    } else {
      return <div className={css.spinnerContainer}>{spinner}</div>;
    }
  };

  const _renderShimmer = (title: boolean = true, count: number = 3) => {
    return (
      <div className={css.pageShimmer}>
        {/* group 1 */}
        {title && <Shimmer shimmerElements={[{ type: ElemType.line }]} width="100%" />}
        {/* group 2 */}
        {Array.apply(null, Array(count)).map((_: number, i: number) => {
          return (
            <div className={css.shimmerGroup} key={i}>
              <Shimmer shimmerElements={[{ type: ElemType.line }]} width="100%" />
              <Shimmer shimmerElements={[{ type: ElemType.line }]} width="55%" />
              <Shimmer shimmerElements={[{ type: ElemType.line }]} width="45%" />
            </div>
          );
        })}
      </div>
    );
  };

  const _renderElement = () => {
    const { loadingType } = props;
    switch (loadingType) {
      case LoadingType.Inline:
        return _renderSpinner(true);
      case LoadingType.Page:
        return _renderShimmer(true, 3);
      case LoadingType.Workflow:
        return _renderSpinner(false);
      case LoadingType.Content:
        return _renderShimmer(true, 3);
      case LoadingType.None:
      default:
        return null;
    }
  };

  return _renderElement();
};

loading.defaultProps = {
  loadingType: LoadingType.None
};

export { loading as Loading };
