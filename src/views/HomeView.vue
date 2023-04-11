<template>
    <div class="home-wrapper">
        <v-card class="home-item-wrapper">
            <v-file-input style="margin-right: 20px;" :error="fileError" :loading="fileLoading" :messages="fileErrors"
                v-model="file" show-size label="Загрузить файл"></v-file-input>
            <v-btn @click="addFolder()">Добавить папку</v-btn>
        </v-card>
        <FolderComponent v-for="folder in foldersData" :folderData="folder" />
        <FileComponent v-for="f in files" :data="f" :key="f.id" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileService, { _File } from "../services/FileService"
import FolderService, { _Folder } from "../services/FolderService"
import FileComponent from '@/components/FileComponent.vue'
import FolderComponent from '@/components/FolderComponent.vue'

export default Vue.extend({
    name: 'Home',
    data: () => ({
        fileLoading: false,
        fileError: false,
        fileErrors: [] as string[],
        file: undefined as File | undefined | null,
        rawFilesData: [] as _File[],
        foldersData: [] as _Folder[]
    }),
    mounted() {
        this.fetchData()
    },
    computed: {
        files(): _File[] {
            return this.rawFilesData.filter((f) => {
                return !f?.folder_id
            })
        }
    },
    methods: {
        async fetchData() {
            this.rawFilesData = (await FileService.GetFiles()).data
            this.foldersData = (await FolderService.GetFolders()).data
        },
        async addFolder() {
            await FolderService.AddFolder((Math.random() + 1).toString(36))
            this.fetchData()
        },
        validateFile(f: File | undefined | null) {
            this.fileError = false
            this.fileErrors = []
            if (!f) {
                return false
            }
            if (f.size > 20000000) {
                this.fileError = true
                this.fileErrors.push('Размер файла не должен превышан 20мб')
            }
            if (f.name.slice(-4) === '.php') {
                this.fileError = true
                this.fileErrors.push('Нельзя загружать .php файлы')
            }
            return !(!!this.fileErrors.length)
        },
        async processFile(f: File | undefined | null) {
            if (this.validateFile(f) && f) {
                this.fileLoading = true
                const resp = await FileService.UploadFile(f)
                console.log(resp)
                this.fileLoading = false
                this.fetchData()
            }
        }
    },
    watch: {
        file(newVal) {
            this.processFile(newVal)
        }
    },
    components: { FolderComponent, FileComponent }
})
</script>
<style scoped lang="scss">
.home-wrapper {
    position: relative;
    width: 40vw;
    min-width: 400px;

    .home-item-wrapper {
        display: flex;
        align-items: center;
        background-color: #F5F5F5;
        padding: 0 12px 0 12px;
        margin-top: 12px;
    }
}
</style>
