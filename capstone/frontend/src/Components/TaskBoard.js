import React from 'react';
import TaskCard from './TaskCard';

class TaskBoard extends React.Component {

    render() {
        return (
            <div>
                {this.props.tasks.map(task => (
                    <TaskCard key={task.id}
                              task={task}
                              fetchtask={this.props.fetchtask}
                              currentTaskId={this.props.currentTaskId}
                    />
                ))}
            </div>
        );
    }
}

export default TaskBoard;