import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import  Axios  from 'axios';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDb_PDP4socP54OanS7SIKjPY2krbL5rE8",
    authDomain: "devcom-1996b.firebaseapp.com",
    projectId: "devcom-1996b",
    storageBucket: "devcom-1996b.appspot.com",
    messagingSenderId: "635443268927",
    appId: "1:635443268927:web:39dcbd426d16f99b2b178a"
};

const credCheck = async function(res){
    
    const result = await Axios.post('https://devcom-production.onrender.com/login-with-google',{
            email : res.user.email
    }).catch((e) => {
        alert("Please Register.");
    });
    if(result){
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user_info", JSON.stringify(result.data.user));
        window.open("/","_self");
        console.log(result);
    }else{
       window.open("/signup", "_self");
    }
}



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage();


const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth,provider).then((res) => {
        credCheck(res);
        console.log(res.user.email);
    }).catch((e) => {
        console.log(e);
    })
}