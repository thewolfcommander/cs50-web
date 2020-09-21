import React from 'react';
import Card from 'react-bootstrap/Card';

class TaskCard extends React.Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Subtitle>{this.props.category}</Card.Subtitle>
                    <Card.Text>{this.props.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default TaskCard;