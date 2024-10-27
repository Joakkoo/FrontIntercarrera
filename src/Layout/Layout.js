import Header2 from '../components/Header';
import { Outlet } from 'react-router-dom';
import bananaImage from './banana.png';
export default function Layout() {
    const isLogin = true

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `
            url(${bananaImage}), 
            url(${bananaImage}), 
            url(${bananaImage}), 
            url(${bananaImage}), 
            url(${bananaImage})
        `,
            backgroundSize: '30px 30px, 40px 40px, 25px 25px, 35px 35px, 30px 30px',
            backgroundPosition: '10% 20%, 50% 10%, 80% 40%, 20% 70%, 70% 80%',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#fff5c4' // Fondo color claro
        }}>
            {isLogin && <Header2 />}
            <div className="content" style={{
                flex: 1,
                marginTop: '30px',
                padding: "0px",
                overflowY: "auto",
            }}>
                <Outlet />
            </div>
        </div>
    )
}