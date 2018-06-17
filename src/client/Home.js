import React, { Component } from 'react';
import styled from 'styled-components';
import { VIEWS } from './constants';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & > div > div {
    padding: 1em;
  }
`;

const Input = styled.input`
  color: #888;
  text-align: center;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 2em;
  background: transparent;
  border-radius: 0;
  transition: all 0.1s ease-in-out;
  border-bottom: 2px solid #2196f3;
`;

const RadioButtonWrapper = styled.div`
  display: flex;
`;

const RadioButton = styled.input`
  position: absolute;
  left: -9999em;
  top: -9999em;
  &:checked + label {
    background-color: #2196f3;
    box-shadow: none;
    z-index: -999;
  }
`;

const RadioLabel = styled.label`
  padding: 1em 3em;
  cursor: pointer;
  color: #fff;
  background-color: #888;
  & > i {
    font-size: 2em;
  }
  &:first-of-type {
    border-radius: 1em 0 0 1em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);
  }
  &:last-of-type {
    border-radius: 0 1em 1em 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);
  }
`;

const SubmitButton = styled.button`
  border: none;
  background: transparent;
  color: #2196f3;
  cursor: pointer;
  outline: none;
  & > i {
    font-size: 4em;
  }
`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.actions = props.actions;
  }
  state = {
    textFieldError: 'Error text',
    selectFieldError: '',
    formIsInvalid: false,
    role: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    let roomName = e.target.room.value.toLowerCase();
    let role = e.target.role.value;

    if (role && roomName) {
      fetch('/', {
        method: 'POST',
        body: JSON.stringify({ roomName, role }),
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            switch (res.status) {
              case 409:
                alert('This role is already taken in this session.');
                break;
              case 412:
                alert('This session is full. Try a different session name.');
                break;
              default:
                break;
            }
            throw Error(res);
          }
          return res;
        })
        .then(res => {
          this.actions.setRoomName(roomName);
          this.actions.setRole(role);
          if (res.status === 200) {
            this.actions.setAsInitiator(true);
          }
          this.actions.goTo(VIEWS.PLAYER);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (!roomName) {
      alert('Please, type in the session name.');
    } else if (!role) {
      alert(
        'Please, select your role by clicking "Camera" or "Screen" button.'
      );
    }
  };

  validateTextInput = e => {
    var regex = new RegExp('^[a-zA-Z0-9]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    alert('Only alphanumeric characters are allowed in session name.');
    return false;
  };

  render = () => (
    <Form onSubmit={e => this.handleSubmit(e)}>
      <div>
        <div>
          <Input
            type="text"
            placeholder="Create or join a session"
            name="room"
            autoComplete="off"
            onKeyPress={this.validateTextInput}
          />
        </div>
        <div>
          <RadioButtonWrapper>
            <RadioButton type="radio" name="role" value="s" id="camera" />
            <RadioLabel htmlFor="camera">
              <i className="material-icons">videocam</i>
            </RadioLabel>
            <RadioButton type="radio" name="role" value="r" id="screen" />
            <RadioLabel htmlFor="screen">
              <i className="material-icons">video_label</i>
            </RadioLabel>
          </RadioButtonWrapper>
        </div>
      </div>
      <div>
        <SubmitButton type="submit">
          <i className="material-icons">arrow_forward_ios</i>
        </SubmitButton>
      </div>
    </Form>
  );
}
