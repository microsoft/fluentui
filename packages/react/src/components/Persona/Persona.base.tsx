import * as React from 'react';
import { classNamesFunction, divProperties, getNativeProps, getPropsWithDefaults } from '../../Utilities';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { PersonaCoin } from './PersonaCoin/PersonaCoin';
import { PersonaPresence as PersonaPresenceEnum, PersonaSize } from './Persona.types';
import { useWarnings, useMergedRefs } from '@fluentui/react-hooks';
import { DirectionalHint } from '../../common/DirectionalHint';
import type { IRenderFunction } from '../../Utilities';
import type { IPersonaProps, IPersonaStyleProps, IPersonaStyles, IPersonaCoinProps } from './Persona.types';

const getClassNames = classNamesFunction<IPersonaStyleProps, IPersonaStyles>();

const DEFAULT_PROPS = {
  size: PersonaSize.size48,
  presence: PersonaPresenceEnum.none,
  imageAlt: '',
  showOverflowTooltip: true,
};

function useDebugWarnings(props: IPersonaProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: 'Persona',
      props,
      deprecations: { primaryText: 'text' },
    });
  }
}

/**
 * Persona with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Styling)
 */
export const PersonaBase: React.FunctionComponent<IPersonaProps> = React.forwardRef<HTMLDivElement, IPersonaProps>(
  (propsWithoutDefaults, forwardedRef) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    useDebugWarnings(props);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const mergedRootRef = useMergedRefs(forwardedRef, rootRef);

    /**
     * Deprecation helper for getting text.
     */
    const getText = (): string => {
      // eslint-disable-next-line deprecation/deprecation
      return props.text || props.primaryText || '';
    };

    /**
     * Renders various types of Text (primaryText, secondaryText, etc)
     * based on the classNames passed
     * @param elementClassNames - element className
     * @param renderFunction - render function
     * @param defaultRenderFunction - default render function
     */
    const renderElement = (
      elementClassNames: string,
      renderFunction: IRenderFunction<IPersonaProps> | undefined,
      defaultRenderFunction: IRenderFunction<IPersonaProps> | undefined,
    ): JSX.Element | undefined => {
      const content = renderFunction && renderFunction(props, defaultRenderFunction);
      return content ? (
        <div dir="auto" className={elementClassNames}>
          {content}
        </div>
      ) : undefined;
    };

    /**
     * using closure to wrap the default render behavior
     * to make it independent of the type of text passed
     * @param text - text to render
     */
    const onRenderText = (text: string | undefined, tooltip = true): IRenderFunction<IPersonaProps> | undefined => {
      // return default render behavior for valid text or undefined
      return text
        ? tooltip
          ? (): JSX.Element => {
              // default onRender behavior
              return (
                <TooltipHost
                  content={text}
                  overflowMode={TooltipOverflowMode.Parent}
                  directionalHint={DirectionalHint.topLeftEdge}
                >
                  {text}
                </TooltipHost>
              );
            }
          : () => <>{text}</>
        : undefined;
    };

    const onInternalRenderPersonaCoin = (providedCoinProps: IPersonaCoinProps): JSX.Element | null => {
      return <PersonaCoin {...providedCoinProps} />;
    };

    // wrapping default render behavior based on various props properties
    const onInternalRenderPrimaryText = onRenderText(getText(), props.showOverflowTooltip);
    const onInternalRenderSecondaryText = onRenderText(props.secondaryText, props.showOverflowTooltip);
    const onInternalRenderTertiaryText = onRenderText(props.tertiaryText, props.showOverflowTooltip);
    const onInternalRenderOptionalText = onRenderText(props.optionalText, props.showOverflowTooltip);

    const {
      hidePersonaDetails,
      onRenderOptionalText = onInternalRenderOptionalText,
      onRenderPrimaryText = onInternalRenderPrimaryText,
      onRenderSecondaryText = onInternalRenderSecondaryText,
      onRenderTertiaryText = onInternalRenderTertiaryText,
      onRenderPersonaCoin = onInternalRenderPersonaCoin,
    } = props;
    const size = props.size as PersonaSize;

    // These properties are to be explicitly passed into PersonaCoin because they are the only props directly used
    const {
      allowPhoneInitials,
      className,
      coinProps,
      showUnknownPersonaCoin,
      coinSize,
      styles,
      imageAlt,
      imageInitials,
      imageShouldFadeIn,
      imageShouldStartVisible,
      imageUrl,
      initialsColor,
      initialsTextColor,
      isOutOfOffice,
      onPhotoLoadingStateChange,
      // eslint-disable-next-line deprecation/deprecation
      onRenderCoin,
      onRenderInitials,
      presence,
      presenceTitle,
      presenceColors,
      showInitialsUntilImageLoads,
      showSecondaryText,
      theme,
    } = props;

    const personaCoinProps: IPersonaCoinProps = {
      allowPhoneInitials,
      showUnknownPersonaCoin,
      coinSize,
      imageAlt,
      imageInitials,
      imageShouldFadeIn,
      imageShouldStartVisible,
      imageUrl,
      initialsColor,
      initialsTextColor,
      onPhotoLoadingStateChange,
      onRenderCoin,
      onRenderInitials,
      presence,
      presenceTitle,
      showInitialsUntilImageLoads,
      size,
      text: getText(),
      isOutOfOffice,
      presenceColors,
      ...coinProps,
    };

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      showSecondaryText,
      presence,
      size,
    });

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);
    const personaDetails = (
      <div className={classNames.details}>
        {renderElement(classNames.primaryText, onRenderPrimaryText, onInternalRenderPrimaryText)}
        {renderElement(classNames.secondaryText, onRenderSecondaryText, onInternalRenderSecondaryText)}
        {renderElement(classNames.tertiaryText, onRenderTertiaryText, onInternalRenderTertiaryText)}
        {renderElement(classNames.optionalText, onRenderOptionalText, onInternalRenderOptionalText)}
        {props.children}
      </div>
    );
    return (
      <div
        {...divProps}
        ref={mergedRootRef}
        className={classNames.root}
        style={coinSize ? { height: coinSize, minWidth: coinSize } : undefined}
      >
        {onRenderPersonaCoin(personaCoinProps, onRenderPersonaCoin)}
        {
          /* eslint-disable deprecation/deprecation */

          (!hidePersonaDetails ||
            size === PersonaSize.size8 ||
            size === PersonaSize.size10 ||
            size === PersonaSize.tiny) &&
            personaDetails
          /* eslint-enable deprecation/deprecation */
        }
      </div>
    );
  },
);
PersonaBase.displayName = 'PersonaBase';
