<template>
    <div>
        <Display></Display>
        <Increment></Increment>
    </div>

</template>

<script>
    import Display from './components/Display.vue'
    import Increment from './components/IncrementButton.vue'
    import store from './vuex/store'

    export default {
        components: {
            Display,
            Increment,
        },
        store
    }


</script>

<style>
    h1 {
        color: #00ffd2;
    }
</style>