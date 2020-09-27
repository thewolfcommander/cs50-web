import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskBoard from './TaskBoard';
import QuestionsBoard from './QuestionsBoard';
import './css/TasksPage.css';
import { API_URL } from '../Util/Constants';


class TasksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: null,
            questions: [],
            offers: []
        }
        this.getQuestions = this.getQuestions.bind(this);
        this.fetchTask = this.fetchTask.bind(this);
        this.getMostRecentTask = this.getMostRecentTask.bind(this);
    }

    getQuestions(taskID) {
        const url = `${API_URL}/tasks/${taskID}/questions`;
        axios.get(url)
        .then(response => response.data)
        .then(questions => this.setState({questions: questions}))
    }

    fetchTask(task) {
        this.setState({task: task});
        this.getQuestions(task.id);
    }

    getMostRecentTask() {
        const url = `${API_URL}/tasks/top`;
        axios.get(url)
        .then(response => response.data)
        .then(task => this.fetchTask(task))
    }

    componentDidMount() {
        this.getMostRecentTask();
    }

    render() {

        let task = this.state.task;
        let questions = this.state.questions;
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        console.log(this.state.questions)

        return (
            <div className="m-3 tasksPage">
                <h3>Open Tasks</h3>
                <Container fluid>
                    <Row>
                        <Col sm={4} id="tasksCol" className="pl-0">
                            <TaskBoard fetchtask={this.fetchTask} />
                        </Col>

                        <Col sm={8} id="detailsCol">
                            {this.state.task &&
                                <div>
                                    <h4>{task.title}</h4>
                                    <p>{`${task.poster.first_name} ${task.poster.last_name}`}</p>
                                    <p>{`@${task.poster.username}`}</p>
                                    <p>{new Date(task.due_date).toLocaleDateString('en-AU', options)}</p>
                                    <p>{new Date(task.timestamp).toLocaleDateString('en-AU', options)}</p>

                                    <p>${task.budget}</p>
                                    <p>{task.description}</p>
                                    <p>{task.category}</p>

                                    <hr />
                                    <h4>{`Questions (${questions.length})`}</h4>
                                    <QuestionsBoard questions={questions} posterId={task.poster.id}/>

                                    <hr />
                                    <h4>Offers</h4>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TasksPage;