<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <SinauKoding/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SinauKoding from '@/components/SinauKoding.vue'; // @ is an alias to /src

@Component({
  components: {
    SinauKoding,
  },
})
export default class Home extends Vue {}
</script>
