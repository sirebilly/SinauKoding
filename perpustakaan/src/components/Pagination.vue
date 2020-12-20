<template>
    <div class="paginate">
        <ul>
            <li><button type="button" @click="OnClickFistPage" :disabled="IsInFirstPage">First</button></li>
            <li><button type="button" @click="OnClickPreviousPage" :disabled="IsInFirstPage">Previous</button></li>
            <!-- Range of buttons -->
            <li v-for="page in pages" :key="page.name"><button type="button" @click="OnClickPage" :disabled="page.isDisabled">{{ page.name }}</button></li>
            <!-- end of buttons -->
            <li><button type="button" @click="OnClickNextPage" :disabled="IsInLastPage">Next</button></li>
            <li><button type="button" @click="OnClickLastPage" :disabled="IsInLastPage">Last</button></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { extend } from 'lodash';
import {Component, Prop, Vue} from 'vue-property-decorator'

export default class Pagination extends Vue{
    @Prop() public MaxButtons:number = 3;
    @Prop() public totalPages:number = 1;
    @Prop() public total:number = 1;
    @Prop() public currPage:number = 1;

    get startPage(){
        if(this.currPage === 1){
            return 1;
        }
        if(this.currPage === this.totalPages){
            return this.totalPages - this.MaxButtons;
        }
        return this.currPage - 1
    }
    get pages(){
        const range = [];
        for(let i = this.startPage; i <= Math.min(this.startPage + this.MaxButtons - 1, this.totalPages); i+=1){
            range.push({
                name: i, 
                isDisabled: i === this.currPage
            });
        }
        return range;
    }
    get IsInFirstPage(){
        return this.currPage === 1;
    }
    get IsInLastPage(){
        return this.currPage === this.totalPages;
    }

    public OnClickFirstPage(){
        this.$emit('pageChanged', 1);
    }
    public OnClickPreviousPage(){
        this.$emit('pageChanged', this.currPage - 1);
    }
    public OnClickPage(page: number){
        this.$emit('pageChanged', page)
    }
    public OnClickNextPage(){
        this.$emit('pageChanged', this.currPage + 1);
    }
    public OnClickLastPage(){
        this.$emit('pageChanged', this.totalPages);
    }
}
</script>