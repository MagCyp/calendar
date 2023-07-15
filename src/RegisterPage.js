import { Container } from "@mui/material";
import dayjs from "dayjs";
import { gapi } from "gapi-script";
import MyForm from "./UI/Form/Form";
import style from "./RegisterPage.module.scss";

export default function RegisterPage() {

    // const [isSignedIn, setIsSignedIn] = useState(false);

    // const handleAuthClick = () => {
    //     gapi.auth2.getAuthInstance().signIn();
    // };

    // const handleSignoutClick = () => {
    //     gapi.auth2.getAuthInstance().signOut();
    // };

    if (dayjs(+(window.localStorage.getItem('EXPRICES_AT'))).subtract(10, "minute") < dayjs()) {
        // useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: '992620281179-aundf5a1me4rtbl3gp2nik60vbbbjhr5.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/calendar'
            }).then(() => {
                let auth = gapi.auth2.getAuthInstance();
                window.localStorage.setItem('ACCESS_TOKEN', (auth.currentUser.get().xc.access_token));
                window.localStorage.setItem('EXPRICES_AT', (auth.currentUser.get().xc.expires_at));
                // setIsSignedIn(true)
            });
        });
        // }, []);
    }
    // else {

    //     // return (
    //     //     <div>
    //     //         <button onClick={handleAuthClick} disabled={isSignedIn}>Sign In</button>
    //     //         <button onClick={()=>console.log(dayjs(window.localStorage.getItem("EXPRICES_AT")))}>11</button>
    //     //     </div>
    //     // );
    //     return (
    //         <div style={{
    //             backgroundColor: '#8181e4',
    //             height: '100vh',
    //         }}>
    //             <Container sx={{ pt: 10 }}>
    //                 <MyForm />
    //                 <button onClick={() => console.log(dayjs(+(window.localStorage.getItem('EXPRICES_AT'))))}>111</button>
    //                 {/* <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>11</button> */}
    //             </Container>
    //         </div>
    //     );
    // }
    return (
        <div className={style.mainDiv}>
            <Container sx={{
                pt: 10,
                '@media (max-width:555px)':{
                    pt: 1,

                }
            }}>
                <MyForm />
                {/* <button onClick={() => console.log(dayjs(+(window.localStorage.getItem('EXPRICES_AT'))))}>111</button> */}
                {/* <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>11</button> */}
            </Container>
        </div>
    );
}