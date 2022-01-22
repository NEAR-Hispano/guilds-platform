import { Button, UncontrolledTooltip } from "reactstrap";

export const FloatingButton = () => {
    const handleClick = () => {
        window.open("https://forms.gle/w2fysczexfXKyXcu8");
    }
    return (
        <>
            <Button 
                className="btn-round btn-icon"
                color="primary" 
                size="lg"
                id="btnFloat"
                style = {{
                    bottom:'18vh',
                    position: 'fixed',
                    right:'5vh',
                    margin:'1em',
                    background: '#0114ec',
                    width: '5em',
                    height: '5em',
                    zIndex: '1'
                }}
                onClick={handleClick}
            >
                <img
                    alt="Feedback"
                    className="img-center img-fluid"
                    src="https://imageinnetwork.fr/img/cms/support_pfsense_2in_01.png"
                    style={{width:'85%', height: '75%'}}
                />  
            </Button>  
            <UncontrolledTooltip placement="top" target="btnFloat" delay={0}>
                We value you FEEDBACK!
            </UncontrolledTooltip>
        </>
    );
}