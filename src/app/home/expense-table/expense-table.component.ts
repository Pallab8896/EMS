import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api-service.service';

declare var $: any;

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit {
  addEditForm: FormGroup;
  isNew;
  categoryList;
  allExpenses = [];
  index = 1;
  currentPage = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.initializeAllForms();
    this.getAllCategories();
    this.getAllExpenses();
  }

  initializeAllForms() {
    this.addEditForm = new FormGroup({
      _id: new FormControl(''),
      categoryName: new FormControl('', Validators.required),
      itemName: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      expenseDate: new FormControl('', Validators.required)
    });
  }

  getAllCategories() {
    this.apiService.getAllCategory().subscribe((allCategories: any) => {
      this.categoryList = allCategories;
    });
  }

  getAllExpenses() {
    this.apiService.getAllExpenses().subscribe((allExpenses: any) => {
      this.allExpenses = allExpenses;
    });
  }

  addExpense() {
    this.isNew = true;
    this.addEditForm.reset();
    console.log(this.addEditForm.value);
    $('#expenseModal').modal('show');
  }

  editExpense(expense) {
    this.isNew = false;
    this.addEditForm.reset();
    this.addEditForm.controls._id.setValue(expense._id);
    this.addEditForm.controls.categoryName.setValue(expense.categoryName);
    this.addEditForm.controls.itemName.setValue(expense.itemName);
    this.addEditForm.controls.amount.setValue(expense.amount);
    this.addEditForm.controls.expenseDate.setValue(expense.expenseDate);
    $('#expenseModal').modal('show');
  }

  deleteExpense(expense) {
    const deleteData = {
      _id: expense._id
    };
    this.apiService.deleteExpense(deleteData).subscribe(
      (response: any) => {
        console.log(response);
        this.getAllExpenses();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  undoDeleteExpense(expense) {
    const undoDeleteData = {
      _id: expense._id
    };
    this.apiService.undoDeleteExpense(undoDeleteData).subscribe(
      (response: any) => {
        console.log(response);
        this.getAllExpenses();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  saveExpense() {
    if (this.addEditForm.valid) {
      if (this.isNew) {
        const addData = {
          categoryName: this.addEditForm.value.categoryName,
          itemName: this.addEditForm.value.itemName,
          amount: this.addEditForm.value.amount,
          expenseDate: this.addEditForm.value.expenseDate
        };
        this.apiService.addExpense(addData).subscribe(
          (response: any) => {
            console.log(response);
            this.getAllExpenses();
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        const editData = {
          _id: this.addEditForm.value._id,
          categoryName: this.addEditForm.value.categoryName,
          itemName: this.addEditForm.value.itemName,
          amount: this.addEditForm.value.amount,
          expenseDate: this.addEditForm.value.expenseDate
        };
        this.apiService.updateExpense(editData).subscribe(
          (response: any) => {
            console.log(response);
            this.getAllExpenses();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    }
  }
}
