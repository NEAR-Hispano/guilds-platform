/*!

************************************************************
* BLK Design System React - v1.2.0
************************************************************

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

************************************************************

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import GuildCard from "components/GuildCard";
import React, { useEffect, useState } from "react";
import {  
  Container, 
  Row
} from "reactstrap";
import { GuildsEntities, filterGuilds } from './../services/GuildsEntities';

export default function MainPage() {
  const [Guilds, setGuilds ] = useState([]);

  // Require to be signed in near
  /*if(!window.walletConnection.isSignedIn()){
    try {
      login();
    } catch (error) {
      console.log(error);
    }
  }*/
  
  
  
  const [guildResponse, setGuildResponse] = useState({});
 
  const handleMapGuilds = async() => {
    const data = await GuildsEntities();
    //Filter slugs
    //const dataFilter = filterGuilds(data);
    setGuilds(data);         
  }

  useEffect(() => {
    handleMapGuilds();
    
    console.log( ' **** ', guildResponse);
    
  }, [])
  
  return (
    
    <div className="section section-examples" data-background-color="black">
      <img
        alt="..."
        className="path"
        src={require("assets/img/path1.png").default}
      />
      <div className="space-50" />
      <Container className="text-center">
        <h2 className="title">Find a Guild</h2>
        <Row>
          {
            Guilds.map(guild => {
              return (
                <GuildCard key={`card-${guild.slug}`} guild={guild}/>
              )
            })
          }
        </Row>
      </Container>
    </div>
  );
}
