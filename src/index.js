import LoginInput from "./components/LoginInput.vue";

export default {
    install: (app, options) => {
        app.component("LoginInput", LoginInput)
    },
};