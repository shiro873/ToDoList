import { Component, Input } from '@angular/core';
import { AppService } from './app.service';
import { Todo } from './todo';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


export enum SaveMode {
  None,
  New,
  Edit
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoSignalR';
  todos: Todo[];
  newTodo: Todo;
  @Input() formGroup: FormGroup;
  saveMode: SaveMode = SaveMode.None;
  headerText: string;

  //show hide options
  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor(private _appService: AppService, private _formBuilder: FormBuilder){
    this.formGroup = _formBuilder.group({
      /*'id': '',
      'name': '',
      'due': '',
      'done': '',
      'notes': ''*/
      id: new FormControl(),
      name: new FormControl(),
      notes: new FormControl(),
      due: new FormControl(),
      done: new FormControl(),
    });
  }

  ngOnInit(){
    this.getTodos();
  }

  getTodos(){
    this.todos = this._appService.getTodoFromList();
  }

  onSubmit(value: any){
    this.newTodo.name = value.name;
    this.newTodo.due = value.due;
    this.newTodo.notes = value.notes;
    this.newTodo.done = value.done;
    this.newTodo.id = value.id;
    this.saveTodo(this.newTodo);
  }

  saveTodo(todo: Todo){
    if(todo.id){
      this._appService.updateTodo(todo);
    } else{
      todo.done = false;
      this._appService.addTodo(todo);
    }
    this.saveMode = SaveMode.None;
    this.toggle();
  }

  removeTodo(todo: Todo){
    this._appService.deleteTodo(todo);
  }

  cancelEditTodo(){
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  showEditForm(todo: Todo){
    if(!todo){
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = "Edit To Do";
    const editedTodo = Object.assign({}, todo, {due: this.applyLocale(todo.due)});
    this.formGroup.setValue(editedTodo);
    this.toggle();
  }

  showNewForm(){
    return this.saveMode !== SaveMode.None;
  }
  
  applyLocale(due){
    return new DatePipe(navigator.language).transform(due, 'yyyy-MM-dd hh:mm:ss');
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  {
      this.buttonName = "Hide";
    }
      
    else
      this.buttonName = "Show";
  }
}
