import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    tailwindcss: {
        // Options
        jit: true,
        exposeConfig: true
    },
    css: [
		'~/assets/main.scss',
	],
})
