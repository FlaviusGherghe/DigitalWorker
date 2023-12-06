import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkerAddEditComponent } from './worker-add-edit/worker-add-edit.component';
import { WorkerService } from './services/worker.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'digital-worker';
  

  displayedColumns: string[] = [
    'id',
    'Image',
    'Project',
    'Description',
    'Technologies',
    'Link',
    'Actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _workService: WorkerService
  ) {}

  ngOnInit(): void {
    this.getWorkerList();
  }

  openAddEditWorkerForm() {
    const DialogRef = this._dialog.open(WorkerAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getWorkerList();
        }
      },
    });
  }

  getWorkerList() {
    this._workService.getWorkerList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteWorker(id: number) {
    this._workService.deleteWorker(id).subscribe({
      next: (res) => {
        alert('Project deleted!');
        this.getWorkerList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const DialogRef = this._dialog.open(WorkerAddEditComponent, {
      data,
    });

    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getWorkerList();
        }
      },
    });
  }
}
