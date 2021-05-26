// import * as React from 'react';
// import { renderHook, act } from '@testing-library/react-hooks';
import { useFocusFinders } from '@fluentui/react-tabster';
// import { useDropdownList } from './useDropdownList';

jest.mock('@fluentui/react-tabster');
(useFocusFinders as jest.Mock).mockReturnValue({
  findAllFocusable: jest.fn(),
});

describe('useDropdownList', () => {
  // etc.
});
