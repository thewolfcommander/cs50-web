import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CalendarEvent } from 'react-bootstrap-icons';

class TaskCard extends React.Component {
    render() {

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const due_date = new Date(this.props.task.due_date).toLocaleDateString('en-AU', options)
        const num_offers = this.props.task.offers.length;
        const offer_text = num_offers === 1 ? 'offer' : 'offers';
        const status = this.props.task.status;
        let text_color;
        switch(status) {
            case 'Open':
                text_color = 'text-success';
                break;
            case 'Assigned':
                text_color = 'text-primary';
                break;
            case 'Completed':
                text_color = 'text-danger';
                break;
            default:
                text_color = 'text-secondary';
        }

        return (
            <Card>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={8} className="p-0">
                                <Card.Title>{this.props.task.title}</Card.Title>
                            </Col>
                            <Col className="align-text-top text-right p-0">
                                <h3>${this.props.task.budget}</h3>
                            </Col>
                        </Row>
                    </Container>
                    <Card.Subtitle className="text-muted">
                        <CalendarEvent className="mr-2 align-text-bottom"/>
                        {due_date}
                     </Card.Subtitle>
                </Card.Body>
                <Card.Footer>
                        <strong className={`text-uppercase ${text_color}`}>{status}</strong>
                        {num_offers > 0 && status === 'Open' &&
                            <span className="text-muted">{` \u{2022} ${num_offers} ${offer_text}`}</span>
                        }
                </Card.Footer>
            </Card>
        );
    }
}

export default TaskCard;