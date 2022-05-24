import axios from 'axios';
import React, { useState } from 'react'

function ContactUs() {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("")
    return (
        <section className="contact container" id='contactus'>
            <h2>إتصل بنا</h2>
            <form >
                <main>
                    <input type="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email} placeholder="البريد الإلكتروني" name="email" />
                    <input type="text" onChange={(e) => {
                        setSubject(e.target.value)
                    }} value={subject} placeholder="الموضوع" name="Subject" />
                </main>
                <main>
                    <textarea value={message} onChange={(e) => {
                        setMessage(e.target.value)
                    }} name="message" placeholder="الرسالة" required></textarea>
                    <input onClick={(e) => {
                        e.preventDefault();
                        let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
                        if (email === "" || subject === "" || message === "" || !regex.test(email)) {
                            alert("تأكد من إدخال جميع المعلومات بشكل صحيح")
                        }
                        else {
                            axios.post('/contactform', { subject: subject, email: email, message: message }).then((result) => {
                                if (result.data === "success") {
                                    alert('تم الإرسال بنجاح')
                                } else {
                                    alert('حدث خلل في الإرسال')
                                }
                            })

                        }
                    }} type="submit" value="إرسال" />
                </main>
            </form>
        </section>
    )
}

export default ContactUs;
