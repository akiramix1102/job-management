import React, { Component } from 'react';
import TaskItem from './TaskItem';


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1 // -1 : all , 0:false , 1:true

    }
  }
  onFilter = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    )
    this.setState({
      [name]: value
    })
    
  }
  render() {
    var stateTask = this.props.stateTask; // khai báo stateTask =  <TaskList stateTask={stateTask}/> truyền xang
    var { filterName, filterStatus } = this.state;
    var elmTask = stateTask.map((task, index) => {
      return <TaskItem
        key={task.id}
        id={task.id}
        index={index}
        task={task.name}
        status={task.status}
        onUpdateStatus={this.props.onUpdateStatus} // props onUpdate ben App.js
        onDelete={this.props.onDelete}
        onEdit={this.props.onEdit}
      />
    })
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input type="text"
                className="form-control"
                name='filterName'
                value={filterName}
                onChange={this.onFilter}
              />
            </td>
            <td>
              <select className="form-control"
                name='filterStatus'
                value={filterStatus}
                onChange={this.onFilter}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td />
          </tr>
          {elmTask}
        </tbody>
      </table>
    );
  }
}

export default TaskList;