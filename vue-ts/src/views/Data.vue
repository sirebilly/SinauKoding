<template>
    <div class="users">
        <UserApi/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UserApi from '@/components/Users.vue';

@Component({
    components: {
        UserApi, 
    },
})

export default class Data extends Vue {}
</script>