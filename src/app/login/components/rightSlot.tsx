'use client';
import React, { useState, useEffect} from 'react';

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import '../styles/rightSlotStyle.css'

export const RightSlot = () => {
    const { toast } = useToast()
    const [CI, setCI] = useState<string>(""); // Estado para controlar la visibilidad
    const [id, setid] = useState<string>(""); // Estado para controlar la visibilidad
    const [permiso, setPermiso] = useState<boolean>(true); // 1 segundo



    const handleClick = async () => {
        console.log("Exito");
      };
    

  return (   
    <Card className="mx-auto right-slot table-hs3">
            <CardHeader className="space-y-1">
                <CardTitle className="text-4xl font-bold text-center mt-6"><span className="text-highlight">Bienvenido</span></CardTitle>
            </CardHeader>
            <CardContent className="max-w-2xl m-auto">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="C.I" className="font-bold">Cedula de identidad</Label>
                        <Input id="C.I" placeholder="Cedula de identidad" required type="C.I" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCI(event.target.value) }} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="id" className="font-bold">ID</Label>
                        <Input id="id" required type="id" placeholder="ID"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setid(event.target.value) }}/>
                    </div>

                    <Button className= {`w-full ${permiso && 'bg-[#799FCB]'} ${!permiso && 'bg-[#111827] cursor-not-allowed opacity-100	'}`}   type="submit">
                        Login
                    </Button>
                </div>
                
            </CardContent>
    </Card>);
};