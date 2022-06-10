import React, { useEffect, useState } from 'react'
import logoWhite from '../logo/منهاج المسلم White.png'
import logoGrenn from "../logo/منهاج المسلم Green.png"
import { Link, useNavigate } from 'react-router-dom'
import { AddBox } from '@mui/icons-material'
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'
import avatar from '../images/avatar.svg'
import axios from 'axios'
function Signup() {
    let dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const handlSubmit = async () => {
        try {
            const response = await axios.post('/adduser', { username: userName, password: password });
            console.log(response.data)
            if (response.data.username) {
                dispatch(login({ ...response.data }))
                localStorage.setItem('user', JSON.stringify({ ...response.data }))
                navigate('/beginner')
            } else {
                setErrMsg(response.data)
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
    let navigate = useNavigate();
    return (
        <div className='container signup'>
            <div className="signup_welcome">
                <h4> انشئ حساب في: </h4>
                <img style={{ cursor: "pointer" }} onClick={() => {
                    navigate('/');
                }} src={logoWhite} className="logo_white_up" alt="منهاج المسلم" />
                <img style={{ cursor: "pointer" }} onClick={() => {
                    navigate('/');
                }} src={logoGrenn} className="logo_green_up" alt="منهاج المسلم" />
            </div>
            <div className="signup_form">
                <img src={avatar} alt="avatar" className='avatar' />
                <form>
                    <p className={errMsg ? "err active" : "err"} >{errMsg}</p>
                    <input type="text" value={userName} placeholder='إسم المستخدم' onChange={(e) => {
                        setUserName(e.target.value);
                    }} />
                    <input type="password" value={password} placeholder='كلمة السر' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <input type="password" value={confirmedPassword} placeholder=' تأكيد كلمة السر' onChange={(e) => {
                        setConfirmedPassword(e.target.value);
                    }} />
                    <div className="submit" onClick={() => {
                        if (!password || !confirmedPassword || !userName) {
                            setErrMsg('تأكد من إدخال معلوماتك في جميع الخانات')
                        }
                        else if (password !== confirmedPassword) {
                            setErrMsg('كلمة السر غير متوافقة');
                        }
                        else if (!new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$").test(password)) {
                            alert(' يجب أن تحتوي كلمة السر على ثمانية أحرف على الأقل ، حرف كبير واحد على الأقل و حرف صغير واحد على الأقل ورقم واحد')
                        }
                        else {
                            handlSubmit()
                        }
                    }

                    }>
                        <p>إنشاء حساب</p>
                        <AddBox />
                    </div>
                </form>
                <div className='have_account'>
                    <p> لديك حساب ؟</p>
                    <Link to="/login">الدخول</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
