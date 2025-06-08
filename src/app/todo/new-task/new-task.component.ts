import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';


  constructor(private todoService: TodoService) { }

updateSharedTask(newTaskTitle: string): void {
    this.todoService.sharedTask = newTaskTitle;
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      alert('Por favor, insira uma tarefa');
      return; 
    }
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle,
      completed: false
    };
    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';
  }
  
  
}
