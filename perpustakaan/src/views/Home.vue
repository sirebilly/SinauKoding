<template>
  <div class="home-page">
    <ul class="navbar-nav float-right p-3 pr-5">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle no-select" data-toggle="dropdown">
          {{user.profileName}}
          <span v-if="user.isAdmin" class="text-muted">
            ({{user.role.toString().split("_")[1]}})
          </span>
        </a>
        <div class="dropdown-menu dropdown menu-right animated">
          <a class="dropdown-item" @click="doLogout">
            Logout
          </a>
        </div>
      </li>
    </ul>
    <book-list/>
    <loan-list/>
  </div>
</template>

<script lang="ts">
 import { Component, Vue, Prop } from 'vue-property-decorator';
  import Session from '../common/Session';
  import User from '../entity/User';
  import BookList from '../components/BookList.vue';
  import LoanList from '../components/LoanList.vue';

  @Component({components: {BookList, LoanList}})
  export default class Home extends Vue {
    
    public get user(): User {
      return Session.get();
    }
    
    public doLogout() {
      Session.set(null);

      this.$router.push("/");
    }
  }
</script>

<style lang="scss" scoped>
  .home-page {
    color: #404E67;
    background: #F5F7FA;
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;

    .nav-link, .dropdown-item {
      cursor: pointer;
    }

    .dropdown-item.active,
    .dropdown-item:active {
      background: none;
    }

    .no-select {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
</style>