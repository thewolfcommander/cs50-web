import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import timeDiff from '../Util/Functions';
import './css/TasksPage.css';
import { PersonCircle, CalendarCheck, ChatLeftText, Diagram3, Wallet} from 'react-bootstrap-icons';


class TaskDetails extends React.Component {

    render() {

        const task = this.props.task;
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        const taskAge = timeDiff(new Date(task.timestamp), new Date());
        const iconClass = "p-0 pt-2 align-self-top";
        const iconSize = 25;

        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col className={iconClass} md="auto">
                            <PersonCircle size={iconSize} />
                        </Col>
                        <Col>
                            <small>POSTED BY</small>
                            <Link to={`/profile/${task.poster.username}`}>
                                <h6 className="text-primary m-0">
                                    {`${task.poster.first_name} ${task.poster.last_name} `}
                                    <span className="text-muted">{`@${task.poster.username}`}</span>
                                </h6>
                            </Link>
                            <p className="text-muted">{taskAge} ago</p>
                        </Col>
                    </Row>
                </Container>

                <Container fluid>
                    <Row>
                        <Col className={iconClass} md="auto">
                            <CalendarCheck size={iconSize} />
                        </Col>
                        <Col>
                            <small>DUE DATE</small>
                            <p>{new Date(task.due_date).toLocaleDateString('en-AU', options)}</p>
                        </Col>
                    </Row>
                </Container>

                <Container fluid>
                    <Row>
                        <Col className={iconClass} md="auto">
                            <Diagram3 size={iconSize} />
                        </Col>
                        <Col>
                            <small>CATEGORY</small>
                            <p>{task.category}</p>
                        </Col>
                    </Row>
                </Container>

                <Container fluid>
                    <Row>
                        <Col className={iconClass} md="auto">
                            <ChatLeftText size={iconSize} />
                        </Col>
                        <Col>
                            <small>DETAILS</small>
                            <p>{task.description}</p>
                        </Col>
                    </Row>
                </Container>

                <Container fluid>
                    <Row>
                        <Col className={iconClass} md="auto">
                            <Wallet size={iconSize} />
                        </Col>
                        <Col>
                            <small>BUDGET</small>
                            <h3>${task.budget}</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TaskDetails;