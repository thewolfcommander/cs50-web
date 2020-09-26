import React from 'react';
import TaskBoard from './TaskBoard'

class BrowseTasks extends React.Component {

    render() {
        return (
            <div>
                Browse Tasks
                <TaskBoard />
            </div>
        );
    }
}

export default BrowseTasks;