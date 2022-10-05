import { getNumeric, isEmpty, isUndefinedOrNull, max, min } from './validators';

describe('validators', () => {
  it('getNumeric', () => {
    expect(getNumeric(null)).toBeNaN();
    expect(getNumeric(undefined)).toBeNaN();
    expect(getNumeric(' ')).toBeNaN();
    expect(getNumeric('-')).toBeNaN();
    expect(getNumeric('0')).toEqual(0);
    expect(getNumeric(0)).toEqual(0);
    expect(getNumeric(0.0)).toEqual(0);
    expect(getNumeric(0.1)).toEqual(0);
    expect(getNumeric(1.1)).toEqual(1);
    expect(getNumeric(10)).toEqual(10);
    expect(getNumeric('  20')).toEqual(20);
    expect(getNumeric([])).toBeNaN();
    expect(getNumeric({})).toBeNaN();
  });

  it('isUndefinedOrNull', () => {
    expect(isUndefinedOrNull(null)).toBeTruthy();
    expect(isUndefinedOrNull(undefined)).toBeTruthy();
    expect(isUndefinedOrNull('')).toBeFalsy();
    expect(isUndefinedOrNull(0)).toBeFalsy();
    expect(isUndefinedOrNull('0')).toBeFalsy();
    expect(isUndefinedOrNull('xx')).toBeFalsy();
    expect(isUndefinedOrNull([])).toBeFalsy();
    expect(isUndefinedOrNull({})).toBeFalsy();
  });

  it('isEmpty', () => {
    expect(isEmpty(null)).toBeFalsy();
    expect(isEmpty(undefined)).toBeFalsy();
    expect(isEmpty('0')).toBeFalsy();
    expect(isEmpty(0)).toBeFalsy();
    expect(isEmpty({ x: 0 })).toBeFalsy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(' ')).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
  });

  it('min', () => {
    expect(min(1)(0)).toBe('Min 1');
    expect(min(1, 'Minimum 1')(0)).toBe('Minimum 1');
    expect(min(0)(-1)).toBe('Min 0');
    expect(min(-2)(-1)).toBeNull();
    expect(min(5)(3)).toBe('Min 5');
    expect(min(5)(5)).toBeNull();
    expect(min(5)({})).toBeNull();
    expect(min(5)([])).toBeNull();
    expect(min(5)({ x: 1 })).toBe('Value must be numeric');
  });

  it('max', () => {
    expect(max(1)(5)).toBe('Max 1');
    expect(max(1, 'Maximum 1')(2)).toBe('Maximum 1');
    expect(max(-2)(-1)).toBe('Max -2');
    expect(max(-2)(-3)).toBeNull();
    expect(max(5)(6)).toBe('Max 5');
    expect(max(5)(5)).toBeNull();
    expect(max(5)({})).toBeNull();
    expect(max(5)([])).toBeNull();
    expect(max(5)({ x: 1 })).toBe('Value must be numeric');
  });
});
