import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();
  @Output() editRequested: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  deleteTodo(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoService.deleteTodo(this.todo.id);
    }
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }
  updateTodo(): void {
    this.todoService.updateTodo(this.todo);
}
  editTodo(): void {
   const todoToEdit = this.todoService.sharedTask;
   if (!todoToEdit || !todoToEdit.trim()) {
      alert('Por favor, insira uma tarefa antes de editar');

      return;
    }
    this.todo.title = todoToEdit;
    this.todoService.editTodo(this.todo.id, this.todo);
   }
   onEditRequested(): void {
    this.todoService.editingTodoId = this.todo.id;
  }
}
