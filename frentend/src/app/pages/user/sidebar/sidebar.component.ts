import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories=[]
  constructor( private _category: CategoryService , private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe({
      next:(data :any)=>{
      this.categories=data;
    
      },
      error:(error)=>{
       this._snack.open('error  to leadin g data from server','',{
        duration:3000
       });
      }
    })
  }

}
