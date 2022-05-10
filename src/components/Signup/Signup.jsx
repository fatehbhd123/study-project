import React, { useState } from 'react'
import logoWhite from '../logo/منهاج المسلم White.png'
import logoGrenn from "../logo/منهاج المسلم Green.png"
import { Link } from 'react-router-dom'
import { ExitToApp } from '@mui/icons-material'
import avatar from '../images/avatar.svg'
function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div className='container signup'>
            <div className="signup_welcome">
                <h4> انشئ حساب في: </h4>
                <img src={logoWhite} className="logo_white_up" alt="منهاج المسلم" />
                <img src={logoGrenn} className="logo_green_up" alt="منهاج المسلم" />
            </div>
            <div className="signup_form">
                <img src={avatar} alt="avatar" className='avatar' />
                <form>
                    <div>
                        <input type="text" placeholder='الإسم' value={lastName} onChange={(e) => {
                            setLastName(e.target.value)
                        }} />
                        <input type="text" placeholder='اللقب' value={firstName} onChange={(e) => {
                            setFirstName(e.target.value)
                        }} />
                    </div>
                    <div>
                        <input type="text" value={email} placeholder='البريد الإلكتروني' onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </div>
                    <div>
                        <input type="text" value={password} placeholder='كلمة السر' onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        <input type="text" value={confirmedPassword} placeholder=' تأكيد كلمة السر' onChange={(e) => {
                            setConfirmedPassword(e.target.value);
                        }} />
                    </div>
                    <div>
                        <input type="text" placeholder=' البلد' value={country} onChange={(e) => {
                            setCountry(e.target.value);
                        }} />
                        <input type="text" placeholder=' رقم الهاتف' value={phone} onChange={(e) => {
                            setPhone(e.target.value);
                        }} />
                    </div>
                    <div className="submit">
                        <ExitToApp />
                        <p>إنشاء حساب</p>
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
