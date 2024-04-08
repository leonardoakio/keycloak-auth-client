<template>
  <!--  <Toast />-->
  <div v-if="loginPage" class="login-container">
    <div class="content-center">
      <!--      <div class="ts-login-logo">-->
      <!--        <img src="../../assets/images/logos/primary_color_tagline.png">-->
      <!--        <h2>Faça seu Login</h2>-->
      <!--      </div>-->
      <div class="container-login">
        <div class="form-group">
          <div class="icon-input">
            <i class="pi pi-user"></i>
            <input class="form-control border-default" type="text" placeholder="Digite seu e-mail" ref="inputEmail"
                   v-model="email">
          </div>
          <small v-if="showEmailError" class="help-span">Preencha o campo acima</small>
        </div>
        <div class="form-group">
          <div class="icon-input">
            <i class="pi pi-lock"></i>
            <div class="custom-eye">
              <i class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'" @click="toggleShowPassword"></i>
            </div>
            <input v-if="showPassword" class="form-control border-default" type="text" placeholder="Digite sua senha" ref="inputPassword"
                   v-model="password">
            <input v-else class="form-control border-default" type="password" placeholder="Digite sua senha" ref="inputPassword" v-model="password">
          </div>
          <small v-if="showErrorPassword" class="help-span">Preencha o campo acima</small>
          <a href="/esqueciMinhaSenha">Esqueceu sua Senha?</a>
        </div>
        <div class="form-group">
          <button @click="validateFields" class="login-button">Entrar</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="login-container">
    <div class="content-center">
      <!--      <div class="ts-login-logo">-->
      <!--        <img src="../../assets/images/logos/primary_color_tagline.png">-->
      <!--      </div>-->
      <div class="container-login">
        <h2 class="title-login">Autenticação</h2>
        <div class="form-group mt-20">
          <span class="title-cpf">Digite o seu CPF para prosseguir</span>
          <div class="icon-input">
            <i class="pi pi-user"></i>
            <input type="text" class="form-control border-default form-control-sm input-mask" name="cpf"
                   id="ipt-cpf" maxlength="14" placeholder="CPF" ref="inputCpf" v-model="documentWithMask" />
          </div>
          <small v-if="showErrorCpf" class="help-span">Preencha o campo acima</small>
        </div>
        <div class="form-group">
          <button @click="handleToken" class="login-button">Autenticar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api.js';
import { maskCpf } from "../helpers/masks.js";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      cpf: '',
      accessToken: '',
      refreshToken: '',
      expiresIn: '',
      loginPage: true,
      showPassword: false,
      showEmailError: false,
      showErrorPassword: false,
      showErrorCpf: false,
    }
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async validateFields() {
      this.showEmailError = false;
      this.showErrorPassword = false;

      if (this.email.trim() === '') {
        this.showEmailError = true;
      }

      if (this.password.trim() === '') {
        this.showErrorPassword = true;
      }

      if (this.showEmailError) {
        // this.$toast.add({
        //   severity: 'warn',
        //   summary: 'Atenção',
        //   detail: 'Por favor, revise todos os campos.',
        //   life: 5000
        // });

        if (this.showEmailError) {
          this.$nextTick(() => {
            this.$refs.inputEmail.focus();
          });
        }
        return;
      }

      if (this.showErrorPassword) {
        // this.$toast.add({
        //   severity: 'warn',
        //   summary: 'Atenção',
        //   detail: 'Por favor, revise todos os campos.',
        //   life: 5000
        // });

        if (this.showErrorPassword) {
          this.$nextTick(() => {
            this.$refs.inputPassword.focus();
          });
        }
        return;
      }

      this.showEmailError = false;
      this.showErrorPassword = false;
      this.loginPage = false;
    },
    async handleToken() {
      try {
        if (this.cpf.trim() === '' && this.cpf.trim() === '') {
          this.showErrorCpf = true;
        }

        if (this.showErrorCpf) {
          // this.$toast.add({
          //   severity: 'warn',
          //   summary: 'Atenção',
          //   detail: 'Por favor, revise todos os campos.',
          //   life: 5000
          // });

          if (this.showErrorCpf) {
            this.$nextTick(() => {
              this.$refs.inputCpf.focus();
            });
          }
          return;
        }
        this.showErrorCpf = false;

        this.cpf = this.cpf.replace(/[.-]/g, '');

        const payload = {
          // client_id: import.meta.env.KEYCLOAK_CLIENT_ID,
          client_id: "tecnohub-client",
          email: this.email,
          password: this.password,
        };

        api.post('api/v1/credentials/login', payload)
            .then(response => {
              this.accessToken = response.data.access_token;
              this.refreshToken = response.data.refresh_token;
              this.expiresIn = response.data.expires_in;

              this.storeAccessToken();
              this.storeRefreshToken();

              this.redirect();
            })
            .catch(error => {
              console.error('Erro ao obter o token de acesso:', error);
            });

      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
    storeAccessToken() {
      const expirationDate = new Date(Date.now() + this.expiresIn * 1000); // Convertendo segundos para milissegundos
      document.cookie = `access_token=${this.accessToken}; expires=${expirationDate.toUTCString()}; path=/`;
    },
    storeRefreshToken() {
      localStorage.setItem('refresh_token', this.refreshToken);
    },
    redirect() {
      this.$router.push('/home');
    },
  },
  computed: {
    documentWithMask: {
      get() {
        return maskCpf(this.cpf);
      },
      set(value) {
        this.cpf = value.replace(/\D/g, '');
      },
    },
  },
}
</script>

<style scoped>

.ts-login-logo img {
  width: 420px;
  height: 239px;
  object-fit: contain;
}

h2 {
  color: #212121;
  font-size: 24px;
  font-weight: 200;
  line-height: 44px;
}

.container-login {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  text-align: left;
  width: 100%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 5%;
  width: 100%;
}

.form-group a {
  font-size: 10px;
}

input {
  width: 100%;
  border-radius: 0;
}

.icon-input {
  position: relative;
}

.icon-input i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  color: #8F9CC0;
}

.icon-input input {
  padding-left: 50px;
}

.custom-eye {
  position: absolute;
  left: 88%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #8F9CC0;
}

.login-button {
  margin-top: 30px;
}

a {
  display: block;
  text-decoration: none;
  color: #411F56;
  margin-top: 10px;
  text-align: right;
}

input.form-control:hover {
  border-color: #2196F3;
}

.login-button {
  width: 100%;
  height: 40px;
  background-color: #411F56;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}

button.login-button:hover {
  border-color: #F15A29;
  background-color: #674C78;
}
</style>