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
import "./todoList.css";


export type TodoListWidgetProps = {
  todoList: TodoList,
};

export default class TodoListWidget extends React.Component<TodoListWidgetProps, void> {
  static defaultProps: void;

  constructor(props: TodoListWidgetProps) {
    super(props);
    this.state={
      value:"",
      }
    autobind(this, "_handleAddTodo");
    autobind(this, "handleDeleteTodo");
    autobind(this, "handleTyping");
    autobind(this, "handleClear");
    autobind(this, "handleDelete");
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
            <li id={i}className="list"key={i}>
              <TodoWidget todo={todo}/>
              <input
                className="checkBtn"
                type="button"
                value="&times;"
                onClick={this.handleDelete.bind(this, i+1)}/>
            </li>
          )}
        </ol>
        <div className="buttons"align="center">
        <input
          className="btn"
          type="button"
          value="Add Todo"
          onClick={this._handleAddTodo} />


        <input
          className="btn"
          type="button"
          value="Clear All"
          onClick={this.handleClear}/>
        </div>
      </React.Fragment>
    );
  }

  handleDelete(at){
    var timeout;
    var feedback = document.getElementById("feedback");
    feedback.innerHTML="<p><em>Deleting Todo...</em><p>";
    clearTimeout(timeout)
    timeout = setTimeout(function(){
      feedback.innerHTML="";
      }, 1000)
    document.getElementById(at-1).style.display="none"
    this.props.todoList.removeTodo(at);
    this.forceUpdate();


  }
  handleTyping(e){
    this.setState({value: e.target.value})
  }
  handleDeleteTodo(e){
    e.preventDefault();

    if(this.props.todoList.getLength()==0){
        var timeout;
        var feedback = document.getElementById("feedback");
        feedback.innerHTML = "<p><em>Cannot delete from empty list</em></p>";
        clearTimeout(timeout)
        timeout = setTimeout(function(){
          feedback.innerHTML = ""
          }, 3000)
    }
    if(this.props.todoList.getLength() < at){
        var timeout;
        var feedback = document.getElementById("feedback");
        feedback.innerHTML = "<p><em>Cannot delete not existing todo</em></p>";
        clearTimeout(timeout)
        timeout = setTimeout(function(){
          feedback.innerHTML = ""
          }, 3000)
    }
    if(this.state.value==''){
      var timeout;
      var feedback = document.getElementById("feedback");
      feedback.innerHTML = "<p><em>Please type an existing Todo number</em></p>";
      clearTimeout(timeout)
      timeout = setTimeout(function(){
        feedback.innerHTML = ""
        }, 3000)
    }
    //attempts to take value inputted and delete todo at position
else{
    var at = this.state.value;
    console.log(at);

    //Did not work: only deleted last item
    this.props.todoList.removeTodo(at);
    //resets input text to initial condition
    this.setState({value:""})
    this.forceUpdate();
    //document.location.reload(true);




  }
  }
  _handleAddTodo() {
    const todo = new Todo();
    todo.title = "New TODO";
    this.props.todoList.addTodo(todo);
    todo.save();
    this.forceUpdate();
  }
  handleClear(e){
    e.preventDefault();
    var len = this.props.todoList.getLength();
    for(var i = 1; i <= len; i++){
    this.props.todoList.removeAll(1)
    this.forceUpdate();
  }

  //document.location.reload(true);
}
}
