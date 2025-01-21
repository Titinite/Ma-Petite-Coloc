export class ErrorFormResponse {
    form: string;
    errFields: Object[];
    errMessage: string;
  
    constructor(form: string, errFields: Object[], errMessage: string) {
        this.form = form;
        this.errFields = errFields;
        this.errMessage = errMessage;   
    }
}  