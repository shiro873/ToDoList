import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { toDate } from '@angular/common/src/i18n/format_date';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  todoItems: Todo[] = [{id:1, name:'1st task',
  notes: 'test note',
  due: new Date(), 
  done: false}];


  constructor() { }

  getTodoFromList(): Todo[]{
    return this.todoItems;
  }

  addTodo(todo: Todo){
    this.todoItems.push(todo);
  }

  updateTodo(todo: Todo){
    const index = this.todoItems.map(x => x.id).indexOf(todo.id);
    this.todoItems[index] = todo;
  }

  deleteTodo(todo: Todo){
    this.todoItems.splice(this.todoItems.indexOf(todo), 1);
  }
}
