import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MaterialComponent } from './material.component';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialService } from 'src/app/services/materialService/material.service';
import { of } from 'rxjs';

const mid = 1;

class MockMaterialService {
  getMaterialActive(){
    return of([
      {
        "materialID" : 1,
        "courseID" : 5,
        "fileName": "Angular.txt",
        "active_flag": 'Y'
      }
    ]);
  }

  getAllMaterial(){
    return of([
      {
        "materialID" : 1,
        "courseID" : 5,
        "fileName": "Angular.txt",
        "active_flag": 'Y'
      },
      {
        "materialID" : 6,
        "courseID" : 2,
        "fileName": "Spring.txt",
        "active_flag": 'N'
      }
    ]);
  }

  addMaterial(material){

  }

  deleteMaterial(mid){

  }

}

describe('MaterialComponent', () => {
  let component: MaterialComponent;
  let fixture: ComponentFixture<MaterialComponent>;
  let service: MaterialService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSnackBarModule,
      ],
      providers : [
        {
          provide: MaterialService,
          useClass: MockMaterialService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MaterialService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all versions', () => {

    spyOn(service, 'getAllMaterial').and.callThrough();
    component.version();
    fixture.detectChanges();
    expect(service.getAllMaterial).toHaveBeenCalled();
    expect(component.MaterialList.length).toBe(2);
  });

  it('should add a material', () => {
    component.courseID = 1;
    const blob = new Blob([]);
    component.uploadFiles(blob);

    spyOn(service, 'addMaterial');
    component.RequestUpload();
    fixture.detectChanges();
    expect(service.addMaterial).toHaveBeenCalledWith(component.formData);
    expect(component.formData.get('courseId')).toBe('1');
  });

  it('should delete a material', () => {
    spyOn(service, 'deleteMaterial');
    component.deleteMaterial(mid);
    expect(service.deleteMaterial).toHaveBeenCalledWith(mid);
    expect(component.MaterialList.length).toBe(1);
  });

  it('should download material', () => {
    component.downloadFile('file', 'txt');
    component.add();
    expect(component.flag).toBeTrue();
  });

});
