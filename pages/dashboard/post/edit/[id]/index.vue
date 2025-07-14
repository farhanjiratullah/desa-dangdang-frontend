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
            <div class="my-5 text-2xl font-bold">Edit Post</div>
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
    import { ref, onMounted, computed } from "vue";
    import { useRoute, navigateTo } from "nuxt/app";
    import { fetchDataByID, uploadImage, editData } from "~/utils/api";
    import { Ckeditor, useCKEditorCloud } from "@ckeditor/ckeditor5-vue";

    definePageMeta({
        layout: "admin",
        title: "Admin Area | Edit Post Section",
        middleware: [auth],
    });

    const route = useRoute();

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
            let featuredImageUrl = imageUrl.value; // default to existing image

            if (file.value) {
                const respImage = await uploadImage(
                    "/upload-image",
                    file.value
                );
                featuredImageUrl = respImage.data.url;
            }

            const requestData = {
                title: title.value,
                author: author.value,
                featured_image: featuredImageUrl,
                content: content.value,
                published_at: published_at.value,
            };

            await editData(`/posts/admin`, requestData, route.params.id);
            const successMessage = "Post berhasil diubah!";
            sessionStorage.setItem("successMessage", successMessage);

            navigateTo("/dashboard/post");
        } catch (error) {
            console.error("Error", error);
            postError.value = error.message;
        }
    };

    const getPostById = async () => {
        try {
            const response = await fetchDataByID(`/posts`, route.params.id);
            const post = response.data;
            title.value = post.title;
            author.value = post.author;
            imageUrl.value = post.featured_image;
            published_at.value = new Date(post.published_at).toLocaleDateString(
                "en-CA"
            );
            content.value = post.content;
        } catch (error) {
            console.error("Error fetching post data", error);
        }
    };

    onMounted(() => {
        getPostById();
    });
</script>

