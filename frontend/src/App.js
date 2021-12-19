/*!

***********************************************
* BLK Design System React - v1.2.0
***********************************************

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

***********************************************

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState} from "react";

// core components
import IndexNavbar from "components/IndexNavbar.js";
import PageHeader from "components/PageHeader.js";
import Footer from "components/Footer.js";

import MainPage from "pages/MainPage";
import { GuildsEntities, getMainGuilds, getMoreGuilds } from 'services/GuildsEntities';


export default function App() {
  const [fullData, setFullData] = useState([]);
  const [mainGuilds, setMainGuilds] = useState([]);
  const [moreGuilds, setMoreGuilds] = useState([]);

  const handleMapGuilds =  async() => {
    //Get Guilds information
    const response = await GuildsEntities();
    setFullData(response);
  }; 

  useEffect(() => {
    // Call method to load all guilds data
    handleMapGuilds();
  }, [] );

  const handleMapMainGuilds = () => {
    //Extract the main guilds needed to be on top list
    const response = getMainGuilds(fullData);
    setMainGuilds(response);
  }

  const handleMapOtherGuilds = () => {
    //Extract the other guilds on the list
    const response = getMoreGuilds(fullData);
    setMoreGuilds(response);
  }


  useEffect(() => {
    handleMapMainGuilds();
    handleMapOtherGuilds();
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
    
  }, [ fullData ]);
  
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          <MainPage guilds={[...mainGuilds, ...moreGuilds]} />
          {/* <MainPage guilds={[...mainGuilds, ...moreGuilds]} />  */}
        </div>
        <Footer />
      </div>
    </>
  );
}
