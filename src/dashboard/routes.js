import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


import Layout from "../Layout/Layout";
import Tamagotchi from "../components/Tamagotchi";
import Estadisticas from "../components/Estadísticas";

const rutasAutenticadas = [
    {
        url: '/',
        component: <Tamagotchi />
    },
    {
        url: '/estadisticas',
        component: <Estadisticas  />
    },

];

const rutasNoAutenticadas = [
    {

    }
];

export default function RoutesDash() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;

    return (
        <Routes>
            {isAuthenticated ? (
                <Route element={<Layout />}>
                    {rutasAutenticadas.map((ruta, index) => (
                        <Route key={index} path={ruta.url} element={ruta.component} />
                    ))}
               
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            ) : (
                <Route element={<Layout />}>
                    {rutasNoAutenticadas.map((ruta, index) => (
                        <Route key={index} path={ruta.url} element={ruta.component} />
                    ))}
        
                    <Route path="*" element={<Navigate to="/login" />} />
                </Route>
            )}
        </Routes>
    );
}
