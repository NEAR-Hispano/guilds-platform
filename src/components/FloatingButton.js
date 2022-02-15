import { Button, UncontrolledTooltip } from "reactstrap";

export const FloatingButton = () => {
    const handleClick = () => {
        window.open("https://forms.gle/w2fysczexfXKyXcu8");
    }
    return (
        <>
            <Button 
                className="btn-round"
                color="warning" 
                size="sm"
                id="btnFloat"
                style = {{
                    bottom:'18vh',
                    position: 'fixed',
                    right:'5vh',
                    margin:'1em',
                    background: 'rgb(236 87 1)',
                    height: '4em',
                    zIndex: '20'
                }}
                onClick={handleClick}
            >
               <span className="px-2">
                    <i className="fas fa-comments" />
                    {" "} FEEDBACK
                </span>
                
            </Button>  
            <UncontrolledTooltip placement="top" target="btnFloat" delay={0}>
                We value you FEEDBACK!
            </UncontrolledTooltip>
        </>
    );
}