<template>
    <div>
        <NuxtLink
            to="/dashboard/post"
            class="flex items-center text-gray-900 hover:text-blue-800"
        >
            <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                ></path>
            </svg>
            Back
        </NuxtLink>
        <div class="flex flex-row items-center justify-between">
            <div class="my-5 text-2xl font-bold">Tambah Post</div>
        </div>

        <form @submit.prevent="handlerSubmit" method="post">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <!-- Title Input -->
                <div>
                    <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Title</label
                    >
                    <input
                        type="text"
                        v-model="title"
                        id="title"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter title"
                        required
                    />
                </div>

                <!-- Author Input -->
                <div>
                    <label
                        for="author"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Author</label
                    >
                    <input
                        type="text"
                        v-model="author"
                        id="author"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter author"
                        required
                    />
                </div>

                <!-- Published Date Input -->
                <div>
                    <label
                        for="published_at"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Published At</label
                    >
                    <input
                        type="date"
                        :max="today"
                        v-model="published_at"
                        id="published_at"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>

                <!-- Featured Image Input -->
                <div>
                    <label
                        for="featured_image"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Featured Image</label
                    >
                    <input
                        @change="handleFileUpload"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
                        id="featured_image"
                        type="file"
                        accept="image/*"
                    />
                    <p v-if="fileName">File yang dipilih: {{ fileName }}</p>
                    <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        class="w-full"
                        alt="Preview"
                    />
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-1">
                <!-- Content (CKEditor) -->
                <div class="col-span-2">
                    <label
                        for="content"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Content</label
                    >
                    <ClientOnly>
                        <ckeditor
                            v-if="editor"
                            v-model="content"
                            :editor="editor"
                            :config="config"
                        />
                    </ClientOnly>
                </div>
            </div>

            <p v-if="postError" class="text-sm text-red-600">{{ postError }}</p>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import auth from "~/stores/middleware/auth";
    import { ref, onMounted } from "vue";
    import { createData, uploadImage } from "~/utils/api";
    import { Ckeditor, useCKEditorCloud } from "@ckeditor/ckeditor5-vue";

    definePageMeta({
        layout: "admin",
        title: "Admin Area | Create Post Section",
        middleware: [auth],
    });

    const configEnv = useRuntimeConfig();

    const today = new Date().toISOString().split("T")[0];

    const cloud = useCKEditorCloud({
        version: "45.2.1",
        premium: false,
    });

    const editor = computed(() => {
        if (!cloud.data.value) {
            return null;
        }

        return cloud.data.value.CKEditor.ClassicEditor;
    });

    function MyUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return {
                upload: async () => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const file = await loader.file;
                            const respImage = await uploadImage(
                                "/upload-image",
                                file
                            );
                            resolve({
                                default: respImage.data.url,
                            });
                        } catch (err) {
                            reject(err);
                        }
                    });
                },
            };
        };
    }

    const config = computed(() => {
        if (!cloud.data.value) {
            return null;
        }

        const {
            Essentials,
            Heading,
            Bold,
            Italic,
            Paragraph,
            Link,
            List,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageProperties,
            ImageTextAlternative,
            ImageUpload,
            LinkImage,
            CKFinder,
            CKFinderUploadAdapter,
            Font,
            Alignment,
            Strikethrough,
            Underline,
            Subscript,
            Superscript,
            Code,
            CodeBlock,
            Indent,
            IndentBlock,
            TodoList,
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties,
            BlockQuote,
        } = cloud.data.value.CKEditor;

        return {
            licenseKey: `${configEnv.public.ckeditorLicenseKey}`,
            plugins: [
                Essentials,
                Heading,
                Bold,
                Italic,
                Link,
                List,
                Paragraph,
                Image,
                ImageToolbar,
                ImageCaption,
                ImageStyle,
                ImageResize,
                ImageTextAlternative,
                LinkImage,
                ImageUpload,
                CKFinder,
                CKFinderUploadAdapter,
                Font,
                Alignment,
                Code,
                CodeBlock,
                Strikethrough,
                Subscript,
                Superscript,
                Underline,
                Indent,
                IndentBlock,
                TodoList,
                Table,
                TableToolbar,
                TableProperties,
                TableCellProperties,
                BlockQuote,
                MyUploadAdapterPlugin,
            ],
            toolbar: {
                items: [
                    "heading",
                    "|",
                    "fontsize",
                    "|",
                    "alignment",
                    "|",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "bold",
                    "italic",
                    "strikethrough",
                    "underline",
                    "subscript",
                    "superscript",
                    "|",
                    "link",
                    "|",
                    "outdent",
                    "indent",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "todoList",
                    "|",
                    "code",
                    "codeBlock",
                    "|",
                    "insertTable",
                    "|",
                    "uploadImage",
                    "blockQuote",
                    "|",
                    "undo",
                    "redo",
                ],
                shouldNotGroupWhenFull: true,
            },
            image: {
                styles: [
                    "alignLeft",
                    "alignCenter",
                    "alignRight",
                    "inline",
                    "block",
                    "side",
                ],
                resizeOptions: [
                    {
                        name: "resizeImage:original",
                        label: "Original",
                        value: null,
                        icon: "original",
                    },
                    {
                        name: "resizeImage:25",
                        label: "25%",
                        value: "25",
                        icon: "small",
                    },
                    {
                        name: "resizeImage:50",
                        label: "50%",
                        value: "50",
                        icon: "medium",
                    },
                    {
                        name: "resizeImage:75",
                        label: "75%",
                        value: "75",
                        icon: "large",
                    },
                ],
                toolbar: [
                    "imageStyle:inline",
                    "imageStyle:block",
                    "imageStyle:side",
                    "|",
                    "resizeImage:25",
                    "resizeImage:50",
                    "resizeImage:75",
                    "resizeImage:original",
                ],
                insert: {
                    type: "auto",
                    integrations: ["upload", "assetManager", "url"],
                },
            },
            link: {
                addTargetToExternalLinks: true,
            },
            table: {
                contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                ],
            },
        };
    });

    const title = ref("");
    const author = ref("");
    const file = ref(null);
    const fileName = ref("");
    const imageUrl = ref("");
    const published_at = ref("");
    const content = ref("");
    const postError = ref("");

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            file.value = selectedFile;
            fileName.value = selectedFile.name;
            imageUrl.value = URL.createObjectURL(selectedFile);
        }
    };

    const handlerSubmit = async () => {
        try {
            const respImage = await uploadImage("/upload-image", file.value);

            const requestData = {
                title: title.value,
                author: author.value,
                featured_image: respImage.data.url,
                content: content.value,
                published_at: published_at.value,
            };

            await createData("/posts/admin", requestData);
            const successMessage = "Post berhasil dibuat!";
            sessionStorage.setItem("successMessage", successMessage);

            navigateTo("/dashboard/post");
        } catch (error) {
            console.error("Error", error);
            postError.value = error.message;
        }
    };
</script>
