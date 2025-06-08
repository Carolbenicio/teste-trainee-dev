import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  tarefas: any;
  adicionarNaLista(tarefa: Todo) {
    this.tarefas.push(tarefa)
  }
  showCompletedTasks: boolean = true;
Limpar: any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  async clearAll() {
    if (this.todos.length > 0) {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Tem certeza que quer apagar tudo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, limpar tudo!',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        this.todoService.clearAll();
        this.loadTodos();
      }
    }
  }

  async clearCompletedTasks() {
    if (this.todos.some(todo => todo.completed)) {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Tem certeza que deseja limpar as tarefas concluídas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, limpar!',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        this.todoService.clearCompletedTasks();
        this.loadTodos();
      }
    }
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }

  get labelClearAll(){
    return 'Clear All'
  }

  sortTasks(){
  this.todos.sort((a, b) => a.title.localeCompare(b.title));
  this.loadTodos();
  }
  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Lista de Tarefas', 10, 10);
    this.todos.forEach((todo, index) => {
      doc.text(`${index + 1}. ${todo.title}`, 10, 20 + (index * 10));
    });
    doc.save('tarefas.pdf');
  }
}
