import React from 'react';
import { Card, Button, Icon } from 'antd';
import arrowRight from '../../../assets/arrowRight.svg';

const Support = (props) => {
    return(
        <Card style={{backgroundColor:"#002C39", color:"#ffffff"}}>
            <h1 style={{marginBottom:0, color:"#ffffff"}}><b>Support</b></h1>
            <p style={{marginTop:0}}>Got stuck somewhere? We would love to help!</p>
            <p style={{marginTop:"12%", color:"rgba(255, 255, 255, 0.7)"}}>
                <img src={arrowRight} /> 
                <span style={{marginLeft:"2%"}} >Trouble using Space Cloud?</span>
            </p>
            <p style={{color:"rgba(255, 255, 255, 0.7)"}}>
                <img src={arrowRight} /> 
                <span style={{marginLeft:"2%"}}>Have any bugs / feature requests?</span>
            </p>
            <p style={{marginBottom:"10%", color:"rgba(255, 255, 255, 0.7)"}}>
                <img src={arrowRight} /> 
                <span style={{marginLeft:"2%"}}>Billing problem?</span>
            </p>
            <Button type='primary'ghost style={{width:"100%"}} onClick={props.contact}>Contact us</Button>
        </Card>
    );
}

export default Support;