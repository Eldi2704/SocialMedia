<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login as authLogin } from "@/services/auth.js";  // Import the login function

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showLogin = ref(true);
const router = useRouter();

const handleLogin = async () => {
  try {
    const form = {
      email: email.value,
      password: password.value
    };

    const response = await authLogin(form); // Using the imported authLogin function

    if (response) {
      // Assuming the response includes a token
      localStorage.setItem("token", response.token);
      router.push("/"); // Redirect to dashboard after successful login
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
};

const signUp = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Sign-up successful!');
    alert('Sign-up successful, please log in!');
    showLogin.value = true;
  } catch (error) {
    console.error("Sign up error:", error);
    alert("An error occurred during sign-up. Please try again.");
  }
};
</script>

<template>
  <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css">
  <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">

  <section class="bg-blueGray-50 h-screen flex items-center justify-center">
    <div class="w-full lg:w-4/12 px-4 mx-auto pt-6">
      <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
        <div class="rounded-t mb-0 px-6 py-6">
          <hr class="mt-6 border-b-1 border-blueGray-300">
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div class="text-blueGray-400 text-center mb-3 font-bold">
            <small>{{ showLogin ? 'SIGN IN' : 'SIGN UP' }}</small>
          </div>
          <form @submit.prevent="showLogin ? handleLogin() : signUp()">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">Email</label>
              <input v-model="email" type="email" id="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email">
            </div>
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="password">Password</label>
              <input v-model="password" type="password" id="password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password">
            </div>
            <div v-if="!showLogin" class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="confirmPassword">Confirm Password</label>
              <input v-model="confirmPassword" type="password" id="confirmPassword" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Confirm Password">
            </div>
            <div class="text-center mt-6">
              <button type="submit" class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                {{ showLogin ? 'Sign In' : 'Sign Up' }}
              </button>
            </div>
            <div class="text-center mt-3">
              <button type="button" @click="showLogin = !showLogin" class="text-sm text-blueGray-600 hover:text-blueGray-800 font-semibold">
                {{ showLogin ? 'Create an account' : 'Already have an account?' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rounded-lg {
  border-radius: 0.5rem;
}
.bg-indigo-500 {
  background-color: #6366f1;
}
.bg-indigo-100 {
  background-color: #f0f4ff;
}
.text-indigo-500 {
  color: #6366f1;
}
</style>