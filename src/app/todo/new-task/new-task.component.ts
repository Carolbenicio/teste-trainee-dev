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
    if (inputTrim.includes('|')) {
      const part = inputTrim.split('|');

      part.forEach((item) => {
        const TrimInput = item.trim();
        if (TrimInput) {
          const newTodo: Todo = {
           id: this.todoService.getNextId(),
            title: TrimInput,
            completed: false,
        };
      this.todoService.addTodo(newTodo);
    }
  });
  this.newTaskTitle = '';
} else { 
    alert('Insira uma tarefa válida!');
    return;
  }
}
}
