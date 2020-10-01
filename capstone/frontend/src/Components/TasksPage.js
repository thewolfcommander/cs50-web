import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import TaskBoard from './TaskBoard';
import QuestionsBoard from './QuestionsBoard';
import OffersBoard from './OffersBoard';
import TaskDetails from './TaskDetails';
import NavMenu from './NavMenu';
import './css/TasksPage.css';
import { API_URL } from '../Util/Constants';


class TasksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: null,
            tasks: [],
            questions: [],
            offers: [],
            question: '',
            message: '',
            price: '',
            offerFormVisible: false,
            config: {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('token')}`
                }
            }
        }
        this.getQuestions = this.getQuestions.bind(this);
        this.getOffers = this.getOffers.bind(this);
        this.fetchTask = this.fetchTask.bind(this);
        this.getMostRecentTask = this.getMostRecentTask.bind(this);
        this.postQuestion = this.postQuestion.bind(this);
        this.postOffer = this.postOffer.bind(this);
        this.getAllTasks = this.getAllTasks.bind(this);
    }

    getQuestions(taskID) {
        const url = `${API_URL}/tasks/${taskID}/questions`;
        axios.get(url, this.state.config)
        .then(response => response.data)
        .then(questions => this.setState({questions: questions}))
    }

    getOffers(taskID) {
        const url = `${API_URL}/tasks/${taskID}/offers`;
        axios.get(url, this.state.config)
        .then(response => response.data)
        .then(offers => this.setState({offers: offers}))
    }

    fetchTask(task) {
        this.setState({task: task, offerFormVisible: false});
        this.getQuestions(task.id);
        this.getOffers(task.id);
    }

    getMostRecentTask() {
        const url = `${API_URL}/tasks/top`;
        axios.get(url, this.state.config)
        .then(response => response.data)
        .then(task => this.fetchTask(task))
    }

    getAllTasks() {
        const url = `${API_URL}/tasks`;
        axios.get(url, this.state.config)
        .then(response => response.data)
        .then(tasks => this.setState({tasks: tasks}));
    }

    componentDidMount() {
        this.getMostRecentTask();
        this.getAllTasks();
    }

    // Post the question by submitting form
    postQuestion(event) {
        event.preventDefault();

        const url = `${API_URL}/questions/`;
        axios.post(url, {
            taskId: this.state.task.id,
            commenter: 's_naomi',
            content: this.state.question
        }, this.state.config)
        .then(response => console.log(response))
        .then(() => this.getQuestions(this.state.task.id));

        this.setState({question: ''});
    }

    // Post the offer by submitting form
    postOffer(event) {
        event.preventDefault();

        const url = `${API_URL}/offers/`;
        axios.post(url, {
            taskId: this.state.task.id,
            price: this.state.price,
            tasker: 's_naomi',
            message: this.state.message
        }, this.state.config)
        .then(response => console.log(response))
        .then(() => this.getOffers(this.state.task.id))
        // Calling this to update offer number on card - must be more efficient way to do this?
        .then(() => this.getAllTasks());

        this.setState({message: '', price: '', offerFormVisible: false});
    }

    render() {

        const task = this.state.task;
        const questions = this.state.questions;
        const offers = this.state.offers; 

        return (
            <div>
                <NavMenu />
                <div className="m-3 tasksPage">
                    <h3>Open Tasks</h3>
                    <Container fluid>
                        <Row>
                            <Col sm={4} id="tasksCol" className="pl-0">
                                <TaskBoard tasks={this.state.tasks} fetchtask={this.fetchTask} currentTaskId={task ? task.id : null}/>
                            </Col>

                            <Col sm={8} id="detailsCol">
                                {this.state.task &&
                                    <div>
                                        <h4>{task.title}</h4>
                                        <TaskDetails task={task}/>
                                        {!this.state.offerFormVisible &&
                                            <Button 
                                                variant="success"
                                                size="lg"
                                                className="mt-2 w-100"
                                                onClick={() => this.setState({offerFormVisible: !this.state.offerFormVisible})}
                                            >
                                                Make an Offer
                                            </Button>
                                        }

                                        {this.state.offerFormVisible &&
                                            <Form className="mt-3" onSubmit={this.postOffer}>
                                                <Form.Group controlId="offerFormMessage">
                                                    <Form.Control as="textarea"
                                                                required
                                                                rows="3"
                                                                value={this.state.message}
                                                                placeholder="Message"
                                                                onChange={e => this.setState({message: e.target.value})}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control id="offerFormPrice"
                                                                    required
                                                                    type="number"
                                                                    min={0}
                                                                    value={this.state.price}
                                                                    placeholder="Offer Price"
                                                                    onChange={e => this.setState({price: e.target.value})}>
                                                        </Form.Control>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Button variant="primary" 
                                                        type="submit"
                                                        size="sm" 
                                                        disabled={this.state.message==='' || 
                                                                this.state.price==='' || 
                                                                this.state.price < 0}
                                                >
                                                        Submit Offer
                                                </Button>
                                                <Button variant="secondary" 
                                                        size="sm" 
                                                        className="ml-2"
                                                        onClick={() => this.setState({offerFormVisible: false, message: '', price: ''})}
                                                >
                                                        Cancel
                                                </Button>
                                            </Form>
                                        }

                                        <hr />
                                        <h4>{`Offers (${offers.length})`}</h4>
                                        <OffersBoard offers={offers} />

                                        <hr />
                                        <h4>{`Questions (${questions.length})`}</h4>
                                        <Form onSubmit={this.postQuestion}>
                                            <Form.Group className="mb-1" controlId="questionsForm">
                                                <Form.Control as="textarea"
                                                            rows="3"
                                                            value={this.state.question}
                                                            placeholder={`Ask ${task.poster.first_name} a question`}
                                                            maxLength={1500}
                                                            onChange={e => this.setState({question: e.target.value})}
                                                />
                                            </Form.Group>
                                            <Button variant="primary" 
                                                    type="submit" 
                                                    size="sm" 
                                                    disabled={this.state.question===''}
                                            >
                                                Send
                                            </Button>
                                        </Form>

                                        <QuestionsBoard questions={questions}
                                                        posterId={task.poster.id}
                                        />

                                    </div>
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default TasksPage;