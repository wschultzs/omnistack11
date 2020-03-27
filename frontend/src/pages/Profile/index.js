import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import LogoImg from '../../assets/logo.svg'
import HeroesImg from '../../assets/heroes.png'

import {FiPower, FiTrash2}  from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'

export default function Profile() {

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get("profile", {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDelete(id) {
        try {
            api.delete(`incidents/${id}`, {
                header: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(filter => filter.id !== id))
        } catch {
            alert("Erro ao deletar caso, tente novamente")
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be The Hero!"/>
                <span>Bem-vindo, {ongName}!</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower  color="#e02041" size={18}/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDelete(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}