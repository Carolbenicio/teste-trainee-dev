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
    const inputTrim = this.newTaskTitle.trim();

    if (!inputTrim) {
      alert('Por favor, insira uma tarefa');
      return;
    }

    // Se houver '|', adiciona múltiplas tarefas
    if (inputTrim.includes('|')) {
      const parts = inputTrim.split('|');
      parts.forEach((item) => {
        const trimmedItem = item.trim();
        if (trimmedItem) {
          const newTodo: Todo = {
            id: this.todoService.getTodoNewId(),
            title: trimmedItem,
            completed: false,
          };
          this.todoService.addTodo(newTodo);
          this.updateSharedTask(trimmedItem);
        }
      });
    } else {
      // Adiciona uma única tarefa
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: inputTrim,
        completed: false,
      };
      this.todoService.addTodo(newTodo);
      this.updateSharedTask(inputTrim);
    }

    this.newTaskTitle = '';
  }
}
