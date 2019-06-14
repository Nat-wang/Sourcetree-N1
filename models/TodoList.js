/**
 * TodoList
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/

 import Todo from "./Todo.js";
 import TodoAPI from "../TodoAPI.js";

 export default class TodoList {
  _list: Array<Todo>;

  constructor() {
    this._list = [];
  }

  get list(): Array<Todo> {
    return this._list;
  }
  getLength(): number{
    return this._list.length;
  }


  load(): Promise<any> {
    return TodoAPI.getList()

      .then((list) => {
        this._list = list.map((data) => Todo.fromJSON(data));
      });
  }

  // Add a Todo to the end of the list
  addTodo(todo: Todo) {
    this._list.push(todo);
  }

  // Remove the Todo at the specified position
  removeTodo(at: number){
    if(at <= this._list.length){
    //var todo = this._list.splice(at-1,1);
    var removed = this._list[at-1];
    removed.delete();
    //todo[0].delete();
  }
  else{
    feedback.innerHTML="<p>Cannot delete unexisting Todo</p>"
  }
  }
 
 removeAll(at: number){
   if(at <= this._list.length){
   var todo = this._list.splice(at-1,1);
   //var removed = this._list[at-1];
   //removed.delete();
   todo[0].delete();
 }
 else{
   feedback.innerHTML="<p>Cannot delete unexisting Todo</p>"
 }
 }
}
