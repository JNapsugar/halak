import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const HalakList = () => {
    const [halak, setHalak] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7129/api/Halak/halakTo')
            .then((response) => {
                setHalak(response.data);
            })
            .catch((error) => {
                console.error('Error fetching halak:', error);
            });
    }, []);

    return (
        <div className="card">
            <h3 className="card-title">Halak</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Hal neve</th>
                        <th>Tó neve</th>
                    </tr>
                </thead>
                <tbody>
                    {halak.map((hal) => (
                        <tr key={hal.id}>
                            <td>{hal.nev}</td>
                            <td>{hal.toNev}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const FogasokList = () => {
    const [fogasok, setFogasok] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7129/api/Halak/fogasok')
            .then((response) => {
                setFogasok(response.data);
            })
            .catch((error) => {
                console.error('Error fetching fogasok:', error);
            });
    }, []);

    return (
        <div className="card">
            <h3 className="card-title">Fogások</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Horgász neve</th>
                        <th>Hal neve</th>
                        <th>Dátum</th>
                    </tr>
                </thead>
                <tbody>
                    {fogasok.map((fogas, index) => (
                        <tr key={index}>
                            <td>{fogas.horgaszNev}</td>
                            <td>{fogas.halNev}</td>
                            <td>{fogas.datum}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Top3Hal = () => {
    const [topHalak, setTopHalak] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7129/api/Halak/top3hal')
            .then((response) => {
                setTopHalak(response.data);
            })
            .catch((error) => {
                console.error('Error fetching top halak:', error);
            });
    }, []);

    return (
        <div className="card">
            <h3 className="card-title">A 3 legnagyobb hal</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Hal neve</th>
                        <th>Méret (cm)</th>
                    </tr>
                </thead>
                <tbody>
                    {topHalak.map((hal, index) => (
                        <tr key={index}>
                            <td>{hal.nev}</td>
                            <td>{hal.meretCm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    return (
        <div className="app-container">
            <HalakList />
            <FogasokList />
            <Top3Hal />
        </div>
    );
};

export default App;
