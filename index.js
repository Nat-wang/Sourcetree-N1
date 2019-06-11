import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component{
  constructor(props){
    super(props);
  this.state={
    items:[],
    text:''
  }
  this.handleAddTodo=this.handleAddTodo.bind(this);
  this.handleChange=this.handleChange.bind(this);
  this.handleDeleteTodo=this.handleDeleteTodo.bind(this);

};
  handleDeleteTodo(e){
    e.preventDefault();
    this.setState(state=>({
      items: state.items.splice()
    }));
  }
  handleAddTodo(e){
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      status: false
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

setStrike(e){
  e.preventDefault();

}

  handleChange(e){
    this.setState({text: e.target.value})
  };
  render(){
    return(
      <div>
      <p>Todo List</p>
      <TodoList items={this.state.items}/>
      <form onSubmit={this.handleAddTodo}>

      <input type="text"
        value={this.state.text}
        onChange={this.handleChange}/>
        <input type="button"
          value="Add Todo"
          onClick={this.handleAddTodo}/>
      </form>

      <button
        onClick={this.handleDeleteTodo}>Delete</button>
      </div>
    )
}
}
class TodoList extends React.Component {

  render() {
    return (

      <div>
        {this.props.items.map(item => (
          <div>
          <input id="checked"onClick={App.setStrike}type="checkbox"/>
          <p id="todo"key={item.id}>{item.text}</p>

          </div>
        ))}
      </div>

    );

  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
