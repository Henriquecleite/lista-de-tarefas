import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppService } from '../app.service';
import { Task } from '../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  loading: boolean = false;
  submitTry: boolean = false;

  constructor(private appService: AppService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let taskDescription = '';
    let taskDate = '';

    this.newTaskForm = new FormGroup({
      'description': new FormControl(taskDescription, Validators.required),
      'date': new FormControl(taskDate, Validators.required)
    })
  }

  onSubmit() {
    this.submitTry = true;

    if (this.newTaskForm.valid) {
      this.loading = true;
      const value = this.newTaskForm.value;
      const newTask = new Task(Math.random(), value.description, value.date, 'aberto');
      this.appService.addTask(newTask);

      this.appService.storeTasks()
        .subscribe(
          () => {
            this.loading = false;
            this.router.navigate(['/']);
        });
    }
  }
}
