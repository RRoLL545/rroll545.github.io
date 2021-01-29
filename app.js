new Vue({
    el: "#authorization",
    data: {
        formAuthorizationVisibility: true,
        repeatPasswordVisibility: false,
        loginValue: '',
        passValue: '',
        repeatPassValue: '',
        helpMessageVisibility: false,
        helpMessage: '',
        signedUser: '',
        signedInPage: false,
        registeredPage: false,
        comparePasswords: false,
        inputs: false,
    },
    methods: {
        signIn() {
            if (this.repeatPasswordVisibility === true) {
                this.repeatPasswordVisibility = !this.repeatPasswordVisibility;   //switch to authentication form
                //reset input values
                this.loginValue = '';
                this.passValue = '';
                this.repeatPassValue = '';
                this.helpMessage = '';
                this.helpMessageVisibility = false;
            } else {
                if (this.inputs !== true ) {
                    this.helpMessage = 'Please complete all inputs';
                    this.helpMessageVisibility = true;
                    return;
                }
                //searching user in local storage
                const userPass = localStorage.getItem(this.loginValue);
                
                //if found check input password
                if (userPass !== null) {
                    if (userPass === this.passValue) {
                        this.signedUser = this.loginValue;
                        this.signedInPage = true;
                        this.formAuthorizationVisibility = false;

                        //reset input values
                        this.loginValue = '';
                        this.passValue = '';
                        this.repeatPassValue = '';
                        this.helpMessage = '';
                        this.helpMessageVisibility = false;
                    } else {
                        this.helpMessage = 'access denied: wrong password or username';
                        this.helpMessageVisibility = true;
                    }
                } else {
                    this.helpMessage = 'access denied: wrong password or username';
                    this.helpMessageVisibility = true;
                }
            }
            //console.log(this.loginValue, this.passValue, this.repeatPassValue);
        },
        register() {
            if (this.repeatPasswordVisibility === false) {
                this.repeatPasswordVisibility = !this.repeatPasswordVisibility;   //switch to authentication form
                //reset input values
                this.loginValue = '';
                this.passValue = '';
                this.repeatPassValue = '';
                this.helpMessage = '';
                this.helpMessageVisibility = false;
            } else {
                const NewUserPass = localStorage.getItem(this.loginValue);

                if (NewUserPass === null) {
                    if (this.inputs !== true ) {
                        this.helpMessage = 'Please complete all inputs';
                        this.helpMessageVisibility = true;
                        return;
                    }
                    if (this.comparePasswords === true) {
                        localStorage.setItem(this.loginValue, this.passValue);
                        this.signedUser = this.loginValue;
                        this.registeredPage = true;
                        this.formAuthorizationVisibility = false;

                        //reset input values
                        this.loginValue = '';
                        this.passValue = '';
                        this.repeatPassValue = '';
                        this.helpMessage = '';
                        this.helpMessageVisibility = false;
                        this.repeatPasswordVisibility = false;
                    } else {
                        this.helpMessage = 'Please repeat password correctly';
                        this.helpMessageVisibility = true;
                    }
                } else {
                    this.helpMessage = 'User with this login is already registered, choose another login';
                    this.helpMessageVisibility = true;
                }

            }
        },
        gotoSignIn() {
            this.registeredPage = false;
            this.formAuthorizationVisibility = true;
        },
        signOut() {
            this.signedInPage = false;
            this.formAuthorizationVisibility = true;
        },
        inputCheck() {
            if ( this.repeatPasswordVisibility === true) {
                if (this.passValue === this.repeatPassValue) {
                    this.comparePasswords = true;
                } else {
                    this.comparePasswords = false;
                }
            }

            if (this.loginValue !== '' && this.passValue !== '') {
                this.inputs = true;
            } else {
                this.inputs = false;
            }

        }
    }
})