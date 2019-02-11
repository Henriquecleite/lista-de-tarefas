import { Task } from './app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppService {
  private tasks: Task[];
  tasksChanged = new EventEmitter<Task[]>();
  tasksFetched = false;

  constructor(private httpClient: HttpClient) {}
 
  getTasks() {
    return [...this.tasks];
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks ? [...tasks] : [];
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  fetchTasks() {
    this.tasksFetched = true;
    return this.httpClient.get('https://to-do-list-9f9b8.firebaseio.com/data.json');
  }

  storeTasks() {
    return this.httpClient.put('https://to-do-list-9f9b8.firebaseio.com/data.json', this.tasks);
  }

  changeStatus(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks[index].status = this.tasks[index].status === 'aberto' ? 'concluído' : 'aberto';
  }
  
  deleteTask(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(index, 1);
    this.tasksChanged.emit(this.tasks);
    this.storeTasks();
  }
}