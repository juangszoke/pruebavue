<template>
  <index-note />
</template>

<script>
import IndexNote from "src/components/IndexNote";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IndexNote },
  name: "MainLayout",
});
</script>
