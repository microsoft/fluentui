/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
import type { IButtonProps } from '@fluentui/react/lib/Button';
import type { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import type { IRenderFunction, IComponentAs } from '@fluentui/react/lib/Utilities';

export interface IAccordion {}

export interface IAccordionProps extends IButtonProps {
  /*
   * Renders the content for the accordion
   * @type { IRenderFunction<IContextualMenuProps> }
   */
  onRenderContent: IRenderFunction<IContextualMenuProps>;

  /**
   * Button to use for the accordion header
   * @type { IComponentAs<IButtonProps> }
   */
  buttonAs?: IComponentAs<IButtonProps>;

  /**
   * Callback for when the accordion is opened
   * @type {any}
   */
  onOpen?: () => void;

  /**
   * Callback for when the accordion is opened
   * @type {any}
   */
  onClose?: () => void;
}
