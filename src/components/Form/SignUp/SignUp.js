import React from "react";
import "./SignUp.css";
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from "../../UI/Spinner";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                elementConfig: {
                    placeholder: 'kitmanwork@gmail.com'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                errorMessage: {
                    email: "Not valid Email",
                    required: 'Email is required',
                },
                valid: false,
                value: 'kitmanwork@gmail.com',
                cssClass: '',
            },
            password: {
                elementConfig: {
                    placeholder: 'kitmanwork@gmail.com'
                },
                validation: {
                    required: true,
                },
                errorMessage: {
                    required: 'Password is required',
                },
                valid: false,
                value: 'kitmanwork@gmail.com',
                cssClass: '',
            },
            firstName: {
                value: 'coconut'
            },
            comments: {
                value: 'sdf'
            },
            value: {
                value: 'grapefruit'
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    handleChange = (e) => {
        const updatedFormElement = {
            ...this.state[e.target.name]
        };

        let isValid = this.checkValidity(e.target.value, updatedFormElement.validation);
        if (!isValid) {
            updatedFormElement.cssClass = 'color--red';
        } else {
            updatedFormElement.cssClass = '';
        }
        updatedFormElement.value = e.target.value;
        this.setState({[e.target.name]: updatedFormElement});
    };

    submitForm = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert('Your favorite flavor is: ' + this.state.value);
    // };
    getErrorMessage = (message) => {
        switch (message) {
            case 'EMAIL_EXISTS':
                return "Email exists";
            default:
                return message;
        }
    };

    render() {
        let errorMessage = '';
        if (this.props.error) {
            let message = JSON.parse(this.props.error.request.response);
            errorMessage = <p className="color--red error-message">{this.getErrorMessage(message.error.message)}</p>;
        }

        let form = (
            <form className="signup__form" onSubmit={this.submitForm}>
                <label>
                    Name:
                </label>
                <input type="text" name='firstName' className={this.state.firstName.cssClass} value={this.state.firstName.value} onChange={this.handleChange}/>
                <label>
                    Email:
                </label>
                <input type="text" name='email' className={this.state.email.cssClass} value={this.state.email.value} onChange={this.handleChange}/>
                <label>
                    Password:
                </label>
                <input type="password" name='password' className={this.state.password.cssClass} value={this.state.password.value} onChange={this.handleChange}/>
                <label>
                    Pick your favorite flavor:
                </label>

                <select name='value' value={this.state.value.value} onChange={this.handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
                <label>
                    Essay:
                </label>`
                <textarea name='comments' value={this.state.comments.value} onChange={this.handleChange}/>
                {errorMessage}
                <input type="submit" value="Submit"/>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }


        return form;
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password, true))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
