export type UseFormValue = undefined | null | string | number | boolean | string[] | number[] | Record<string, unknown>;

export interface UseFormConfigValidatorFn<T> {
  (value: UseFormValue, data: T): string | null;
}

export type UseFormConfig<T> = Record<keyof T, [UseFormValue, UseFormConfigValidatorFn<T>[]] | [UseFormValue]>;

export type UseFormErrors<T> = Record<Partial<keyof T>, string>;

export interface UseFormOptions {
  validateOn?: 'change' | 'blur' | 'submit';
}
