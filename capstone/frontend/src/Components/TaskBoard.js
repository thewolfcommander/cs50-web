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
        let tasks = [];
        const url = `${API_URL}/tasks`;
        axios.get(url)
        .then(response => {
            response.data.forEach(task => tasks.push(
                <TaskCard key={task.id}
                          task={task}
                />
        ))})
        .then(() => this.setState({tasks: tasks}))
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        return (
            <CardColumns>
                {this.state.tasks}
            </CardColumns>
        );
    }
}

export default TaskBoard;