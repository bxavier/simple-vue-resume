<template>
  <aside class="sidebar">
    <div 
      class="sidebar__profile-img"
      :style="{ backgroundImage: `url(${profilePic})` }"
      role="img"
      :aria-label="$t('profilePhoto')"
    ></div>

    <h2 class="sidebar__section-title">{{ $t('about') }}</h2>
    <p class="sidebar__about-text">{{ data?.about?.description }}</p>

    <h2 class="sidebar__section-title">{{ $t('links') }}</h2>
    <nav class="sidebar__links">
      <ul class="sidebar__links-list">
        <li v-for="link in data?.profile?.links" :key="link.url" class="sidebar__link-item">
          <a :href="link.url" target="_blank" rel="noopener">
            <i :class="`fa-brands fa-${link.icon}`" aria-hidden="true"></i>
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>

    <h2 class="sidebar__section-title">{{ $t('skills') }}</h2>
    <div class="sidebar__skills">
      <div v-for="skill in data?.skills" :key="skill.title" class="sidebar__skill-item">
        <span class="sidebar__skill-title">{{ skill.title }}</span>:
        <span class="sidebar__skill-items">{{ skill.items.join(', ') }}</span>
      </div>
    </div>

    <h2 class="sidebar__section-title">{{ $t('languages') }}</h2>
    <div class="sidebar__skills">
      <div v-for="language in data?.languages" :key="language.language" class="sidebar__skill-item">
        <span class="sidebar__skill-title">{{ language.language }}</span>:
        <span class="sidebar__skill-items">{{ language.level }}</span>
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
import profilePic from '../assets/images/profile-pic.jpeg';
import type { CVData } from '../types';

defineProps<{
  data: CVData;
}>();
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 0 0 $sidebar-width;
  background: $color-background-dark;
  color: $color-text-contrast-primary;
  padding: $spacing-lg;

  @media (max-width: $breakpoint-mobile) {
    flex: none;
  }

  // Profile image
  &__profile-img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin: $spacing-md auto 0;
    display: block;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  // Section titles
  &__section-title {
    font-size: 1.2em;
    text-transform: uppercase;
    margin: $spacing-xl 0 $spacing-md;
    padding-bottom: 0px;
    border-bottom: 1px solid $color-border-light;
    font-family: $font-family-secondary;
    color: $color-text-contrast-primary;
    letter-spacing: 2px;
    font-weight: normal;
  }

  // Links information in sidebar
  &__links {
    margin-bottom: $spacing-md;
  }
  
  &__links-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__link-item {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-xs;
    color: $color-text-contrast-secondary;

    a {
      color: $color-text-contrast-secondary;
      text-decoration: none;
      display: flex;
      align-items: center;

      &:hover, &:focus {
        color: $color-text-contrast-primary;
        outline: none;
      }
    }

    i {
      margin-right: $spacing-sm;
      color: $color-text-contrast-primary;
    }
  }

  // Skills information in sidebar
  &__skills {
    margin-bottom: $spacing-md;
  }

  &__skill-item {
    margin-bottom: $spacing-sm;
  }

  &__skill-title {
    color: $color-text-contrast-primary;
    font-weight: bold;
  }

  &__skill-items {
    color: $color-text-contrast-secondary;
  }

  // About text
  &__about-text {
    color: $color-text-contrast-secondary;
    margin-bottom: $spacing-xl;
    line-height: 1.5;
  }
}
</style>
