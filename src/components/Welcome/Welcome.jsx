import React from 'react'

function Welcome() {
    return (
        <div className='welcome container'>
            <h2>منهاج المسلم</h2>
            <h3>منصة تعمل على توجيهك في رحلتك لتعلم دينك.</h3>
            {/* <p>منصة توفر مجموعة من المواد المختارة بعناية لمساعدة من يريد تعلم اساسيات الدين و المختصين في دراساتهم</p> */}
            <p> لمعرفة المزيد عن المحتوى <span style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                    document.querySelector('.about').scrollIntoView({
                        behavior: "smooth"
                    })
                }}>إضغط هنا</span></p>
        </div>
    )
}

export default Welcome
