import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const createUserEmailPass = async(name:string, email:string, password:string) => {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user, "signed up");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode, errorMessage);
  });
};

export default createUserEmailPass;