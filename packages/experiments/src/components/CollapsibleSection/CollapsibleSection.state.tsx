import { useCallback, useImperativeHandle, useRef } from 'react';
import { useControlledState } from '../../Foundation';
import { getRTL, KeyCodes } from '../../Utilities';
import { ICollapsibleSectionProps, ICollapsibleSectionViewProps, ICollapsibleSectionComponent } from './CollapsibleSection.types';

export const useCollapsibleSectionState: ICollapsibleSectionComponent['state'] = (
  props: Readonly<ICollapsibleSectionProps>
): ICollapsibleSectionViewProps => {
  const titleElementRef = useRef<HTMLButtonElement | null>(null);

  const [collapsed, setCollapsed] = useControlledState(props, 'collapsed', {
    defaultPropName: 'defaultCollapsed',
    defaultPropValue: false
  });

  useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      titleElementRef.current && titleElementRef.current.focus();
    }
  }));

  const _onClick = useCallback(
    (ev: React.MouseEvent<Element>) => {
      setCollapsed(!collapsed);
      ev.preventDefault();
      ev.stopPropagation();
    },
    [collapsed]
  );

  const _onKeyDown = useCallback(
    (ev: React.KeyboardEvent<Element>) => {
      const collapseKey = getRTL() ? KeyCodes.right : KeyCodes.left;
      const expandKey = getRTL() ? KeyCodes.left : KeyCodes.right;

      if (ev.which === collapseKey && !collapsed) {
        setCollapsed(true);
        ev.preventDefault();
        ev.stopPropagation();
      } else if (ev.which === expandKey && collapsed) {
        setCollapsed(false);
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    [collapsed]
  );

  const _onRootKeyDown = useCallback((ev: React.KeyboardEvent<Element>) => {
    const rootKey = getRTL() ? KeyCodes.right : KeyCodes.left;

    // If left/right keypress originates from text input or text area inside collapsible section,
    // ignore the event.
    if (
      ev.which === rootKey &&
      ev.target !== titleElementRef.current &&
      titleElementRef.current &&
      !(ev.target instanceof HTMLTextAreaElement) &&
      !(ev.target instanceof HTMLInputElement && ev.target.type === 'text')
    ) {
      titleElementRef.current.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, []);

  const viewProps: ICollapsibleSectionViewProps = {
    ...props,
    collapsed,
    onClick: _onClick,
    onKeyDown: _onKeyDown,
    onRootKeyDown: _onRootKeyDown,
    titleElementRef
  };

  return viewProps;
};
