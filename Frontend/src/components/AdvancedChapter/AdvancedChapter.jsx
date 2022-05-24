import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import logo from "../logo/منهاج المسلم Green.png"

function AdvancedChapter() {
    const [data, setData] = useState([]);
    let navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [famous, setFamous] = useState([]);
    const [videos, setVideos] = useState([]);
    const { title } = useParams();
    const getData = async () => {
        const response = await axios.post('/advancedcontentbytitle', { title: title });
        console.log(title)
        console.log(response.data);
        setData(response.data[0]);
    }
    useEffect(() => {
        if (title) {
            getData();
        }
    }, []);

    useEffect(() => {
        setFamous(data.listfamous);
        setBooks(data.listbooks);
        setVideos(data.listvideos);
    }, [data])
    return (
        <div className='advanced_chapter'>
            <div className='container'>
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
                <div className="advanced_chapter_content">
                    {title && <h2>{title}</h2>}
                    {title && <p>أهلا بك في قسم {title}</p>}
                    <h3>أشهر الكتب</h3>
                    <div className="books">
                        {famous && famous.map((e) => {
                            return (
                                <a href={e.view} target="_blank">
                                    <img src={e.image} alt="" />
                                    <h4>{e.name}</h4>
                                    <p> المؤلف : {e.author}</p>
                                    <p> الطبعة : {e.edition}</p>
                                </a>
                            )
                        })}
                    </div>
                    <h3>الكتب المتوفرة</h3>
                    <div className="books">
                        {books && books.map((e) => {
                            return (
                                <a href={e.view} target="_blank">
                                    <img src={e.image} alt="" />
                                    <h4>{e.name}</h4>
                                    <p> المؤلف : {e.author}</p>
                                    <p> الطبعة : {e.edition}</p>
                                </a>
                            )
                        })}
                    </div>
                    <h3>قائمة الفيديوهات :</h3>
                    <div className="videos">
                        {videos && videos.map((e) => {
                            return (
                                <iframe src={e} frameborder="0" allowFullScreen></iframe>
                            )
                        })}                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvancedChapter
