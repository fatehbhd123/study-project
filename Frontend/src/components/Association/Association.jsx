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
    const [sunday, setSunday] = useState('');
    const [monday, setMonday] = useState('')
    const [tuesday, setTuesday] = useState('')
    const [wednesday, setWednesday] = useState('')
    const [thursday, setThursday] = useState('')
    const [friday, setFriday] = useState('')
    const [saturday, setSaturday] = useState('')
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

                <div>
                    <div className='input'>
                        <label id="l1">إسم الجمعية :</label><input value={ar_name} onChange={(e) => {
                            setAr_name(e.target.value)
                        }} type="text" className="inp1" />
                    </div>
                    <div className='input'>
                        <label >رقم الهاتف :</label><input type="text" value={phone} onClick={(e) => {
                            setPhone(e.target.value)
                        }} className="inp1" />
                    </div>
                </div>
                <p id="barnamaj">البرنامج :</p>
                <div className="program">
                    <input type="text" value={sunday} onChange={(e) => {
                        setSunday(e.target.value)
                    }} placeholder="الأحد" />
                    <input type="text" value={monday} onChange={(e) => {
                        setMonday(e.target.value)
                    }} placeholder="الإثنين" />
                    <input type="text" value={tuesday} onChange={(e) => {
                        setTuesday(e.target.value)
                    }} placeholder="    الثلاثاء" />
                    <input type="text" value={wednesday} onChange={(e) => {
                        setWednesday(e.target.value)
                    }} placeholder="    الأربعاء" />
                    <input type="text" value={thursday} onChange={(e) => {
                        setThursday(e.target.value)
                    }} placeholder="    الخميس" />
                    <input type="text" value={friday} onChange={(e) => {
                        setFriday(e.target.value)
                    }} placeholder="    الجمعة" />
                    <input type="text" value={saturday} onChange={(e) => {
                        setSaturday(e.target.value)
                    }} placeholder="    السبت" />
                </div>
                <div className='custom_btn' onClick={async () => {
                    const result = await axios.patch('/modifyassociation', {
                        username: association.username,
                        ar_name: ar_name,
                        phone: phone,
                        sunday: sunday,
                        monday: monday,
                        tuesday: tuesday,
                        wednesday: wednesday,
                        thursday: thursday,
                        friday: friday,
                        saturday: saturday
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
                <div className="logout" onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem('association');
                    navigate('/')
                }}>
                    <p>الخروج</p>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default Association;
