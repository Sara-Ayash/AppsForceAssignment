
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import actions from './../redux/actions' 
import { Row, Col, Button } from 'react-bootstrap' 
import UserModal from './UserModal'


export default function UserCard(props) {

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const deleteUser = () => {
        dispatch(actions.deleteUser(props.index));

    }


    const style = {
        row: {  margin: '10px', padding: '10px', background: 'rgb(234 232 211)' },
        image: { border: '2px solid black' ,borderRadius: '50%', width: '80%' },
        imageCol: {   textAlign: 'center',   marginRight: '30px'  }


    }

    return (

        <Row style={style.row} >
            <Col xl={2} md={2} sm={6} style={style.imageCol} >
                <img style={style.image} src={users[props.index].picture?.medium} alt="" />
            </Col >
            <Col style={{ }}>
                <h5>{users[props.index].name?.title}{' '}{users[props.index].name?.first}{' '}{users[props.index].name?.last}</h5>
                <h5>{users[props.index].email}</h5>
                <h5>{users[props.index].location?.street?.number}{' '}{users[props.index].location?.street?.name}{', '}{users[props.index].location?.city}{', '}{users[props.index].location?.country}</h5>
                <h5>{users[props.index].id?.name}{' '}{users[props.index].id?.value}</h5>
                <Button style={{marginRight:'15px'}}
                    variant="danger"
                    onClick={e => deleteUser()}>
                    Delete User
                </Button> 

                <UserModal index={props.index} />
            </Col>

        </Row>
    );


}
