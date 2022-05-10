import { AddBox, ExitToApp } from '@mui/icons-material'
import React, { useState } from 'react'
import logoWhite from '../logo/منهاج المسلم White.png'
import logoGrenn from "../logo/منهاج المسلم Green.png"
import avatar from '../images/avatar.svg'
import { Link } from 'react-router-dom'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='login container'>
            <div className="login_welcome">
                <h4> سجل الدخول في : </h4>
                <img src={logoWhite} className="logo_white" alt="منهاج المسلم" />
                <img src={logoGrenn} className="logo_green" alt="منهاج المسلم" />
            </div>
            <div className="form">
                <img src={avatar} alt="avatar" className='avatar' />
                <form>
                    <input type="text" value={email} placeholder='البريد الإلكتروني' onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <input type="text" value={password} placeholder='كلمة السر' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <div className="submit">
                        <ExitToApp />
                        <p>تسجيل الدخول</p>
                    </div>
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
