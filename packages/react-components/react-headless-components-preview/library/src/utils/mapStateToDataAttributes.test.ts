import { mapStateToDataAttributes } from './mapStateToDataAttributes';

describe('mapStateToDataAttributes', () => {
  it('should map boolean attributes to data attributes', () => {
    const state = { collapsible: true, multiple: false };
    const result = mapStateToDataAttributes(state, ['collapsible', 'multiple']);
    expect(result).toEqual({ 'data-collapsible': '' });
  });

  it('should map string attributes to data attributes', () => {
    const state = { orientation: 'vertical', color: 'red' };
    const result = mapStateToDataAttributes(state, ['orientation', 'color']);
    expect(result).toEqual({ 'data-orientation': 'vertical', 'data-color': 'red' });
  });

  it('should ignore falsy values except for true', () => {
    const state = { disabled: false, active: null, visible: undefined, focusable: true };
    const result = mapStateToDataAttributes(state, ['disabled', 'active', 'visible', 'focusable']);
    expect(result).toEqual({ 'data-focusable': '' });
  });

  it('should handle mixed attribute types', () => {
    const state = { collapsible: true, size: 'medium', disabled: false };
    const result = mapStateToDataAttributes(state, ['collapsible', 'size', 'disabled']);
    expect(result).toEqual({ 'data-collapsible': '', 'data-size': 'medium' });
  });

  it('should return only the specified attributes', () => {
    const state = { collapsible: true, size: 'medium', disabled: false };
    const result = mapStateToDataAttributes(state, ['size']);
    expect(result).toEqual({ 'data-size': 'medium' });
  });
});
