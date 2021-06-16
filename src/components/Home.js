import React, { useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom"

export default function Home() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        try {
            await logout()
            history.push('/login')
        }
        catch {
            
        }
    }

    return (
        <div>
        <Button variant="link" onClick={handleLogout}>Log out</Button>
        </div>
    )
}