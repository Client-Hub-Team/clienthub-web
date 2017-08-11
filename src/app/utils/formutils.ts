import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class FormUtil {

    constructor() {}

    isFieldValid(form: FormGroup, field: string, attempt: boolean) {
        return form.get(field).valid && form.get(field).touched && attempt;
    }

    displayFieldCss(form: FormGroup, field: string, attempt: boolean) {
        if (attempt) {
            return {
                'form-valid': this.isFieldValid(form, field, attempt),
                'form-invalid': !this.isFieldValid(form, field, attempt)
            };
        }

        return {}
    }

    validatePassword(c: FormControl) {
        return /\d/.test(c.value) && /[a-z]/.test(c.value) && /[A-Z]/.test(c.value) && /\W/.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }
}
