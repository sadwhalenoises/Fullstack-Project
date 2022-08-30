import axios from 'axios';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react"

const Profile = (props) => {

    /*
    Api call results:

    championId: 202
    championLevel: 7
    championPoints: 334084
    championPointsSinceLastLevel: 312484
    championPointsUntilNextLevel: 0
    chestGranted: true
    lastPlayTime: 1658970993000
    summonerId: "FURrC3YvfV9rEk45doxgJjYY1g-8cvpYfhNS_sIIc8szFiM"
    tokensEarned: 0
*/
    console.log(props.data.id)
    const[champList, setChampList] = useState();
    const[champ1, setChamp1] = useState();
    const[champ2, setChamp2] = useState();
    const[champ3, setChamp3] = useState();
    let summonerId;
    let champId;

    const getChampID = async () => {  
        await axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${props.data.id}/?api_key=RGAPI-0dfc45f0-aa69-4812-b6fd-7c725acee629`).then(res =>{
            
        setChampList(res);
        

        });

        await axios.get("http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json").then(res =>{
            
            champId = [champList.data[0].championId,
            champList.data[1].championId,
            champList.data[2].championId] 

            let champNames = [];


            for(const champ in res.data.data){
                if(res.data.data[champ].key == champId[0]){
                    setChamp1(res.data.data[champ].id)
                }else if(res.data.data[champ].key == champId[1]){
                    setChamp2(res.data.data[champ].id)
                }else if(res.data.data[champ].key == champId[2]){
                    setChamp3(res.data.data[champ].id)
                }
                
            }
            
        });
        
        

    }

    useEffect(() =>{
        getChampID();
        
    }, [props.data.id]);  


    return(

        <>

            <Col md={4}>
                <img src={`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${champ1}.png`} alt='' />
                <h1>Hi</h1>
                </Col>
            <Col md={4}>
                <img src={`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${champ2}.png`} alt='' />
                </Col>
            <Col md={4}>
                <img src={`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${champ3}.png`} alt='' />
                </Col>
        </>

    )

  
}

export default Profile