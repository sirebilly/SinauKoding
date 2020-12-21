<template>
    <div class="home">
        <div id="booklist">
            <!-- Book List table -->
            <Pagination></Pagination>
        </div>
        <div id="loanlist"></div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import Pagination from '@/components/Pagination.vue';

@Component({
    components: {
        Pagination, 
    },
})
export default class Home extends Vue{
    public MaxButtons:number = 3;
    public totalData:number = 100;
    public perPage:number = 10;
    public curr_page: number= 1;

    get totalPages(){
        return this.totalData/this.perPage;
    }

    public onPageChange(page:any) {
        console.log(page)
        this.curr_page = page;
    }
}
</script>