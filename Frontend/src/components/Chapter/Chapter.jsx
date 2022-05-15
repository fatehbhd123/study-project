import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Chapter() {
    const [headings, setHeadings] = React.useState([]);
    const [paragraphs, setParagraphs] = React.useState([]);
    const [link, setLink] = React.useState("");
    const { title } = useParams();
    const getData = async (title) => {
        axios({
            url: '/',
        })
            .then(response => {
                setHeadings(response.headings);
                setParagraphs(response.paragraphs);
                setLink(response.link);
            })
    }
    useEffect(() => {
        getData(title);
    }, []);
    return (
        <div className='chapter'>

        </div>
    )
}
export default Chapter
