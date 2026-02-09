<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Are you sure?",
  },
  description: {
    type: String,
    default: "",
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  confirmColor: {
    type: String,
    default: "bg-red-600 hover:bg-red-700",
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const close = () => {
  emit("update:modelValue", false);
};

const confirm = () => {
  emit("confirm");
  close();
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/60"
          @click="close"
        ></div>

        <!-- Modal -->
        <Transition name="scale">
          <div
            v-if="modelValue"
            class="relative bg-[#1e1e1e] w-[90%] max-w-sm
                   rounded-2xl p-5 z-10"
          >
            <h3 class="text-white font-semibold text-lg mb-2">
              {{ title }}
            </h3>

            <p v-if="description" class="text-gray-400 text-sm mb-6">
              {{ description }}
            </p>

            <div class="flex justify-end gap-3">
              <button
                @click="close"
                class="px-4 py-2 rounded-full text-sm
                       hover:bg-white/10"
              >
                {{ cancelText }}
              </button>

              <button
                @click="confirm"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium text-white',
                  confirmColor,
                ]"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.scale-enter-from {
  transform: scale(0.95);
  opacity: 0;
}
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

</style>