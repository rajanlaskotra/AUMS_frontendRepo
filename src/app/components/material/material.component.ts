import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Material } from 'src/app/models/Material';
import { MaterialService } from 'src/app/services/materialService/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  displayedColumns: string[] = ['materialID', 'courseID', 'fileName', 'file', 'status', 'last_modified', 'delete'];
  MaterialList: any;
  dataSource: MatTableDataSource<Material>;
  form = new FormControl();

  courseID;
  flag = false;
  formData: FormData = new FormData();
  fileUrl;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private materialService: MaterialService, private router: Router, private sanitizer: DomSanitizer, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('userId')){
      this.router.navigate([`\login`]);
    }
    this.materialService.getMaterialActive().subscribe((response) => {
      console.log(response);
      this.MaterialList = response;
      this.dataSource = new MatTableDataSource(this.MaterialList);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  deleteMaterial(materialId) {
    console.log(materialId);
    if(confirm('Are You Sure to delete this Course Material?')){
      this.materialService.deleteMaterial(materialId);
      alert('Course Material Deleted Successfully');
      /*this.snackBar.open("File Deleted. ", " Success!", {
        duration: 2000,
      });*/
      this.ngOnInit();
    }
  }

  version() {
    this.materialService.getAllMaterial().subscribe((response) => {
      console.log(response);
      this.MaterialList = response;
      this.dataSource = new MatTableDataSource(this.MaterialList);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });

  }

  base64ToArrayBuffer(base64) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  downloadFile(file, ftype){
    console.log(typeof file);
    let byteArray = this.base64ToArrayBuffer(file);
    const blob = new Blob([byteArray], { type: ftype });
    //const url = window.URL.createObjectURL(blob);
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl
    (window.URL.createObjectURL(blob));
    //window.open(url);
  }

  add() {
    this.flag = true;
  }

  uploadFiles( file ) {
    for ( let i = 0; i < file.length; i++ ) {
      this.formData.append( "file", file[i], file[i]['name'] );
  }
  }

  RequestUpload() {
    console.log(this.courseID);
    this.formData.append('courseId', this.courseID);
    console.log(this.formData);
    this.materialService.addMaterial(this.formData);
    this.snackBar.open("File Uploaded. ", " Success!", {
      duration: 2000,
    });
  }
}
