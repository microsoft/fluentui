import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-hooks';
import { classNamesFunction, divProperties, elementContains, getNativeProps, focusFirstChild } from '../../Utilities';
import { OverflowButton } from './OverflowButton';
import type { IProcessedStyleSet } from '../../Styling';
import type { IOverflowSetProps, IOverflowSetStyles, IOverflowSetStyleProps, IOverflowSet } from './OverflowSet.types';
import { useDocumentEx } from '../../utilities/dom';

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>();
const COMPONENT_NAME = 'OverflowSet';

const useComponentRef = (props: IOverflowSetProps, divContainer: React.RefObject<HTMLDivElement>) => {
  const doc = useDocumentEx();
  React.useImperativeHandle(
    props.componentRef,
    (): IOverflowSet => ({
      focus: (_forceIntoFirstElement?: boolean, bypassHiddenElements?: boolean): boolean => {
        let focusSucceeded = false;
        if (divContainer.current) {
          focusSucceeded = focusFirstChild(divContainer.current, bypassHiddenElements);
        }
        return focusSucceeded;
      },
      focusElement: (childElement?: HTMLElement) => {
        let focusSucceeded = false;
        if (!childElement) {
          return false;
        }
        if (divContainer.current && elementContains(divContainer.current, childElement)) {
          childElement.focus();
          focusSucceeded = doc?.activeElement === childElement;
        }
        return focusSucceeded;
      },
    }),
    [divContainer, doc],
  );
};

export const OverflowSetBase: React.FunctionComponent<IOverflowSetProps> = React.forwardRef<
  HTMLDivElement,
  IOverflowSetProps
>((props, forwardedRef) => {
  const divContainer = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(divContainer, forwardedRef);
  useComponentRef(props, divContainer);

  const { items, overflowItems, className, styles, vertical, role, overflowSide = 'end', onRenderItem } = props;

  const classNames: IProcessedStyleSet<IOverflowSetStyles> = getClassNames(styles, { className, vertical });

  const showOverflow = !!overflowItems && overflowItems.length > 0;

  return (
    <div
      {...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties)}
      role={role || 'group'}
      aria-orientation={role === 'menubar' ? (vertical === true ? 'vertical' : 'horizontal') : undefined}
      className={classNames.root}
      ref={mergedRef}
    >
      {overflowSide === 'start' && showOverflow && <OverflowButton {...props} className={classNames.overflowButton} />}
      {items &&
        items.map((item, i) => (
          <div className={classNames.item} key={item.key} role="none">
            {onRenderItem(item)}
          </div>
        ))}
      {overflowSide === 'end' && showOverflow && <OverflowButton {...props} className={classNames.overflowButton} />}
    </div>
  );
});
OverflowSetBase.displayName = COMPONENT_NAME;
