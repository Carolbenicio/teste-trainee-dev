import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { NgModel } from '@angular/forms';
import { Filter } from 'bad-words';

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

    const filter = new Filter();
     filter.addWords('merda', 'porra', 'caralho', 'puta', 'foda', 'cacete', 'bosta', 'desgraça', 'arrombado', 'corno',
'fdp', 'babaca', 'otário', 'viado', 'cu', 'pau', 'buceta', 'piranha', 'cuzão', 'escroto',
'nojento', 'filho da puta', 'imbecil', 'retardado', 'vagabunda', 'merdinha', 'boiola', 'panaca', 'chupa', 'enfia');
    if (filter.isProfane(this.newTaskTitle)) {
      this.newTaskTitle = filter.clean(this.newTaskTitle);

      alert('Não é permitido cadastrar tarefas com palavras obscenas.');
      return;
    }

    if (!inputTrim) {
      alert('Por favor, insira uma tarefa');
      return;
    }
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
