import { Injectable, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(private toastr: ToastrService) { }

    showSuccess(title: string, content: string) {
        this.toastr.success(content, title, {
            positionClass: 'toast-bottom-right',
            progressBar: true,
            timeOut: 3000
        });
    }

    showError(title: string, content: string) {
        this.toastr.error(content, title, {
            positionClass: 'toast-bottom-right',
            progressBar: true,
            timeOut: 4000
        });
    }
}
