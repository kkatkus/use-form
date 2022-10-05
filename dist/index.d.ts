import { ForwardedRef } from 'react';

declare type UseFormValue = undefined | null | string | number | boolean | string[] | number[] | Record<string, unknown>;
interface UseFormConfigValidatorFn<T> {
    (value: UseFormValue, data: T): string | null;
}
declare type UseFormConfig<T> = Record<keyof T, [UseFormValue, UseFormConfigValidatorFn<T>[]] | [UseFormValue]>;
declare type UseFormErrors<T> = Record<Partial<keyof T>, string>;
interface UseFormOptions {
    validateOn?: 'change' | 'blur' | 'submit';
}

declare function isUndefinedOrNull(val: UseFormValue): boolean;
declare function isEmpty(val: UseFormValue): boolean;
declare function min(minVal: number, message?: string): (val: UseFormValue) => string | null;
declare function max(maxVal: number, message?: string): (val: UseFormValue) => string | null;
declare function required(message?: string): (val: UseFormValue) => string | null;
declare function requiredTrue(message?: string): (val: UseFormValue) => string | null;
declare function equal<T>(withName: string, message?: string): (val: UseFormValue, data: T) => string | null;
declare function email(message?: string): (val: UseFormValue) => string | null;
declare function minLength(minLength: number, message?: string): (val: UseFormValue) => string | null;
declare function maxLength(maxLength: number, message?: string): (val: UseFormValue) => string | null;
declare function pattern(pattern: string | RegExp, message?: string): (val: UseFormValue) => string | null;
declare function numeric(message?: string): (val: UseFormValue) => string | null;
declare function decimal(message?: string): (val: UseFormValue) => string | null;

interface UseForm<T> {
    ref: ForwardedRef<HTMLFormElement>;
    submitted: boolean;
    valid: boolean;
    data: T;
    errors: UseFormErrors<T>;
    change: (e: Event) => void | Error;
    set: (data: Partial<T>, replace?: boolean) => void;
    validate: () => {
        valid: boolean;
        errors: UseFormErrors<T>;
    };
    submit: () => {
        valid: boolean;
        errors: UseFormErrors<T>;
    };
}
declare function useForm<T>(config: UseFormConfig<T>, options?: UseFormOptions): UseForm<T>;

export { UseFormConfig, UseFormErrors, UseFormOptions, UseFormValue, decimal, email, equal, isEmpty, isUndefinedOrNull, max, maxLength, min, minLength, numeric, pattern, required, requiredTrue, useForm };
