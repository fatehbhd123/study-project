import { ArrowBack, Search } from "@mui/icons-material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo/منهاج المسلم Green.png"
function Advanced() {
    const [aya, setAya] = useState('');
    const [sora, setSora] = useState('');
    const [ahadith, setAhadith] = useState([]);
    const [lang, setLang] = useState('ara');
    const [quranresult, setQuranresult] = useState({});
    const [arabicResult, setArabicResult] = useState([]);
    const [frenchResult, setFrenchResult] = useState([]);
    const [englishResult, setEnglishResult] = useState([]);
    const getAhadith = async (value) => {
        const result = await axios.get(`https://dorar-hadith-api.herokuapp.com/api/search?value=${value}&page=1`);
        setAhadith(result.data);
        console.log(result.data);
    }

    const handleQuran = () => {
        switch (lang) {
            case "ara":
                return arabicResult.filter((e) =>
                    e.verse == parseInt(aya) && e.chapter == parseInt(sora)
                )
            case "fr":
                return (frenchResult.filter((e) =>
                    e.verse == parseInt(aya) && e.chapter == parseInt(sora)
                ))
            case "eng":
                return (englishResult.filter((e) =>
                    e.verse == parseInt(aya) && e.chapter == parseInt(sora)
                ))
            default:
                return [];
        };
    }
    let navigate = useNavigate();
    const getData = async () => {
        const response = await axios.get('/advancedcontent');
        setTitles(response.data);
    }
    const getQuran = async () => {
        let result = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-jalaladdinalmah.json`);
        setArabicResult(result.data.quran);
        result = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/fra-muhammadhameedu-la.json`);
        setFrenchResult(result.data.quran);
        result = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdelhaleem.json`);
        setEnglishResult(result.data.quran);
    }
    const [titles, setTitles] = useState([]);
    useEffect(() => {
        getQuran();
        getData();
    }, []);

    return (
        <div className='advanced_section container'>
            <div className="custom_header">
                <img src={logo} alt="" />
                <div className="logout" onClick={() => {
                    navigate("/");
                }
                }>
                    <p>الرئيسية</p>
                    <ArrowBack />
                </div>
            </div>
            <h1>مرحبا بك في قسم المختصين</h1>
            < div className="advanced_content">
                <div className="sciences">
                    {titles && titles.map((e, i) => {
                        return (
                            <div key={i} onClick={() => {
                                navigate(`/advanced/chapter/${e.title}`);
                            }}>{e.title}</div>
                        )
                    })}
                </div>
                <div className="tafsir">
                    <div className="right">
                        <h3>
                            تفسير القرأن
                        </h3>
                        <label htmlFor="sora">رقم السورة</label>
                        <input value={sora} type="text" id="sora" onChange={(e) => {
                            setSora(e.target.value)
                        }} />
                        <label htmlFor="aya">رقم الأية</label>
                        <input value={aya} onChange={(e) => {
                            setAya(e.target.value)
                        }} type="text" id="aya" />
                        <div>
                            <label htmlFor="lang">لغة البحث</label>
                            <select value={lang} onChange={(e) => {
                                setLang(e.target.value);
                            }}>
                                <option value="ara">العربية</option>
                                <option value="fr">الفرنسية</option>
                                <option value="eng">الإنجليزية</option>
                            </select>
                        </div>
                        <div className="custom_btn" onClick={() => {
                            if (aya === "" || sora === "") {
                                alert("تأكد من إدخال الأية و السورة")
                            }
                            else {
                                const result = handleQuran();
                                if (result.length === 0) {
                                    alert(`لا توجد أية ${aya} في السورة ${sora}`)
                                } else {
                                    console.log(result)
                                    setQuranresult(result[0]);
                                }
                            }
                        }}>
                            <p>إبحث</p>
                            <Search />
                        </div>
                        {quranresult !== [] && <p style={{ padding: "20px", backgroundColor: "whitesmoke", borderRadius: "10px" }}>{quranresult.text}</p>}

                    </div>
                    <div className="left">
                        <h3>تفسير الأحاديث</h3>
                        <label htmlFor="hadith">إبحث بالكلمات المفتاحية</label>
                        <input type="text" onChange={(e) => {
                            getAhadith(e.target.value);
                        }} />
                        {ahadith !== [] && ahadith.map((e) => {
                            return (
                                <div className="hadith">
                                    <p>{e.hadith}</p>
                                    <div className="hadith_info">
                                        <div><p>الراوي : {e.el_rawi}</p></div>
                                        <div><p>المحدث : {e.el_mohdith}</p></div>
                                    </div>
                                    <div className="hadith_info">
                                        <div><p>المصدر : {e.source}</p></div>
                                        <div><p>الصفحة : {e.number_or_page}</p></div>
                                    </div>
                                    <div className="hadith_info">
                                        <p>الدرجة : {e.grade}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advanced