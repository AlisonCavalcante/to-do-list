import { ITask } from './../../model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  todoForm!: FormGroup;
  tarefas: ITask[] = [];
  tarefasProgress: ITask[] = [];
  tarefasDone: ITask[] = [];
  editIndex!: number;
  isEditTarefa: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      item: ['', Validators.required]
    })
  }

  addTarefa(){
    this.tarefas.push({
      descricao: this.todoForm.value.item,
      done: false,
    })
    this.resetForm();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deletarTarefa(index: number){
    this.tarefas.splice(index, 1);
  }

  deletarProgressTarefa(index: number){
    this.tarefasProgress.splice(index,1);
  }

  moveEditarTarefa(tarefa: ITask,index: number){
    this.todoForm.setValue({
      item: tarefa.descricao
    })
    this.editIndex = index;
    this.isEditTarefa = true;
  }

  editTarefa(){
    this.tarefas[this.editIndex].descricao = this.todoForm.value.item;
    this.tarefas[this.editIndex].done = false;
    this.resetForm();
    this.isEditTarefa = false;
  }

  resetForm(){
    this.todoForm.reset();
  }
}
