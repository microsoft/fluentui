import * as React from 'react';

import { PaginationButtonsBasicExample } from './Pagination.Buttons.Basic.Example';
import { PaginationButtonsCustomizationExample } from './Pagination.Buttons.Customization.Example';
import { PaginationButtonsCustomizationRoundExample } from './Pagination.Buttons.Customization.Round.Example';
import { PaginationComboBoxExample } from './Pagination.ComboBox.Example';

export const ButtonsBasic = () => <PaginationButtonsBasicExample />;

export const ButtonsCustomization = () => <PaginationButtonsCustomizationExample />;

export const ButtonsCustomizationRound = () => <PaginationButtonsCustomizationRoundExample />;

export const ComboBox = () => <PaginationComboBoxExample />;

export default {
  title: 'Components/Pagination',
};
