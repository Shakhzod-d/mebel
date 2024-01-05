import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

import "./Contact.scss";
import { socialMediaLinks } from "./helper";

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us via telegram for any support</h2>
      <p>Feel free to reach out to us on social media!</p>
      <div className="social-icons">
        {socialMediaLinks.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className={`icon ${link.platform.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
