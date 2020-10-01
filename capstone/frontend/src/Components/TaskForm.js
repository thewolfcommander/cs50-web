import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DatePicker, { registerLocale } from 'react-datepicker';
import enAU from 'date-fns/locale/en-AU';
import { API_URL } from '../Util/Constants';
import NavMenu from './NavMenu';
import 'react-datepicker/dist/react-datepicker.css';
import './css/TaskForm.css';


class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: 'Other',
            budget: '',
            dueDate: null,
            poster: 's_naomi',
            validated: false,
            datePickerClassName: 'not-validated',
            validForm: false
        }
        this.validateForm = this.validateForm.bind(this);
        this.postTask = this.postTask.bind(this);
    }

    // Validate all form inputs
    validateForm() {
        if (this.state.title !== '' &&
            this.state.description !== '' &&
            this.state.budget >= 0 &&
            this.state.dueDate !== null) {
                return true;
        }
        return false;
    }

    // Set class of DatePicker for custom CSS
    validateDatePicker() {
        if (this.state.dueDate === null) {
            this.setState({datePickerClassName: 'non-valid'});
        } else {
            this.setState({datePickerClassName: 'valid'});
        }
    }

    // Post the task by submitting form
    postTask(event) {
        event.preventDefault();
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }

        if (this.validateForm()) {
            // Submmit form if all inputs are valid
            const url = `${API_URL}/tasks/`;
            axios.post(url, this.state, config)
            .then(response => {
                console.log(response);
                this.setState({validForm: true});
            });

        } else {
            // Otherwise, show validation hints
            this.setState({validated: true});
            this.validateDatePicker();
        }
    }

    render() {

        const categories = [
            'Business & Admin',
            'Computers & IT',
            'Delivery',
            'Events & Photography',
            'Furniture Assembly',
            'Home & Gardening',
            'Marketing & Design',
            'Tutoring & Training',
            'Other'
        ];

        registerLocale('enAU', enAU);

        return (
            <div>
                <NavMenu />
                <Form className="m-3" onSubmit={this.postTask} noValidate validated={this.state.validated}>
                    <h3>Post a New Task</h3>
                    <Form.Group controlId="taskFormTitle">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control type="text"
                                    required
                                    minLength={10}
                                    maxLength={50}
                                    value={this.state.title}
                                    autoFocus
                                    autoComplete="off"
                                    onChange={e => this.setState({title: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter at least 10 characters and a maximum of 50
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="taskFormDescription">
                        <Form.Label>Task Details</Form.Label>
                        <Form.Control as="textarea"
                                    required
                                    minLength={25}
                                    rows="4"
                                    value={this.state.description}
                                    onChange={e => this.setState({description: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter at least 25 characters
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="taskFormCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select"
                                    value={this.state.category}
                                    onChange={e => this.setState({category: e.target.value})}>
                            {categories.map(category => <option key={category}>{category}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Budget</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control id="taskFormBudget"
                                        required
                                        type="number"
                                        min={0}
                                        value={this.state.budget}
                                        onChange={e => this.setState({budget: e.target.value})}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please provide a positive number for budget
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <div>
                            <DatePicker id="postFormDatePicker"
                                        className={this.state.validated ? this.state.datePickerClassName : 'not-validated'}
                                        locale="enAU"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Click to select date"
                                        autoComplete="off"
                                        minDate={new Date()}
                                        selected={this.state.dueDate}
                                        onChange={date => {
                                            this.setState({dueDate: date}, () => this.validateDatePicker());
                                        }}
                            />
                        </div>
                        <p className={`postFormDatePickerMsg ${this.state.validated && this.state.datePickerClassName==='non-valid' ? "d-block": "d-none"}`}>
                            Please provide a due date
                        </p>
                    </Form.Group>
                    <Button variant="primary" type="submit">Post Task</Button>
                    {this.state.validForm && <Redirect to="/tasks" />}
                </Form>
            </div>
        );
    }
}

export default TaskForm;