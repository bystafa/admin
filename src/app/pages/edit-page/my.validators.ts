import { FormControl } from "@angular/forms";

export class MyValidators {
    static correctName(control: FormControl): {[key: string]: boolean} {
        if (!(/^[а-яё]+$/i.test(control.value)) && !(/^[a-zA-Z]*$/.test(control.value))) {
            return {
                incorrectName: true
            }
        }
        return null
    }

    static correctPhone(control: FormControl): {[key: string]: boolean} {
        if (!(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(control.value)) && (control.value).length > 0)
        {
            return {
                incorrectPhone: true
            }
        }
        return null
    }

    static correctDate(control: FormControl): {[key: string]: boolean} {
        const currentDate = new Date(control.value)
        const now = new Date()
        let age = now.getFullYear() - currentDate.getFullYear();
        if (now.setFullYear(1972) < currentDate.setFullYear(1972)) age = age - 1
        if (age < 18)
        {
            return {
                incorrectDate: true
            }
        }
        return null
    }
}