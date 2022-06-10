import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../features/userSlice';
import logoWhite from "../logo/منهاج المسلم White.png"
import logoGreen from "../logo/منهاج المسلم Green.png"
import { Logout, Update } from '@mui/icons-material';
import axios from 'axios';
function Association() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const association = JSON.parse(localStorage.getItem("association"));
    console.log(association)
    const [ar_name, setAr_name] = useState(association.ar_name);
    const [phone, setPhone] = useState(association.phone);
    const [facebook, setFacebook] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/beginner')
        }
    }, []);

    return (
        <div className='association'>

            <div className="div1">
                <h2 >مرحبا بكم في :</h2>
                <img src={logoWhite} className="logo_white" alt="منهاج المسلم" />
                <img src={logoGreen} className="logo_green" alt="منهاج المسلم" id="img2" />
            </div>
            <div className="div2">
                <div className="logout" onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem('association');
                    navigate('/')
                }}>
                    <p>الخروج</p>
                    <Logout />
                </div>
                <div>
                    <div className='input'>
                        <label id="l1">إسم الجمعية :</label><input value={ar_name} onChange={(e) => {
                            setAr_name(e.target.value)
                        }} type="text" className="inp1" />
                    </div>
                    <div className='input'>
                        <label >رقم الهاتف :</label><input type="text" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} className="inp1" />
                    </div>
                    <div className='input'>
                        <label >رابط الفايسبوك :</label>
                        <input type="text" value={facebook} onChange={(e) => {
                            setFacebook(e.target.value)
                        }} className="inp1" />
                    </div>
                </div>
                <div className='custom_btn' onClick={async () => {
                    const result = await axios.patch('/modifyassociation', {
                        username: association.username,
                        ar_name: ar_name,
                        phone: phone,
                        facebook: facebook
                    })
                    if (result.data === "saved") {
                        alert("تم التحديث")
                    } else {
                        alert("حدث خلل أثناء التحديث")
                    }
                }}>
                    <p>تحديث</p>
                    <Update />
                </div>
                <p id="messages">أخر الرسائل :</p>

            </div>
        </div>
    )
}

export default Association;
