import { UseFormValue } from './types';

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
    if (parseInt(String(val).trim(), 10) < minVal) {
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
    if (parseInt(String(val).trim(), 10) > maxVal) {
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
    if (isUndefinedOrNull(val) || val === '' || isEmpty(val) || Boolean(val) !== true) {
      return message;
    }
    return null;
  };
}

export function equal<T>(
  withName: string,
  message = 'Values must be equal.',
): (val: UseFormValue, data: T) => string | null {
  return (val: UseFormValue, data: T): string | null => {
    if (
      val !== data[withName as keyof T] &&
      (!(isUndefinedOrNull(val) || isEmpty(val)) ||
        !(
          isUndefinedOrNull(data[withName as keyof T] as UseFormValue) ||
          isEmpty(data[withName as keyof T] as UseFormValue)
        ))
    ) {
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
    const p = /^[0-9]+$/;
    return String(val).match(p) ? null : message;
  };
}

export function decimal(message = 'Value must be decimal'): (val: UseFormValue) => string | null {
  return (val: UseFormValue) => {
    console.log('dec', val);

    if (isUndefinedOrNull(val) || isEmpty(val)) {
      return null;
    }
    if (isNaN(parseFloat(String(val)))) {
      console.log('baba', val, message);
      return message;
    }
    return null;
  };
}
