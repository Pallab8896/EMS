import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api-service.service';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  totalBugetForm: FormGroup;
  categoryForm: FormGroup;
  allCategories;
  categoryToBeDeleted;
  budgetSaveButtonText = 'Add';
  addTotalBudgetAction = true;
  message;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.initializeAllForms();
    this.getTotalBudget();
    this.getAllCategories();
  }

  initializeAllForms() {
    this.totalBugetForm = new FormGroup({
      _id: new FormControl(''),
      totalBudget: new FormControl('', Validators.required)
    });
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', Validators.required)
    });
  }

  getTotalBudget() {
    this.apiService.getTotalBudget().subscribe(
      (totalBudget: any) => {
        if (totalBudget) {
          this.totalBugetForm.controls._id.setValue(totalBudget._id);
          this.totalBugetForm.controls.totalBudget.setValue(
            totalBudget.totalBudget
          );
          this.budgetSaveButtonText = 'Update';
          this.addTotalBudgetAction = false;
        } else {
          this.budgetSaveButtonText = 'Add';
          this.addTotalBudgetAction = true;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  addTotalbudget() {
    if (this.totalBugetForm.valid) {
      this.apiService.addTotalBudget(this.totalBugetForm.value).subscribe(
        (addResponse: any) => {
          this.message = addResponse.message;
          this.showToast();
          this.getTotalBudget();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  updateTotalBudget() {
    if (this.totalBugetForm.valid) {
      this.apiService.updateTotalBudget(this.totalBugetForm.value).subscribe(
        (updateResponse: any) => {
          this.message = updateResponse.message;
          this.showToast();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  getAllCategories() {
    this.apiService.getAllCategory().subscribe((allCategories: any) => {
      this.allCategories = allCategories;
    });
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.apiService.addCategory(this.categoryForm.value).subscribe(
        (addResponse: any) => {
          this.message = addResponse.message;
          this.showToast();
          this.categoryForm.reset();
          this.getAllCategories();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  openDeleteModal(category) {
    this.categoryToBeDeleted = category;
    $('#deleteModal').modal('show');
  }

  deleteCategory() {
    if (this.categoryToBeDeleted) {
      const data = {
        _id: this.categoryToBeDeleted._id
      };
      this.apiService.deleteCategory(data).subscribe(
        (deleteResponse: any) => {
          this.message = deleteResponse.message;
          this.showToast();
          this.getAllCategories();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  showToast() {
    $('#toast').toast('show');
  }
}
