import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:dhimank831@gmail.com" data-cursor="disable">
                dhimank831@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>Btech+MTech (Dual Degree) Computer Science & Engineering</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/KanishDhiman02"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/kanish-dhiman/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/kanishdhiman02/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
             <a
              href="mailto:dhimank831@gmail.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Mail<MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Kanish Dhiman</span>
            </h2>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
