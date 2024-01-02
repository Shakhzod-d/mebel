// ContactUs.tsx
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTelegram,
} from "react-icons/fa";

import "./Contact.scss";

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us via telegram for any support</h2>
      <p>Feel free to reach out to us on social media!</p>
      <div className="social-icons">
        <a
          href="https://t.me/Shakhzzodd"
          className="icon telegram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram />
        </a>
        <a
          href="#"
          className="icon facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="#"
          className="icon twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          className="icon instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          className="icon linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="#"
          className="icon github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
