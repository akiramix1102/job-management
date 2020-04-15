import React, { Component } from 'react';

class TaskItem extends Component {
  onUpdateStatus=()=>{
    //props id ben taskList
    this.props.onUpdateStatus(this.props.id);
  }
  onDelete=()=>{
     this.props.onDelete(this.props.id);
  }
  onEdit=()=>{
    this.props.onEdit(this.props.id);
 }
  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.task}</td>
        <td className="text-center">
          <span className=
          { this.props.status === true ? 'label label-success' 
            : 'label label-danger'} onClick={this.onUpdateStatus}>{this.props.status === true ? 'Kích hoạt' : 'Ẩn'}</span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onEdit}>
            <span className="fa fa-pencil mr-5" />
                        Sửa
                      </button>
                      &nbsp;
                      <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash mr-5" />
                        Xóa
                      </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;