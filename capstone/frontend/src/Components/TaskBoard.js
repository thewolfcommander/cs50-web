import React from 'react';
import axios from 'axios';
import CardColumns from 'react-bootstrap/CardColumns';
import TaskCard from './TaskCard';
import { API_URL } from '../Util/Constants';

class TaskBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
        this.getTasks = this.getTasks.bind(this);
    }

    getTasks() {
        const url = `${API_URL}/tasks`;
        axios.get(url)
        .then(response => response.data)
        .then(tasks => this.setState({tasks: tasks}))
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        return (
            <CardColumns>
                {this.state.tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </CardColumns>
        );
    }
}

export default TaskBoard;