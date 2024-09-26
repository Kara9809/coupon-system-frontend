import './Main.css';
import Routing from '../Routing/Routing';
import { Outlet } from 'react-router-dom';

type Props = {}

const Main = (props: Props) => {
    return (
        <div className='main'>
            <Routing />
            <Outlet />
        </div>
    )
}

export default Main;