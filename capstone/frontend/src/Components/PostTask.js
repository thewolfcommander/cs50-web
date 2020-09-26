import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker, { registerLocale } from 'react-datepicker';
import enAU from 'date-fns/locale/en-AU';
import 'react-datepicker/dist/react-datepicker.css';
import './css/PostTask.css';


class PostTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null
        }
        // this.getTasks = this.getTasks.bind(this);
    }

    render() {

        const categories = [
            'Other',
            'Business & Admin',
            'Computers & IT',
            'Delivery',
            'Events & Photography',
            'Furniture Assembly',
            'Home & Gardening',
            'Marketing & Design',
            'Tutoring & Training'
        ];

        registerLocale('enAU', enAU);

        return (
            <Form className="m-3">
                <h3>Post a New Task</h3>
                <Form.Group controlId="taskFormTitle">
                    <Form.Label>What do you need done?</Form.Label>
                    <Form.Control type="text" />
                    <Form.Text className="text-muted">
                        This will be the title of your task, e.g. Help move my sofa
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="taskFormDescription">
                    <Form.Label>What are the details?</Form.Label>
                    <Form.Control as="textarea" rows="4"/>
                    <Form.Text className="text-muted">
                        Be as specific as you can about what needs doing
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="taskFormCategory">
                    <Form.Label>What is the category of task?</Form.Label>
                    <Form.Control as="select">
                        {categories.map(category => <option key={category}>{category}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>What is your budget?</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control id="taskFormBudget" type="number"></Form.Control>
                    </InputGroup>
                    <Form.Text className="text-muted">
                        Enter the price you're comfortable to pay. Taskers will use this as a guide for how much to offer.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>When do you need it done?</Form.Label>
                    <div>
                        <DatePicker className="postFormDatePicker"
                                    locale="enAU"
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Click to select date"
                                    minDate={new Date()}
                                    selected={this.state.startDate}
                                    onChange={date => this.setState({startDate: date})}
                        />
                    </div>
                </Form.Group>


            </Form>
        );
    }
}

export default PostTask;