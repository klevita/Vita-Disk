<template>
    <div class="base-layout-wrapper">
        <v-app-bar :elevation="2">
            <v-toolbar-title>Vita Disk</v-toolbar-title>
            <v-spacer />
            <v-btn v-if="$route.name !== 'auth'" text :to="{ name: 'auth' }">
                выйти
            </v-btn>
        </v-app-bar>
        <div class="base-layout-slot-container">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped lang="scss">
.base-layout-wrapper {
    height: 100vh;

    .base-layout-slot-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>