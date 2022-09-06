import React, {useState} from 'react'
import axios from 'axios'
import { Container,Col, Row } from 'react-bootstrap'



const LastMatch = (props) => {
    const [playerSearch, setPlayerSearch] = useState()
    const [regionSelect, setRegionSelect] = useState("")
    
    const [playerData, setPlayerData] = useState({})
    const [lastMatchData, setLastMatchData] = useState({})
    const [lastMatchPlayerData, setLastMatchPlayerData] = useState({})

    const API_KEY = ;

    let puuid = undefined

    async function handleClick(event) {
        var sumNameAPICallString = "https://" + regionSelect + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerSearch + "?api_key=" + API_KEY
            try {
                let response = await axios.get(sumNameAPICallString)
                console.log(response.data)
                setPlayerData(response.data)
            } catch (error) {
                console.log(error)
            }
            puuid = playerData.puuid            
            console.log(puuid)
            if (puuid !== undefined) {
                getLastMatchID();
                if (lastMatchData !== undefined){
                    getLastMatchData();
                }
            }
            
    }
        var region
    async function getLastMatchID() {
        // await axios.get(sumNameAPICallString).then(async function (response) {
        //     //Success
            
        //     console.log(playerData)
        //     setPlayerData(response.data)
           
        // }).catch(async function (error) {
        //     //Error
        //     console.log(error)
        // })
        
        
        
        if (regionSelect === "br1" || regionSelect === "na1" || regionSelect === "la1"  || regionSelect === "la2") {
            region = "americas"
        } else if (regionSelect === "eun1" || regionSelect === "euw1" || regionSelect === "tr1" || regionSelect === "ru"){
            region = "europe"
        } else if (regionSelect === "jp1" || regionSelect === "kr"){
            region = "asia"
        } else {
            region = "sea"
        }
        
        var lastMatchAPICallString = "https://" + region + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=1&api_key=" + API_KEY
        
        try{
            let response = await axios.get(lastMatchAPICallString);
            console.log(response.data)
            setLastMatchData(response.data)
        }catch(error) {
            console.log(error)
        }
        // await axios.get(lastMatchAPICallString).then(async function(response){
        //     //Success
        //     console.log(response.data)
        //     setLastMatchData(response.data)
        // }).catch(async function (error) {
        //     console.log(error)
        // }) 
    }

    async function getLastMatchData() {
        var lastMatchAPIDataCallString = "https://" + region + ".api.riotgames.com/lol/match/v5/matches/" + lastMatchData + "?api_key=" + API_KEY
        
        try{
            let response = await axios.get(lastMatchAPIDataCallString)
            console.log(response.data)
            setLastMatchPlayerData(response.data)
        }catch (error) {
            console.log(error)
        }
        // await axios.get(lastMatchAPIDataCallString).then(async function(response){
        //     console.log(response.data)
        //     setLastMatchPlayerData(response.data)
        // }).catch(async function(error){
        //     console.log(error)
        // })
    }

    function unixTimetoString(number) {
        var date = new Date(number);
        return (date.toString())
    }

        return (
            <>
                <div><h1>Last Match Results</h1>
                    <div onChange={event => setRegionSelect(event.target.value)}>
                        <input type="radio" value="br1" name="regionSelection"/>
                            <label>Brasil</label><br></br>
                        <input type="radio" value="eun1" name="regionSelection"/>
                            <label>Europe Nordic and East</label><br></br>
                        <input type="radio" value="euw1" name="regionSelection"/>
                            <label>Europe West</label><br></br>
                        <input type="radio" value="jp1" name="regionSelection"/>
                            <label>Japan</label><br></br>
                        <input type="radio" value="kr" name="regionSelection"/>
                            <label>Korea</label><br></br>
                        <input type="radio" value="la1" name="regionSelection"/>
                            <label>Latin America North</label><br></br>
                        <input type="radio" value="la2" name="regionSelection"/>
                            <label>Latin America South</label><br></br>
                        <input type="radio" value="na1" name="regionSelection"/>
                            <label>North America</label><br></br>
                        <input type="radio" value="oc1" name="regionSelection"/>
                            <label>Oceania</label><br></br>
                        <input type="radio" value="tr1" name="regionSelection"/>
                            <label>Turkey</label><br></br>
                        <input type="radio" value="ru" name="regionSelection"/>
                            <label>Russia</label>
                    </div>
                    <br></br>
                    <br></br>
                    <input type="text" id="summonerName" onChange={e => setPlayerSearch(e.target.value)}></input>
                    <button onClick={e=>handleClick(e)}>Search for player</button>
                </div>
                
            
                {JSON.stringify(playerData) !=="{}" ? 
                <>
                    <p>{playerData.name}</p>
                    <p>Summoner Level: {playerData.summonerLevel}</p>
                    <img width="100" height="100"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/" + playerData.profileIconId +".png"}></img>
                    <br></br>
                    <button onClick={e=>handleClick(e)}>Generate Match Results by hitting 2x</button>
                </>
                : <><p></p></>
                }
                {JSON.stringify(lastMatchPlayerData) !=="{}" ? 
                <>
                    <p>Game Start: {unixTimetoString(lastMatchPlayerData.info.gameCreation)}</p>
                    <p>Game Finish: {unixTimetoString(lastMatchPlayerData.info.gameEndTimestamp)}</p>
                    <br></br>
                    <Container>
                        <Row>
                            <Col lg={6} md={6} sm={12}><h3>Blue Side</h3>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[0].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[0].championName} 
                                <img width="50" height="50" alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[0].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[0].kills} / {lastMatchPlayerData.info.participants[0].deaths} / {lastMatchPlayerData.info.participants[0].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[0].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[0].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[0].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[0].item3 +".png"}></img>
                                <img width="25" height="25" alt=""  src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[0].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[0].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[0].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[1].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[1].championName} 
                                <img width="50" height="50"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[1].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[1].kills} / {lastMatchPlayerData.info.participants[1].deaths} / {lastMatchPlayerData.info.participants[1].assists}
                                </p>
                                <p>Items: <img width="25" height="25" alt=""  src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[1].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[1].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[1].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[1].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[1].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[1].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[1].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[2].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[2].championName} 
                                <img width="50" height="50" alt=""  src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[2].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[2].kills} / {lastMatchPlayerData.info.participants[2].deaths} / {lastMatchPlayerData.info.participants[2].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[2].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[2].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[2].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[2].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[2].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[2].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[2].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[3].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[3].championName} 
                                <img width="50" height="50"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[3].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[3].kills} / {lastMatchPlayerData.info.participants[3].deaths} / {lastMatchPlayerData.info.participants[3].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[3].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[3].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[3].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[3].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[3].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[3].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[3].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[4].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[4].championName} 
                                <img width="50" height="50" alt=""  src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[4].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[4].kills} / {lastMatchPlayerData.info.participants[4].deaths} / {lastMatchPlayerData.info.participants[4].assists}
                                </p>
                                <p>Items: <img width="25" height="25" alt=""  src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[4].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[4].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[4].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[4].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[4].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[4].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[4].item6 +".png"}></img></p>
                                <br></br>
                            </Col>
                            <Col lg={6} md={6} sm={12}><h3>Red Side</h3>
                            <h6>Summoner Name: {lastMatchPlayerData.info.participants[5].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[5].championName} 
                                <img width="50" height="50"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[5].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[5].kills} / {lastMatchPlayerData.info.participants[5].deaths} / {lastMatchPlayerData.info.participants[5].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[5].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[5].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[5].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[5].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[5].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[5].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[5].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[6].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[6].championName} 
                                <img width="50" height="50"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[6].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[6].kills} / {lastMatchPlayerData.info.participants[6].deaths} / {lastMatchPlayerData.info.participants[6].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[6].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[6].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[6].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[6].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[6].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[6].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[6].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[7].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[7].championName} 
                                <img width="50" height="50"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[7].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[7].kills} / {lastMatchPlayerData.info.participants[7].deaths} / {lastMatchPlayerData.info.participants[7].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[7].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[7].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[7].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[7].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[7].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[7].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[7].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[8].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[8].championName} 
                                <img width="50" height="50"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[8].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[8].kills} / {lastMatchPlayerData.info.participants[8].deaths} / {lastMatchPlayerData.info.participants[8].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[8].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[8].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[8].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[8].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[8].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[8].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[8].item6 +".png"}></img></p>
                                <br></br>
                                <h6>Summoner Name: {lastMatchPlayerData.info.participants[9].summonerName}</h6>
                                <p>{lastMatchPlayerData.info.participants[9].championName} 
                                <img width="50" height="50"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" + lastMatchPlayerData.info.participants[9].championName +".png"}></img>
                                 {lastMatchPlayerData.info.participants[9].kills} / {lastMatchPlayerData.info.participants[9].deaths} / {lastMatchPlayerData.info.participants[9].assists}
                                </p>
                                <p>Items: <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[9].item0 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[9].item1 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[9].item2 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[9].item3 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[9].item4 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[9].item5 +".png"}></img>
                                <img width="25" height="25"  alt="" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/"+ lastMatchPlayerData.info.participants[9].item6 +".png"}></img></p>
                                <br></br>
                            </Col>
                        </Row>
                    </Container>
                </>
                : <><p></p></>
                }

            </>
        );
    }

export default LastMatch