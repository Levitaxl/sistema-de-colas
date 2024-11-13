'use client';
import React, { useState, useEffect} from 'react';

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation';

import '../styles/rightSlotStyle.css'

export const RightSlot = () => {
    const { toast } = useToast()
    const [email, setEmail] = useState<string>(""); // Estado para controlar la visibilidad
    const [password, setPassword] = useState<string>(""); // Estado para controlar la visibilidad
    const [permiso, setPermiso] = useState<boolean>(true); // 1 segundo



    const handleClick = async () => {
        console.log("Exito");
      };


      const handleClickForgetPassword = async () => {

        toast({
            variant:"default",
            className: 
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500	 text-white	 '
              ,
          title: "User.",
          description: "Email: user@user.com / password: user123#",
          action: <ToastAction altText="Cerrar">Cerrar</ToastAction>
        })
 
      };
      
    

  return (   
    <Card className="mx-auto right-slot">
        <div className="admin-marign-top-9-5">
            <CardHeader className="space-y-1">
                <CardTitle className="text-4xl font-bold text-center mt-6">Bienvenido</CardTitle>
            </CardHeader>
            <CardContent className="max-w-2xl m-auto">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold">Email</Label>
                        <Input id="email" placeholder="Email address" required type="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value) }} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-bold">Password</Label>
                        <Input id="password" required type="Password" placeholder="Password"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value) }}/>
                    </div>

                    <div className="forminput-holder text-[#428BCA]">
                        <a id="forgot_btn" onClick={handleClickForgetPassword}  className="hotelhide cursor-pointer	">Did you forget your password?</a>
                    </div>

                    <Button onClick={handleClick} className= {`w-full ${permiso && 'bg-[#799FCB]'} ${!permiso && 'bg-[#111827] cursor-not-allowed opacity-100	'}`}   type="submit">
                        Login
                    </Button>
                </div>
                
            </CardContent>
        </div>
    </Card>);
};