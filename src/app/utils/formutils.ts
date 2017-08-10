import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class FormUtil {

    constructor() {}

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'form-valid': this.isFieldValid(form, field),
            'form-invalid': this.isFieldValid(form, field)
        };
    }

    validatePassword(c: FormControl) {
        return /\d/.test(c.value) && /[a-z]/.test(c.value) && /[A-Z]/.test(c.value) && /\W/.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }
}
