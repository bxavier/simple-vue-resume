<template>
  <main class="main">
    <div class="main__top-section">
      <header class="main__header">
        <h1 class="main__name">{{ data?.profile?.name?.toUpperCase() }}</h1>
        <div class="main__title">{{ data?.profile?.title?.toUpperCase() }}</div>
      </header>

      <address class="main__contact">
        <div class="main__contact-item">
          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
          <span>{{ data?.profile?.location }}</span>
        </div>
        <div class="main__contact-item">
          <i class="fas fa-phone" aria-hidden="true"></i>
          <span>{{ data?.profile?.phone }}</span>
        </div>
        <div class="main__contact-item">
          <i class="fas fa-envelope" aria-hidden="true"></i>
          <span>{{ data?.profile?.email }}</span>
        </div>
      </address>
    </div>

    <section class="main__section main__section--experience">
      <h2 class="main__section-title">{{ $t('professionalExperience') }}</h2>
      <TimelineItem
        v-for="(item, index) in visibleExperience"
        :key="item.place"
        :item="item"
        :is-last="index === visibleExperience.length - 1"
      />
      <div v-if="!showAllExperience" class="main__experience-note">
        {{ $t('experienceNote') }}
      </div>
    </section>

    <section class="main__section main__section--education">
      <h2 class="main__section-title">{{ $t('education') }}</h2>
      <TimelineItem
        v-for="(item, index) in data?.education"
        :key="item.place"
        :item="item"
        :is-last="index === (data?.education?.length || 0) - 1"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CVData } from '../types';
import TimelineItem from './TimelineItem.vue';

const { t } = useI18n();

const props = defineProps<{
  data: CVData;
  showAllExperience?: boolean;
}>();

const visibleExperience = computed(() => {
  if (props.showAllExperience) {
    return props.data?.experience || [];
  }
  return props.data?.experience?.filter((item) => item.visible) || [];
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
.main {
  flex: 1;
  padding: $spacing-lg $spacing-lg 0 $spacing-lg;
  background: $color-background-white;

  &__top-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xxl;
    margin: 30px 0 40px;
    align-items: center;

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
      align-items: flex-start;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-family: $font-family-secondary;
    font-size: 2.5em;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: normal;
    line-height: 1;
    margin: 0;
  }

  &__title {
    font-family: $font-family-secondary;
    font-size: 1.1em;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: normal;
    margin-top: $spacing-xs;
  }

  &__section {
    margin-bottom: $spacing-xl;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: $spacing-lg;
    }
  }

  &__section-title {
    font-size: 1.2em;
    text-transform: uppercase;
    margin: 0 0 $spacing-lg;
    padding-bottom: 0;
    border-bottom: 1px solid $color-border-light;
    font-family: $font-family-secondary;
    color: $color-text-primary;
    letter-spacing: 2px;
    font-weight: normal;
  }

  &__contact {
    text-align: right;
    width: 200px;
    margin-left: auto;
    font-style: normal;

    @media (max-width: $breakpoint-mobile) {
      text-align: left;
      margin-left: 0;
      width: 100%;
    }
  }

  &__contact-item {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-xs;
    color: $color-text-secondary;
    justify-content: flex-end;

    i {
      width: 20px;
      margin-right: $spacing-sm;
      color: $color-text-primary;
    }

    span {
      color: $color-text-secondary;
      text-decoration: none;
    }

    @media (max-width: $breakpoint-mobile) {
      justify-content: flex-start;
    }
  }

  &__experience-note {
    text-align: right;
    font-size: 0.9em;
    font-style: italic;
    color: color.adjust($color-text-secondary, $lightness: 30%);
    margin-top: $spacing-md;
  }
}
</style> 