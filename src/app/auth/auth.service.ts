import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: any;

    constructor(private router: Router){}

    signupUser(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
    }

    signUserin(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: any) => {
                            localStorage.setItem('userlogin', token)
                            this.token = token
                            // window.location.reload()
                        }
                    )
                    window.location.reload()
                // this.router.navigate(['/']);
            }

        )
        .catch(
            error => console.log(error)
        );
    }

    getToken(){
        return localStorage.getItem('userlogin');
    }

    isAuthenticated(){
        return localStorage.getItem('userlogin') != null;
    }

    logOut(){
        firebase.auth().signOut();
        localStorage.removeItem('userlogin');
        this.token = null; 
        window.location.reload();
    }
}