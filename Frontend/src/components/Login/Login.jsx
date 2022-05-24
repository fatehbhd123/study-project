import { AddBox, ExitToApp } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import logoWhite from '../logo/منهاج المسلم White.png'
import logoGrenn from "../logo/منهاج المسلم Green.png"
import avatar from '../images/avatar.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { login } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [assoc, setAssoc] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const handleSubmitAssoc = async () => {
        try {
            const response = await axios.post('/associationsignin', { username: userName, password: password }
            );
            if (response.data.length === 0) {
                setErrMsg('يوجد خطأ في المعلومات')
            } else {
                dispatch(login(
                    { ...response.data[0] }
                ))
                console.log(response.data);
                localStorage.setItem("association", JSON.stringify(
                    {
                        ...response.data[0]

                    }
                ))
                navigate(`/association`);
            }

        } catch (err) {
            console.log(err.message)
        }
    }
    const handleSubmitUser = async () => {
        try {
            const response = await axios.post('/usersignin', { username: userName, password: password }
            );
            console.log(response.data)
            if (response.data.length === 0) {
                setErrMsg('يوجد خطأ في المعلومات')
            } else {
                dispatch(login({
                    level: response.data[0].level,
                    password: response.data[0].password,
                    username: response.data[0].username,
                    __v: response.data[0].__v,
                    uid: response.data[0]._id

                }))
                localStorage.setItem("user", JSON.stringify(
                    {
                        level: response.data[0].level,
                        password: response.data[0].password,
                        username: response.data[0].username,
                        __v: response.data[0].__v,
                        uid: response.data[0]._id

                    }
                ))
                navigate('/beginner')
            }

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(login(
                JSON.parse(localStorage.getItem('user'))
            ))
            navigate('/beginner')
        } else if (localStorage.getItem('association')) {
            dispatch(login(
                JSON.parse(localStorage.getItem('association'))
            ))
            navigate('/association')
        }
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [userName, password]);
    return (
        <div className='login container'>
            <div className="login_welcome">
                <h4> سجل الدخول في : </h4>
                <img style={{ cursor: "pointer" }} onClick={() => {
                    navigate('/');
                }} src={logoWhite} className="logo_white" alt="منهاج المسلم" />
                <img style={{ cursor: "pointer" }} onClick={() => {
                    navigate('/');
                }} src={logoGrenn} className="logo_green" alt="منهاج المسلم" />
            </div>
            <div className="form">
                <img src={avatar} alt="avatar" className='avatar' />
                <form>
                    <p className={errMsg ? "err active" : "err"} >{errMsg}</p>
                    <div>
                        <label htmlFor="username">إسم المستخدم</label>
                        <input type="text" value={userName} id="username" placeholder='إسم المستخدم' onChange={(e) => {
                            setUserName(e.target.value);
                        }} />
                    </div>
                    <div>
                        <label htmlFor="pass">كلمة السر</label>
                        <input type="text" id='pass' value={password} placeholder='كلمة السر' onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="assoc"
                            checked={assoc}
                            onChange={() => {
                                setAssoc(prevState => !prevState)
                            }}
                            name="isFriendly"
                        />
                        <label htmlFor="assoc">تسجيل الدخول كجمعية</label>
                    </div>

                    <Link to='/beginner' onClick={(e) => {
                        e.preventDefault();
                        if (!password || !userName) {
                            setErrMsg('تأكد من إدخال معلوماتك في جميع الخانات')
                        } else if (assoc) {
                            handleSubmitAssoc();
                        } else {
                            handleSubmitUser();
                        }
                    }}>
                        <div className="submit">
                            <ExitToApp />
                            <p>تسجيل الدخول</p>
                        </div>
                    </Link>

                </form>
                <div className='new_account'>
                    <p>ليس لديك حساب ؟</p>
                    <Link to="/signup">سجل الأن</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
