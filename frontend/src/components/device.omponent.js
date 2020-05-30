import React, { useState, useContext, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import { AuthContext } from "../context/AuthContext";
import Message from "./message.component";

const device = () => {
    const [device, setDevice] = useState({name:""})
    const [devices, setDevices] = useState([])
    const [message, setMessage] = useState(null)
    const authContext = useContext(AuthContext)

    useEffect(() => {
        DeviceService.getDevices().then((data)=>{
            setDevice(data.devices)
        })
    })

    const onSubmit = e =>{
        e.preventDefault()
        DeviceService.postDevices(device).then((data)=>{
            const {message} = data;
            resetForm()

            if(!message.msgError){
                DeviceService.getDevices.then((getData)=>{
                    setDevices(getData.devices)
                    setMessage(message)
                })
            }else if (message.msgBody === "unAuthorized")
        })
    }
};
