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
import {  
    Button,
    Col,
    Container, 
    Row
} from "reactstrap";
import { useEffect, useState } from "react";
import { GuildsByUser } from "services/SubgraphConnection";

export default function MainPage({guilds}) {
    const [loaded, setLoaded] = useState(true);
    const [currentPage, setCurrentPage ] = useState(0);
    const [guildsUser, setGuildsUser] = useState('undefined');

    const [showMsg, setShowMsgs] = useState("Show more");

    // Pagination variables
    const pageSize = 6;
    const pagesCount = Math.ceil(guilds.length/pageSize);
    
    function onLoad() {
      setLoaded(false);
    }

    function handleClick(e, index) {
      e.preventDefault();
      if(index < pagesCount-1 ) {
        setCurrentPage(index);
        setShowMsgs("Show more");
      } else if(index === pagesCount-1) {
        setShowMsgs("Show less");
        setCurrentPage(index);
      } else if(index === pagesCount){
        setShowMsgs("Show more");
        setCurrentPage(0);
      }
    }
    
    const getGuildsByUser = async () => {
        if (window.walletConnection.isSignedIn()) {
            // await GuildsByUser(window.accountId)
            // .then((response) => {
            //     let processedData = [];
            //     response.data.members.map(data => {
            //         processedData.push({member: data.member})
            //     })
            //     setGuildsUser(processedData);
            // });
            await window.contract.get_guilds_by_user()
            .then(response => {
                setGuildsUser(response);
            })
            .catch((error) => {
                console.log("Error: ", error);
                setGuildsUser([]);
            });
        }
    }

    useEffect(() => {
        getGuildsByUser();
        localStorage.setItem('GUILD_USER', guildsUser);
    }, [])


    return (
        <div className="section section-examples" data-background-color="black">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path1.png").default}
            />
            <Container className="text-center">
                <Row>
                    <Col>
                        <Col md="4">
                            <hr className="line-primary" />
                            
                        </Col>
                        <Col md="6">
                            <hr className="line-primary" />
                            
                        </Col>
                        <h2>
                            Find a {" "}
                            <span className="text-primary">Guild that fits your needs</span>
                        </h2>
                    </Col>
                </Row>
                <img 
                    style={{display: loaded ? 'block': 'none'}}
                    src={require("assets/img/loading-23.gif").default}
                    alt={"Loading..."} 
                />
                
                <Row onLoad={onLoad}>
                    { guilds
                        .slice(
                            0,
                            (currentPage + 1) * pageSize
                        )
                        .map((guild, i) => 
                            <GuildCard 
                                style={{width: '130%', paddingRight:'10px'}} 
                                key={`card-${guild.slug}`} 
                                guild={guild} 
                                guildsUser={guildsUser} 
                                setGuildsUser={setGuildsUser}
                            />
                        )}
                </Row>
                {/*<Pagination  listClassName="justify-content-center">
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink 
                            onClick={e => handleClick(e, currentPage - 1)}
                            previous
                            href="#"
                        >
                            Previous
                        </PaginationLink>
                    </PaginationItem>
                    {
                        [...Array(pagesCount)].map((page, i) => 
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    <PaginationItem disabled={currentPage >= pagesCount - 1}>
                        <PaginationLink 
                            onClick={e => handleClick(e, currentPage + 1)}
                            next
                            href="#"
                        >
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>*/}
                <Button 
                    color="link"
                    className="btn-primary"
                    onClick={e => handleClick(e, currentPage + 1)}
                >
                    <span>
                        {
                            showMsg === "Show more" ? 
                                <i className="tim-icons icon-minimal-down px-2" />:
                                <i className="tim-icons icon-minimal-up px-2" />
                        }
                        {showMsg}
                    </span>
                </Button>
            </Container>
        </div>
    );
}
