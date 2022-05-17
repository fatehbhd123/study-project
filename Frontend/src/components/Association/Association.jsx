import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/userSlice';

function Association() {
    let dispatch = useDispatch()
    let navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem('user')) {
            navigate('/beginner')
        }
    }, []);

    return (
        <div>
            WIIIII ASSOCIATION
            <button onClick={() => {
                localStorage.removeItem('association');
                dispatch(logout())
                navigate('/')
            }}>logout</button>
        </div>
    )
}

export default Association
