import * as React from 'react';
import { useMergedRefs } from '@uifabric/react-hooks';
import { IProcessedStyleSet } from '../../Styling';
import { IOverflowSetProps, IOverflowSetStyles, IOverflowSetStyleProps, IOverflowSet } from './OverflowSet.types';
import { classNamesFunction, divProperties, elementContains, getNativeProps, focusFirstChild } from '../../Utilities';
import { OverflowButton } from './OverflowButton';

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>();
const COMPONENT_NAME = 'OverflowSet';

const useComponentRef = (props: IOverflowSetProps, divContainer: React.RefObject<HTMLDivElement>) => {
  React.useImperativeHandle(
    props.componentRef,
    (): IOverflowSet => ({
      focus: (): boolean => {
        let focusSucceeded = false;
        if (divContainer.current) {
          focusSucceeded = focusFirstChild(divContainer.current);
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
          focusSucceeded = document.activeElement === childElement;
        }
        return focusSucceeded;
      },
    }),
    [divContainer],
  );
};

export const OverflowSetBase = React.forwardRef((props: IOverflowSetProps, forwardedRef: React.Ref<HTMLDivElement>) => {
  const divContainer = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(divContainer, forwardedRef);
  useComponentRef(props, divContainer);

  const { items, overflowItems, className, styles, vertical, role, overflowSide = 'end' } = props;

  const classNames: IProcessedStyleSet<IOverflowSetStyles> = getClassNames(styles, { className, vertical });

  const showOverflow = !!overflowItems && overflowItems.length > 0;

  return (
    <div
      role={role || 'group'}
      aria-orientation={role === 'menubar' ? (vertical === true ? 'vertical' : 'horizontal') : undefined}
      className={classNames.root}
      ref={mergedRef}
      {...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties)}
    >
      {overflowSide === 'start' && showOverflow && <OverflowButton className={classNames.overflowButton} {...props} />}
      {items &&
        items.map((item, i) => (
          <div key={item.key} className={classNames.item}>
            {props.onRenderItem(item)}
          </div>
        ))}
      {overflowSide === 'end' && showOverflow && <OverflowButton className={classNames.overflowButton} {...props} />}
    </div>
  );
});
OverflowSetBase.displayName = COMPONENT_NAME;
