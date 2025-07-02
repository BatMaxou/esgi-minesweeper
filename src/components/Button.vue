<script setup>
import {RouterLink} from 'vue-router'

const props = defineProps({
  as: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'router-link'].includes(value)
  },
  to: {
    type: [String, Object],
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <component
    :is="props.as === 'router-link' ? RouterLink : 'button'"
    :to="props.as === 'router-link' ? props.to : undefined"
    :type="props.as === 'button' ? props.type : undefined"
    :disabled="props.as === 'button' ? props.disabled : undefined"
    class="nav-button"
  >
    <span class="button-content">
      <slot/>
    </span>
  </component>
</template>

<style scoped>
.nav-button {
  background: linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 50%, #b0b0b0 100%);
  border: 2px outset #c0c0c0;
  border-radius: 0;
  padding: 10px 16px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  transition: all 0.1s ease;
  position: relative;
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080,
  2px 2px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.nav-button:hover {
  background: linear-gradient(180deg, #ffffff 0%, #e0e0e0 50%, #c0c0c0 100%);
  border-color: #a0a0a0;
  transform: translateY(-1px);
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080,
  3px 3px 5px rgba(0, 0, 0, 0.3);
}

.nav-button:active {
  background: linear-gradient(180deg, #a0a0a0 0%, #c0c0c0 50%, #d0d0d0 100%);
  border: 2px inset #c0c0c0;
  transform: translateY(1px);
  box-shadow: inset -1px -1px 0 #ffffff,
  inset 1px 1px 0 #808080,
  1px 1px 2px rgba(0, 0, 0, 0.1);
}

.nav-button.router-link-active {
  background: linear-gradient(180deg, #90c695 0%, #70a075 50%, #508055 100%);
  border-color: #60a065;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.nav-button.router-link-active:hover {
  background: linear-gradient(180deg, #a0d6a5 0%, #80b085 50%, #609065 100%);
}

.nav-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.nav-button:disabled:hover {
  transform: none;
  background: linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 50%, #b0b0b0 100%);
}

.button-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .nav-button {
    padding: 8px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .nav-button {
    padding: 6px 10px;
    font-size: 11px;
  }
}
</style>
