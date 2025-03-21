<template>
  <div class="app">
    <div class="app__container">
      <Sidebar :data="data" />
      <MainContent :data="data" />
    </div>
    <div class="app__buttons">
      <button 
        class="app__button app__button--download" 
        @click="downloadPDF"
        :disabled="isGeneratingPDF"
      >
        <span v-if="isGeneratingPDF" class="app__button-icon app__button-icon--spin">⚙️</span>
        <span v-else class="app__button-icon">📄</span>
        {{ isGeneratingPDF ? $t('generating') : $t('downloadPDF') }}
      </button>
      
      <div class="app__language-buttons">
        <button 
          class="app__button app__button--language" 
          @click="switchLanguage('pt-br')" 
          :class="{ 'app__button--active': currentLocale === 'pt-br' }"
          :disabled="isGeneratingPDF"
        >
          <span class="app__button-icon">🇧🇷</span> PT
        </button>
        <button 
          class="app__button app__button--language" 
          @click="switchLanguage('en')" 
          :class="{ 'app__button--active': currentLocale === 'en' }"
          :disabled="isGeneratingPDF"
        >
          <span class="app__button-icon">🇺🇸</span> EN
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type { CVData } from '../types';
import Sidebar from './Sidebar.vue';
import MainContent from './MainContent.vue';
import { getCVContent } from '../i18n';
import '../assets/styles/global.scss';
import html2pdf from 'html2pdf.js';

// Define props
interface Props {
  defaultLocale?: string;
}
const props = withDefaults(defineProps<Props>(), {
  defaultLocale: 'pt-br'
});

const { t, locale } = useI18n();
const router = useRouter();
const currentLocale = ref(locale.value);
const data = ref<CVData>(getCVContent(locale.value));
const isGeneratingPDF = ref(false);

// Set the initial language based on the defaultLocale prop
onMounted(() => {
  if (props.defaultLocale) {
    switchLanguage(props.defaultLocale);
  }
});

const switchLanguage = (lang: string) => {
  locale.value = lang;
  currentLocale.value = lang;
  data.value = getCVContent(lang);
  
  // Update URL when language changes
  if (lang === 'en' && router.currentRoute.value.path !== '/en') {
    router.push('/en');
  } else if (lang === 'pt-br' && router.currentRoute.value.path !== '/') {
    router.push('/');
  }
};

watch(locale, (newLocale) => {
  data.value = getCVContent(newLocale);
});

const downloadPDF = async () => {
  if (isGeneratingPDF.value) return;
  
  isGeneratingPDF.value = true;
  const element = document.querySelector('.app__container');
  
  if (!element) {
    console.error('CV container element not found');
    isGeneratingPDF.value = false;
    return;
  }
  
  try {
    const opt = {
      margin: 0,
      filename: `cv-brunoxavier-${locale.value}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        width: element.offsetWidth,
        height: element.offsetHeight
      },
      jsPDF: { 
        unit: 'px', 
        format: [element.offsetWidth, element.offsetHeight],
        orientation: 'portrait',
        compress: true,
        hotfixes: ["px_scaling"]
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    isGeneratingPDF.value = false;
  }
};
</script>

<style lang="scss">
@use 'sass:color';

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $color-background;
  padding: $spacing-xl;
  
  &__container {
    display: flex;
    max-width: $container-max-width;
    margin: 0 auto;
    background: $color-background-white;
    box-shadow: 0 0 20px $color-shadow;

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    margin: $spacing-xl 0;
    flex-wrap: wrap;

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__button {
    padding: 12px 24px;
    background-color: $color-background-dark;
    color: $color-text-contrast-primary;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease;
    
    &:hover:not(:disabled) {
      background-color: color.adjust($color-background-dark, $lightness: 10%);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    &--download {
      background-color: color.adjust($color-background-dark, $lightness: -5%);
      min-width: 160px;
    }
    
    &--language {
      min-width: 80px;
      justify-content: center;
    }
    
    &--active {
      background-color: color.adjust($color-background-dark, $lightness: -10%);
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }

  &__button-icon {
    font-size: 1.2em;
    
    &--spin {
      animation: spin 2s linear infinite;
    }
  }

  &__language-buttons {
    display: flex;
    gap: $spacing-sm;
  }

  &__pdf-export {
    transform: scale(0.75);
    transform-origin: top left;
    width: 133.33%; // Compensate for the scale to maintain full width
    height: 133.33%; // Compensate for the scale to maintain full height
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 