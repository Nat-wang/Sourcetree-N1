/**
 * TodoAPI
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/

import Todo from "./models/Todo.js";

/**** Set the userID constant to your email address ****/
const userID = "changeme@test.com";

const baseUrl = "https://machinify.blogaholics.ca:8443";

export default class TodoAPI {
  static doGet(url: string): Promise<any> {
    return fetch(url, {headers: {"X-TodoUser": userID}}).then((response) => {
      return response.json();
    });
  }

  static doPost(url: string, data: any): Promise<any> {
    return fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=utf-8", "X-TodoUser": userID},
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    }).then(function(){
      var timeout;
      var feedback = document.getElementById("feedback");
      feedback.innerHTML = "<p><em>Request Pending...</em></p>";
      clearTimeout(timeout)
      timeout = setTimeout(function(){
        feedback.innerHTML = ""
        }, 1000)
      })

  }

  static doDelete(url: string): Promise<any> {
    return fetch(url, {
      method: "DELETE",
      headers: {"X-TodoUser": userID},
    }).then(function(){
      var timeout;
      var feedback = document.getElementById("feedback");
      feedback.innerHTML = "<p><em>Request Pending...</em></p>";
      clearTimeout(timeout)
      timeout = setTimeout(function(){
        feedback.innerHTML = ""
        }, 500)
      }).then((response) => {
      return response.json();
    });
  }

  static getList(): Promise<Array<Todo>> {
    return TodoAPI.doGet(`${baseUrl}/todos`);
  }



  static updateTodo(todo: Todo): Promise<Todo> {
    const id = todo.id;
    if (id == null) return Promise.reject(new Error("Todo has no id")).then(function(){
      console.log("Error: No Id")
      });
    return TodoAPI.doPost(`${baseUrl}/todos/${id}`, todo.toJSON());
  }

  static createTodo(todo: Todo): Promise<Todo> {
    return TodoAPI.doPost(`${baseUrl}/todos/new`, todo.toJSON());
  }

  static deleteTodo(todo: Todo): Promise<Todo> {
    const id = todo.id;
    if (id == null) return Promise.reject(new Error("Todo has no id")).then(function(){
      console.log("Error: No Id")
      });
    return TodoAPI.doDelete(`${baseUrl}/todos/${id}`);
  }
}
