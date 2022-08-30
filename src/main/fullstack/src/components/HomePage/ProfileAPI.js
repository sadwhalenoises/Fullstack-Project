import React from 'react'
import {useState, useEffect} from "react";
import axios from 'axios';
import Homepage from './ProfileContainer'
function ProfileAPI() {

    const [userProfile, setUserProfile] = useState({});
      /* Api return values:
      accountId: "ZDq2S_emImYBwDxDIXI7l1CXa4Noq7_af7bNfqKZz0uZcg"
      id: "FURrC3YvfV9rEk45doxgJjYY1g-8cvpYfhNS_sIIc8szFiM"
      name: "Doublelift"
      profileIconId: 2076
      puuid: "MSp83bupiiKf4aAkDR3b6L7Q2ZSvwA7ZYU7yiGBw_xyK1FqTYfvtAGiMamJBcHqdWSjFCFgmQL52vQ"
      revisionDate: 1661647646000
      summonerLevel: 347
*/
  
    
      const fetchData = async () => {
        const reponse = await axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-0dfc45f0-aa69-4812-b6fd-7c725acee629");
        setUserProfile(reponse.data);
        console.log(reponse);
        console.log("reponse");
     
      }
    

    useEffect(() => {
        fetchData();
     },[userProfile.id]);


    return(
        <>
        <Homepage data={userProfile}/>
        </>
    )
}

export default ProfileAPI


/*{
    "id": "GqbQOGqnOTmcMsUE5lPAhFBFAaAZbUXA8FXhyzjSjlBkxS0",
    "accountId": "Vvd0yS0Mc0wuAJ9j1p4cfc6lxnZBV1PSnwDIyneZ6C7FSVs",
    "puuid": "5xhMDoBUE3ifIjpUxOhxGEHA_NnFHS74YDp2-9CYqSeo3qFhhxkLW5IIqpyc_tDxtTyr5CqaoJEI1Q",
    "name": "purppirate",
    "profileIconId": 4920,
    "revisionDate": 1661751730000,
    "summonerLevel": 320
}*/