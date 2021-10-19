
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from './../redux/actions'
import { Button, Form, Container } from 'react-bootstrap'
import UserModal from './UserModal'
import UserCard from './UserCard'



export default function UsersList() {
    const all_users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [searchUsers, setSearchUsers] = useState([]);
    const getUsersList = async () => {
        await fetch("https://randomuser.me/api/?results=10")
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(actions.setUsers(result.results));
                }, (error) => {
                    console.log("Error to fatch users from link\n" + error);
                })

    }
    useEffect(() => {

    }, [searchUsers]);

    useEffect(() => {
        getUsersList()
    }, []);

    const searchUser = (e) => {
        var arr = all_users.map((userDetails, index) => {
            if (userDetails.name.first?.includes(e.target.value) ||
                userDetails.name.last?.includes(e.target.value) ||
                userDetails.email?.includes(e.target.value) ||
                userDetails.location?.street?.name.includes(e.target.value) ||
                userDetails.location?.city.includes(e.target.value) ||
                userDetails.location?.country.includes(e.target.value)
            ) {
                 
                return <UserCard index={index} key={index} />
            }
        }
        )

        setSearchUsers(arr)
    }


    return (
        <div>
            <Container >
                <UserModal />
                <Form>
                    <Form.Group className="mb-3" >

                        <Form.Control onChange={e => searchUser(e)} type="text" placeholder="Search User..." />
                    </Form.Group>

                </Form>
                {searchUsers?.map((user, index) => {
                    if (user !== undefined)
                        return (
                            <UserCard index={index} key={index} />
                        );

                })}
                <hr></hr>
                {searchUsers.length === 0 ?
                    all_users.map((user, index) => {
                        if (user !== undefined)
                            return (
                                <UserCard index={index} key={index} />
                            );

                    })

                    :
                    ''}
            </Container>


        </div >
    );
}
