import React from 'react'

function ContactUs() {
    return (
        <section className="contact container" id='contactus'>
            <h2>إتصل بنا</h2>
            <form >
                <main>
                    <input type="text" placeholder="الإسم" name="name" required />
                    <input type="text" placeholder="الهاتف" name="phone" />
                    <input type="email" placeholder="البريد الإلكتروني" name="email" required />
                    <input type="text" placeholder="الموضوع" name="Subject" />
                </main>
                <main>
                    <textarea name="message" placeholder="الرسالة" required></textarea>
                    <input type="submit" value="إرسال" />
                </main>
            </form>
        </section>
    )
}

export default ContactUs;
