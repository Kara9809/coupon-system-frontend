import './Home.css';

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='home'>
      <h1 className='home-title'>Welcome to Our Coupon Application</h1>
      <p className='home-description'>
        Explore our comprehensive coupon management system where companies can add their own coupons for customers, and admins can efficiently oversee and manage these promotions. Enjoy a seamless experience with personalized coupons and streamlined administrative controls.
      </p>
    </div>
  )
}

export default Home;
