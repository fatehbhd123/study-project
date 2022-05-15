import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Level() {
    const [chapters, setChapters] = useState([])
    const { level } = useParams();
    // let navigate = useNavigate();
    // const getData = async (level) => {
    //     axios({
    //         url: '/',
    //     })
    //         .then(response => {
    //             setChapters(response.data);
    //         })
    // }
    // useEffect(() => {
    //     getData(level);
    // }, []);
    // function card(title) {
    //     return (
    //         <div className='chapter_card' onClick={() => {
    //             navigate(`/chapter/:${title}`);
    //         }
    //         }>
    //             <h1>{title}</h1>
    //         </div>
    //     )
    // }

    // const cards = chapters.map((c) => {
    //     card(c)
    // })
    return (
        <div className='level'>
            {/* <div className="level_cards">
                {cards}
            </div> */}
            level {level}
        </div>
    )
}

export default Level
