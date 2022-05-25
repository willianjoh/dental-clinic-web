import { formatDate } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";

export class CommonUtils {

  static validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  static formataCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  static formatDate(date: string){
    if(date){
      return date ? formatDate(date, 'dd/MM/yyyy', 'pt' ) : ''
    } else {
      return ''
    }
  }
}
