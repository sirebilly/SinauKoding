<template>
   <div class="login">
       <img alt="Vue Logo" src="../assets/logo.png">
       <auth/>
   </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Auth from '../components/Auth.vue'

@Component({
    components: {
        Auth,
    },
})

export default class Login extends Vue {}
</script>