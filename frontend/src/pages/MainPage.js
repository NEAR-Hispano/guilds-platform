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
    Container, 
    Pagination, 
    PaginationItem, 
    PaginationLink,
    Row
} from "reactstrap";
import { useEffect, useState } from "react";

export default function MainPage({guilds}) {
    const [loaded, setLoaded] = useState(true);
    const [currentPage, setCurrentPage ] = useState(0);
    const [guildsUser, setGuildsUser] = useState('undefined');

    // Pagination variables
    const pageSize = 20;
    const pagesCount = Math.ceil(guilds.length/pageSize);
    
    function onLoad() {
      setLoaded(false);
    }

    function handleClick(e, index) {
      e.preventDefault();
      setCurrentPage(index);
    }
    
    const getGuildsByUser = async () => {
        if (window.walletConnection.isSignedIn()) {
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
            <div className="space-50" />
            <Container className="text-center">
                <h2 className="title">Find a Guild</h2>
                <img 
                  style={{display: loaded ? 'block': 'none'}}
                  src={require("assets/img/loading-23.gif").default}
                  alt={"Loading..."} 
              />
              <Row onLoad={onLoad}>
                { guilds
                    .slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                    )
                    .map((guild, i) => 
                        <GuildCard key={`card-${guild.slug}`} guild={guild} guildsUser={guildsUser} setGuildsUser={setGuildsUser}/>
                    )}
              </Row>
              <Pagination  listClassName="justify-content-center">
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
                </Pagination>
            </Container>
        </div>
    );
}
