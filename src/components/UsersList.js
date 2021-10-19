
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from './../redux/actions'
import ReactJson from 'react-json-view'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import styles from "./../assets/style";
import UserModal from './UserModal'
import UserCard from './UserCard'



export default function UsersList() {

    const all_users = useSelector(state => state.users);
    console.log(all_users)
    const dispatch = useDispatch();

    const getUsersList = async () => {
        await fetch("https://randomuser.me/api/?results=10")
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(actions.setUsers(result.results));

                    alert("get users list")

                }, (error) => {
                    alert("fail")
                })

    }

    useEffect(() => {
        getUsersList()

    }, []);


    const style = {
        container: {
            // 'border': '1px solid black',
            // 'background': '#d0bdbd',

        },
        image: {
            width: '20px'
        }


    }

    return (
        <div>
            {/* <ReactJson src={all_users} /> */}
           
            <Container style={style.container}> 
            <UserModal    />
                {all_users.map((user, index) => {
                    if (user !== undefined)
                        return (
                            <UserCard index={index} key={index} />
                        );

                })}
            </Container>


        </div >
    );
}
