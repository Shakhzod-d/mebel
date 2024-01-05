import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

import "./Contact.scss";
import { socialMediaLinks } from "./helper";
import { useTranslation } from "react-i18next";

const ContactUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-us">
      <h2>{t("contactPage.contactUsViaTelegramForAnySupport")}</h2>
      <p>{t("contactPage.feelFreeToReachOutToUsOnSocialMedia")}</p>
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
