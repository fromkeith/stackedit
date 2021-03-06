<template>
  <modal-inner aria-label="Synchronize with GitLab">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitlab" />
      </div>
      <p>Open a file from your <b>GitLab</b> project and keep it synced.</p>
      <form-entry
        label="Project URL"
        error="projectUrl"
      >
        <input
          slot="field"
          v-model.trim="projectUrl"
          class="textfield"
          type="text"
          @keydown.enter="resolve()"
        >
        <div class="form-entry__info">
          <b>Example:</b> {{ config.token.serverUrl }}/path/to/project
        </div>
      </form-entry>
      <form-entry
        label="File path"
        error="path"
      >
        <input
          slot="field"
          v-model.trim="path"
          class="textfield"
          type="text"
          @keydown.enter="resolve()"
        >
        <div class="form-entry__info">
          <b>Example:</b> path/to/README.md
        </div>
      </form-entry>
      <form-entry
        label="Branch"
        info="optional"
      >
        <input
          slot="field"
          v-model.trim="branch"
          class="textfield"
          type="text"
          @keydown.enter="resolve()"
        >
        <div class="form-entry__info">
          If not supplied, the <code>master</code> branch will be used.
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button
        class="button"
        @click="config.reject()"
      >
        Cancel
      </button>
      <button
        class="button button--resolve"
        @click="resolve()"
      >
        Ok
      </button>
    </div>
  </modal-inner>
</template>

<script>
import gitlabProvider from '../../../services/providers/gitlabProvider';
import modalTemplate from '../common/modalTemplate';
import utils from '../../../services/utils';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    projectUrl: 'gitlabProjectUrl',
  },
  methods: {
    resolve() {
      const projectPath = utils.parseGitlabProjectPath(this.projectUrl);
      if (!projectPath) {
        this.setError('projectUrl');
      }
      if (!this.path) {
        this.setError('path');
      }
      if (projectPath && this.path) {
        // Return new location
        const location = gitlabProvider.makeLocation(
          this.config.token,
          projectPath,
          this.branch || 'master',
          this.path,
        );
        this.config.resolve(location);
      }
    },
  },
});
</script>
