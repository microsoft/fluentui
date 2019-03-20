import * as React from 'react';
import { getStyles } from './SetupCard.styles';
import { ISetupCardProps, ISetupCardStyles, ISetupCardStylesProps } from './SetupCard.types';
import { mergeStyles } from 'office-ui-fabric-react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export class SetupCard extends React.PureComponent<ISetupCardProps> {
  private bgRef: React.RefObject<SVGSVGElement>;

  constructor(props: ISetupCardProps) {
    super(props);
    this.bgRef = React.createRef();
  }
  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ISetupCardStylesProps, ISetupCardStyles>();
    const classNames = getClassNames(getStyles, { checked: this.props.checked, selected: this.props.selected });
    return (
      <svg
        className={mergeStyles(classNames.root, this.props.customStyle, this.props.className)}
        width="193"
        height="236"
        viewBox="0 0 193 236"
        ref={this.bgRef}
      >
        <g filter="url(#filter0_dd)">
          <path d="M159.202 207.999L7 119.386V10.3594L159.202 98.9724V207.999Z" className={classNames.cardBackground} />
          <text y="48" x="10" transform="translate(0 -20) skewY(30.5) scale(1 0.86)" className={classNames.title}>
            {this.props.title}
          </text>
          <path d="M165 204.623L159.202 207.998V98.9714L165 95.5957V204.623Z" className={classNames.cardRightEdge} />
          <path d="M159.202 98.968L7 10.355L12.7621 7L164.964 95.613L159.202 98.968Z" className={classNames.cardTopEdge} />
          <g mask="url(#cardMask)">
            {/* we need this transparent circle for the line to render within the mask */}
            <circle fill="#00000000" transform="skewY(18) skewX(7)" cx="69.5" cy="93.5" r="100" />
            <line x1="69.5" x2="69.5" y1="93.5" y2="93.5" transform="skewY(18) skewX(7)" className={classNames.cardContentBackground} />
          </g>
          <path
            className={classNames.checkmark}
            d="M81 102.428C82.6534 103.173 84.2444 104.068 85.773 105.171C87.3016 106.275 88.7366 107.497 90.078 108.839C91.4194 110.181
            92.636 111.612 93.7279 113.163C94.8198 114.713 95.7556 116.264 96.5355 117.904C97.3154 119.514 97.9393 121.154 98.3449
            122.824C98.7816 124.494 99 126.104 99 127.685C99 129.265 98.7816 130.696 98.3449 131.979C97.9081 133.261 97.3154 134.364
            96.5355 135.288C95.7556 136.213 94.8198 136.958 93.7279 137.495C92.636 138.062 91.4194 138.419 90.078 138.569C88.7366 138.718
            87.3016 138.658 85.773 138.39C84.2444 138.121 82.6534 137.614 81 136.869C79.3466 136.123 77.7556 135.229 76.227 134.126C74.6984
            133.022 73.2634 131.8 71.922 130.458C70.5806 129.116 69.364 127.685 68.2721 126.134C67.1802 124.583 66.2444 123.033 65.4645
            121.393C64.6846 119.783 64.0607 118.143 63.6551 116.473C63.2184 114.803 63 113.193 63 111.612C63 110.032 63.2184 108.601
            63.6551 107.318C64.0919 106.036 64.6846 104.933 65.4645 104.008C66.2444 103.084 67.1802 102.339 68.2721 101.802C69.364 101.235
            70.5806 100.877 71.922 100.728C73.2634 100.579 74.6984 100.639 76.227 100.907C77.7556 101.176 79.3466 101.683 81
            102.428ZM78.9411 124.136C79.1906 124.255 79.4402 124.315 79.6898 124.315C79.9393 124.315 80.1265 124.285 80.3137
            124.196L87.8631 120.349C88.0503 120.26 88.175 120.111 88.2686 119.932C88.3622 119.753 88.4246 119.544 88.4246 119.306C88.4246
            119.067 88.3622 118.799 88.2686 118.53C88.175 118.262 88.0191 117.993 87.8631 117.785C87.7071 117.546 87.4887 117.337 87.2704
            117.129C87.0208 116.92 86.8024 116.771 86.5217 116.652C86.2721 116.532 86.0225 116.473 85.8042 116.473C85.5546 116.443 85.3674
            116.503 85.1802 116.592L78.9411 119.753L76.851 116.831C76.4766 116.294 76.0399 115.936 75.5095 115.697C75.26 115.578 75.0104
            115.519 74.7608 115.519C74.5113 115.519 74.3241 115.548 74.1369 115.638C73.9497 115.727 73.825 115.847 73.7314 116.025C73.6378
            116.204 73.5754 116.413 73.5754 116.652C73.5754 116.89 73.6378 117.129 73.7314 117.427C73.825 117.695 73.9809 117.964 74.1369
            118.202L77.5685 123.003C77.7556 123.242 77.9428 123.48 78.1924 123.689C78.4731 123.868 78.6915 124.047 78.9411 124.136Z"
          />

          <path d="M165 118.452L159.202 121.828V120.151L165 116.775V118.452Z" className={classNames.cardRightEdgeSeparator} />
          <path d="M159.202 121.83L7 33.2165V31.5391L159.202 120.153V121.83Z" className={classNames.cardTopEdgeSeparator} />
          <path d="M165 204.623L159.202 207.998V98.9714L165 95.5957V204.623Z" className={classNames.cardRightEdgeShadow} />
        </g>
        <mask id="cardMask">
          <path d="M159.202 208L7 119.387L7.00019 32.9941L159.202 121.607L159.202 208Z" fill="white" />
          <path d="M165 204.622L159.202 207.997V121.852L165 118.477V204.622Z" fill="white" />
        </mask>
        <defs>
          <filter id="filter0_dd" x="0" y="0" width="193" height="236" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="3" dy="3" />
            <feGaussianBlur stdDeviation="5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="13" dy="13" />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
            <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    );
  }

  public componentDidMount(): void {
    this.bgRef.current!.addEventListener('transitionend', this._transitionEnd);
    this.bgRef.current!.addEventListener('transitionstart', this._transitionStart);
  }

  public componentWillUnmount(): void {
    this.bgRef.current!.removeEventListener('transitionend', this._transitionEnd);
    this.bgRef.current!.removeEventListener('transitionstart', this._transitionStart);
  }

  private _transitionEnd(event: TransitionEvent): void {
    if (this.props.transitionEnd) {
      this.props.transitionEnd(event);
    }
  }

  private _transitionStart(event: TransitionEvent): void {
    if (this.props.transitionStart) {
      this.props.transitionStart(event);
    }
  }
}
