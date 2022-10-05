import { ForwardedRef } from 'react';
import { UseFormConfig, UseFormErrors, UseFormOptions } from './types';
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
export declare function useForm<T>(config: UseFormConfig<T>, options?: UseFormOptions): UseForm<T>;
