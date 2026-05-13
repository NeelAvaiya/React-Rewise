import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authService } from '../services/authService';

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(data);
      console.log('Registration successful:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h1>About</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
        <input type="email" placeholder="Email" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
        <input type="password" placeholder="Password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}