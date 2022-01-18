import React from "react";
import { CSVLink } from "react-csv";
import { 
    Button, 
    UncontrolledAlert,
    UncontrolledTooltip
  } from "reactstrap";

  export default function DownloadCsv({slug}) {
    
    const [data, setData] = React.useState([]);
    const [firstLoad, setFirstLoad] = React.useState(true);
    
    const [loading, setLoading] = React.useState(false);
    const [notLoggedInAlert, setNotLoggedInAlert] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const csvLinkElement = React.createRef();

    const handleGetData = async () => {

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
    }

    React.useEffect(() => {   
        if(firstLoad){
            setFirstLoad(false)
        } else{
            csvLinkElement.current.link.click()
        }
    }, [data]);

    return (
    <>
        <Button
            className="btn-icon btn-round"
            color="success"
            onClick={handleGetData}
            disabled={loading}
            id="downloadTooltip"
            target="_blank"
        >   
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