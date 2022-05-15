import { AddBox, Source } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div className='about container' id='about'>
            <h2>عن الموقع</h2>
            <div className="content">
                <div className="content_header">
                    للموقع قسمان، قسم يهتم بتعليم اساسيات الدين للمبتدئين من خلال المقالات و مقاطع الفيديو التي تم اختيارها لتكون سهلة وفي متناول الجميع، مقسمة الى مستويات مع اختبار لكل مستوى بالاضافة الى امكانية التواصل مع جمعيات تعليمية معتمدة.
                    اما بالنسبة لقسم المختصين فهو مقسم الى علوم و يجمع مختلف ما يحتاجونه لتحضير بحوثهم وللاطلاع السريع على المعلومات بواسطة الكتب، المقاطع، والعديد من الخدمات مثل البحث عن الاحاديث
                </div>
                <div className="content_content">
                    <div className="begineer">
                        <h4>
                            قسم تعلم أساسيات الدين
                        </h4>
                        <p>يجب عليك التسجيل للوصول إلى المحتوى </p>
                        <p>إذا لم يكن لديك حساب سجل الآن</p>
                        <Link to="/signup" className='signupbtn'>
                            <p>التسجيل</p>
                            <AddBox />
                        </Link>
                    </div>
                    <div className="advanced">
                        <h4>
                            قسم المختصين
                        </h4>
                        <p>إضغط لمشاهدة المحتوى</p>
                        <Link to="/advanced" className='go_to_advanced'>
                            <p>الذهاب إلى المحتوى</p>
                            <Source />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
