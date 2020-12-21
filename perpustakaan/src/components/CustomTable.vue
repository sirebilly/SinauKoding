<template>
    <div class="customTable">
        <div class="table-wrapper">
            <div class="d-flex">
                <slot name="title"/>
                <button v-if="canAdd" type="button">
                    Add
                </button>
            </div>
            <pagination rootTag="table" rootClass="table table-bordered" renderContainerTag="tbody" renderContainerClass="table-body"
            :isBeingRequest="isBeingRequest" 
            :offset="offset" :limit="limit" 
            :datas="records" :rows="rows" 
            :maxLengthPagination="5" 
            @onPagination="doFind">
                <thead></thead>
                <tr slot="onRenderedData" slot-scope="{data, index}"></tr>
                <tr slot="onRequestOrEmptyData" class="text-center"></tr>
            </pagination>
        </div>
    </div>
</template>

<script lang="ts">
import baseEntity from '@/entity/BaseEntity';
import {Component, Prop, Vue} from 'vue-property-decorator';
import Pagination from '@/components/Pagination.vue';

@Component({
    components:{
        Pagination,
    }
})
export default class customTable<E extends baseEntity> extends Vue{
    @Prop()
    public baseApi!: string;

    public entity!: new() =>E;

    public validate!:(record: E) => boolean;

    public totalColumn!:number;

    public canAdd!:boolean;

    public canEdit!:boolean;

    public canDelete!:boolean;

    public isBeingRequest:boolean = false;

    public record: E = null;

    public records: Array<E> = [];
    public offset: number = 0;
    public limit: number = 5;
    public rows: number = 0;
    public get hasAction(){
        return this.canAdd || this.canEdit || this.canDelete;
    }

    public created(){
        this.doFind();
    }
    
    public onAddOrEdit(record: E = null){
        
    }

    public onCancelAddOrEdit(){
        if(this.record!==null){
            if(!this.record.id){
                this.records.splice(0,1);
            }
            //Notify Cancel edit/add data
            this.$nextTick(() => this.record = null);
        }
    }

    public doFind(){

    }
}

</script>

<style scoped>

</style>