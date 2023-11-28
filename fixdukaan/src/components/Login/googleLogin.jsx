import { GoogleLogin } from '@react-oauth/google';

const googleLogin = () => {
    return (
        <GoogleLogin
            onSuccess={()=> console.log("logged in ")}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap
        />
  )
}

export default googleLogin