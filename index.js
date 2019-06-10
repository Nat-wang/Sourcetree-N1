import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Test extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({value: e.target.value});
  }
  handleSubmit(e){
    //Send to server
    //___.emit("command", e.target.value)
    console.log("Sent code to server");
    e.preventDefault();
  }

  render(){
      return(
        <section>
          <form id="main"onSubmit={this.handleSubmit}>
          <label id="box_label">
          Type your code here:
          <br/>
              <textarea id="box"className="main_box"rows="10" cols="60"value={this.state.value} onChange={this.handleChange}>
              </textarea>
              <input id="box_btn"className="main_button"type="submit" value="Run Code"/>
          </label>
          </form>
        </section>
      );
  }
};
ReactDOM.render(
  <Test/>,
  document.getElementById("root")
);
