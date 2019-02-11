import { Component, OnInit, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '../app.service';
import { Task } from '../app.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  fetchSubscription: Subscription;
  changesSubscription: Subscription;
  tasks: Task[];

  statusFilter: string = 'aberto'; 
  descriptionSort: string = 'down';
  dateSort: string = 'down';

  constructor(private appService: AppService) {}

  ngOnInit() {
    if (!this.appService.tasksFetched) {
      this.fetchSubscription = this.appService.fetchTasks()
        .subscribe(
          (tasks: Task[]) => {
            this.appService.setTasks(tasks);
            this.tasks = this.appService.getTasks();
          }
        );
    } else {
      this.tasks = this.appService.getTasks();
    }

    this.changesSubscription = this.appService.tasksChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      );
  }

  onChangeStatus(id: number) {
    this.appService.changeStatus(id);
    this.appService.storeTasks()
      .subscribe();
  }

  onChangeStatusFilter() {
    this.statusFilter = this.statusFilter === 'aberto' ? 'concluído' : 'aberto';
  }

  onDeleteTask(id: number) {
    this.appService.deleteTask(id);
    this.appService.storeTasks()
      .subscribe();
  }

  onDescriptionSort() {
    if (this.descriptionSort === 'up') {
      this.tasks.sort( (a, b) => (
        +(a.description < b.description) || +(a.description === b.description) - 1
      ));
      this.descriptionSort = 'down';
    } else if (this.descriptionSort === 'down') {
      this.tasks.sort( (a, b) => (
        +(a.description > b.description) || +(a.description === b.description) - 1
      ));
      this.descriptionSort = 'up';
    }
  }

  onDateSort() {
    if (this.dateSort === 'up') {
      this.tasks.sort( (a, b) => (
        +(a.date < b.date) || +(a.date === b.date) - 1
      ));
      this.dateSort = 'down';
    } else if (this.dateSort === 'down') {
      this.tasks.sort( (a, b) => (
        +(a.date > b.date) || +(a.date === b.date) - 1
      ));
      this.dateSort = 'up';
    }
  }

}