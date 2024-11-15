"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckboxOption } from "./CheckboxOption";
import io from "socket.io-client";
import "../styles/rightSlotStyle.css";

export const RightSlot = () => {
  /* Conexión al socket */
  const socket = io("https://backend-proyecto-colas.onrender.com");


  /* Variable de los estados */
  const [selectedReason, setSelectedReason] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [posicion, setPosicion] = useState("");
  const [activeCard, setActiveCard] = useState(0);
  const [CI, setCI] = useState("");
  const [id, setid] = useState("");
  const [permiso, setPermiso] = useState<boolean>(true);
  const [letra, setLetra] = useState<string>("");


  /* Estilo de las animaciones de los card */
  const firstAnimationStyle = useSpring({
    opacity: activeCard == 0 ? 1 : 0,
    transform: activeCard == 0 ? "scale(1)" : "scale(0.5)",
    config: { mass: 1, tension: 250, friction: 40 },
  });

  const secondAnimationStyle = useSpring({
    opacity: activeCard == 1 ? 1 : 0,
    transform: activeCard == 1 ? "scale(1)" : "scale(0.5)",
    config: { mass: 1, tension: 250, friction: 40 },
  });

  const thirdAnimationStyle = useSpring({
    opacity: activeCard == 2 ? 1 : 0,
    transform: activeCard == 2 ? "scale(1)" : "scale(0.5)",
    config: { mass: 1, tension: 250, friction: 40 },
  });

  /* UseEffect para la recepción de las respuesta del socket servidor */
  useEffect(() => {
    /* Respuesta en el socket 'message' */
    socket.on("message", (response) => {
      /* Procesamos el response, de json a un objeto en javascript' */
      response = JSON.parse(response);

      /* Obtenemos la fase del card
        Fase0: Ingresar los datos
        Fase1: Ingresar motivo de la visita
        Fase2: Mostrar información del turno del usuario
      */
      const responseFase = response.responseFase;

      /* Fase 1: Verificamos si el usuario esta o no registrado
      Si lo esta, marcamos la variable isUser como true en caso contrario
      como false.
      
      Si es un usuario registrado, también asignamos el nombe para mostrarlo,
      en caso contrario, mostramos solamente la Cédula*/
      if (responseFase == 1) {
        setActiveCard(1);
        const isUser = response.isUser;
        setIsUser(isUser);
        if (isUser) setUserName(response.nombre);
        else setUserName(CI);
      } 

       /* Fase 2: Recibimos si el usuario ya esta en alguna cola, si no lo esta, el sistema en el 
       backend lo registra, en caso contrario, devuelve la información en su cola, la posicion y la letra
       correspondiente.
       
       Luego el sistema muestra el card durante 5 segundos, para finalmente volver a la fase 0, es decir
       a la primera de todas, ingresar los datos del usuario.*/
      else if (responseFase == 2) {
        setActiveCard(2);
        setPosicion(response.posicion);
        setLetra(response.letra);
        setCI("")
        setid("")

        setTimeout(() => {
          setActiveCard(0);
        }, 5000); // 5000 milisegundos = 5 segundos
      }
    });

    /*Cerramos el socket*/
    return () => {
      socket.off("message");
    };
  }, []);


  /*Función para seleccionar solo un elemento del checkbox del listado de motivos de visita*/
  const handleCheckboxChange = (event) => {
    setSelectedReason(event.target.value);
  };

  /*Función para pasar a la siguiente card o paso para el usuario.*/

  /*Para pasar a la fase 1, le tenemos que enviar al socket la fase, la Cédula de identidad y el id del usuario,
  lo pasamos con un string en formato json al socket mensaje

  Para pasar a la fase 2, le enviamos la misma información al socket, mas el motivo de la visita para que el backend 
  la procese
  */

  const passButton = (valor) => {
    if (valor == 1) {
      const user = { fase: 1, ci: CI, id: id };
      const jsonString = JSON.stringify(user);
      socket.emit("message", jsonString);
    } else if (valor == 2) {
      const user = { fase: 2, ci: CI, id: id, selectedReason: selectedReason };
      const jsonString = JSON.stringify(user);
      socket.emit("message", jsonString);
    }
  };

  /*Funcion para devolverse a un paso anterior del flujo de cola */
  const backButton = (valor) => {
    setActiveCard(valor);
  };

  return (
    <div className="mx-auto right-slot table-hs3">
      <animated.div style={firstAnimationStyle}>
        <Card
          className={`card-style  ${activeCard == 0 ? "show" : "animated-div"}`}
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-4xl font-bold text-center">
             <img src="Banco Universal - logo.png" alt="Banco Universal - logo" className="img-responsive-title"/>
              <span className="text-highlight">¡Bienvenido/a!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-w-2xl m-auto">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="C.I" className="font-bold">
                  <span className="text-highlight">| </span>
                  <span className="color-white">Cédula de identidad</span>
                </Label>
                <Input
                  id="C.I"
                  placeholder="Cédula de identidad"
                  required
                  type="number"
                  value= {CI}
                  min="1" // Establece el valor mínimo a 1
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newCi = parseInt(event.target.value);
                    if (newCi > 0) {
                      setCI(event.target.value);
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id" className="font-bold">
                  <span className="text-highlight">| </span>
                  <span className="color-white">ID</span>
                </Label>
                <Input
                  id="id"
                  required
                  type="number"
                  placeholder="ID"
                  value={id}
                  min="1" // Establece el valor mínimo a 1
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newId = parseInt(event.target.value);
                    if (newId > 0) {
                      setid(event.target.value);
                    }
                  }}
                />

              </div>
                <br></br>
              <Button
                onClick={() => passButton(1)}
                className={`w-full mt-[50px] ${permiso && "bg-[#799FCB]"} ${
                  !permiso && "bg-[#111827] cursor-not-allowed opacity-100	"
                }`}
                type="submit"
                disabled={CI === "" || id === ""}
              >
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </animated.div>

      <animated.div style={secondAnimationStyle}>
        <Card
          className={`card-style  ${activeCard == 1 ? "show" : "animated-div"}`}
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-4xl font-bold text-center">
              <span className="text-highlight">¡Bienvenido/a!</span>{" "}
              <span className="color-white"> {userName} </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-w-2xl m-auto">
            <div className="font-bold">
              <span className="color-white">
                {" "}
                <span className="text-highlight">| Cédula:</span> {CI}
              </span>{" "}
              <br></br>
              <span className="text-highlight">|</span>
              <span className="color-white"> Servicio a solicitar</span>{" "}
            </div>
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
                {isUser && (
                  <CheckboxOption
                    label="Promotor de servicios"
                    value="promotor_servicios"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                  />
                )}
                <CheckboxOption
                  label="Atención preferencial"
                  value="atencion_preferencial"
                  isSelected={selectedReason}
                  onCheckboxChange={handleCheckboxChange}
                  classname2="mr-[10px]"
                />
                {isUser && (
                  <CheckboxOption
                    label="Emisión de chequeras"
                    value="emision_chequeras"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                  />
                )}
                {isUser && (
                  <CheckboxOption
                    label="Tarjetas"
                    value="tarjetas"
                    isSelected={selectedReason}
                    onCheckboxChange={handleCheckboxChange}
                    classname2="mr-[10px]"
                  />
                )}
              </div>

              <div className="flex">
                <Button
                  onClick={() => backButton(0)}
                  className={`w-[50%] mr-[25%] ${permiso && "bg-[#799FCB]"}`}
                  type="submit"
                >
                  Atras
                </Button>
                <Button
                  onClick={() => passButton(2)}
                  className={`w-[50%] ${permiso && "bg-[#799FCB]"}`}
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

      <animated.div style={thirdAnimationStyle}>
        <Card
          className={`card-style  ${activeCard == 2 ? "show" : "animated-div"}`}
        >
          <CardHeader className="space-y-1 m-auto">
            <CardTitle className="text-4xl font-bold text-center">
              <span className="text-highlight">Número: </span>{" "}
              <span className="color-white"> {posicion} </span>
            </CardTitle>
            <CardTitle className="text-4xl font-bold text-center">
              <span className="text-highlight">Letra: </span>{" "}
              <span className="color-white"> {letra} </span>
            </CardTitle>
          </CardHeader>
        </Card>
      </animated.div>
    </div>
  );
};