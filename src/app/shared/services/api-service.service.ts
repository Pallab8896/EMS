import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConstant } from '../constants/app-constant.constants';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  addCategory(data) {
    return this.http.post(AppConstant.baseUrl + '/addCategory', data);
  }

  getAllCategory() {
    const key = 'allCategories';
    return this.http.get(AppConstant.baseUrl + '/getAllCategory').pipe(
      map(val => {
        return val[key];
      })
    );
  }

  deleteCategory(data) {
    return this.http.post(AppConstant.baseUrl + '/deleteCategory', data);
  }

  addExpense(data) {
    return this.http.post(AppConstant.baseUrl + '/addExpense', data);
  }

  updateExpense(data) {
    return this.http.post(AppConstant.baseUrl + '/updateExpense', data);
  }

  deleteExpense(data) {
    return this.http.post(AppConstant.baseUrl + '/deleteExpense', data);
  }

  undoDeleteExpense(data) {
    return this.http.post(AppConstant.baseUrl + '/undoDeleteExpense', data);
  }

  getAllExpenses() {
    const key = 'allExpenses';
    return this.http.get(AppConstant.baseUrl + '/getAllExpenses').pipe(
      map(val => {
        return val[key];
      })
    );
  }

  addTotalBudget(data) {
    return this.http.post(AppConstant.baseUrl + '/addTotalBudget', data);
  }

  updateTotalBudget(data) {
    return this.http.post(AppConstant.baseUrl + '/updateTotalBudget', data);
  }

  getTotalBudget() {
    const key = 'totalBudget';
    return this.http.get(AppConstant.baseUrl + '/getTotalBudget').pipe(
      map(val => {
        return val[key];
      })
    );
  }
}
