
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // No value provided
    }

    const isValid = /^0\d{9}$/.test(value);
    
    return isValid ? null : { phoneNumberInvalid: true };
  };
}