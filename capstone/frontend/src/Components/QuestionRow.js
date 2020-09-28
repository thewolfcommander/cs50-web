import React from 'react';
import { Link } from 'react-router-dom';
import timeDiff from '../Util/Functions';
import Badge from 'react-bootstrap/Badge';

class QuestionRow extends React.Component {

    render() {

        const question = this.props.question;
        const questionAge = timeDiff(new Date(question.timestamp), new Date());

        return (
            <div>
                <h6 className="text-primary mb-0 mt-3">
                    <Link to={`/profile/${question.commenter.username}`}>
                        {`${question.commenter.first_name} 
                        ${question.commenter.last_name}`}
                        <span className="text-muted">{` @${question.commenter.username}`} </span>
                    </Link>
                    {this.props.posterId===question.commenter.id &&
                    <Badge pill variant="secondary">Poster</Badge>}
                </h6>
                <p className="m-0">{question.content}</p>
                <small className="text-muted m-0">{questionAge} ago</small>
            </div>
        );
    }
}

export default QuestionRow;