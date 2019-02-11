import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(private appService: AppService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let taskDescription = '';
    let taskDate = '';

    this.newTaskForm = new FormGroup({
      'description': new FormControl(taskDescription),
      'date': new FormControl(taskDate)
    })
  }

  onSubmit() {
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
