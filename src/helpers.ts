import { UseFormConfig, UseFormErrors, UseFormValue } from './types';

export function extractData<T>(config: UseFormConfig<T>): T {
  const result = Object.keys(config).reduce((curr, key, i) => {
    curr[key] = config[key as keyof T][0];
    return curr;
  }, {} as Record<string, UseFormValue>);
  return result as T;
}

export function getFormInputs(form: HTMLFormElement | null): HTMLInputElement[] {
  if (!form) {
    return [];
  }
  return Array.from(form.querySelectorAll('input, select, textarea') || []);
}

export function getInputElements(
  form: HTMLFormElement | null,
  prop: string,
  val?: UseFormValue,
): HTMLInputElement[] | null {
  if (!form) {
    return null;
  }
  const elements: HTMLInputElement[] = Array.from(form.querySelectorAll(`[name="${prop}"]`));
  if (!elements.length) {
    return null;
  }
  if (elements[0].type === 'radio') {
    return elements.filter((e: HTMLInputElement) => e.value === val);
  }
  return elements;
}

export function updateFormInputs(
  form: HTMLFormElement | null,
  data: Record<string, UseFormValue>,
): Record<string, HTMLInputElement[]> {
  if (!form) {
    return {};
  }
  const newRefs: Record<string, HTMLInputElement[]> = {};

  Object.keys(data).forEach((prop) => {
    const els = getInputElements(form, prop, data[prop]);
    if (!els) {
      return;
    }
    newRefs[prop] = els;

    switch (els[0].type) {
      case 'checkbox':
        els[0].checked = Boolean(data[prop]);
        break;
      case 'radio':
        els.forEach((f) => (f.checked = f.value === data[prop]));
        break;
      case 'file':
        //file cannot be set programmatically
        els[0].value = '';
        break;
      case 'submit':
      case 'reset':
      case 'image':
        break;
      default:
        els[0].value = String(data[prop]);
        break;
    }
  });

  return newRefs;
}

export function validateFn<T>(config: UseFormConfig<T>, data: T): { valid: boolean; errors: UseFormErrors<T> } {
  const errors: UseFormErrors<T> = {} as UseFormErrors<T>;
  Object.keys(config).forEach((prop: string) => {
    const validators = config[prop as keyof T][1];
    let valid = true;
    (validators || []).forEach((validator: any) => {
      if (typeof validator === 'function') {
        const r = validator.call(null, data[prop as keyof T], data);
        if (valid && r) {
          valid = false;
          errors[prop as keyof T] = r;
        }
      }
    });
  });
  const valid = Object.keys(errors).length === 0;
  return { valid, errors };
}
