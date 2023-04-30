import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const signInEmailPassword = async(email:string, password:string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
        console.log(user, "signed in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export default signInEmailPassword;
