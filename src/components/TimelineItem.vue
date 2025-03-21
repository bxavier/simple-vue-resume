<template>
  <div class="timeline-item">
    <div class="timeline-item__info">
      <div class="timeline-item__company">{{ item.place }}</div>
      <div class="timeline-item__date">{{ formatPeriod(item.period) }}</div>
      <div class="timeline-item__location">{{ item.location }}</div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__title">{{ item.title }}</div>
      <ul class="timeline-item__description" aria-label="Role description">
        <li v-for="desc in item.description" :key="desc">{{ desc }}</li>
      </ul>
      <div class="timeline-item__technologies" v-if="item.technologies && item.technologies.length > 0">
        <span class="timeline-item__technologies-title">{{ $t('technologies') }}: </span>
        <span class="timeline-item__technologies-list">{{ item.technologies.join(', ') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineItem } from '../types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  item: TimelineItem;
}>();

/**
 * Formats the period string for display
 * @param period - Time period in string format
 * @returns Formatted period string
 */
const formatPeriod = (period: string): string => {
  // Return formatted period if formatting is needed in the future
  return period;
};
</script>

<style lang="scss" scoped>
.timeline-item {
  margin-bottom: $spacing-xxl;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: $spacing-lg;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: calc(25%);
    top: 13px;
    bottom: -50px;
    width: 1px;
    background-color: $color-text-primary;
  }

  &:last-child::before {
    bottom: -$spacing-md;
  }

  &::after {
    content: '';
    position: absolute;
    left: calc(25% - 4px);
    top: 9px;
    width: 9px;
    height: 9px;
    background-color: $color-text-primary;
    border-radius: 50%;
  }

  &__info {
    text-align: left;
    position: relative;
    z-index: 1;
  }
  
  &__company {
    color: $color-text-primary;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    max-width: 90%;
  }

  &__date {
    color: $color-text-secondary;
    font-size: 0.9em;
    margin-top: $spacing-xs;
  }

  &__location {
    color: $color-text-secondary;
    font-size: 0.9em;
    margin-top: $spacing-xs;
    margin-bottom: $spacing-sm;
  }

  &__content {
    position: relative;
    z-index: 1;
    margin-left: $spacing-sm;
  }

  &__title {
    font-family: $font-family-primary;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: $spacing-xs;
  }

  &__description {
    color: $color-text-secondary;
    margin: $spacing-xs 0 0 0;
    padding: 0;
    list-style: disc;
    font-size: 0.9em;
    font-weight: 400;
    padding-left: $spacing-lg;

    li {
      margin-bottom: .5em;
      line-height: 1.3em;
      position: relative;
      padding-left: $spacing-xs;
      
      &::marker {
        color: $color-text-secondary;
      }
    }
  }

  &__technologies {
    margin-top: $spacing-md;
    font-size: 0.9em;
    color: $color-text-secondary;
  }

  &__technologies-title {
    font-weight: 700;
  }
  
  &__technologies-list {
    font-style: italic;
  }
}
</style> 