<style>
    .ck-editor__editable {
        min-width: 76vw;
    }

    /*Toolbar*/
    .ck-editor__top {
        min-width: 76vw;
    }

    .prose {
        color: var(--tw-prose-body);
        max-width: 65ch;
    }
    .prose :where(p):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
    }
    .prose
        :where([class~="lead"]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: var(--tw-prose-lead);
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
    }
    .prose :where(a):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-links);
        text-decoration: underline;
        font-weight: 500;
    }
    .prose
        :where(strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: var(--tw-prose-bold);
        font-weight: 600;
    }
    .prose
        :where(a strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(blockquote strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(thead th strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(ol):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        list-style-type: decimal;
        margin-top: 1.25em;
        margin-bottom: 1.25em;
        padding-inline-start: 1.625em;
    }
    .prose
        :where(ol[type="A"]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: upper-alpha;
    }
    .prose
        :where(ol[type="a"]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: lower-alpha;
    }
    .prose
        :where(ol[type="A" s]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: upper-alpha;
    }
    .prose
        :where(ol[type="a" s]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: lower-alpha;
    }
    .prose
        :where(ol[type="I"]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: upper-roman;
    }
    .prose
        :where(ol[type="i"]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: lower-roman;
    }
    .prose
        :where(ol[type="I" s]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: upper-roman;
    }
    .prose
        :where(ol[type="i" s]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: lower-roman;
    }
    .prose
        :where(ol[type="1"]):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        list-style-type: decimal;
    }
    .prose
        :where(ul):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        list-style-type: disc;
        margin-top: 1.25em;
        margin-bottom: 1.25em;
        padding-inline-start: 1.625em;
    }
    .prose
        :where(ol > li):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::marker {
        font-weight: 400;
        color: var(--tw-prose-counters);
    }
    .prose
        :where(ul > li):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::marker {
        color: var(--tw-prose-bullets);
    }
    .prose
        :where(dt):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-headings);
        font-weight: 600;
        margin-top: 1.25em;
    }
    .prose
        :where(hr):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        border-color: var(--tw-prose-hr);
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
    }
    .prose
        :where(blockquote):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        font-weight: 500;
        font-style: italic;
        color: var(--tw-prose-quotes);
        border-inline-start-width: 0.25rem /* 4px */;
        border-inline-start-color: var(--tw-prose-quote-borders);
        quotes: "\201C""\201D""\2018""\2019";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-inline-start: 1em;
    }
    .prose
        :where(blockquote p:first-of-type):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::before {
        content: open-quote;
    }
    .prose
        :where(blockquote p:last-of-type):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::after {
        content: close-quote;
    }
    .prose
        :where(h1):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-headings);
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
    }
    .prose
        :where(h1 strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        font-weight: 900;
        color: inherit;
    }
    .prose
        :where(h2):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-headings);
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
    }
    .prose
        :where(h2 strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        font-weight: 800;
        color: inherit;
    }
    .prose
        :where(h3):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-headings);
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
    }
    .prose
        :where(h3 strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        font-weight: 700;
        color: inherit;
    }
    .prose
        :where(h4):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-headings);
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
    }
    .prose
        :where(h4 strong):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        font-weight: 700;
        color: inherit;
    }
    .prose
        :where(img):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        margin-top: 2em;
        margin-bottom: 2em;
    }
    .prose
        :where(picture):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        display: block;
        margin-top: 2em;
        margin-bottom: 2em;
    }
    .prose
        :where(video):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 2em;
        margin-bottom: 2em;
    }
    .prose
        :where(kbd):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        font-weight: 500;
        font-family: inherit;
        color: var(--tw-prose-kbd);
        box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%),
            0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
        font-size: 0.875em;
        border-radius: 0.3125rem /* 5px */;
        padding-top: 0.1875em;
        padding-inline-end: 0.375em;
        padding-bottom: 0.1875em;
        padding-inline-start: 0.375em;
    }
    .prose
        :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-code);
        font-weight: 600;
        font-size: 0.875em;
    }
    .prose
        :where(code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::before {
        content: "`";
    }
    .prose
        :where(code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::after {
        content: "`";
    }
    .prose
        :where(a code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(h1 code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(h2 code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
        font-size: 0.875em;
    }
    .prose
        :where(h3 code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
        font-size: 0.9em;
    }
    .prose
        :where(h4 code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(blockquote code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(thead th code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: inherit;
    }
    .prose
        :where(pre):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        color: var(--tw-prose-pre-code);
        background-color: var(--tw-prose-pre-bg);
        overflow-x: auto;
        font-weight: 400;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem /* 6px */;
        padding-top: 0.8571429em;
        padding-inline-end: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-inline-start: 1.1428571em;
    }
    .prose
        :where(pre code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: inherit;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
    }
    .prose
        :where(pre code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::before {
        content: none;
    }
    .prose
        :where(pre code):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        )::after {
        content: none;
    }
    .prose
        :where(table):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        width: 100%;
        table-layout: auto;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
    }
    .prose
        :where(thead):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        border-bottom-width: 1px;
        border-bottom-color: var(--tw-prose-th-borders);
    }
    .prose
        :where(thead th):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: var(--tw-prose-headings);
        font-weight: 600;
        vertical-align: bottom;
        padding-inline-end: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-inline-start: 0.5714286em;
    }
    .prose
        :where(tbody tr):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        border-bottom-width: 1px;
        border-bottom-color: var(--tw-prose-td-borders);
    }
    .prose
        :where(tbody tr:last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        border-bottom-width: 0;
    }
    .prose
        :where(tbody td):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        vertical-align: baseline;
    }
    .prose
        :where(tfoot):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        border-top-width: 1px;
        border-top-color: var(--tw-prose-th-borders);
    }
    .prose
        :where(tfoot td):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        vertical-align: top;
    }
    .prose
        :where(th, td):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        text-align: start;
    }
    .prose
        :where(figure > *):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
        margin-bottom: 0;
    }
    .prose
        :where(figcaption):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        color: var(--tw-prose-captions);
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
    }
    .prose {
        --tw-prose-body: #374151;
        --tw-prose-headings: #111827;
        --tw-prose-lead: #4b5563;
        --tw-prose-links: #111827;
        --tw-prose-bold: #111827;
        --tw-prose-counters: #6b7280;
        --tw-prose-bullets: #d1d5db;
        --tw-prose-hr: #e5e7eb;
        --tw-prose-quotes: #111827;
        --tw-prose-quote-borders: #e5e7eb;
        --tw-prose-captions: #6b7280;
        --tw-prose-kbd: #111827;
        --tw-prose-kbd-shadows: 17 24 39;
        --tw-prose-code: #111827;
        --tw-prose-pre-code: #e5e7eb;
        --tw-prose-pre-bg: #1f2937;
        --tw-prose-th-borders: #d1d5db;
        --tw-prose-td-borders: #e5e7eb;
        --tw-prose-invert-body: #d1d5db;
        --tw-prose-invert-headings: #fff;
        --tw-prose-invert-lead: #9ca3af;
        --tw-prose-invert-links: #fff;
        --tw-prose-invert-bold: #fff;
        --tw-prose-invert-counters: #9ca3af;
        --tw-prose-invert-bullets: #4b5563;
        --tw-prose-invert-hr: #374151;
        --tw-prose-invert-quotes: #f3f4f6;
        --tw-prose-invert-quote-borders: #374151;
        --tw-prose-invert-captions: #9ca3af;
        --tw-prose-invert-kbd: #fff;
        --tw-prose-invert-kbd-shadows: 255 255 255;
        --tw-prose-invert-code: #fff;
        --tw-prose-invert-pre-code: #d1d5db;
        --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
        --tw-prose-invert-th-borders: #4b5563;
        --tw-prose-invert-td-borders: #374151;
        font-size: 1rem /* 16px */;
        line-height: 1.75;
    }
    .prose
        :where(picture > img):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
        margin-bottom: 0;
    }
    .prose
        :where(li):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }
    .prose
        :where(ol > li):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        padding-inline-start: 0.375em;
    }
    .prose
        :where(ul > li):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        padding-inline-start: 0.375em;
    }
    .prose
        :where(.prose > ul > li p):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
    }
    .prose
        :where(.prose > ul > li p):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
    }
    .prose
        :where(.prose > ul > li > p:first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 1.25em;
    }
    .prose
        :where(.prose > ul > li > p:first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 1.25em;
    }
    .prose
        :where(.prose > ul > li > p:last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-bottom: 1.25em;
    }
    .prose
        :where(.prose > ul > li > p:last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-bottom: 1.25em;
    }
    .prose
        :where(.prose > ol > li > p:first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 1.25em;
    }
    .prose
        :where(.prose > ol > li > p:first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 1.25em;
    }
    .prose
        :where(.prose > ol > li > p:last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-bottom: 1.25em;
    }
    .prose
        :where(.prose > ol > li > p:last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-bottom: 1.25em;
    }
    .prose
        :where(ul ul, ul ol, ol ul, ol ol):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
    }
    .prose
        :where(dl):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
    }
    .prose
        :where(dd):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
        margin-top: 0.5em;
        padding-inline-start: 1.625em;
    }
    .prose
        :where(hr + *):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
    }
    .prose
        :where(h2 + *):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
    }
    .prose
        :where(h3 + *):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
    }
    .prose
        :where(h4 + *):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
    }
    .prose
        :where(thead th:first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        padding-inline-start: 0;
    }
    .prose
        :where(thead th:last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        padding-inline-end: 0;
    }
    .prose
        :where(tbody td, tfoot td):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        padding-top: 0.5714286em;
        padding-inline-end: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-inline-start: 0.5714286em;
    }
    .prose
        :where(tbody td:first-child, tfoot td:first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        padding-inline-start: 0;
    }
    .prose
        :where(tbody td:last-child, tfoot td:last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        padding-inline-end: 0;
    }
    .prose
        :where(figure):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 2em;
        margin-bottom: 2em;
    }
    .prose
        :where(.prose > :first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
    }
    .prose
        :where(.prose > :first-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-top: 0;
    }
    .prose
        :where(.prose > :last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-bottom: 0;
    }
    .prose
        :where(.prose > :last-child):not(
            :where([class~="not-prose"], [class~="not-prose"] *)
        ) {
        margin-bottom: 0;
    }
</style>