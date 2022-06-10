import logoWhite from "../logo/منهاج المسلم White.png";
import logoGreen from "../logo/منهاج المسلم Green.png";
import { ChangeCircle, CheckSharp, Clear, Delete, Facebook, Logout, MenuBook, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { login, logout, selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from "react-redux";
export default function Beginner() {
    const [wilayas, setWilayas] = useState([]);
    const [associations, setAssociations] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [newPass, setNewPassword] = useState('');
    const [newPassConf, setNewPasswordConf] = useState('');
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    useEffect(() => {

        if (localStorage.getItem('association')) {
            navigate('/association')
        }
        const getData = async () => {
            const response = await axios.get('/association');
            // console.log(response.data);
            setWilayas(response.data);
        }
        getData();
    }, []);
    const levelType = (level) => {
        if (+level > +user.level + 1) {
            return "blocked"
        } else if (+level === +user.level + 1) {
            return ""
        } else {
            return "checked"
        }
    }
    const Level = (level) => {
        return (
            <div className={levelType(level)} onClick={(e) => {

                if (!e.currentTarget.classList.contains('blocked')) {
                    navigate(`/beginner/level/${e.currentTarget.getAttribute('level')}`)
                }
            }} level={level} >
                <p>المستوى {level}</p>
                <MenuBook className="book" />
                <CheckSharp className="check" />
            </div >
        )
    }
    return (
        <div className="beginner">
            <div className={isOpen ? "beginner_overlay active" : "beginner_overlay"}></div>
            <div className={isOpen ? "pop_up_delete active" : "pop_up_delete"}>
                <Clear onClick={() => {
                    setIsOpen(false);
                }} style={{ cursor: "pointer" }} />
                <h1 style={{ color: "#45B09E" }}>الإعدادات</h1>
                <div>
                    <label htmlFor="pass">كلمة السر الحالية</label>
                    <input type="password" id="pass" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </div>
                <div>
                    <label htmlFor="new_pass">كلمة السر الجديدة</label>
                    <input type="password" id="new_pass" value={newPass} onChange={(e) => {
                        setNewPassword(e.target.value)
                    }} />
                </div>
                <div>
                    <label htmlFor="new_pass_conf">كلمة السر الجديدة</label>
                    <input type="password" id="new_pass_conf" value={newPassConf} onChange={(e) => {
                        setNewPasswordConf(e.target.value)
                    }} />
                </div>
                <div className="delete" onClick={async () => {
                    const result = await axios.post('/deleteuser', { password: password, username: user.username })
                    if (result.data === "deleted") {
                        localStorage.removeItem('user');
                        dispatch(logout());
                        navigate('/')
                    } else {
                        alert("كلمة السر خاطئة")
                    }
                }}>
                    <p>حذف الحساب</p>
                    <Delete />
                </div>
                <div className="delete" onClick={async () => {
                    if (newPass !== newPassConf) {
                        alert('يوجد خطأ كلمة السر الجديدة')
                    }
                    else if (!new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$").test(newPass)) {
                        alert(' يجب أن تحتوي كلمة السر على ثمانية أحرف على الأقل ، حرف كبير واحد على الأقل و حرف صغير واحد على الأقل ورقم واحد')
                    }
                    else {
                        const result = await axios.patch('/modifyuser', { password: password, username: user.username, newpassword: newPass })
                        if (result.data === "password changed") {
                            localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), password: newPass }))
                            dispatch(login({ ...JSON.parse(localStorage.getItem('user')), password: newPass }))
                            alert('تم التغيير بنجاح')
                        }
                        else {
                            alert('يوجد خطأ في كلمة السر')
                        }
                    }
                }}>
                    <p>تغيير</p>
                    <ChangeCircle />
                </div>
            </div>
            <div className="beginner_welcome">
                <h1>أهلا بك في قسم تعلم أساسيات الدين</h1>
                <img src={logoWhite} alt="منهاج المسلم " className="beginner_logoWhite" />
                <img src={logoGreen} alt="منهاج المسلم " className="beginner_logoGreen" />
            </div>
            <div className="beginner_content">
                <div style={{}}>
                    <div className="custom_btn" onClick={() => {
                        setIsOpen(true)
                    }}>
                        <p>الإعدادات</p>
                        <Settings />
                    </div>
                    <div className="logout" onClick={() => {
                        dispatch(logout());
                        localStorage.removeItem('user');
                        navigate('/')
                    }}>
                        <p>الخروج</p>
                        <Logout />
                    </div>
                </div>
                <div className="levels">
                    <h1>المستويات</h1>
                    {Level(1)}
                    {Level(2)}
                    {Level(3)}
                </div>

                <div>
                    <div className="association_info">
                        <div className="association_search">
                            <h4>
                                تواصل مع واحدة من الجمعيات حسب الولاية  :
                            </h4>
                            <select name="wilaya" id="" onChange={(e) => {
                                setAssociations(wilayas.filter(wilaya => {
                                    return wilaya.id === e.target.value
                                }));
                            }}>
                                <option value="">إختر</option>
                                {wilayas && wilayas.map((e, i) => {
                                    return <option value={e.id} name={e.ar_name} key={i}>{e.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="associations">
                            {associations.map(function ({ ar_name, phone, _id, facebook }) {
                                return (
                                    <div key={_id}>
                                        <div >
                                            <p>الإسم : {ar_name}</p>
                                            <p>رقم الهاتف: {phone}</p>
                                        </div>
                                        {facebook &&
                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                <p>صفخة الفايسبوك</p>
                                                <a href={facebook} target="_blank"><Facebook /></a>
                                            </div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
