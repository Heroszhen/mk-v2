import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import { setAction } from '../../store/envStore';
import photo from '../../assets/look_good_enough_to_eat.png';

const Footer = (props) => {
    const setActionStatus = (e) => {
        if (e.keyCode === 13) {
            setAction(e.target.value)
        }
    }

    return (
        <footer id="footer">
            <section>
                <Link to="/contact" className="link btn-vouge mb-4">Contact</Link>
                <a href="https://www.yangzhen.fr/" target='__blank' className="link btn-vouge mb-4">Qui est zhen?</a>
                <a href="https://joliesfilles.yangzhen.tech/" className="link btn-vouge mb-4" target='__blank'>Site Lié</a>
                <a href="https://alexandra-daddario.yangzhen.tech/" className="link btn-vouge mb-4" target='__blank'>alexandra-daddario</a>
                <div className='link wrap-input'>
                    <input type="text" id="input-action-status" onKeyUp={(e)=>setActionStatus(e)}/>
                </div>
            </section>
            <section id="good-enough-to-eat">
                <a href="https://www.facebook.com/LearningEnglishAmericanWay/posts/1206792596185259/?paipv=0&eav=AfZxQPx8dKyreuvQi3H9B5Zh0gY-mqYCTSNYf2IxH-GqpF8Ez1vF373VSBu5GhEuviQ&_rdr" target='__blank'>
                    秀色可餐
                    <img src={photo} alt="" />
                </a>
            </section>
            <section className='text-center'>
            All Right Reserved © 2024 HERO Zhen
            </section>
        </footer>
    );
}
export default Footer;
