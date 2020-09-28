import React from 'react';

class Profile extends React.Component {

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     task: null
    //     // }
    //     // this.getQuestions = this.getQuestions.bind(this);
    // }

    // getProfile(userId) {
    //     const url = `${API_URL}/tasks/${taskID}/questions`;
    //     axios.get(url)
    //     .then(response => response.data)
    //     .then(questions => this.setState({questions: questions}))
    // }

    render() {

        return (
            <div>
                Profile
                <h1>{this.props.match.params.username}</h1>
            </div>
        );
    }
}

export default Profile;
