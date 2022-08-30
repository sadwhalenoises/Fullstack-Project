import React, {useState} from 'react'
import axios from 'axios'



const LastMatch = (props) => {
    const [playerSearch, setPlayerSearch] = useState()
    const [regionSelect, setRegionSelect] = useState("")
    
    const [playerData, setPlayerData] = useState({})
    const [lastMatchData, setLastMatchData] = useState({})
    const [lastMatchPlayerData, setLastMatchPlayerData] = useState({})

    const API_KEY = ;

    

    async function handleClick(event) {
        var sumNameAPICallString = "https://" + regionSelect + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerSearch + "?api_key=" + API_KEY
        let puuid
        
        const playerDataGet = async () => {
            try {
                let response = await axios.get(sumNameAPICallString)
                console.log(response.data)
                setPlayerData(response.data)
                puuid = playerData.puuid
            } catch (error) {
                console.log(error)
            }
        }
        
        
        // await axios.get(sumNameAPICallString).then(async function (response) {
        //     //Success
            
        //     console.log(playerData)
        //     setPlayerData(response.data)
           
        // }).catch(async function (error) {
        //     //Error
        //     console.log(error)
        // })
        
        var region
        
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

    // function unixTimetoString(number) {
    //     var date = new Date(number*1000);
    //     console.log("Unix Timestamp:",number)
    //     console.log("Date Timestamp:",date.getTime())
    //     console.log(date)
    //     console.log("Date: "+date.getDate()+
    //               "/"+(date.getMonth()+1)+
    //               "/"+date.getFullYear()+
    //               " "+date.getHours()+
    //               ":"+date.getMinutes()+
    //               ":"+date.getSeconds());
    //     return 
    // }

        return (
            <>
                <h1>Last Match Results</h1>
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
            
                {JSON.stringify(playerData) !=="{}" ? 
                <>
                    <p>{playerData.name}</p>
                    <p>Summoner Level: {playerData.summonerLevel}</p>
                    <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/" + playerData.profileIconId +".png"}></img>
                    <h5>
                        Last Match Statistics: 
                    </h5>
                    
                    
                </>
                : <><p></p></>
                }
            
            </>
        );
    }

export default LastMatch