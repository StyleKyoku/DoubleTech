import React from "react";
import '../../styles/footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-content-wrapper">
                <div className="footer-content">
                    <img src={import.meta.env.BASE_URL + "/assets/images/footer-logo.svg"} alt="footer logo" className="footer-logo"/>
                </div>
                <div className="footer-content footer-buttons">
                    <ul>
                        <li className="footer-links">Home</li>
                        <li className="footer-links">Catalog</li>
                        <li className="footer-links">Sales</li>
                        <li className="footer-links">Contacts</li>
                    </ul>
                </div>
            </div>
            <div className="footer-content-wrapper">
                <div className="footer-content">

                </div>
                <div className="footer-content">
                    <ul>
                        <li className="footer-links"><a href="#">Instagram</a></li>
                        <li className="footer-links">+353 lorem</li>
                        <li className="footer-links"><a href="#">Facebook</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <img src={import.meta.env.BASE_URL + "/assets/images/footer-img.svg"} alt="Footer image" className="footer-img" />
        <div className="footer-container">
            <div className="footer-content-wrapper">
                <div className="footer-content footer-disclaimer">
                    <p>This website does not actually sell any products.</p>
                </div>
                <div className="footer-content"></div>
            </div>
            <div className="footer-content-wrapper">
                <div className="footer-spacer"></div>
                <div className="footer-content">
                    <ul>
                        <li className="footer-links"><a href="https://github.com/StyleKyoku">Front-end: Nikita Zhdanov</a></li>
                        <li className="footer-links">Back-end: </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

  );
}

export default Footer;