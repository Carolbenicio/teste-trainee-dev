import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(this.todo.id);
        Swal.fire('Excluído!', 'Sua tarefa foi excluída.', 'success');
      }
    });
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
      Swal.fire('Atenção', 'Por favor, insira uma tarefa antes de editar', 'warning');
      return;
    }
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente editar esta tarefa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, editar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todo.title = todoToEdit;
        this.todoService.editTodo(this.todo.id, this.todo);
        Swal.fire('Editado!', 'Sua tarefa foi editada.', 'success');
      }
    });
  }
  onEditRequested(): void {
    this.todoService.editingTodoId = this.todo.id;
  }
}
