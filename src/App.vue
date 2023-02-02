<template>
    <div class="nav">
        <div class="nav__inner">
            <nav>
                <router-link class="nav__item" to="/">Home</router-link>
                <router-link class="nav__item" to="/profile">Profile</router-link>
                <router-link class="nav__item" to="/">Contact</router-link>
                <router-link class="nav__item" to="/">About</router-link>
            </nav>
        </div>
    </div>

    <div class="container">
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    name: 'App',
    components: {
    }
}
</script>

<style scoped>
.nav__item {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

.nav__item:hover {
    background-color: #705090;
}

.container {
    max-width: 1100px;
    margin: 20px auto;
    padding: 0 16px;
}

.nav {
    background-color: #674188;
}

.nav__inner {
    max-width: 1100px;
    margin: 0 auto;
}
</style>
