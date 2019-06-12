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
    autobind(this, "_handleAddTodo");
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
          type="button"
          value="Add Todo"
          onClick={this._handleAddTodo} />
      </React.Fragment>
    );
  }

  _handleAddTodo() {
    const todo = new Todo();
    todo.title = "New TODO";
    this.props.todoList.addTodo(todo);
    todo.save();
    this.forceUpdate();
  }
}