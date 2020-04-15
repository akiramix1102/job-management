import React, { Component } from "react";
import "./App.css";
import TaskForm from "./Component/TaskForm";
import Control from "./Component/Control";
import TaskList from "./Component/TaskList";

var randomstring = require("randomstring"); // module randomString

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //[id,name,status]
      taskEditting: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword:'',
      sortBy:'name',
      sortValue:1
    };
  }
  //use lifeCycle componentDidMount(dc goi khi f5 lai trang)
  componentDidMount() {
    if (localStorage && localStorage.getItem("key")) {
      var tasks = JSON.parse(localStorage.getItem("key"));
      this.setState({
        tasks: tasks,
        isDisplayForm: false,
      });
    }
  }
  //function set data demo
  onGenerateData = () => {
    var tasks = [
      {
        id: randomstring.generate(),
        name: "Lập trình PHP",
        status: true,
      },
      {
        id: randomstring.generate(),
        name: "Lập trình JAVASCRIPT",
        status: true,
      },
      {
        id: randomstring.generate(),
        name: "Lập trình C++",
        status: false,
      },
    ];
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("key", JSON.stringify(tasks));
  };
  //Show form
  onShowForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditting: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditting: null,
      });
    }
  };
  //close form
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };
  // function get data from taskForm
  onSubmit = (data) => {
    var { tasks } = this.state; //khai bao variable tasks = this.state.tasks
    if (data.id === "") {
      data.id = randomstring.generate();
      tasks.push(data);
    } else {
      var index = tasks.findIndex((task) => task.id === data.id); //tim vi tri index cua elm trong tasks
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditting: null,
    });
    localStorage.setItem("key", JSON.stringify(tasks));
    this.onCloseForm();
  };
  //update status when click
  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var newTask = tasks.map((task) => {
      // tim id trung trong tasks
      if (task.id === id) {
        task.status = !task.status;
      }
      return task;
    });
    this.setState({
      tasks: newTask,
    });
    localStorage.setItem("key", JSON.stringify(tasks));
  };
  //delete elm
  onDelete = (id) => {
    var { tasks } = this.state;
    var newTask = tasks.filter((task) => {
      return task.id !== id;
    });
    this.setState({
      tasks: newTask,
    });
    localStorage.setItem("key", JSON.stringify(newTask));
  };
  //find index elm
  // findIndex=(id)=>{

  // }
  // edit item
  onEdit = (id) => {
    var { tasks } = this.state;
    var index = tasks.findIndex((task) => task.id === id);
    var taskEditting = tasks[index];
    this.setState({
      taskEditting: taskEditting,
    });
    this.setState({
      isDisplayForm: true,
    });
  };
  //Filter data
  onFilter = (filterName, filterStatus) => {
    filterStatus *= 1; //convert string to number
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };
  //Search
  onSearch=(keyword)=>{
    this.setState({
      keyword:keyword
    })
  }

  //Sort
  onSort=(sortBy,sortValue)=>{
    this.setState({
      sortBy:sortBy,
      sortValue:sortValue
    })
  }
  render() {
    var stateTask = this.state.tasks; // like var {stateTask}=this.state;
    var { filter,keyword,sortBy,sortValue } = this.state;
    if (filter) {
      if (filter.name) {
        stateTask = stateTask.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      stateTask = stateTask.filter((task) => {
        if (filter.status === -1) {
          return task;
        }
        return task.status === (filter.status === 1 ? true : false);
      });
    }
    if(keyword){
      stateTask = stateTask.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    if(sortBy==='name')
    {
      stateTask.sort((a,b)=>{
        if(a.name>b.name){
          return sortValue; //1
        }
        else if(a.name<b.name){
          return -sortValue; //-1
        }
        else{
          return 0;
        }
      })
    }
    else
    {
      stateTask.sort((a,b)=>{
        if(a.status>b.status){
          return -sortValue; //1
        }
        else if(a.status<b.status){
          return sortValue; //-1
        }
        else{
          return 0;
        }
      })
    }
    var stateDisplay = this.state.isDisplayForm;
    var elmDislayForm = stateDisplay ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={this.state.taskEditting}
      /> // khai bao props onSubmit de lay du lieu tu taskForm
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={stateDisplay ? "col-md-4" : "col-md-12"}>
            {elmDislayForm}
          </div>
          <div className={stateDisplay ? "col-md-8" : "col-md-12"}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onShowForm}
            >
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-danger mr-10"
              onClick={this.onGenerateData}
            >
              <span className="fa fa-plus mr-5" />
              Generate Data
            </button>
            <Control 
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
              />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  stateTask={stateTask}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
