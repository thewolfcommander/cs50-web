import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskBoard from './TaskBoard';
import './css/TasksPage.css';


class TasksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: null
        }
        this.fetchTask = this.fetchTask.bind(this);
    }

    fetchTask(task) {
        this.setState({task: task})
    }

    render() {

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
                                    <h4>{this.state.task.title}</h4>
                                    <p>{this.state.task.description}</p>
                                    <p>{this.state.task.category}</p>
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