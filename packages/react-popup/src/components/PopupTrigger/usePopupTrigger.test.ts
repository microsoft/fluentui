import { renderHook } from '@testing-library/react-hooks';
import { usePopupContext, PopupContextValue } from '../../popupContext';

jest.mock('../../popupContext');

const mockPopupContext = (mockContext: Partial<PopupContextValue>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (usePopupContext as jest.Mock).mockImplementation((selector: (context: PopupContextValue) => any) => {
    return selector(mockContext as PopupContextValue);
  });
};

describe('usePopupTrigger', () => {});
