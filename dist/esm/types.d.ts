import { ForwardedRef } from 'react';
export declare type UseFormValue = undefined | null | string | number | boolean | string[] | number[] | Record<string, unknown>;
export interface UseFormConfigValidatorFn<T> {
    (value: UseFormValue, data: T): string | null;
}
export declare type UseFormConfig<T> = Record<keyof T, [UseFormValue, UseFormConfigValidatorFn<T>[]] | [UseFormValue]>;
export declare type UseFormErrors<T> = Record<Partial<keyof T>, string>;
export interface UseFormOptions {
    validateOn?: 'change' | 'blur' | 'submit';
}
export interface UseForm<T> {
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
