import './Footer.css';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className='footer'>
      <p className='footer-text'>© {new Date().getFullYear()} My Application. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
