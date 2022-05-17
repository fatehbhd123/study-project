import { Logout, KeyboardArrowUpSharp } from '@mui/icons-material';
import { width } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { login, logout } from '../features/userSlice';
import logo from "../logo/منهاج المسلم Golden.png"

function Level() {
    let user = JSON.parse(localStorage.getItem('user'));
    const { level } = useParams();
    let navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [data, setData] = useState([]);
    const [quizzesData, setQuizzesData] = useState([]);
    let answers = ["", "", "", ""]
    let congrats = "";
    let dispatch = useDispatch();
    const getQuizz = async () => {
        const response = await axios.post('/quizze', { level: level });
        console.log(response.data[0])
        setQuizzesData(response.data[0])
    }

    const getData = async (level) => {
        try {
            const response = await axios.post('/contentbylevel', { level: level })
            setData([...response.data, ...response.data, ...response.data, ...response.data])
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const submitAnswers = () => {
        console.log(answers)
        if (+user.level >= +level) {
            alert("لقد إجتزت هذا المستوى مسبقا")
        }
        else if (answers.toString() === quizzesData.answers.toString()) {
            alert("مبارك عليك لقد إجتزت اختبار هذا المستوى بنجاح");
            if (+user.level < 3) {

                localStorage.setItem('user', JSON.stringify({ ...user, level: +user.level + 1 }))
                axios.put('/modifylevel', { username: user.username, level: level }).then((result) => {
                    dispatch(login({
                        ...user, level: +level
                    }))
                    console.log(result.data)
                }
                ).catch(err => {
                    console.log(err)
                })
            }
        } else {
            alert("تأكد من إجاباتك")
        }
    }
    useEffect(() => {

        if (level) {
            getData(level)
        }
        if (localStorage.getItem('user')) {
            dispatch(login(
                JSON.parse(localStorage.getItem('user'))
            ))
            console.log(JSON.parse(localStorage.getItem('user')))
        }
        else if (localStorage.getItem('association')) {
            dispatch(login(
                JSON.parse(localStorage.getItem('association'))
            ))
            navigate('/association')
        }
    }, [])

    useEffect(() => {
        setCards(data.map((c, index) => {
            return card(c.title, index)
        }))

    }, [data]);
    function card(title, key) {
        return (
            <div key={key} className='chapter_card' onClick={() => {
                navigate(`/beginner/level/chapter/${title}`);
            }
            }>
                <h1>{title}</h1>
            </div>
        )
    }


    let quizzes = []

    if (quizzesData.length !== 0) {
        quizzes = quizzesData.questions.map((q, i) => {
            return (
                <div className="quizz" key={i} >
                    <h4>{q}</h4>
                    {quizzesData.propositions[i].map((p, index) => {
                        return (
                            <div key={index} >
                                <label htmlFor={index}>{p}</label>
                                <input key={index} id={index} type="radio" name={`quizz${i}`} value={p} onChange={(e) => {
                                    let val = e.target.value;
                                    answers = answers.fill(val, i, i + 1)

                                }} />
                            </div>)
                    })}
                </div>
            )
        })
    }
    return (
        <div className='level'>
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
                <div className="level_content">
                    <h1 >مرحبا بك في المستوى {level}</h1>
                    <p style={{ color: "black" }}>السلام عليكم</p>
                    <p style={{ color: "black" }}>عند انتهائك من جميع الدروس , إضغط <span onClick={(e) => {
                        getQuizz(level);
                        document.getElementById('quizzes').scrollIntoView({
                            behavior: "smooth"
                        })
                    }} style={{ cursor: "pointer", fontWeight: "bold" }}>هنا </span> لاجتياز امتحان حول ما درسته في هذا المستوى.</p>
                    <div className="level_cards">
                        {cards}
                    </div>
                </div>
                <p style={{ color: "#45b09e" }}>
                    {congrats}
                </p>
                {quizzes.length !== 0 &&
                    <div id='quizzes'>
                        <div className="quizzes" >
                            {quizzes}
                        </div>
                        <div className='submit' onClick={() => {
                            submitAnswers()
                        }}>
                            <p>
                                تأكيد الإجابات
                            </p>
                            <KeyboardArrowUpSharp />
                        </div>
                    </div>}
            </div>

        </div>
    )
}

export default Level
