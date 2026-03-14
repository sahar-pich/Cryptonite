const About = () => {


    return (
        <main id="aboutMainDiv">
            <h2>About Us</h2>

            <section id="projectDescription">
                <h3>Project Description</h3>
                <p>
                    Cryptonite is a modern cryptocurrency analysis and investment platform.
                    Our mission is to provide users with real-time crypto market data, AI-powered investment insights,
                    and comprehensive analytics to make informed investment decisions. We combine cutting-edge technology
                    with intuitive design to make cryptocurrency investing accessible to everyone.
                </p>
            </section>

            <section id="personalDetailsSection">
                <h3>About the Developer</h3>
                <div id="personalDetailsContainer">
                    <div id="photoSection">
                        <img src="./src/assets/images/student_pic.jpg" alt="Developer Profile" id="profilePhoto" />
                    </div>
                    <div id="detailsSection">
                        <h4>Personal Details</h4>
                        <p><strong>Name:</strong> Sahar Pich</p>
                        <p><strong>Email:</strong> saharp6@gmail.com</p>
                        <p><strong>Role:</strong> Full Stack Developer</p>
                        <p><strong>Experience:</strong> Specialized in React, TypeScript, and Financial Technology</p>
                        <p><strong>Location:</strong> Tirat Carmel, Israel</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default About;
