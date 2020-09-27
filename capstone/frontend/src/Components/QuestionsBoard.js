import React from 'react';
import QuestionRow from './QuestionRow';

class QuestionsBoard extends React.Component {

    render() {
        return (
            <div>
                {this.props.questions.map(question => (
                    <QuestionRow key={question.id} question={question} posterId={this.props.posterId}/>
                ))}
            </div>
        );
    }
}

export default QuestionsBoard;