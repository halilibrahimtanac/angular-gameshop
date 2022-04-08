import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private http: HttpClient) { }
  categories: Category[] = []
  ngOnInit(): void {
    this.http.get<Category[]>("http://localhost:3000/category").subscribe(data=>(
      this.categories = data
    ))
  }

}
