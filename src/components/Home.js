import React from 'react';
import '../css/Home.css';

const Home = () => {
    return (
        <div className='home'>
            <div className="content">
                <section className="about">
                    <h2>About Us</h2>
                    <p>School in the Cloud is a platform that trains senior volunteers to teach students in a group or individual setting. This helps kids in communities with high student to teacher ratios. It also provides retired volunteers a sense of purpose and meaning in their day to day life when they find themselves with more free time. The platform also connects volunteers with the students.</p>
                </section>
                <section className="mission">
                    <div className="inner">
                        <h2>Our Mission</h2>
                        <p>The aim is to help close the achievement gap by connecting students with available, qualified volunteer mentors.</p>
                        <button>Learn More About Us</button>
                    </div>
                </section>
            </div>
            <footer className="footer">
                <p>© 2021 School In The Cloud</p>
            </footer>
        </div>
    )
}

export default Home
