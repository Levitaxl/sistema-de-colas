'use client';
import React, { useState, useEffect} from 'react';
import { useSpring, animated } from 'react-spring';

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import io from "socket.io-client"

import '../styles/rightSlotStyle.css'



export const RightSlot = () => {
    const socket = io("http://localhost:3001/")
    



    const [selectedReason, setSelectedReason] = useState('');
    const [isUser, setIsUser] = useState(false);
    const [userName, setUserName] = useState("")
    const [posicion, setPosicion] = useState("")
    const [activeCard, setActiveCard] = useState(0);
    const [CI, setCI] = useState<string>(""); 
    const [id, setid] = useState<string>("");
    const [permiso, setPermiso] = useState<boolean>(true); 
    const [letra, setLetra] = useState<string>(""); 

    const animation = useSpring({
        opacity: activeCard == 0 ? 1 : 0,
        transform: activeCard== 0 ? 'scale(1)' : 'scale(0.5)', 
        config: { mass: 1, tension: 250, friction: 40 }, 
      });
    
      const animation2 = useSpring({
        opacity: activeCard == 1 ? 1 : 0,
        transform: activeCard == 1 ? 'scale(1)' : 'scale(0.5)',
        config: { mass: 1, tension: 250, friction: 40 },
      });

      
      const animation3 = useSpring({
        opacity: activeCard == 2 ? 1 : 0,
        transform: activeCard ==2 ? 'scale(1)' : 'scale(0.5)',
        config: { mass: 1, tension: 250, friction: 40 },
      });


      useEffect(()=>{
        socket.on('message', response =>{
          console.log(response)
          response = JSON.parse(response)
          console.log(response)

          const responseFase = response.responseFase;
          console.log(responseFase)
          if(responseFase==1){
            setActiveCard(1);
            const isUser = response.isUser
            setIsUser(isUser);
            if(isUser){
              setUserName(response.nombre)
            }

            else{
              setUserName(CI)
            }
          }

          else if(responseFase==2){
            console.log("PRUEBA")
            setActiveCard(2);
            console.log(response.posicion)
            const new_id = response.posicion;
            const new_letra = response.letra;
            setPosicion(new_id);
            setLetra(new_letra)

            setTimeout(() => {
              setActiveCard(0);
          }, 5000); // 5000 milisegundos = 5 segundos


          }

        })

        return () => {
          socket.off('message')
        }
      },[])

      const CheckboxOption = ({ label, value, isSelected, onCheckboxChange, classname2 }) => (
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={value} // Use unique IDs for radio buttons
            name="reason" // Use a common name to group radio buttons
            value={value}
            checked={isSelected === value}
            onChange={onCheckboxChange}
          />
          <label className= {classname2} htmlFor={value}>{label}</label>
        </div>
      );
      const handleCheckboxChange = (event) => {
        setSelectedReason(event.target.value);
      };
    

      const passButton = (valor) => {
        if(valor == 1){
          const user = {
            'fase' : 1,
            'ci'   : CI,
            "id"   : id
          }

          const jsonString = JSON.stringify(user);

          socket.emit('message',jsonString);
        }

        else if(valor == 2){
          const user = {
            'fase' : 2,
            'ci'   : CI,
            "id"   : id,
            "selectedReason" : selectedReason
          }

          const jsonString = JSON.stringify(user);
          socket.emit('message',jsonString);
        }
       
       /*
        if (valor === 2) {
            // Si valor es 3, se ejecuta un setTimeout
            setTimeout(() => {
                setActiveCard(0);
            }, 5000); // 5000 milisegundos = 5 segundos
        } */
    };

    const backButton = (valor) => {
      setActiveCard(valor);
     
    
  };
    


  return (  
    <div className="mx-auto right-slot table-hs3">
              <animated.div style={animation}>

  <Card className={`card-style  ${activeCard==0 ? 'show' : 'animated-div'}`}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-4xl font-bold text-center"><span className="text-highlight">Bienvenido</span></CardTitle>
                </CardHeader>
                <CardContent className="max-w-2xl m-auto">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="C.I" className="font-bold"><span className="text-highlight">| </span>Cedula de identidad</Label>
                            <Input id="C.I" placeholder="Cedula de identidad" required type="C.I" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCI(event.target.value) }} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="id" className="font-bold"><span className="text-highlight">| </span>ID</Label>
                            <Input id="id" required type="id" placeholder="ID"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setid(event.target.value) }}/>
                        </div>

                        <Button onClick={() => passButton(1)}  className= {`w-full ${permiso && 'bg-[#799FCB]'} ${!permiso && 'bg-[#111827] cursor-not-allowed opacity-100	'}`}   type="submit">
                            Continuar
                        </Button>
                    </div>
                    
                </CardContent>
        </Card>
        </animated.div>

        <animated.div style={animation2}>
        <Card className={`card-style  ${activeCard==1 ? 'show' : 'animated-div'}`}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-4xl font-bold text-center"><span className="text-highlight">Bienvenido</span> <span className="color-white"> {userName} </span></CardTitle>
                </CardHeader>
                <CardContent className="max-w-2xl m-auto">
                    <div className = "font-bold"><span className="color-white"> <span className="text-highlight">| Cedula:</span>  {CI}</span> <br></br><span className="text-highlight">|</span><span className="color-white"> Servicio a solicitar</span> </div>
                    <br></br>
            <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
                <CheckboxOption
                    label="Atención por taquilla"
                    value="atencion_taquilla"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                />
                <CheckboxOption
                    label="Apertura de cuentas"
                    value="apertura_cuentas"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                />
                {isUser && 
                <CheckboxOption
                    label="Promotor de servicios"
                    value="promotor_servicios"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                />}
                <CheckboxOption
                    label="Atención preferencial"
                    value="atencion_preferencial"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                />
                {isUser && <CheckboxOption
                    label="Emisión de chequeras"
                    value="emision_chequeras"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                />}
                {isUser &&  <CheckboxOption
                    label="Tarjetas"
                    value="tarjetas"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                /> }
                </div>


        
        <div className="flex">
          <Button onClick={() => backButton(0)} className={`w-[50%] mr-[25%] ${permiso && 'bg-[#799FCB]'}`} type="submit">
            Atras
          </Button>
          <Button
            onClick={() => passButton(2)}
            className={`w-[50%] ${permiso && 'bg-[#799FCB]'}`}
            type="submit"
            disabled={!selectedReason} // Disable submit button if no reason is selected
          >
            Continuar
          </Button>
        </div>
      </div>
    </CardContent>

        </Card>
        </animated.div>

        <animated.div style={animation3}>
                <Card className={`card-style  ${activeCard==2 ? 'show' : 'animated-div'}`}>
                        <CardHeader className="space-y-1 m-auto">
                            <CardTitle className="text-4xl font-bold text-center"><span className="text-highlight">Número: </span> <span className="color-white"> {posicion} </span></CardTitle>
                            <CardTitle className="text-4xl font-bold text-center"><span className="text-highlight">Letra: </span> <span className="color-white"> {letra} </span></CardTitle>
                        </CardHeader>

        </Card>
        </animated.div>
    </div>
    
    );
};