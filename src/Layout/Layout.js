import Header2 from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    const isLogin = true

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor:"#f1f2f3"
        }}>
            {isLogin && <Header2 />}
            <div style={{
                flex: 1,
                marginTop: '64px',
                padding: "20px",
                overflowY: "auto",
            }}>
                <Outlet />
            </div>
        </div>
    )
}