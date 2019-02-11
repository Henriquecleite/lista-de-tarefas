import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { NewTaskComponent } from './new-task/new-task.component';

const appRoutes: Routes = [
  {path: '', component: ListComponent, pathMatch: 'full'},
  {path: 'new', component: NewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

