import logoWhite from "../logo/منهاج المسلم White.png";
import logoGreen from "../logo/منهاج المسلم Green.png";
import { Logout, MenuBook } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Beginner() {
    const [wilayas, setWilayas] = useState([]);
    const [associations, setAssociations] = useState([]);
    const { username } = useParams();
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('/association');
            console.log(response.data);
            setWilayas(response.data);
        }
        getData();
        // console.log(wilayas)
    }, []);
    let navigate = useNavigate();
    const Level = (level) => {
        return (
            <div onClick={(e) => {
                navigate(`/beginner${username}/level:${e.currentTarget.getAttribute('level')}`);
            }} level={level}>
                <p>المستوى {level}</p>
                <MenuBook />
            </div >
        )
    }
    return (
        <div className="beginner">
            <div className="beginner_welcome">
                <h1>أهلا بك في قسم تعلم أساسيات الدين</h1>
                <img src={logoWhite} alt="منهاج المسلم " className="beginner_logoWhite" />
                <img src={logoGreen} alt="منهاج المسلم " className="beginner_logoGreen" />
            </div>
            <div className="beginner_content">
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
                                تواصل مع واحدة الجمعيات حسب الولاية
                            </h4>
                            <select name="wilaya" id="" onChange={(e) => {
                                setAssociations(wilayas.filter(wilaya => {
                                    return wilaya.id === e.target.value
                                }));
                            }}>
                                <option value="">إختر</option>
                                {wilayas && wilayas.map((e, i) => {
                                    return <option value={e.id} name={e.ar_name} key={i}>{e.ar_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="associations">
                            {associations.map(function ({ ar_name, name, phone, _id, sunday, monday, tuesday, wednesday, thursday, friday, saturday }) {
                                return (
                                    <div key={_id}>
                                        <div >
                                            <p>الإسم : {ar_name}</p>
                                            <p>رقم الهاتف: {phone}</p>
                                        </div>
                                        {{ sunday, monday, tuesday, wednesday, thursday, friday, saturday } && <p>البرنامج:</p>}
                                        <div>
                                            {sunday && <p>يوم الأحد : {sunday}</p>}
                                            {monday && <p>يوم الإثنين : {monday}</p>}
                                        </div>
                                        <div>
                                            {tuesday && <p>يوم الثلاثاء : {tuesday}</p>}

                                            {wednesday && <p>يوم الأربعاء : {wednesday}</p>}
                                        </div>
                                        <div>

                                            {thursday && <p>يوم الخميس : {thursday}</p>}
                                            {friday && <p>يوم الجمعة : {friday}</p>}
                                        </div>
                                        {saturday && <p>يوم السبت : {saturday}</p>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="logout">
                        <p>الخروج</p>
                        <Logout />
                    </div></div>


                {/* <div className="association_info">
                    <div className="association_search">
                        <h4>
                            تواصل مع واحدة الجمعيات حسب الولاية
                        </h4>
                        <select name="wilaya" id="" onChange={(e) => {
                            setAssociations(wilayas.filter(wilaya => {
                                return wilaya.id === e.target.value
                            }));
                        }}>
                            <option value="">إختر</option>
                            {wilayas && wilayas.map((e, i) => {
                                return <option value={e.id} name={e.ar_name} key={i}>{e.ar_name}</option>
                            })}
                        </select>
                    </div>
                    <div className="associations">
                        {associations.map(function ({ name, phone, _id, sunday, monday, tuesday, wednesday, thursday, friday, saturday }) {
                            return (
                                <div key={_id}>
                                    <p>{name}</p>
                                    <p>رقم الهاتف: {phone}</p>
                                    <p>البرنامج:</p>
                                    {sunday && <p>يوم الأحد : {sunday}</p>}
                                    {monday && <p>يوم الإثنين : {monday}</p>}
                                    {tuesday && <p>يوم الثلاثاء : {tuesday}</p>}
                                    {wednesday && <p>يوم الأربعاء : {wednesday}</p>}
                                    {thursday && <p>يوم الخميس : {thursday}</p>}
                                    {friday && <p>يوم الجمعة : {friday}</p>}
                                    {saturday && <p>يوم السبت : {saturday}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="logout">
                    <p>الخروج</p>
                    <Logout />
                </div> */}
            </div>
        </div>
    )
}
