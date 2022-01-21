import React, { useEffect } from "react";
import { CSVLink } from "react-csv";
import { 
    Button, 
    UncontrolledAlert,
    UncontrolledTooltip, 
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
  } from "reactstrap";
import MemberList from "services/SubgraphConnection";

  export default function DownloadCsv({slug}) {
    
    const [data, setData] = React.useState([]);
    const [firstLoad, setFirstLoad] = React.useState(true);
    
    const [loading, setLoading] = React.useState(false);
    const [notLoggedInAlert, setNotLoggedInAlert] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const csvLinkElement = React.createRef();

    const [option, setOption ] = React.useState("Select an option.");

    const handleGetData = async () => {

        if(option == "Select an option.") {
            alert("Please, select an option.")
        }else if(option == "Blockchain"){
            setNotLoggedInAlert(!window.walletConnection.isSignedIn());

            if(window.walletConnection.isSignedIn()){
                setLoading(true);
                window.contract.get_member_list({slug:slug})
                .then(response =>{
                    let processedData = response.map(near_id => ({near_id}))
                    setData(processedData)
                    setLoading(false)
                })
                .catch(() => {
                    setErrorAlert(true);
                    setLoading(false);
                })
            }
        }else if(option == "TheGraph Indexer"){
            setLoading(true);
            MemberList(slug)
            .then(response => {
                
                let processedData = [];
                response.data.members.map(data => {
                    processedData.push({member: data.member})
                })
                setData(processedData)
                setLoading(false)
            })
            .catch(() => {
                setErrorAlert(true);
                setLoading(false);
            })
        }
        
    }

    useEffect(() => {   
        if(firstLoad){
            setFirstLoad(false)
        } else{
            csvLinkElement.current.link.click()
        }
    }, [data]);

    // useEffect(() => {
    //     // Wait 5 seconds after download cvs file automatically 
    //     const timer = setTimeout(() => {
    //         handleGetData();
    //     }, 5000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
    <>
        <UncontrolledDropdown>
            <DropdownToggle caret data-toggle="dropdown">
                {option}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => setOption("Blockchain")}>Blockchain</DropdownItem>
                <DropdownItem onClick={() => setOption("TheGraph Indexer")}>TheGraph Indexer</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        <Button
            color="success"
            onClick={handleGetData}
            disabled={loading}
            id="downloadTooltip"
            target="_blank"
        >   Download&nbsp;
            <i 
                className={loading ? "tim-icons icon-refresh-02": "tim-icons icon-cloud-download-93" } 
            />
        </Button>
        <UncontrolledTooltip delay={0} target="downloadTooltip">
            Download NEAR ID's Account
        </UncontrolledTooltip>

        <CSVLink
            data={data}
            filename={`${slug}_member_list.csv`}
            ref={csvLinkElement}
        />
        <UncontrolledAlert  
            color="primary" 
            isOpen={notLoggedInAlert} 
            toggle={() => setNotLoggedInAlert(false)}
        >
            Please Login with your Near Account!
        </UncontrolledAlert >
        <UncontrolledAlert  
            color="warning" 
            isOpen={errorAlert} 
            toggle={() => setErrorAlert(false)}
        >
            There was an error while processing your request.
        </UncontrolledAlert >
    </>);
  }