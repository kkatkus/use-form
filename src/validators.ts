import { UseFormValue } from './types';

export function getNumeric(val: UseFormValue): number {
  return parseInt(String(val).trim(), 10);
}

export function isUndefinedOrNull(val: UseFormValue): boolean {
  return val === null || val === undefined;
}

export function isEmpty(val: UseFormValue): boolean {
  if (typeof val === 'object' && val !== null && Object.keys(val).length === 0) {
    return true;
  }
  if (Array.isArray(val) && !val.length) {
    return true;
  }
  return String(val).trim() === '';
}

export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function min(minVal: number, message = `Min ${minVal}`): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }

    const vNumeric = numeric()(val);
    if (vNumeric) {
      return vNumeric;
    }

    if (getNumeric(val) < minVal) {
      return message;
    }
    return null;
  };
}

export function max(maxVal: number, message = `Max ${maxVal}`): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }

    const vNumeric = numeric()(val);
    if (vNumeric) {
      return vNumeric;
    }

    if (getNumeric(val) > maxVal) {
      return message;
    }
    return null;
  };
}

export function required(message = 'Value is required'): (val: UseFormValue) => string | null {
  return (val: UseFormValue): string | null => {
    if (isUndefinedOrNull(val) || val === '' || isEmpty(val)) {
      return message;
    }
    return null;
  };
}

export function requiredTrue(message = 'Value must be true'): (val: UseFormValue) => string | null {
  return (val: UseFormValue): string | null => {
    if (String(val) !== 'true') {
      return message;
    }
    return null;
  };
}

export function equal<T>(
  withName: string,
  message = 'Values must be equal',
): (val: UseFormValue, data: T) => string | null {
  return (val: UseFormValue, data: T): string | null => {
    const valIsUndefinedOrNull = isUndefinedOrNull(val) || isEmpty(val);
    const withValIsUndefinedOrNull =
      !data ||
      isUndefinedOrNull(data[withName as keyof T] as UseFormValue) ||
      isEmpty(data[withName as keyof T] as UseFormValue);
    if (data && val !== data[withName as keyof T] && !valIsUndefinedOrNull && !withValIsUndefinedOrNull) {
      return message;
    }
    return null;
  };
}

export function email(message = 'Invalid email'): (val: UseFormValue) => string | null {
  return (val: UseFormValue): string | null => {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }
    if (!EMAIL_PATTERN.test(String(val).toLowerCase())) {
      return message;
    }
    return null;
  };
}

export function minLength(
  minLength: number,
  message = `Min length ${minLength}`,
): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }
    if (String(val).trim().length < minLength) {
      return message;
    }
    return null;
  };
}

export function maxLength(
  maxLength: number,
  message = `Max length ${maxLength}`,
): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }
    if (String(val).trim().length > maxLength) {
      return message;
    }
    return null;
  };
}

export function pattern(pattern: string | RegExp, message = 'Invalid pattern'): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    if (isUndefinedOrNull(val) || isEmpty(val) || !pattern) {
      return null;
    }
    const p = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    if (!p.test(String(val))) {
      return message;
    }
    return null;
  };
}

export function numeric(message = 'Value must be numeric'): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }
    return String(val).match(/^\-{0,1}[0-9]+$/) ? null : message;
  };
}

export function decimal(message = 'Value must be decimal'): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }
    return String(val).match(/^\d*\.?\d*$/) ? null : message;
  };
}
