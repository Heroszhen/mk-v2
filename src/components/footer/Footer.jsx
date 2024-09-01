import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

const Footer = (props) => {

    return (
        <footer id="footer">
            <section>
                <Link to="/contact" className="link btn-vouge mb-4">Contact</Link>
                <a href="http://notes3wa.yangzhen.fr/portfolio" target='__blank' className="link btn-vouge mb-4">Qui est zhen?</a>
                <a href="https://joliesfilles.yangzhen.tech/" className="link btn-vouge mb-4" target='__blank'>Site Lié</a>
                <a href="https://alexandra-daddario.yangzhen.tech/" className="link btn-vouge mb-4" target='__blank'>alexandra-daddario</a>
            </section>
            <section>
                <a href="https://www.facebook.com/LearningEnglishAmericanWay/posts/1206792596185259/?paipv=0&eav=AfZxQPx8dKyreuvQi3H9B5Zh0gY-mqYCTSNYf2IxH-GqpF8Ez1vF373VSBu5GhEuviQ&_rdr" target='__blank'>
                    秀色可餐
                </a>
            </section>
            <section className='text-center'>
            All Right Reserved © 2024 HERO Zhen
            </section>
        </footer>
    );
}
export default Footer;