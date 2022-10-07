import { email, equal, getNumeric, isEmpty, isUndefinedOrNull, max, min, required, requiredTrue } from './validators';

const validEmails = [
  'email@example.com',
  'firstname.lastname@example.com',
  'email@subdomain.example.com',
  'firstname+lastname@example.com',
  'email@[123.123.123.123]',
  '"email"@example.com',
  '1234567890@example.com',
  'email@example-one.com',
  '_______@example.com',
  'email@example.name',
  'email@example.museum',
  'email@example.co.jp',
  'firstname-lastname@example.com',
];

const invalidEmails = [
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email..email@example.com',
  'email@example.com (Joe Smith)',
  'email@example',
  'email@111.222.333.44444',
  'email@example..com',
  'Abc..123@example.com',
  'List of Strange Invalid Email Addresses',
  '”(),:;<>[]@example.com',
  'this is"really"notallowed@example.com',
];

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
    expect(isEmpty([0])).toBeFalsy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(' ')).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
  });

  it('min', () => {
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
    expect(max(1, 'Maximum 1')(2)).toBe('Maximum 1');
    expect(max(-2)(-1)).toBe('Max -2');
    expect(max(-2)(-3)).toBeNull();
    expect(max(5)(6)).toBe('Max 5');
    expect(max(5)(5)).toBeNull();
    expect(max(5)({})).toBeNull();
    expect(max(5)([])).toBeNull();
    expect(max(5)({ x: 1 })).toBe('Value must be numeric');
  });

  it('required', () => {
    expect(required('Is required')(null)).toBe('Is required');
    expect(required()(undefined)).toBe('Value is required');
    expect(required()('')).toBe('Value is required');
    expect(required()(' ')).toBe('Value is required');
    expect(required()({})).toBe('Value is required');
    expect(required()([])).toBe('Value is required');
    expect(required()([0])).toBeNull();
    expect(required()({ x: 0 })).toBeNull();
    expect(required()(0)).toBeNull();
    expect(required()('0')).toBeNull();
  });

  it('requiredTrue', () => {
    expect(requiredTrue('Make it true')(null)).toBe('Make it true');
    expect(requiredTrue()(undefined)).toBe('Value must be true');
    expect(requiredTrue()('')).toBe('Value must be true');
    expect(requiredTrue()(' ')).toBe('Value must be true');
    expect(requiredTrue()({})).toBe('Value must be true');
    expect(requiredTrue()([])).toBe('Value must be true');
    expect(requiredTrue()('true')).toBeNull();
    expect(requiredTrue()(true)).toBeNull();
  });

  it('equal', () => {
    expect(equal('password', 'Must match')('aa', { password: 'bb' })).toBe('Must match');
    expect(equal('password')('', { password: 'bb' })).toBeNull();
    expect(equal('password')('aa', { password: '' })).toBeNull();
    expect(equal('password')(null, { password: '' })).toBeNull();
    expect(equal('password')(undefined, { password: '' })).toBeNull();
    expect(equal('password')([], { password: 'aa' })).toBeNull();
    expect(equal('password')('aa', { password: undefined })).toBeNull();
    expect(equal('password')('aa', { password: null })).toBeNull();
    expect(equal('password')('aa', {})).toBeNull();
    expect(equal('password')('aa', null)).toBeNull();
    expect(equal('password')('aa', undefined)).toBeNull();
    expect(equal('password')('aa', { password: 'aa' })).toBeNull();
  });

  it.each(validEmails)('validate valid email %s', (v) => expect(email()(v)).toBeNull());
  it.each(invalidEmails)('validate invalid email %s', (v) => expect(email()(v)).toBe('Invalid email'));

  it('email', () => {
    expect(email('Bad email')('aaa')).toBe('Bad email');

    expect(email()('aaa@')).toBe('Invalid email');
    expect(email()('aaa@a')).toBe('Invalid email');
    expect(email()('aaa@a.z')).toBe('Invalid email');
    expect(email()('1@a.z')).toBe('Invalid email');
    expect(email()('1@a.z@')).toBe('Invalid email');
    expect(email()('1@a.zt')).toBeNull();
  });
});
