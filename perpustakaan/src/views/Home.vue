<template>
  <div class="home">
    <home-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import HomeView from '@/components/HomeView.vue';

@Component({
  components: {
    HelloWorld,
    HomeView,
  },
})
export default class Home extends Vue {}
</script>
