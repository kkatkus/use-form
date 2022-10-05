import { UseFormConfig, UseFormErrors, UseFormValue } from './types';
export declare function extractData<T>(config: UseFormConfig<T>): T;
export declare function getFormInputs(form: HTMLFormElement | null): HTMLInputElement[];
export declare function getInputElements(form: HTMLFormElement | null, prop: string): HTMLInputElement[] | null;
export declare function updateValuesForFormInputs(form: HTMLFormElement | null, data: Record<string, UseFormValue>): Record<string, HTMLInputElement[]>;
export declare function validateFn<T>(config: UseFormConfig<T>, data: T): {
    valid: boolean;
    errors: UseFormErrors<T>;
};
