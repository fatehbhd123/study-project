import { Logout } from '@mui/icons-material';
import { boxSizing } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../features/userSlice';
import logo from '../logo/منهاج المسلم Green.png'

function Chapter() {
    const [heading, setHeading] = useState([]);
    const [paragraphs, setParagraphs] = useState([]);
    const [link, setLink] = useState("");
    const [boxes, setBoxes] = useState([]);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const { title } = useParams();
    let navigate = useNavigate();
    const getData = async (title) => {
        try {
            const response = await axios.post('/contentbytitle', { title: title }
            )
            setData(response.data[0]);
            setLink(response.data[0].link);
        }
        catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        if (title) {
            getData(title)
        }
    }, [])
    useEffect(() => {
        if (data !== null) {
            console.log(data)
            const questions = data.question;
            const content = data.content;
            setBoxes(questions.map((e, i) => {
                return (
                    <div className='box' key={i}>
                        <h4>{e}</h4>
                        {content[i].map((p) => {
                            return (<p>- {p}</p>)
                        })}
                    </div>
                )
            })
            );
        }
    }, [data]);

    return (
        <div className='chapter'>
            <div className="container">
                <div className="custom_header">
                    <img src={logo} alt="منهاج المسلم" />
                    <div className="logout" onClick={() => {
                        dispatch(logout());
                        localStorage.removeItem('user');
                        navigate('/')
                    }}>
                        <p>الخروج</p>
                        <Logout />
                    </div>
                </div>
                <div className="chapter_content">
                    {title && <h1>{title}</h1>}
                    {title && <p>لمشاهدة فيديو حول {title} إضغط <span id='scroll' onClick={() => {
                        document.getElementById('video').scrollIntoView({
                            behavior: "smooth"
                        })
                    }}>هنا</span></p>}
                    <div>
                        <div className="content_boxes">
                            {boxes}
                        </div>
                        {link && <iframe id='video' className="video" src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chapter
