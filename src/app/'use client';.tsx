'use client';

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

export const LeftSlot = () => {

  const [activeCard, setActiveCard] = useState(true);
  const propsGreen = useSpring({ opacity: activeCard ? 1 : 0, transform: activeCard ? 'translateY(0px)' : 'translateY(-30px)' });
  const propsRed = useSpring({ opacity: !activeCard ? 1 : 0, transform: !activeCard ? 'translateY(0px)' : 'translateY(-30px)' });
  const [email, setEmail] = useState<string>(""); // Estado para controlar la visibilidad
  const [password, setPassword] = useState<string>(""); // Estado para controlar la visibilidad
  const router = useRouter();
  const [permiso, setPermiso] = useState<boolean>(true); // 1 segundo

  const handleClickForgetPassword = async () => {
      alert()
  };

  const handleClick2 = async () =>  {
    console.log("prueba");
    };

  const handleToggle = () => {
    setActiveCard(!activeCard);
  };

  return (
    <div>
      <animated.div style={propsGreen} className="card green-card animated-div">
        {activeCard && (
           <div className="admin-marign-top-7-5">
            <CardHeader className="space-y-1">
                <CardTitle className="text-4xl font-bold text-center">Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardContent className="max-w-2xl m-auto">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold">Email</Label>
                        <Input id="email" placeholder="Correo" required type="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value) }} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-bold">Contraseña</Label>
                        <Input id="password" required type="password" placeholder="Password"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value) }}/>
                    </div>

                    <div className="forminput-holder text-[#428BCA]">
                        <a id="forgot_btn" onClick={handleClickForgetPassword}  className="hotelhide cursor-pointer	">¿Olvidó su contraseña?</a>
                    </div>

                    <Button onClick={handleClick2} className= {`w-full ${permiso && 'bg-[#3c9fc4]'} ${!permiso && 'bg-[#111827] cursor-not-allowed opacity-100	'}`}   type="submit">
                        Login
                    </Button>
                </div>
                
            </CardContent>
       </div>
        )}
      </animated.div>
      <animated.div style={propsRed} className="card red-card">
        {!activeCard && (
          <div className="admin-marign-top-7-5">
          <CardHeader className="space-y-1">
              <CardTitle className="text-4xl font-bold text-center">REGISTRO</CardTitle>
          </CardHeader>
          <CardContent className="max-w-2xl m-auto">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold">Email</Label>
                            <Input id="email" placeholder="Correo" required type="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value) }} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="font-bold">Contraseña</Label>
                            <Input id="password" required type="password" placeholder="Password"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value) }}/>
                        </div>

                        <div className="forminput-holder text-[#428BCA]">
                            <a id="forgot_btn" onClick={handleClickForgetPassword}  className="hotelhide cursor-pointer	">¿Olvidó su contraseña?</a>
                        </div>

                        <Button onClick={handleClick2} className= {`w-full ${permiso && 'bg-[#3c9fc4]'} ${!permiso && 'bg-[#111827] cursor-not-allowed opacity-100	'}`}   type="submit">
                            Login
                        </Button>
                    </div>
                    
                </CardContent>
            </div>
        )}
      </animated.div>
      <button onClick={handleToggle}>Cambiar Tarjeta</button>
    </div>
  );
}