import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { WorkerService } from '../services/worker.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-worker-add-edit',
  templateUrl: './worker-add-edit.component.html',
  styleUrl: './worker-add-edit.component.scss',
})
export class WorkerAddEditComponent implements OnInit {
  workForm: FormGroup;
  myimage!: Observable<any>;
  target:any='';
  

  constructor(
    private _fb: FormBuilder,
    private _workService: WorkerService,
    private _dialogRef: MatDialogRef<WorkerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.workForm = this._fb.group({
      Image: [null],
      Project: '',
      Description: '',
      Technologies: '',
      Link: '',
    });
  }

  ngOnInit(): void {
    this.workForm.patchValue(this.data);
  }

  onChange($event: Event) {
    const fileInput = $event.target as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the 'Image' field in the form with the base64-encoded image string
        this.workForm.patchValue({ Image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
 
  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      this._workService.individual1(filereader.result).subscribe((res:any)=>{
         alert("Refresh to find the changes");
      })
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  } 

  onFormSubmit() {
    if (this.workForm.valid) {
      if (this.data) {
        this._workService
          .updateWorker(this.data.id, this.workForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error;
            },
          });
      } else {
        this._workService.addWorker(this.workForm.value).subscribe({
          next: (val: any) => {
            alert('Saved!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error;
          },
        });
      }
    }
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValue = this.workForm.value;
  
    // Append other form fields
    formData.append('Project', formValue.Project);
    formData.append('Description', formValue.Description);
    formData.append('Technologies', formValue.Technologies);
    formData.append('Link', formValue.Link);
  
    // Append the file
    formData.append('Image', formValue.Image);
  
    return formData;
  }
}
