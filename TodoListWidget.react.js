/**
 * TodoListWidget
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/
"use strict";
import * as React from "react";
import TodoList from "../models/TodoList.js";
import Todo from "../models/Todo.js";
import TodoWidget from "./TodoWidget.react.js";


export type TodoListWidgetProps = {
  todoList: TodoList,
};

export default class TodoListWidget extends React.Component<TodoListWidgetProps, void> {
  static defaultProps: void;

  constructor(props: TodoListWidgetProps) {
    super(props);
    this.state={
      value:""
    }
    autobind(this, "_handleAddTodo");
    autobind(this, "handleDeleteTodo");
    autobind(this, "handleTyping");
  }

  componentDidMount() {
    this.props.todoList.load()
      .then(() => this.forceUpdate());
  }

  render(): React.Node {
    return (
      <React.Fragment>
        <ol>
          {this.props.todoList.list.map((todo, i) =>
            <li key={i}>
              <TodoWidget todo={todo}/>
            </li>
          )}
        </ol>
        <input
          className="mybtn"
          type="button"
          value="Add Todo"
          onClick={this._handleAddTodo} />
        <form onSubmit={this.handleDeleteTodo}>

        <input
          type="submit"
          value="Delete Last Item"
          />
        </form>
      </React.Fragment>
    );
  }
  handleTyping(e){
    this.setState({value: e.target.value})
  }
  handleDeleteTodo(e){
    e.preventDefault();
      var timeout;
      var feedback = document.getElementById("feedback");
      feedback.innerHTML = "<p><em>Deletion Pending...</em></p>";
      clearTimeout(timeout)
      timeout = setTimeout(function(){
        feedback.innerHTML = ""
        }, 1000)
    if(this.props.todoList.getLength()==0){
        var timeout;
        var feedback = document.getElementById("feedback");
        feedback.innerHTML = "<p><em>Cannot delete from empty list</em></p>";
        clearTimeout(timeout)
        timeout = setTimeout(function(){
          feedback.innerHTML = ""
          }, 500)
    }
    var at = Number(this.state.value);
    console.log(at);
    this.props.todoList.removeTodo(at);
    this.setState({value:""})
    this.forceUpdate();
  }
  _handleAddTodo() {
    const todo = new Todo();
    todo.title = "New TODO";
    this.props.todoList.addTodo(todo);
    todo.save();
    this.forceUpdate();
  }
}
