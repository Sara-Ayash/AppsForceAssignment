import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import actions from './../redux/actions'
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';


export default (function UserModal(props) {

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [user, setUser] = useState(users[props.index]);
    const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setValidated(false);
        setShow(false);
    }
    const handleShow = () => {
        setValidated(false);
        setShow(true);
    }



    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (checkMail(user.email) === false || form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            if ((props.index >= 0)) {
                dispatch(actions.updateUser([props.index, user]))
            }
            else {
                dispatch(actions.addUser(user))
            }
            handleClose();
        }
        setValidated(true);




    };
    const checkMail = (email) => {

        for (let i = 0; i < users.length; i++) {
            if (users[i]?.email === email && i !== props.index) {
                alert("This email is being used by another user!\nChange email address!");
                return false;
            }

        }
        return true;
    }


    useEffect(() => {
        if ((props.index >= 0)) {
            setUser(users[props.index]);
        }
        else {
            setUser({
                "name": {
                    "title": " ",
                    "first": " ",
                    "last": " "
                },
                "location": {
                    "street": {
                        "number": '',
                        "name": " "
                    },
                    "city": " ",
                    "country": " "
                },
                "email": " ",
                "picture": {
                    "medium": " "
                },
                "id": {
                    "name": "CPR",
                    "value": "190881-5283"
                },
            })
        }

    }, []);
    const style = {
        addUserBtn: { margin: '20px', padding: '10px', width: '100px' },



    }
    return (
        <>
            {(props.index >= 0) ?
                <Button variant="success" color="primary" onClick={handleShow}> Edit details</Button>
                :
                <Button style={style.addUserBtn} variant="warning" color="primary" onClick={handleShow}> Add User </Button>

            }
            <Modal

                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"

            >
                <Modal.Header closeButton>
                    {(props.index >= 0) ?
                        <Modal.Title>Edit details:</Modal.Title> :
                        <Modal.Title>Fill details:</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group as={Row} className="pt-3">
                            <Form.Label column >Title:</Form.Label>
                            <Col sm="9"  >
                                <Form.Control
                                    required
                                    minLength="1"
                                    onChange={e => setUser({ ...user, name: { ...user.name, title: e.target.value } })}
                                    defaultValue={users[props.index]?.name?.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Title cannot be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-3">
                            <Form.Label column >First name:</Form.Label>
                            <Col sm="9">
                                <Form.Control

                                    required
                                    minLength="3"
                                    onChange={e => setUser({ ...user, name: { ...user.name, first: e.target.value } })}
                                    defaultValue={users[props.index]?.name?.first}
                                />
                                <Form.Control.Feedback type="invalid">
                                    First name must be more than 3 characters.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-3">
                            <Form.Label column  >Last name:</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    minLength="3"
                                    onChange={e => setUser({ ...user, name: { ...user.name, last: e.target.value } })}
                                    defaultValue={users[props.index]?.name?.last}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Last name must be more than 3 characters.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>



                        <Form.Group as={Row} className="pt-3">
                            <Form.Label column>Email</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="email"
                                    defaultValue={users[props.index]?.email}
                                    onChange={e => setUser({ ...user, email: e.target.value })}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="pt-3">

                            <Form.Label column >Street Name:</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    required
                                    onChange={e => setUser({ ...user, location: { ...user.location, street: { ...user.location.street, name: e.target.value } } })}
                                    defaultValue={users[props.index]?.location?.street.name}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Street Name cannot be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="pt-3">

                            <Form.Label column  >Street Number:</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    required
                                    onChange={e => setUser({ ...user, location: { ...user.location, street: { ...user.location.street, number: e.target.value } } })}
                                    defaultValue={users[props.index]?.location?.street.number}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Street Number cannot be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="pt-3">

                            <Form.Label column  >City:</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    required
                                    onChange={e => setUser({ ...user, location: { ...user.location, city: e.target.value } })}
                                    defaultValue={users[props.index]?.location?.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    City cannot be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="pt-3">

                            <Form.Label column  >Country:</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    required
                                    onChange={e => setUser({ ...user, location: { ...user.location, country: e.target.value } })}
                                    defaultValue={users[props.index]?.location?.country}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Country cannot be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {!(props.index >= 0) ?
                            <Form.Group as={Row} className="pt-3">
                                <Form.Label column  >Add link to picture:</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        required
                                        onChange={e => setUser({ ...user, picture: { ...user.picture, medium: e.target.value } })}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please insert link to your picture.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group> : ''}

                        < Button className=" mt-5" variant="secondary" onClick={handleClose}>Cancel</Button> {' '}
                        <Button className=" mt-5 " variant="primary" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>



    );
}
);